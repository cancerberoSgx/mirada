

## cli

in this project doxygen2typescript, I want to being able to run it as a CLI "bin" in package.json, with the arguments used in src/test.ts, something like 

doxygen2typescript --opencvBuildFolder foo --opencvDocBuildFolder bar --tsOutputFolder tmp

Can you implement the cli in src/cli.ts and the .js that calls it in bin folder?




## docker

I need an easy way of running the following in docker - so others can perform all these tasks in one single docker command


machine requirements:
emscripten, doxygen, git

step 1: download opencv and compile opencv.js

```sh
git clone https://github.com/opencv/opencv.git
cd opencv
emcmake python platforms/js/build_js.py build_js --build_wasm --simd
cd ..
```

step 2: 
compile openvc docs with xml output:

### compile docs

```sh
cd opencv
# make sure doc/Doxyfile.in GENERATE_XML           = YES
mkdir -p build && cd build
cmake -DBUILD_DOCS=ON ..
make -j$(nproc) doxygen
cd ..
```


step 3:
execute doxygen2typescript to build the typescripts

```sh
rm -rf tmp ; node bin/doxygen2typescript.js --opencvBuildFolder /home/sg/git/opencv/build_js --opencvDoc
BuildFolder /home/sg/git/opencv/build --tsOutputFolder tmp
```


can you analyze the problem and suggest how can I distribute a single docker or docker-compose file with all these instructions separately from this project ? 


---

## better typing

this project is about generating typescript types (see tmp/*) folder so users of opencv.js can have 100% type definitions in their typescript projects.
doxygen2typescript project was created a long time ago analyzes opencv reference api docs in xml doxigen format and also opencv.js build cpp bindings to write a full typescript type definitinos of their api

Can you analyze the current output and propose different structures for types, mostly if we should use namespaces  and how ? and how can we reduce hacks made in the process ? 

(don't write any code, just analyze and answer here)

A:

`opencv2ts` walks every `class`/`struct`/`function`/`constant` referenced from `bindings.cpp`, finds the matching doxygen XML compound, and renders **one file per class and one file per doxygen `@defgroup`** (`Mat.ts`, `Algorithm.ts`, `core_array.ts`, `imgproc_filter.ts`, …), each containing flat, top-level `export declare class`/`function`/`const`. `exports.ts` then:

1. barrels every file with `export * from './X'` into `_types.ts`,
2. wraps that as `export type CV = typeof _CV` + `declare global { var cv: CV }`,
3. appends a hand-written `_hacks.ts` (Scalar/Point/Rect/Mat_/Vector\<T\>/EmscriptenEmbindInstance/…),
4. then runs several **ts-morph AST-surgery passes** over the already-written output: `fixMissingExtends` (string-patches `class Mat` → `class Mat extends Mat_`), `fixClasses` (deletes specific members by name), `fixMissingImports` (compiles the output, reads "no exported member" diagnostics, and *guesses* `number`/`boolean`/`any` from the missing name).

So there is currently exactly **one namespace: the global module scope**, flattened twice (once per-file, once again in the `_types` barrel). Every class, every free function from every doxygen group, every enum member, and every hand-authored hack type is a sibling top-level identifier that must be globally unique across the entire OpenCV API surface.

## Root cause of most of the hacks: identity is derived from the wrong source, and thrown away too early

- `getCompoundName` (`general.ts:8`) does `compoundname.split('::').pop()` — it takes doxygen's fully-qualified C++ name (`cv::ml::SVM`, `cv::AgastFeatureDetector::DetectorType`) and keeps **only the leaf**, discarding the namespace/enclosing-class path that would otherwise disambiguate it.
- `parseBindingsCpp.ts:70` explicitly filters out `kind === 'namespace'` (and `'file'`) compounds — doxygen namespace nodes never even reach the renderer. Namespace was designed out of the model from the start, not merely left unimplemented.
- `parseBindingsCpp` *does* regex-capture the literal string each class/function/constant is registered under in `bindings.cpp` (`emscripten::class_<...>( "ml_SVM" )`, `constant("AGAST_7_12s", ...)`), which is the actual runtime source of truth for what property exists on `cv`. But that string is used only to *locate* the matching doxygen XML node — the renderer then re-derives the emitted identifier from doxygen's leaf name instead of reusing the registration string. Two competing sources of identity, and the wrong one wins.
- Net effect: any C++ class/enum that OpenCV.js itself disambiguates at the binding layer (nested-namespace classes get an underscore-flattened export name; nested enum constants get a `ClassName_` prefix) loses that disambiguation in the generated `.d.ts`, which is exactly the still-open TODO ("`AgastFeatureDetector.AGAST_7_12s` becomes `AgastFeatureDetector_AGAST_7_12s`" — broken) and almost certainly the reason whole files have to be deleted via `canRenderFileNamed`'s blacklist (`core_basic`, `gapi_filters`, `calib3d_fisheye`, …) rather than the actual name conflict being resolved.
- Inheritance is a similar story: doxygen ships `<basecompoundref>` per class, and the codebase even models `derivedcompoundref` (parsed in `parseDoxygen.ts:26`, typed nowhere, read nowhere) — but it captures **derived** classes, not **base** classes, and never uses it. So instead of reading real inheritance from doxygen, `exportsHacks.ts` hand-maintains a 3-entry `missingExtends` map (`Mat→Mat_`, `MatExpr→Mat`, `Algorithm→EmscriptenEmbindInstance`) and patches it into already-serialized `.ts` text with a string `.replace()`.

Everything downstream — the blacklist, the enum-prefix bug, the `missingExtends`/`fixClasses`/`fixMissingImports` AST-surgery passes, the giant hand-authored `_hacks.ts` — is a symptom of the same thing: **the tool discards structural information doxygen already gives it (qualification, base classes, the JS-registration name) and then re-invents fragile approximations of that information after the fact.**

## Should the output use TS namespaces?

Two different questions get conflated if you just ask "namespaces, yes/no": (a) how should the *generator organize files/identifiers internally*, and (b) what *shape does `cv` actually have at runtime*? A `.d.ts` must be faithful to (b) — OpenCV.js's embind bindings put everything on one flat `cv` object; there is no real `cv.ml.SVM`, only `cv.ml_SVM` (or whatever literal string `bindings.cpp` registers). Wrapping things in a cosmetic TS `namespace ml { class SVM }` would make `cv.ml.SVM` type-check while `cv.ml.SVM` doesn't exist at runtime — trading one class of bug (name collisions) for a worse one (types that lie about the API).

So the fix isn't "add namespaces," it's **make the flat identifier correct**, and reserve real TS namespacing for places where it doesn't change the public surface:

- **Global merged surface (keep flat, but make it correct):** keep the current `CV`/`declare global { var cv }` shape, but populate every identifier from the literal `bindings.cpp` registration string (already parsed, currently discarded) instead of doxygen's leaf name. Since those strings must already be unique for opencv.js to work at runtime at all, this alone removes the *need* for `canRenderFileNamed`'s blacklist and fixes the enum-prefix TODO — the ground truth is inherently collision-free; the current code just isn't using it.
- **Doxygen `@defgroup` files (`core_array.ts`, `imgproc_filter.ts`, …):** these are documentation-only buckets over the single `cv::` namespace, not real C++/JS scopes — two groups cannot legitimately define the same free function. Keep splitting output by group for file-size/readability, but don't treat the split as a namespace boundary; a genuine duplicate across two group files signals a doxygen grouping quirk (e.g. an overload filed under a different `@defgroup` than its sibling) that should be de-duped by matching, not solved by deleting one file wholesale.
- **Real TS `namespace`/module nesting** only where the runtime itself is nested — e.g. if a future opencv.js build genuinely mounts a sub-object (`cv.utils.fs`-style helpers already do this in real opencv.js), that's the one place a TS `namespace` mirrors reality rather than decorating it.
- Optional, additive: alongside the flat global `cv`, also emit **per-group ES modules with named exports** (`export * as core_array from './core_array'`) for consumers who want `import { absdiff } from 'opencv-types/core_array'` instead of `cv.absdiff`. This is safe precisely because it's an *additional* import path, not a reinterpretation of the runtime object — it doesn't need to be collision-free globally, only within each module.

## Other concrete ways to shrink the hack surface

1. **Parse `basecompoundref` (not `derivedcompoundref`) into `CompoundDef.bases`.** This alone should replace almost all of `fixMissingExtends`/the AST-surgery `.replace()` pass with a normal render-time `extends`. Keep a tiny manual map only for the 1-2 truly JS-only synthetic bases (`EmscriptenEmbindInstance`) that don't exist anywhere in the C++ hierarchy, since doxygen genuinely can't know about those.
2. **Promote `_hacks.ts` from a generated string template to a real, hand-maintained, type-checked source file** copied verbatim into output (and covered by `tsc --noEmit`/tests on every run). Right now ~250 lines of load-bearing runtime types live inside a template-literal-returning function (`renderImportHacks`) with no compiler ever looking at them until they land in someone's `tmp/`.
3. **Replace `fixMissingImports`'s name-sniffing (`int`/`double`/`float` → `number`, else `any`) with a real primitive-type map built once** from the doxygen/C++ built-in type list, applied at render time in `renderType`/`renderParam`, not reverse-engineered later from compiler diagnostics on missing exports. Diagnostics-driven codegen is inherently a hack: it means the renderer knowingly emits invalid references and repairs them after the fact instead of resolving them while it has full context.
4. **Track name provenance instead of silently dropping ids.** `parseBindingsCpp`'s doxygen-node lookup does exact string equality between the registration name and a doxygen `<name>` node; for any qualified/prefixed registration name that doesn't literally equal doxygen's `<name>` text, the class silently disappears with no error. Surfacing (or hard-failing on) unmatched bindings would catch this class of "missing type" bug at generation time instead of via a manual TODO list ("grabCut is not exposed", "cv.ellipse1 is not generated", etc. in the README).
5. **Split "OpenCV C++ API" from "opencv.js/embind runtime glue" as two explicit, separately-sourced layers** in the code (they already are conceptually — doxygen vs. `_hacks.ts` — but the pipeline mixes them by patching one into the other via string surgery). Making the seam explicit (e.g. a `RuntimePrelude` the generator validates its doxygen-derived output against, rather than post-hoc `.replace()`s) turns most of today's "fix" functions into "validate" functions, which fail loudly instead of silently producing subtly wrong `.d.ts`.

**Net recommendation:** don't reach for TS `namespace` as the fix — the real bug is that the generator computes identifiers from the wrong data (doxygen's stripped leaf name) instead of the one thing guaranteed unique and runtime-accurate (the literal `bindings.cpp` registration string, already parsed and currently discarded), and reconstructs inheritance via string patching instead of reading doxygen's own `basecompoundref`. Fixing those two data-flow issues removes the blacklist, the broken enum-prefix logic, and most of the AST-surgery pass in one move; keep the flat global `cv` shape since that's what OpenCV.js actually is, and use real namespacing only for an optional, additive per-group module export.

---

# typings package
currently doxygen2typescript generates all opencv typings definitions in a tmp folder. I want to create a project with all these definitions so other typescript users can npm install it. Basically they can use opencv.js in their projects and have everything typed using this typings project

What do you recommend ? (don't write code, just answer)

A.

## Key finding first

You've essentially already half-built this. `mirada/src/types/opencv/` in this same repo is doxygen2typescript's output from an earlier run, hand-patched with `_hacks.ts` and wired up via `_types.ts`/`index.ts` into a `CV` type + a global `cv` declaration — then compiled and shipped as part of the published `mirada` npm package. That pattern already works and is the right shape to reuse. But it's stale: diffing it against a fresh `tmp/` run, mirada is missing newer API surface (`core_quaternion`, `DualQuat`, `GraphicalCodeDetector`, `Image2BlobParams`, `imgproc_colormap`, `imgproc_motion`, `imgproc_segmentation`, …) that only exists in current opencv. That staleness is itself the core argument for what you're proposing.

## Recommendation

**Extract the types into their own standalone package, decoupled from `mirada`'s runtime wrapper, and make `mirada` depend on it instead of carrying its own copy.**

1. **New package, types-only, no runtime code.** Something like `opencv-ts-types` (avoid a name that collides with `@types/opencv*` on npm — worth a quick registry check before you commit to one). `mirada` is an opinionated high-level API (format conversion, browser helpers, image loading); this new package's only job is "if you have opencv.js running, here's its shape." Keeping it minimal maximizes who can use it — including non-mirada users who just load `opencv.js` directly.

2. **Ship compiled `.d.ts`, not raw generated `.ts`.** This is already on your own TODO list for a reason: consumers shouldn't compile your generated source as part of their build (different tsconfig strictness, wasted build time, ~1000s of lines of generated code re-typechecked per install). Compile once at publish time, ship declarations only.

3. **Support both consumption styles**, since opencv.js users are split between them:
   - ambient global (`declare global { var cv: CV }`) for `<script>`-tag / `cv.onRuntimeInitialized` usage — this is what mirada already does.
   - module augmentation for `declare module "opencv.js" { ... }` (the actual npm package name OpenCV publishes for the compiled runtime) so `import cv from 'opencv.js'` is typed automatically the moment both packages are installed, no manual wiring. This is much better DX and I'd prioritize it over the global-only approach mirada currently has.

4. **Keep the generated/manual split, exactly like `_hacks.ts` today.** The doxygen output alone isn't fully sound (your own TODO list: missing `.delete()`/`.isDeleted`, `InputArray` unions, generic `Vector<T>`, enum name collisions, etc.). Don't let hand fixes live inside the regenerated folder — mirada's `_hacks.ts` + `_types.ts` + `index.ts` merge pattern is proven, keep it, just move it into the new package.

5. **Version against opencv releases, not `master`.** Since doxygen2typescript filters types by `bindings.cpp` — i.e. the exact set of exposed classes depends on *how* opencv.js was compiled (which modules, `--simd`, etc.) — a types package is inherently tied to one build configuration. Publish from tagged opencv releases (e.g. `4.10.0`), encode that in your package version (major/minor tracks the opencv version), and document which build flags were used. Pick the configuration matching OpenCV's own official prebuilt `opencv.js` (what most consumers actually use) as your canonical target rather than your own local `--build_wasm --simd` build, so the types match what people install from npm/CDN, not just what you personally compile.

6. **Automate the whole regeneration→publish pipeline, on a schedule or on new opencv tags.** This is exactly what the Docker setup we just built gets you 90% of the way to — add a final `tsc`-to-`.d.ts` step and an npm publish step, wrap it in a GitHub Actions workflow, trigger it manually or cron/on-tag. Right now this whole thing is a manual local process that's already visibly drifted out of date once (mirada's copy); automation is what prevents that from recurring.

7. **Gate publish on a compile smoke test.** Before publishing, typecheck a small fixture file that exercises the generated types against a mocked/real `cv` — same idea as your existing `mirada` test suite. Generation bugs (there have been several per your TODO list) should fail CI, not ship silently to npm.

8. **Then fold `mirada` back onto it**: replace `mirada/src/types/opencv/*` with a dependency on the new package, so there's one source of truth instead of two copies that can drift apart again.


p2

forget about fixing mirada for a moment, I want to have a child test typescript project that renders some opencv.js examples calling some functions. The real objective, besides seeing it working, is to check if the types generated by doxygen2typescript in tmp actually work ok and how it the ts user experience with those typings.

Questions:
how can we pack all the geenerated typings in a separate project that ts users can npm install them to have opencv types ? 


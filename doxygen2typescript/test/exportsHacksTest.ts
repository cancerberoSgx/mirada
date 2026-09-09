import test from 'ava'
import { mkdirSync, writeFileSync } from 'fs'
import { exec, rm } from 'shelljs'
import { renderImportHacks } from '../src/doxygen2json/render/exportsHacks'

/**
 * renderImportHacks() produces ~250 lines of hand-authored runtime types (Scalar, Point, Rect, Mat_,
 * Vector<T>, EmscriptenEmbindInstance, ...) that fill the gap between what doxygen documents and what
 * opencv.js's own embind/JS glue actually exposes. Until now nothing ever type-checked that output - it
 * was just a template string, only ever compiled as a side effect of a full opencv.js build. This test
 * runs it through `tsc` against a minimal stand-in for the generated `index.ts`/`_cv.ts` it imports from,
 * so a typo or an invalid forward reference in the hacks fails fast, here, instead of silently landing in
 * someone's generated output.
 */
test('renderImportHacks output type-checks', async t => {
  const dir = 'tmpExportsHacksTest'
  rm('-rf', dir)
  mkdirSync(dir + '/src/opencv', { recursive: true })

  // Stand-in for the real generated per-class files and index.ts: just enough of the doxygen-derived
  // surface that _hacks.ts itself references (`import { X } from '.'` / `from './Mat'`).
  writeFileSync(dir + '/src/opencv/Mat.ts', 'export declare class Mat {}')
  writeFileSync(dir + '/src/opencv/index.ts', `
export * from './Mat'
export declare class Algorithm {}
export declare class RotatedRect {}
export declare class LineTypes {}
export declare class NormTypes {}
`.trim())

  // Stand-in for the generated ../_cv.ts (declares the global `cv` var) - _hacks.ts only side-effect
  // imports it.
  writeFileSync(dir + '/src/_cv.ts', 'export {}')

  writeFileSync(dir + '/src/opencv/_hacks.ts', renderImportHacks())

  writeFileSync(dir + '/tsconfig.json', `
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["esnext", "dom"],
    "outDir": "./dist",
    "rootDir": ".",
    "declaration": true
  },
  "include": ["src"]
}
`.trim())

  const p = exec('npx tsc', { cwd: dir })
  t.true(p.code === 0, p.stdout + p.stderr)
})

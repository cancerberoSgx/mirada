# doxygen2typescript in Docker

Runs the whole pipeline described in the [project README](../README.md) - clone
and compile opencv.js, compile the opencv doxygen XML docs, and generate the
TypeScript declarations - in one container, with one command.

These three files (`Dockerfile`, `docker-compose.yml`, `entrypoint.sh`) are
self-contained: they clone `doxygen2typescript` from GitHub at build time, so
you can copy this `docker/` folder anywhere and it doesn't need a local
checkout of the [mirada](https://github.com/cancerberoSgx/mirada) repo.

## Requirements

Just Docker (and Docker Compose v2, i.e. `docker compose`, not the standalone
`docker-compose` binary - though that also works).

Heads up on resources: compiling opencv.js and its docs is heavy - expect
30-90+ minutes, several CPU cores used, and 10+ GB of disk for the opencv
checkout and build folders.

## Usage

```sh
cd docker
docker compose up --build
```

That's it - it clones opencv, builds opencv.js, builds the docs, runs
doxygen2typescript, and writes the generated `.ts` files to `./output/ts` on
your host (nested one level under the mount, since doxygen2typescript itself
`rm -rf`s its output folder before writing - clearing the mount point directly
isn't possible).

Run it again later (e.g. after a new doxygen2typescript commit) and it will
reuse the cached opencv checkout/build instead of redoing the slow parts:

```sh
docker compose up --build
```

To pass extra doxygen2typescript CLI flags (see `--help` in the
[project README](../README.md)), use `run` instead of `up`:

```sh
docker compose run --rm doxygen2typescript --jsonTypes --debug
```

### Configuration

All of these are optional and can be set as environment variables or in a
`.env` file next to `docker-compose.yml` (see `.env.example`):

| Variable                     | Default                                       | Meaning                                             |
| ----------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `OPENCV_REPO`                 | `https://github.com/opencv/opencv.git`        | opencv git repo to clone                              |
| `OPENCV_REF`                  | `master`                                      | branch/tag/commit to check out                        |
| `DOXYGEN2TYPESCRIPT_REPO`     | `https://github.com/cancerberoSgx/mirada.git` | repo containing the doxygen2typescript tool (build-time) |
| `DOXYGEN2TYPESCRIPT_REF`      | `master`                                      | ref to build the tool from (build-time)                |
| `FORCE_REBUILD_OPENCVJS`      | `0`                                            | set to `1` to recompile opencv.js even if cached       |
| `FORCE_REBUILD_DOCS`          | `0`                                            | set to `1` to rebuild the doxygen XML docs even if cached |
| `TS_OUTPUT_SUBDIR`            | `ts`                                          | subfolder of `/output` (i.e. `./output` on the host) the generated `.ts` files are written to |

`DOXYGEN2TYPESCRIPT_REPO`/`REF` only take effect on `docker compose build`
(or `up --build`), since that's when the tool is cloned and compiled into the
image.

### Without Compose

```sh
docker build -t doxygen2typescript .
docker run --rm \
  -v opencv-cache:/work/opencv \
  -v "$PWD/output:/output" \
  doxygen2typescript
```

### Clearing the cache

```sh
docker compose down -v
```

removes the `opencv-cache` volume, so the next run starts from a fresh
`git clone`.

#!/usr/bin/env bash
# Runs the 3 manual steps from the doxygen2typescript README end to end:
#   1. clone + compile opencv.js
#   2. compile opencv doxygen docs with GENERATE_XML=YES
#   3. run doxygen2typescript
#
# Steps 1 and 2 are skipped on re-runs if their output already exists (so the
# opencv checkout can live in a cached volume across container runs) unless
# FORCE_REBUILD_OPENCVJS / FORCE_REBUILD_DOCS are set to 1.
#
# Any extra arguments passed to this script/container are forwarded verbatim
# to the doxygen2typescript CLI, e.g.:
#   docker compose run --rm doxygen2typescript --jsonTypes --debug

set -euo pipefail

log() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }

# Named volumes (or bind mounts) can end up owned by a different uid than the
# one running this script, which makes git refuse to touch them ("detected
# dubious ownership"). This container has no other repos to protect, so trust
# everything under it.
git config --global --add safe.directory '*'

: "${OPENCV_DIR:=/work/opencv}"
: "${OPENCV_REPO:=https://github.com/opencv/opencv.git}"
: "${OPENCV_REF:=master}"
: "${TS_OUTPUT_DIR:=/output}"
: "${TS_OUTPUT_SUBDIR:=ts}"
: "${DOXYGEN2TYPESCRIPT_BIN:=/opt/doxygen2typescript/bin/doxygen2typescript.js}"
: "${FORCE_REBUILD_OPENCVJS:=0}"
: "${FORCE_REBUILD_DOCS:=0}"

OPENCV_JS_BUILD_DIR="$OPENCV_DIR/build_js"
OPENCV_DOC_BUILD_DIR="$OPENCV_DIR/build"
OPENCV_JS_MARKER="$OPENCV_JS_BUILD_DIR/bin/opencv.js"
OPENCV_DOC_MARKER="$OPENCV_DOC_BUILD_DIR/doc/doxygen/xml/index.xml"

# --- step 0: clone opencv (or reuse cached checkout) ------------------------
if [ -d "$OPENCV_DIR/.git" ]; then
  log "Reusing existing opencv checkout at $OPENCV_DIR"
else
  log "Cloning $OPENCV_REPO ($OPENCV_REF) into $OPENCV_DIR"
  git clone "$OPENCV_REPO" "$OPENCV_DIR"
fi
git -C "$OPENCV_DIR" checkout "$OPENCV_REF"

# --- step 1: compile opencv.js ----------------------------------------------
if [ "$FORCE_REBUILD_OPENCVJS" = "1" ] || [ ! -f "$OPENCV_JS_MARKER" ]; then
  log "Building opencv.js (emcmake build_js.py --build_wasm --simd)"
  ( cd "$OPENCV_DIR" && emcmake python3 platforms/js/build_js.py build_js --build_wasm --simd )
else
  log "opencv.js already built ($OPENCV_JS_MARKER exists), skipping. Set FORCE_REBUILD_OPENCVJS=1 to force."
fi

# --- step 2: compile opencv docs with XML output -----------------------------
if [ "$FORCE_REBUILD_DOCS" = "1" ] || [ ! -f "$OPENCV_DOC_MARKER" ]; then
  log "Enabling GENERATE_XML in doc/Doxyfile.in"
  sed -i -E 's/^([[:space:]]*GENERATE_XML[[:space:]]*=)[[:space:]]*NO/\1 YES/' "$OPENCV_DIR/doc/Doxyfile.in"

  log "Configuring opencv build (cmake -DBUILD_DOCS=ON) and building the doxygen target"
  mkdir -p "$OPENCV_DOC_BUILD_DIR"
  ( cd "$OPENCV_DOC_BUILD_DIR" && cmake -DBUILD_DOCS=ON .. && make -j"$(nproc)" doxygen )
else
  log "Doxygen XML docs already built ($OPENCV_DOC_MARKER exists), skipping. Set FORCE_REBUILD_DOCS=1 to force."
fi

# --- step 3: run doxygen2typescript -----------------------------------------
# Write into a subfolder of the mount rather than the mount point itself:
# doxygen2typescript does `rm -rf tsOutputFolder` before regenerating, and a
# bind/volume mount root can't be removed that way (EBUSY).
TS_OUTPUT_PATH="$TS_OUTPUT_DIR/$TS_OUTPUT_SUBDIR"
log "Generating TypeScript into $TS_OUTPUT_PATH"
mkdir -p "$TS_OUTPUT_DIR"

node "$DOXYGEN2TYPESCRIPT_BIN" \
  --opencvBuildFolder "$OPENCV_JS_BUILD_DIR" \
  --opencvDocBuildFolder "$OPENCV_DOC_BUILD_DIR" \
  --tsOutputFolder "$TS_OUTPUT_PATH" \
  "$@"

log "Done. TypeScript output written to $TS_OUTPUT_PATH"

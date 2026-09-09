# doxygen2typescript build image
#
# Bundles everything needed to, in one container run:
#   1. clone + compile opencv.js (emscripten)
#   2. compile the opencv doxygen docs with XML output enabled
#   3. run doxygen2typescript against both build folders
#
# The doxygen2typescript tool itself is cloned from GitHub at build time (see
# DOXYGEN2TYPESCRIPT_REPO/REF below), so this Dockerfile + docker-compose.yml +
# entrypoint.sh are self-contained and can be copied out and shared on their own -
# nobody needs a local checkout of the mirada repo to use them.
#
# emscripten/emsdk already ships emcc/em++, python3, git, cmake, make and a
# recent Node.js - everything build_js.py and doxygen2typescript need except
# doxygen itself.
FROM emscripten/emsdk:latest

ARG DOXYGEN2TYPESCRIPT_REPO=https://github.com/cancerberoSgx/mirada.git
ARG DOXYGEN2TYPESCRIPT_REF=master

RUN apt-get update \
  && apt-get install -y --no-install-recommends doxygen \
  && rm -rf /var/lib/apt/lists/*

# Build doxygen2typescript from source into /opt/doxygen2typescript
RUN git clone --branch "${DOXYGEN2TYPESCRIPT_REF}" "${DOXYGEN2TYPESCRIPT_REPO}" /opt/mirada \
  && ln -s /opt/mirada/doxygen2typescript /opt/doxygen2typescript \
  && cd /opt/doxygen2typescript \
  && npm install \
  && npm run build

ENV DOXYGEN2TYPESCRIPT_BIN=/opt/doxygen2typescript/bin/doxygen2typescript.js
ENV OPENCV_DIR=/work/opencv
ENV OPENCV_REPO=https://github.com/opencv/opencv.git
ENV OPENCV_REF=master
ENV TS_OUTPUT_DIR=/output
ENV TS_OUTPUT_SUBDIR=ts
ENV FORCE_REBUILD_OPENCVJS=0
ENV FORCE_REBUILD_DOCS=0

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /work
VOLUME ["/work/opencv", "/output"]

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

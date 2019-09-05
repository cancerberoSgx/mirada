# https://github.com/onnx/models/tree/master/vision/style_transfer/fast_neural_style

FROM alpine:latest

ENV MAIN_PKGS=" tini curl ca-certificates python3 libstdc++" \
  BUILD_PKGS="build-base linux-headers python3-dev py-setuptools git cmake" \
  CONF_DIR="~/.ipython/profile_default/startup"

RUN set -ex; \
  apk update; \
  apk upgrade; \
  echo http://dl-cdn.alpinelinux.org/alpine/edge/main | tee /etc/apk/repositories; \
  echo http://dl-cdn.alpinelinux.org/alpine/edge/testing | tee -a /etc/apk/repositories; \
  echo http://dl-cdn.alpinelinux.org/alpine/edge/community | tee -a /etc/apk/repositories; \
  apk add --no-cache ${MAIN_PKGS}; \
  python3 -m ensurepip; \
  rm -r /usr/lib/python*/ensurepip; \
  pip3 --no-cache-dir install --upgrade pip setuptools wheel; \
  apk add --no-cache --virtual=.build-deps ${BUILD_PKGS}; \
  pip install numpy && pip install pyyaml

## Install PyTorch
  && git clone --recursive https://github.com/pytorch/pytorch \
  && pytorch && python setup.py install && cd .. \
  
## Install Torch Vision
  && git clone --recursive https://github.com/pytorch/vision \
  && cd vision && python setup.py install && cd .. \

## Install scipy
  && git clone --recursive https://github.com/scipy/scipy.git \
  && cd scipy && python setup.py install && cd .. \

## Cleaning
  && rm -rf /pytorch pytorch scipy \
  && rm -rf /root/.cache \
  && rm -rf /var/cache/apk/* \
  && apk del .build-deps \
  && find /usr/lib/python3.6 -name __pycache__ | xargs rm -r \
  && rm -rf /root/.[acpw]*

# docker build platforms/js -t opencv.js
# docker run --rm --workdir /code -v "$PWD":/code opencv.js  python ./platforms/js/build_js.py build_wasm --build_wasm --build_doc

FROM trzeci/emscripten:latest

RUN apt-get update -y
RUN apt-get install -y doxygen
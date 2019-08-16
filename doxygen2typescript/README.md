# doxygen2typescript

Generates TypeScript type declarations from doxygen xml output

Right now just sme painful tests and and unsuccessful attempts

## Motivation

[mirada](https://www.npmjs.com/package/mirada) - opencv.js based TypeScript project for Node.js and Browser.

## Hacks to opencv

Right now I only need to expose Module.FS (emscripten filesystem API) - a tiny change in JS module - PR: https://github.com/opencv/opencv/pull/15319

## Building opencv doxygen

```
cd opencv
sed -i -e "s/GENERATE_XML *= NO/GENERATE_XML=YES/" $PWD/doc/Doxyfile.in
rm -rf build 
docker run --rm --workdir /code -v "$PWD":/code opencv.js python ./platforms/js/build_js.py build --build_doc
```

where Docker file is:

```
FROM trzeci/emscripten:latest
RUN apt-get update -y
RUN apt-get install -y doxygen
```
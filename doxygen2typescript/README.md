# doxygen2typescript

Generates TypeScript type declarations from doxygen xml output, particularly to genereate opencv.js types.

## Motivation

[mirada](https://www.npmjs.com/package/mirada) - opencv.js based TypeScript project for Node.js and Browser.

## Status

At the beginning I tried to bild a generic doxygen xml output to TypeScript translator. It's doable and currently it will generate some useful output from any generic doxygen xml.

Nevertheless I'm eager to use opencv with typescript instead of building a generic tool so right now the the tool is not generic and the output it generates stills needs some manual editing in order to be used., although very little and good quality both in docs, and typings. 

It's currently coupled with opencv because it filtering the generated classes/types/functions by parsing the file bindings.cpp (generated in opencv.js build).  I did this just for speed up the build since if not, building all doxygen objects takes lots of time and often gives out of memory errors (node.js XML parser I'm currently using is not the best...)

## How to use it

First you need to build opencv.js docs with GENERATE_XML=yes. assets/Doxyfile is a working config.

Then this code should generate the TS from given opencv.js biuld folder:

```ts
import { opencv2ts } from '../src'
opencv2ts({
  opencvBuildFolder: '/home/sg/git/opencv/build_js',
  tsOutputFolder: 'tmp'
})
```

## Notes for development 

```
cv.* member names are mapped . It is defined at least in bindings.cpp
for example cv::AgastFeatureDetector::AGAST_7_12s is exposed as AgastFeatureDetector_AGAST_7_12s - the info in bindings.cpp is:
    constant("AgastFeatureDetector_AGAST_7_12s", static_cast<long>(cv::AgastFeatureDetector::AGAST_7_12s));
  "AgastFeatureDetector_AGAST_7_12s",
```

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

## TODO (priority)

- [ ] class inheritancegraph - Mat_ extends Mat_
- [ ] index.ts that expose the real objects with correct types. (1)
- [x] multiple files input and output
- [x] refs
- [ ] move json2dts to own repo
- [ ] cli (5)
- [ ] groups - innerclass (4)


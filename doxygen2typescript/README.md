# doxygen2typescript

Generates TypeScript type declarations from doxygen xml output, particularly to generate opencv.js types.

## Motivation

[mirada](https://www.npmjs.com/package/mirada) - opencv.js based TypeScript project for Node.js and Browser.

## Status

At the beginning I tried to build a generic doxygen xml output to TypeScript translator. It's doable and currently it will generate some useful output from any generic doxygen xml.

Nevertheless I'm eager to use opencv with typescript instead of building a generic tool so right now the the tool is not generic and the output it generates stills needs some manual editing in order to be used., although very little and good quality both in docs, and typings. 

It's currently coupled with opencv.js build since I use bindings.cpp file to filter only the objects present in opencv.js build. I'm doing this mostly because if not it's very slow and often fail because out of memory. 

Nevertheless there is an alternative version of the tool that only consumes xml/index.ml and generates all the objects (doxygen2ts.ts)

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

## TODO - Status - Progress - Roadmap
- [ ] don't expose all class members but only those declared in bindings.cpp
- [ ] generate .d.ts instead of .ts
- [ ] remove files not used like Logger, DynamicBitset, Node AutoBuffer, etc
- [ ] detaileddescription formula - render to svg and embed ? or to a more readable format ? 
- [ ] support invalid type names like char * using a name map. 
- [ ] document std::Vector (http://www.cplusplus.com/reference/vector/vector/)
- [ ] class inheritancegraph - Mat_ extends Mat_
  - [x] currently examples fail with " Property 'delete' does not exist on type 'Mat'." probably because of missing parent methods
- [ ] class compounds enums names prefix broken. (ex AgastFeatureDetector.AGAST_7_12s becomes AgastFeatureDetector_AGAST_7_12s)
- [ ] rename src/doxygen2json to 2ts 
- [ ] verify that type alias (enums) are exposed 
- [ ] build the whole workflow: git clone, python --build-docs, node test so we verify the typings generation works mechanically
- [ ] move json2dts to own repo
- [ ] cli (5)
- [ ] groups - innerclass (4)
- [ ] Mat.setTo(scalar)
- [x] build more examples and check all types are generated
  - [x] grabCut is not exposed
- [x] method cv.ellipse1 is not generated -   cv.ellipse1(dst, rotatedRect, ellipseColor, 1, cv.LINE_8)
- [x] mirada tyoes: cp.assignTo is not a functionr
- [x] - mat.at() method not defined - only mat.ucharAt  / mat.charAt  
- [x] types: detectMultiScale - object should be vector<rect> and not Rect - not support generics - we should at least support stc::vector<>
- [x] cv.CLAHE typings 
- [x] mat.isDeleted and m.isAliasOf are not in the types.  clone  isDeleted  deleteLater 
- [x] aMat.row(r).setTo(new cv.Scalar(r))  should work- this could work in hacks.ts export type  InputArray = Mat|Scalar 
- [x] m.isSubmatrix is not supported in js
- [x] index.ts that expose the real objects with correct types. (1)
- [x]   Vector<T> extends EmscriptenEmbindInstance       export declare class Algorithm extends EmscriptenEmbindInstance 
- [x] markdown - don't render links inside code snippets.
- [x] add missing types automatically using ts api - compile and check errors about missing imports 
- [x] fix types: Mat.zeros(src.rows, src.cols, cv.CV_8UC3): any should return Mat
- [x] issue wth optinoal params  (arg4: any, arg5?: typename, list: any)
- [x] integrates with mirada
- [x] multiple files input and output
- [x] refs
 

## Hacks to opencv

None :) 

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

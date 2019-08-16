OpenCv JavaScript/TypeScript API for Node.js and Browser on top of OpenCv.js, adding support for npm, TypeScript and utilities related to asynchronicity, DOM, etc.

## Contents

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [Reference API](#reference-api)
- [Command line](#command-line)
- [Initial design notes](#initial-design-notes)

<!-- tocstop -->

## Install

npm i mirada

## Usage

TODO

## Reference API

See [Reference API docs](api). Important types:

 * [opencvTypes](api/interfaces/_types_opencv_.cv.md)
 * [File](mirada/api/classes/_file_.file.md)

## Command line

See [mirada-cli project page](../mirada-cli).

## TODO

- [ ] don't waste more time manually porting docs. build the doxygen2typescript thing

## Initial design notes

Initially a proposal to opencv.js team to add the npm experience:

 * npm install opencv.js
 * the same user files should work both in browser and node.js
 * TypeScript typings

Later: 
 * CLI
 * scripts to generate wasm build  with different configs. 
 * custom wasm build - more optimized - .wasm instead of .s
 * implement style transfer as https://github.com/opencv/opencv/pull/15240/files


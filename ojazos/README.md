High level opencv API for Node.js and Browser. Based on OpenCv.js, supporting npm and same code running in Node.js and Browser.

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [Reference API](#reference-api)
- [Command line](#command-line)
- [Initial design notes](#initial-design-notes)

<!-- tocstop -->

## Install

npm i ../docs/mirada

## Usage

TODO

## Reference API

TODO

## Command line

TODO: other project provides a CLI with semantic semantics to this API



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


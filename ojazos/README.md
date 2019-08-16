High level opencv API for Node.js and Browser. Based on OpenCv.js, supporting npm and same code running in Node.js and Browser. 


<!-- toc -->

- [Playground & demos](#playground--demos)
- [Summary](#summary)
- [Status](#status)
  * [WebAssembly build](#webassembly-build)
- [Install](#install)
- [Command line](#command-line)
- [JavaScript API](#javascript-api)
  * [Node.js](#nodejs)
  * [Browser](#browser)
    + [Browser setup](#browser-setup)
    + [WASM file in different location](#wasm-file-in-different-location)
    + [Web Worker](#web-worker)
  * [`run()`: command script/template syntax](#run-command-scripttemplate-syntax)
    + [Commands Sequence](#commands-sequence)
    + [JavaScript templates](#javascript-templates)
    + [Commands pre processors](#commands-pre-processors)
- [Options](#options)
- [Reference API](#reference-api)
- [Why?](#why)
- [TODO / Road map](#todo--road-map)

<!-- tocstop -->

## Install

npm i ojos

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


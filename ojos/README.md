## Contents

<!-- toc -->

- [What / Why ?](#what--why-)
- [install](#install)
- [Usage](#usage)
- [Reference API](#reference-api)
- [TODO](#todo)
  * [Operations](#operations)
    + [chain utility (WIP)](#chain-utility-wip)

<!-- tocstop -->

## What / Why ?

While mirada supports TypeScript type declarations for opencv.s, support and test for both browser and node.js and basic utilities for files, image formats, browser, etc, this project hosts features and APIs purely mine, built on top of it. 

I want to keep [Mirada](https://github.com/cancerberoSgx/mirada) KISS - with no much more tha TypeScript typings and basic utilities for node.js. And since I observe I'm already polluting it with "extra" features I will start working on those here. 
 
## install

npm install ojos

## Usage

TODO

## Reference API

 * [HTML Reference API](https://github.com/cancerberoSgx/demos/tree/master/mirada-opencv-api-md). 
 * [Markdown Reference API ](https://cancerberosgx.github.io/demos/mirada-opencv-api-html/). 

## TODO
- [ ] more codecs 
- [x] edge detectors supporting multiple channels ? 
- svg experiments
- [ ] high level Widgets (Point, Color, pointList, etc)
      - [ ] fabric-like support for editor GUI  on top ? 
      - GUIs for real use cases like grabcut
- [ ] - mat.at() method not defined - only mat.ucharAt  / mat.charAt fix mirada types
- [ ] integrate mirada-cli generateCommands script here
  - [ ] use operations interfaces
- [ ] decide what we do with commands - remove it ? 
- [x] warpPerspective operations
- [x] blur operations

### ideas for the demo

- [ ] playground: declare animations - when user trigger an action the perspective transformation changes over time.
  - [ ] for this we could use easing (flor/accursed)
- [ ] record
- [ ] load video or image from file or url
- on mouse over effects - affecting only cursor close region
- for operations requiring a second mat, we could operate with the previous frame
  - [ ] like convolution in time - 
  - smooth movements - less impact of changes in lights - get the mean between this frame and previous ? (use addWeight)
- add face detection even without framework.
- add shift-cam-ting object tracking even without framework.

### Operations

 * represent each opencv commands / functions / methods  / with an operation which define:
    * Options (arguments) and the metadata of this options
    * name description
    * based on Mat not on File
    * try 1-1 with opencv API - only build high level API on top of 1-1 API

 * operation composition
   * can we done it more interesting than just sequences?
   * automatic delete()
   * declarative representation of operations (json?)
     * template support (see mirada-cli)
   * execution of sequence / composited operations (output Mat become input fo next operations.)
   

#### chain utility (WIP)

- [ ] utility wrapper around Mat, similar to File but focused on method chaining and automatic Mat delete(). Example. File.fromFile('i.png').chain.roi(2,3,4,5).convertTo(cv.CV_U8).threshold(...)

 * chain: returns a new Chain which internally has a clone to source File.mat . each of chained methods will apply
each method call after `chain` will automatically call delete() and replace this._mat with the result of the operation. All Mat and cv functions should be supported

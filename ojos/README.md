## Contents

<!-- toc -->

- [Demos](#demos)
- [Summary](#summary)
- [install](#install)
- [Usage](#usage)
- [Reference API](#reference-api)
- [TODO / ROADMAP](#todo--roadmap)
  * [ideas for the demo](#ideas-for-the-demo)
- [Ideas / Motivation](#ideas--motivation)
  * [What / Why ?](#what--why-)
  * [Operations](#operations)
    + [Operation design](#operation-design)
    + [Operation implementation details:](#operation-implementation-details)
- [chain utility (WIP)](#chain-utility-wip)

<!-- tocstop -->

## Demos

 * [Video filter demo](https://cancerberosgx.github.io/demos/ojos-demo/videoFilterDemo.html). 
   * Filter camera output with opencv operations real time. 
   * Apply / configure multiple operations at the same time and observe how frames per second and memory consumption is affected. 
   * Visually compose operation sequences to archive custom filters, animations.
   * observe execution on mouse-move over images or video

## Summary

 * JavaScript library on top of [OpenCV.js]()
 * browser and node.js support (same implementation and API)
 * TypeScript OpenCV.js types
 * built on top of [Mirada](https://github.com/cancerberoSgx/mirada)
 * Easy to use / intelligent / set of opencv operations with formal contracts regarding input/output Mat that can be represented declaratively as data

See [Ideas / Motivation]() section below.
 
## install

```
npm install mirada ojos
```

## Usage

TODO - for now see the [tests](https://github.com/cancerberoSgx/mirada/tree/master/ojos/test)

TODO

## Reference API

 * [HTML Reference API](https://github.com/cancerberoSgx/demos/tree/master/mirada-opencv-api-md). 
 * [Markdown Reference API ](https://cancerberosgx.github.io/demos/mirada-opencv-api-html/). 

## TODO / ROADMAP
- [ ] more codecs 
- [ ] Operation Scripts
  - [ ] being able to declare operation sequences with data
  - [ ] support for parameters/templates
  - [ ] animations
    - [ ] easing expressions against operation options.
      - [ ] animations over time
      - [ ] animations over color frequencies ?  
- svg experiments
- [ ] high level Widgets (Point, Color, pointList, etc)
      - [ ] fabric-like support for editor GUI  on top ? 
      - GUIs for real use cases like grabcut
- [ ] integrate mirada-cli generateCommands script here
  - [ ] use operations interfaces
- [ ] travis
- [ ] an utility to build "time-scan" video effects like in https://hackaday.io/project/10581/logs ? 
- [ ] decide what we do with commands - remove it ? 
- [ ] warpPolar
- [ ] resize, rotate
- [ ] utilities for gradients
- [ ] cv.cvtColor
- [x] warpAffine
- [x] inRange
- [x] addWeighted
- [x] edge detectors supporting multiple channels ? 
- [x] warpPerspective operations
- [x] blur operations

### ideas for the demo

- [ ] be able to repeat operations.
- [ ] support images 
- [ ] examples with screenshots
- [ ] support loading videos
- [ ] time-effects like https://hackaday.io/project/10581-free-beer-selfie
- [ ] declare animations - when user trigger an action the perspective transformation changes over time.
  - [ ] use easing (flor/accursed projects) against properties.
   * assume users are responsible of triggering them manually - by name
- [ ] record
- [ ] load video or image from file or url
- on mouse over effects - affecting only cursor close region
- for operations requiring a second mat, we could operate with the previous frame
  - [ ] like convolution in time - 
  - smooth movements - less impact of changes in lights - get the mean between this frame and previous ? (use addWeight)
- add face detection even without framework.
- add shift-cam-ting object tracking even without framework.

## Ideas / Motivation


### What / Why ?

While mirada supports TypeScript type declarations for opencv.s, support and test for both browser and node.js and basic utilities for files, image formats, browser, etc, this project hosts features and APIs purely mine, built on top of it. 

I want to keep [Mirada](https://github.com/cancerberoSgx/mirada) KISS - with no much more tha TypeScript typings and basic utilities for node.js. And since I observe I'm already polluting it with "extra" features I will start working on those here. 


### Operations

main idea: 

 * formalize opencv operations declaratively not only signatures and descriptions but also,  Mat contracts (required formats / initialization / effects / in-place)
 * Operation implementation should be able to validate options without executing :
    * Nicely throwing errors (not like currently opencv.js) 
    * optionally modifying the input automatically ( calling create() cv.cvtColor()) automatically before calling)

Having this contracts formally declared and implemented allows:

  * consume thie metadata by user apps on any medium/language 
  * operations being represented declaratively allows to build "scripting" languages on top of it to author "operation sequences / composition" that can be parametrized / templates
     * this "scripts" should be platform agnostic and could be reused on c++/python/js as long as they implement the operations
     * an algorithm expressed declaratively can be consumed / rendered interactively to other user audiences without programming backgounrd. 
  this metadata to build concrete tools like CLI or services that: 


#### Operation design

 * represent opencv commands / functions / methods  / with interface declarations and implementations:
    * options/definition must be fully represented by an interface
    * options must be serializable, with the exception of src/dst Mat. 
       * (although we can serialize Mat with mirada jsonStringifyWithMat() methods)
         * we need Mat serialization for kernels since they are part of the semantic
    * name, description, property signatures
    * based on Mat - 
       * no File/url/resources semantics - since that needs to be provided by the user.
    * SYNCHRONOUS ! - they should call opencv directly (which is sync) - no fetch or File IO - all required data must be provided in options by users
    * First represent pure opencv API directly
       * then if building "artificial" high level features - those dhould use the "low-level" operations an they must explicitly declare that are "high level" - not opencv API
    * Mat type contracts. Formally declare :
      * src Mat require special mat type/depth/channel-count
       * dst Mat needs to be the same type and size of src 
       * dst Mat will be automatically create() or hsould users provide an initialized Mat
       * dst/src Mat type/size will be modified ?

#### Operation implementation details:
  * operations are able to validate an options object without execution
  * must delete all the resources they created
  * (open question): should operations be able to prevent errors by automatically initializing / converting / defaulting input options when invalid automatically? I would like so but it could play against performance... perhaps only optionally?
  * ideally implementations, besides validate() should also  provide fixOptions() API that modifies given options if invalid and possible.
  * IMO: all operations, optionally, should support inplace Mat access - if opencv don't allow it then they should clone89 convert given mats and then re-assign back the result.






## chain utility (WIP)

- [ ] utility wrapper around Mat, similar to File but focused on method chaining and automatic Mat delete(). Example. File.fromFile('i.png').chain.roi(2,3,4,5).convertTo(cv.CV_U8).threshold(...)

 * chain: returns a new Chain which internally has a clone to source File.mat . each of chained methods will apply
each method call after `chain` will automatically call delete() and replace this._mat with the result of the operation. All Mat and cv functions should be supported

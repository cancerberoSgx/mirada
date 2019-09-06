While mirada supports TypeScript type declarations for opencv.s, support and test for both browser and node.js and basic utilities for files, image formats, browser, etc, this project hosts features and APIs purely mine, built on top of it. 

I want to keep [Mirada](https://github.com/cancerberoSgx/mirada) KISS - with no much more tha TypeScript typings and basic utilities for node.js. And since I observe I'm already polluting it with "extra" features I will start working on those here. 

Also I'm kind of leatning both the topic of CV and the library's API and I don't want to pollute Mirada project with OT tests and bad/incorrect/non-optimal code there. 

## install

npm install ojos

## Usage

YBD

## TODO
- [ ] warpPerspective
- [ ] blur https://docs.opencv.org/3.4/dc/dd3/tutorial_gausian_median_blur_bilateral_filter.html
- [ ] ingegrate mirada-cli generateCommands script here
- [ ] more codecs 
  - svg experiments
- [ ] high level Widgets (Point, Color)
      - [ ] fabric-like support for editor GUI  on top ? 
      - GUIs for real use cases like grabcut
- [ ] - mat.at() method not defined - only mat.ucharAt  / mat.charAt fix mirada types

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
   
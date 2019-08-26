Using OpenCV.js In Node.js{#tutorial_js_node}
===============================

In this tutorial, you will learn how to use `open.js` in a [Node.js](). Although the library is designed for run in the browser, using [emscripten Module API](https://emscripten.org/docs/api_reference/module.html) we can also support Node.js. Hopefully, after reading the tutorial you will some insights regarding emscripten modules, library loading internals, and filesystem support. 

### Minimal example

@code{.js}
// Define a global variable 'Module' with a method 'onRuntimeInitialized':
Module = {
  onRuntimeInitialized() {
    // this is our application:
    console.log(cv.getBuildInformation())
  }
}
// Load 'opencv.js' assigning the value to the global variable 'cv'
cv = require('./opencv.js')
@endcode

Make sure the file opencv.js is at the same folder and execute: 

@code{.bash}
node example1.js
@endcode

It should print OpenCV build information to stdout. 

#### What just happened?

 * **In the first statement**: By defining a global variable named 'Module', emscripten will call `Module.onRuntimeInitialized()` when the library is ready to use. Our program is in that method and uses the global variable `cv` just like in the browser.
 
 * **cv = require('./opencv.js')**: In this statement, we require the file `opencv.js` and assign the return value to the global variable `cv`. This will load the library and as said previously emscripten will call `Module.onRuntimeInitialized()` when its ready.

 * See [emscripten Module API](https://emscripten.org/docs/api_reference/module.html) for more details.

### Working with Images

OpenCV.js doesn't support image formats so we can't load png or jpeg images directly. In the browser it uses HTML DOM (like HTMLCanvasElement and HTMLImageElement to decode images. In node.js we will need to use another library for this. 

In this example we use [jimp](https://www.npmjs.com/package/jimp), which supports common image formats and is pretty easy to use.

#### Install jimp

Execute the following commands to create a new node.js package in current folder and install [jimp](https://www.npmjs.com/package/jimp):

@code{.bash}
npm init -y
npm install jimp
@endcode

#### The example

@code{.js}
const Jimp = require('jimp')

async function onRuntimeInitialized(){

  // load local image file with jimp. It supports jpg, png, bmp, tiff and gif:
  var jimpSrc = await Jimp.read('test/assets/lenna.jpg')

  // `jimpImage.bitmap` property has the decoded ImageData that we can use to create a cv:Mat
  var src = cv.matFromImageData(jimpSrc.bitmap)

  // following lines is copy&paste of opencv.js dilate tutorial:
  let dst = new cv.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

  // Now that we are finish, we want to write `dst` to a png file. For that we create a new 
  // Jimp image, wrapping dst.data in a Buffer and calling write() specifying the output 
  // file which format is inferred from its name:
  new Jimp({
    width: dst.cols,
    height: dst.rows,
    data: Buffer.from(dst.data)
  })
  .write('output.png')

  src.delete();  dst.delete()
}

// Finally, load the library as before. The function onRuntimeInitialized contains our program.
Module = {
  onRuntimeInitialized
}
cv = require('../static/opencv.js')
@code{.js}

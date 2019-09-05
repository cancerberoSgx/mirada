// @ts-nocheck

async function minimalTutorial() {
// By defining a global variable named 'Module' with a method 'onRuntimeInitialized'
// we will be notified when the library is ready to use:
Module = {
  onRuntimeInitialized() {
    // we are ready to use the library which should be available in the global 'cv'
    console.log(cv.getBuildInformation())
  }
}
// Load 'opencv.js' and assign the value to the global variable 'cv' to trigger the load
cv = require('./opencv.js')
}



async function minimalTutorial3() {
function load(onRuntimeInitialized) {
  // By defining a global variable named 'Module' with a method 'onRuntimeInitialized'
  // we will be notified when the library is ready to use:
  Module = {
    onRuntimeInitialized
  }
  // Load 'opencv.js' and assign the exported value to the global variable 'cv':
  cv = require('../static/opencv.js')
}
// let's try to use it
await load(() => {
  console.log(cv.getBuildInformation())
})
}



async function minimalTutorial2() {
  function load() {
    return new Promise(resolve => {
      // By defining a global variable 'Module' before loading opencv.js, we can 
      // be notified by emscripten when the library is ready to be used
      // See https://emscripten.org/docs/api_reference/module.html
      Module = {
        onRuntimeInitialized: resolve
      }
      // Now, we load 'opencv.js' file (assuming is in the current folder).
      // Notice that we are creating the global variable 'cv' 
      cv = require('../static/opencv.js')
    })
  }

  // let's try to use it
  await load()
  console.log(cv.getBuildInformation())
}


async function localFSTutorial() {

  const defaultOptions = {
    opencvJs: 'opencv.js',
    fsRoot: '/work',
    localFolder: process.cwd()
  }

  function load(options = defaultOptions) {
    // Prepare the options
    Object.assign({}, defaultOptions, options)
    return new Promise(resolve => {
      // When the library loads, we need to be notified when the module is ready. 
      // For this we create a global Module variable with with some callback methods. 
      // See https://emscripten.org/docs/api_reference/module.html
      Module = {
        preRun: () => {
          // This will be called when the library is ready, just before it runs.
          // We want to configure emscripten filesystem so it uses our local filesystem
          // instead of emulating it in memory as it happens in the browser. 
          // Basically, using emscripten filesystem API, we mount a local folder (options.localFolder)
          // in emscripten filesystem at given path (options.fsRoot). By default it will mount our 
          // current directory (local filesystem) in folder '/work' (emscripten filesystem)
          Module.FS.mkdir(options.root)
          Module.FS.mount(Module.FS.filesystems.NODEFS,
            { root: options.cwd }, options.root)
        },
        onRuntimeInitialized: resolve
      }
      // finally we require opencv.js which will trigger the whole process
      cv = require(o.opencvJs)
    })
  }

}


async function workingWithImages() {
Module = {
  onRuntimeInitialized
}
cv = require('../static/opencv.js')

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

  // Now that we are finish, we want to write `dst` to a png file. For that we create a new Jimp image,
  // wrapping dst.data in a Buffer and calling write() specifying the output file which format is inferred from its name:
  new Jimp({
    width: dst.cols,
    height: dst.rows,
    data: Buffer.from(dst.data)
  })
  .write('output.png')

  // Finally dispose opencv images:
  src.delete()
  dst.delete()
}

}


workingWithImages()

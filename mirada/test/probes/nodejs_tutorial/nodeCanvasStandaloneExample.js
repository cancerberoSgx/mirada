// @ts-nocheck

const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require("jsdom");
const { writeFileSync, mkdirSync, existsSync} = require('fs');
const {rm, ls} = require('shelljs')
const {deepEqual} = require('assert')

// This is our program. This time we use JavaScript async / await and promises to handle asynchronicity.
async function test1(){
  await loadOpenCV();

  // loadImage() which is provided by node-canvas package, will read an image file from given path, and 
  // return an object compatible with HTMLImageElement so we can use cv.imread()
  const image = await loadImage('test/assets/lenna.jpg');
  const src = cv.imread(image);

  const dst = new cv.Mat();
  let M = cv.Mat.ones(5, 5, cv.CV_8U);
  let anchor = new cv.Point(-1, -1);
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

  const canvas = createCanvas(image.width, image.height);
  cv.imshow(canvas, dst);
  writeFileSync('tmp1.jpg', canvas.toBuffer('image/jpeg'));
  src.delete();
  dst.delete();
}

/**
 * Loads opencv.js. 
 *  
 * Installs HTML Canvas emulation to support `cv.imread()` and `cv.imshow`
 * 
 * Mounts given local folder `localRootDir` in emscripten filesystem folder `rootDir`. By default it will mount the local current directory in emscripten `/work` directory. This means that `/work/foo.txt` will be resolved to the local file `./foo.txt`
 * @param {string} rootDir The directory in emscripten filesystem in which the local filesystem will be mount.
 * @param {string} localRootDir The local directory to mount in emscripten filesystem.
 * @returns {Promise} resolved when the library is ready to use.
 */
function loadOpenCV(rootDir = '/work', localRootDir = process.cwd()) {
  if(global.Module && global.Module.onRuntimeInitialized && global.cv && global.cv.imread) {
    return Promise.resolve()
  }
  return new Promise(resolve => {
    installDOM()
    global.Module = {
      onRuntimeInitialized() {
        // We change emscripten current work directory to 'rootDir' so relative paths are resolved 
        // relative to the current local folder, as expected
        cv.FS.chdir(rootDir)
        resolve()
      }, 
      print(...args){
        console.log(...args);        
      },
      printError(...args){
        console.error(...args);        
      },
      preRun() {
        // preRun() is another callback like onRuntimeInitialized() but is called just before the 
        // library code runs. Here we mount a local folder in emscripten filesystem and we want to 
        // do this before the library is executed so the filesystem is accessible from the start
        const FS = global.Module.FS 
        // create rootDir if it doesn't exists
        if(!FS.analyzePath(rootDir).exists) {
          FS.mkdir(rootDir)
        }
        // create localRootFolder if it doesn't exists
        if(!existsSync(localRootDir)) {
          mkdirSync(localRootDir, { recursive: true});
        }
        // FS.mount() is similar to Linux/POSIX mount operation. It basically mounts an external 
        // filesystem with given format, in given current filesystem directory. 
        FS.mount(FS.filesystems.NODEFS, { root: localRootDir}, rootDir);     
      },
      onAbort(e){
        console.error('onAbort Error has occurred in WebAssembly Module', e, e.stack)
        console.trace()       
      }
    };
    global.cv = require('../../../static/opencv.js')
  });
}

function installDOM(){
  const dom = new JSDOM();
  global.document = dom.window.document;
  global.Image = Image;
  global.HTMLCanvasElement = Canvas;
  global.ImageData = ImageData;
  global.HTMLImageElement = Image;
}


// function loadDataFile(filePath) {
//   const name = basename(filePath)
//   // Heads up! we need to verify that the files don't already exists if not it throws!
//   if (!cv.FS.readdir('/').includes(name)) {
//     cv.FS.createDataFile('/', name, new Uint8ClampedArray(readFileSync(filePath)), true, false, false)
//   }
//   return name
// }

async function test2(){

  await loadOpenCV();
  const image = await loadImage('test/assets/lenna.jpg');
  const src = cv.imread(image);
  let gray = new cv.Mat()
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0)
  let faces = new cv.RectVector()
  let eyes = new cv.RectVector()
  let faceCascade = new cv.CascadeClassifier()
  let eyeCascade = new cv.CascadeClassifier()
  
  // load pre-trained classifier files. Notice that we use relative paths 
  faceCascade.load('./test/assets/haarcascade_frontalface_default.xml')
  eyeCascade.load('./test/assets/haarcascade_eye.xml')

  // detect faces
  let mSize = new cv.Size(0, 0)
  faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, mSize, mSize)
  for (let i = 0; i < faces.size(); ++i) {
    let roiGray = gray.roi(faces.get(i))
    let roiSrc = src.roi(faces.get(i))
    let point1 = new cv.Point(faces.get(i).x, faces.get(i).y)
    let point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height)
    cv.rectangle(src, point1, point2, [255, 0, 0, 255])
    // detect eyes in face ROI
    eyeCascade.detectMultiScale(roiGray, eyes)
    for (let j = 0; j < eyes.size(); ++j) {
      let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y)
      let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width, eyes.get(j).y + eyes.get(j).height)
      cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255])
    }
    roiGray.delete()
    roiSrc.delete()
  }

  const canvas = createCanvas(image.width, image.height);
  cv.imshow(canvas, src);
  writeFileSync('tmp2.jpg', canvas.toBuffer('image/jpeg'));

  src.delete(); gray.delete(); faceCascade.delete(); eyeCascade.delete(); faces.delete(); eyes.delete()
}

(async ()=>{
  rm('-rf', 'tmp*.jpg')
  deepEqual(ls('tmp*.jpg').map(s=>s.toString()).sort(), [])
  await test1();
  await test2()
  deepEqual(ls('tmp*.jpg').map(s=>s.toString()).sort(), ['tmp1.jpg', 'tmp2.jpg'])
})()

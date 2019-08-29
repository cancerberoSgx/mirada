import * as Mirada from 'mirada'
import * as cv from 'mirada'

(async () => {
  const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
  var image: Mirada.Mat = cv.imread(canvas)

  // const f = await Mirada.loadDataFile('pointilism.onnx', 'foo.txt')

// await new Promise(r=>setTimeout(r, 4000))
// debugger
// console.log(cv.FS.readdir('/'));
// await new Promise(r=>setTimeout(r, 4000))

    // const r = await fetch(url)
    // await cv.FS.createDataFile('/', name, new Uint8ClampedArray(await r.arrayBuffer()), true, true, true)

  // if (!cv.FS.readdir('/').includes(name)) {
    const r = await fetch('pointilism.onnx')
    const f = new Uint8ClampedArray(await r.arrayBuffer())
    // await cv.FS.createDataFile('/', name, , true, true, true)
  // }


//@ts-ignore
  const model = cv.readNetFromONNX(f)
  const size = new cv.Size(512, 512)
  // Whether to swap Red and Blue channels since OpenCV loads images in BGR
  let swapRB = true;
  // rescale the image (image * scale)
  let scale = 1.0;
  const mean = new cv.Scalar(); // mean to subtract (e.g: 103.939, 116.779, 123.68)
  // Set the transformations we want to apply
  model.setInputParams(scale, size, mean, swapRB);
  // Network Forward pass
  let out = new cv.Mat()
  model.generate(image, out);
  cv.imshow(canvas, out)
  image.delete()
  out.delete()
})()

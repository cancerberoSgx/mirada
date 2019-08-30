import * as cv from 'mirada'
import * as Mirada from 'mirada';

(async () => {
  const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
  var image: Mirada.Mat = cv.imread(canvas)

  // This example is currently failing when loading the model pointilism.onnx which I download from onnx.org
  // github repo Probably the problem is related with encoding I guess pixels in uint8 vs uint 16. Tried
  // different ways of loading from file path or buffer, but always fail while other models don't 
  // so I guess is a problem with the content. I leave it here since perhaps somebody can help me fix it

  // this should work as in the other examples but it throws:
  const f = await Mirada.loadDataFile('pointilism.onnx')
  const model = cv.readNetFromONNX(f)  //  <---- throws here

  // this tries to load it as buffer so there0s bo FS involved but also throws similarly

  // const r = await fetch('pointilism.onnx')
  // const f = new Uint8ClampedArray(await r.arrayBuffer())
  // //@ts-ignore
  // const model = cv.readNetFromONNX1(f) 

  // using emscripten FS directly also fails:

  // const r = await fetch('pointilism.onnx')
  // if (!cv.FS.readdir('/').includes('pointilism.onnx')) {
  //  await cv.FS.createDataFile('/', 'pointilism.onnx', new Uint8ClampedArray(await r.arrayBuffer()), true, true, true)
  // }
  // const model = cv.readNetFromONNX('/pointilism.onnx') 

  const size = new cv.Size(512, 512)
  // Whether to swap Red and Blue channels since OpenCV loads images in BGR
  let swapRB = true
  // rescale the image (image * scale)
  let scale = 1.0
  const mean = new cv.Scalar() // mean to subtract (e.g: 103.939, 116.779, 123.68)
  // Set the transformations we want to apply
  model.setInputParams(scale, size, mean, swapRB)
  // Network Forward pass
  let out = new cv.Mat()
  model.generate(image, out)
  cv.imshow(canvas, out)
  image.delete()
  out.delete()
})()

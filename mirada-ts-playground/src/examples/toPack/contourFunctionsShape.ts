import * as Mirada_ from 'mirada'
declare var Mirada: typeof Mirada_

;(async () => {
  const src = await Mirada.fromUrl('coins.png')
  let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3)
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY)
  let contours = new cv.MatVector()
  let hierarchy = new cv.Mat()
  cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)
  let contourID0 = 10
  let contourID1 = 5
  let color0 = new cv.Scalar(255, 0, 0)
  let color1 = new cv.Scalar(0, 0, 255)
  // You can try more different parameters
  let result = cv.matchShapes(contours.get(contourID0), contours.get(contourID1), 1, 0)
  console.log(result)
  // matchShapesOutput.innerHTML = result;
  cv.drawContours(dst, contours, contourID0, color0, 1, cv.LINE_8, hierarchy, 100)
  cv.drawContours(dst, contours, contourID1, color1, 1, cv.LINE_8, hierarchy, 100)
  cv.imshow(document.getElementById('outputCanvas')!, dst)
  src.delete()
  dst.delete()
  contours.delete()
  hierarchy.delete()
})()

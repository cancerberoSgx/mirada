import * as Mirada from 'mirada'
declare var cv: Mirada.CV

(async () => {
  const src = await Mirada.fromUrl('shape.jpg')
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3)
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY)
  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()
  cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)
  const cnt = contours.get(0)
  const rotatedRect = cv.fitEllipse(cnt)
  const contoursColor = new cv.Scalar(255, 255, 255)
  const ellipseColor = new cv.Scalar(255, 0, 0)
  cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100)
  cv.ellipse1(dst, rotatedRect, ellipseColor, 1, cv.LINE_8)
  cv.imshow(document.getElementById('outputCanvas')!, dst)
  src.delete()
  dst.delete()
  contours.delete()
  hierarchy.delete()
  cnt.delete()
})()

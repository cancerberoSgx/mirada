import * as cv from 'mirada';

(async () => {
  const canvas = document.getElementById('outputCanvas')!
  var img: cv.Mat = await cv.imread(canvas)
  let dst: cv.Mat = new cv.Mat()
  let M: cv.Mat = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(img, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  cv.imshow(canvas, dst)
  img.delete()
  img.delete()
  M.delete()
})()

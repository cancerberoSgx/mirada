import * as Mirada from 'mirada'
import { Mat } from 'mirada'
declare var cv: Mirada.CV

(async () => {
  const canvas = document.getElementById('outputCanvas')!
  var img: Mat = await cv.imread(canvas)
  let dst: Mat = new cv.Mat()
  let M: Mat = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(img, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  cv.imshow(canvas, dst)
  img.delete()
  img.delete()
  M.delete()
})()

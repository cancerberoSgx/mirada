
import { File, loadOpencv, toImageData } from '..';
import { ImageData, Rect, Scalar } from '../types/opencv';
import { toRgba } from '../util/imageUtil';

export interface GrabCutOptions extends Rect {
  image: File
  /** 
   * If given a rectangle frame will be drawn on given coordinates with that color.
   */
  frameColor?: Scalar
}

export interface GrabCutResult {
  image: ImageData
}

export async function grabCut(o: GrabCutOptions): Promise<GrabCutResult> {
  await loadOpencv()
  var src = o.image.asMat()
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0)
  let mask = new cv.Mat()
  let bgdModel = new cv.Mat()
  let fgdModel = new cv.Mat()
  let rect = new cv.Rect(o.x, o.y, o.width, o.height)
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT)
  for (let i = 0; i < src.rows; i++) {
    for (let j = 0; j < src.cols; j++) {
      if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
        src.ucharPtr(i, j)[0] = 0
        src.ucharPtr(i, j)[1] = 0
        src.ucharPtr(i, j)[2] = 0
      }
    }
  }
  if (o.frameColor) {
    let point1 = new cv.Point(rect.x, rect.y)
    let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height)
    cv.rectangle(src, point1, point2, o.frameColor)
  }
  const rgbaImg = toRgba(src)
  const image = toImageData(rgbaImg)
  mask.delete()
  rgbaImg.delete()
  bgdModel.delete()
  fgdModel.delete()
  return {
    image
  }
}

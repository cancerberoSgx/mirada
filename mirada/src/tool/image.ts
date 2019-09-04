import { Mat } from '../types/opencv'
import { isMat } from '../util';

export function replaceColor(src: Mat, lowColor: Range | number[], highColor: Range | number[], newColorOrImage: Range | number[] | Mat, dst: Mat = new cv.Mat(), ) {
  const low = new cv.Mat(src.rows, src.cols, src.type(), lowColor)
  const high = new cv.Mat(src.rows, src.cols, src.type(), highColor)
  const mask = new cv.Mat()
  cv.inRange(src, low, high, mask)
  const b = isMat(newColorOrImage) ? newColorOrImage : new cv.Mat(src.rows, src.cols, src.type(), newColorOrImage)
  b.copyTo(dst, mask);
  [mask, low, high, ...isMat(newColorOrImage) ?  [] : [b]].forEach(m => m.delete())
  return dst
}

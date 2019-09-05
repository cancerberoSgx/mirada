import { Mat } from '../types/opencv'
import { isMat, del } from '../util'

export interface ImageToolBaseOptions {
    src: Mat, 
  dst?:Mat
}

export interface ReplaceColorOptions extends ImageToolBaseOptions{
  lowColor: Range | number[], 
  highColor: Range | number[], 
  newColorOrImage: Range | number[] | Mat, 
}

export function replaceColor(o: ReplaceColorOptions) {
  o.dst = o.dst ||new cv.Mat()
  const low = new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.lowColor)
  const high = new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.highColor)
  const mask = new cv.Mat()
  cv.inRange(o.src, low, high, mask)
  const b = isMat(o.newColorOrImage) ? o.newColorOrImage : new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.newColorOrImage)
  b.copyTo(o.dst, mask);
  del(mask, low, high, ...isMat(o.newColorOrImage) ? [] : [b]);
  return o.dst
}





import { Mat } from '../types/opencv';

export function replaceColor(src:Mat, lowColor:Range|number[], highColor:Range|number[], newCOlor:Range|number[],dst:Mat=new cv.Mat(), ){
  const low = new cv.Mat( src.rows, src.cols, src.type(), lowColor)
  const high = new cv.Mat( src.rows, src.cols, src.type(), highColor)
const mask = new cv.Mat()
  cv.inRange(src,  low, high, mask)
  const b = new cv.Mat(src.rows,src.cols, src.type(), newCOlor )
  b.copyTo(dst, mask);
 [mask,  low, high, b].forEach(m=>m.delete())
  return dst
  }
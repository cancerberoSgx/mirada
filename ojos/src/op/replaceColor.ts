import { del, isMat, Mat, Scalar } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface ReplaceColorOptions extends OperationExecBaseOptions {
  /**
   * inclusive lower boundary array or a scalar.
   */
  lowColor: Scalar | number[],
  /**
   * Inclusive upper boundary array or a scalar.
   */
  highColor: Scalar | number[],
  /**
   * The color or image to write in those pixels within given boundaries.
   */
  newColorOrImage: Scalar | number[] | Mat,
  /**
   * if true the output will only contain the replaced color and the rest (that didn't matched) will be 0,0,0,0
   */
  removeRest?: boolean
}

export class ReplaceColor extends AbstractOperation<ReplaceColorOptions> {
  name = "ReplaceColor"
  description = `Will replace pixels within given boundaries with given color or image's pixels`
  protected _exec(o: ReplaceColorOptions) {
    o.dst = o.dst || new cv.Mat()
    const low = new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.lowColor)
    const high = new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.highColor)
    const mask = new cv.Mat()
    cv.inRange(o.src, low, high, mask)
    const b = isMat(o.newColorOrImage) ? o.newColorOrImage : new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.newColorOrImage)
    if (o.removeRest) {
      const aux = new cv.Mat()
      aux.copyTo(o.dst)
      aux.delete()
    } else {
      o.src.copyTo(o.dst)
    }
    b.copyTo(o.dst, mask)
    del(mask, low, high, ...isMat(o.newColorOrImage) ? [] : [b])
  }
}



import { isMat, Mat, Scalar } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface InRangeOptions extends OperationExecBaseOptions, InRangeConcreteOptions {
}

export interface InRangeConcreteOptions {
  /**
   * inclusive lower boundary array or a scalar.
   */
  lowerb: Mat | Scalar
  /**
   * inclusive upper boundary array or a scalar.
   */
  upperb: Mat | Scalar
}

export class InRange extends AbstractOperation<InRangeOptions> {
  name: string = 'InRange'
  sameSizeAndType = true
  protected _exec(o: InRangeOptions) {

    cv.inRange(o.src, isMat(o.lowerb) ? o.lowerb : new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.lowerb), isMat(o.upperb) ? o.upperb : new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.upperb), o.dst!)
  }
}


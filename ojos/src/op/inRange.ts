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

/**
 *  [dst]   is set to 255 (all 1 -bits) if [src] is within the specified 1D, 2D, 3D, ... box and 0 otherwise.
 */
export class InRange extends AbstractOperation<InRangeOptions> {
  name: string = 'InRange'
  protected _exec(o: InRangeOptions) {
    cv.inRange(o.src,
      isMat(o.lowerb) ? o.lowerb : new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.lowerb),
      isMat(o.upperb) ? o.upperb : new cv.Mat(o.src.rows, o.src.cols, o.src.type(), o.upperb), o.dst!)
  }
}


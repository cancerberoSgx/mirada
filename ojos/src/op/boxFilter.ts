import { Point } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize } from './types'

export interface BoxFilterOptions extends OperationExecBaseOptions, BoxFilterConcreteOptions {
}

export interface BoxFilterConcreteOptions extends WithBorderType, WithKSize {
  /**
   * the output image dept. (-1 to use src.depth()).
   */
  depth?: number
  /**
   * anchor point; default value Point(-1,-1) means that the anchor is at the kernel center
   */
  anchor?: Point
  /**
   * 	flag, specifying whether the kernel is normalized by its area or not.
   */
  normalize?: boolean
}

/**
 */
export class BoxFilter extends AbstractOperation<BoxFilterOptions> {
  name: string = "BoxFilter"
  sameSizeAndType = true
  protected async _exec(o: BoxFilterOptions) {
    //TODO: check invalid kernel size
    // const dst = this.verifyDst(o, true)
    cv.boxFilter(o.src, o.dst!, o.depth || -1, o.ksize, o.anchor || new cv.Point(-1, -1), o.normalize, o.borderType || cv.BORDER_DEFAULT)
    // return o.dst
  }
}


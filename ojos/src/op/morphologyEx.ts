import { Mat, MorphTypes, Point } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithBorderValue, WithKernel } from './types'

export interface MorphologyExOptions extends OperationExecBaseOptions, MorphologyExConcreteOptions {
}

export interface MorphologyExConcreteOptions extends WithBorderType, WithBorderValue, WithKernel {
  /**
   * Type of a morphological operation.
   */
  op: MorphTypes
  /**
   * The number of iterations is the number of times erosion or dilatation operation will be applied. For instance, an opening operation ([MORPH_OPEN]) with two iterations is equivalent to apply successively: erode -> erode -> dilate -> dilate (and not erode -> dilate -> erode -> dilate). By default 1.
   */
  iterations?: number
}

/**
 * Perform advanced morphological transformations using an erosion and dilation as basic operations. Any of the operations can be done in-place. In case of multi-channel images, each channel is processed independently.
 */
export class MorphologyEx extends AbstractOperation<MorphologyExOptions> {
  name = "MorphologyEx"
  description = 'perform advanced morphological transformations using an erosion and dilation as basic operations. In case of multi-channel images, each channel is processed independently.'
  sameSizeAndType = true
  protected _exec(o: MorphologyExOptions) {
    cv.morphologyEx(o.src, o.dst!, o.op, o.kernel, o.anchor || new cv.Point(-1, -1), o.iterations || 1,
      o.borderType || cv.BORDER_CONSTANT, o.borderValue || cv.morphologyDefaultBorderValue())
  }
}


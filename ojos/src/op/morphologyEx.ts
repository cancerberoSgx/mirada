import { Mat, MorphTypes, Point } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithBorderValue } from './types'

export interface MorphologyExOptions extends OperationExecBaseOptions, MorphologyExConcreteOptions {
}

export interface MorphologyExConcreteOptions extends WithBorderType, WithBorderValue {
  op: MorphTypes
  kernel: Mat
  anchor?: Point
  iterations?: number
}

/**
 * perform advanced morphological transformations using an erosion and dilation as basic operations.
 */
export class MorphologyEx extends AbstractOperation<MorphologyExOptions> {
  name = "MorphologyEx"
  description='perform advanced morphological transformations using an erosion and dilation as basic operations.'
  sameSizeAndType = true
  protected _exec(o: MorphologyExOptions) {
    cv.morphologyEx(o.src, o.dst!, o.op, o.kernel, o.anchor || new cv.Point(-1, -1), o.iterations || 1,
      o.borderType || cv.BORDER_CONSTANT, o.borderValue || cv.morphologyDefaultBorderValue())
  }
}


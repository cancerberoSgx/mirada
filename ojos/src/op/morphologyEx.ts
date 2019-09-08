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

export class MorphologyEx extends AbstractOperation<MorphologyExOptions> {
  name: string = "MorphologyEx"
  sameSizeAndType = true
  protected _exec(o: MorphologyExOptions) {
    cv.morphologyEx(o.src, o.dst!, o.op, o.kernel, o.anchor || new cv.Point(-1, -1), o.iterations || 1,
      o.borderType || cv.BORDER_CONSTANT, o.borderValue || cv.morphologyDefaultBorderValue())
  }
}


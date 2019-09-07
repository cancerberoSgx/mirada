import { Mat, MorphTypes, Point, isMat, MatData, data2mat } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithBorderValue } from './types'

export interface MorphologyExOptions extends OperationExecBaseOptions, MorphologyExConcreteOptions {
}

export interface MorphologyExConcreteOptions extends WithBorderType, WithBorderValue {
  op: MorphTypes
  kernel: Mat | MatData
  anchor?: Point
  iterations?: number
}

/**
 */
export class MorphologyEx extends AbstractOperation<MorphologyExOptions> {
  name: string = "MorphologyEx"
  sameSizeAndType = true
  protected async _exec(o: MorphologyExOptions) {
    const kernel = isMat(o.kernel) ? o.kernel : data2mat(o.kernel)
    cv.morphologyEx(o.src, o.dst!, o.op, kernel, o.anchor || new cv.Point(-1, -1), o.iterations || 1, 
      o.borderType || cv.BORDER_CONSTANT, o.borderValue || cv.morphologyDefaultBorderValue())
  }
}


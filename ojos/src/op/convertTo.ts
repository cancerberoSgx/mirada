import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize } from './types'
import { intBetween } from '../util'
import { Mat, Scalar, get, set } from 'mirada'

export interface ConvertToOptions extends OperationExecBaseOptions, ConvertToConcreteOptions {
}

export interface ConvertToConcreteOptions {
  alpha?: number
  beta?: number
  /**
   * Output image depth, for example, cv.CV_8U
   */
  dtype?: number
}

export class ConvertTo extends AbstractOperation {
  name: string = "ConvertTo"
  async exec(o: ConvertToOptions) {
    const dst = this.verifyDst(o)
      o.src.convertTo(dst, o.dtype||-1, o.alpha||1.0, o.beta||0.0)
    return dst
  }
}


import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize } from './types'

export interface GaussianBlurOptions extends OperationExecBaseOptions, GaussianBlurConcreteOptions {
}

export interface GaussianBlurConcreteOptions extends WithBorderType, WithKSize {
  sigmaX: number
  sigmaY?: number
}

/**
 */
export class GaussianBlur extends AbstractOperation {
  name: string = "GaussianBlur"
  async exec(o: GaussianBlurOptions) {
    //TODO: check invalid kernel size
    const dst = this.verifyDst(o, true)
    cv.GaussianBlur(o.src, dst, o.ksize, o.sigmaX, o.sigmaY || 0, o.borderType || cv.BORDER_CONSTANT)
    return dst
  }
}


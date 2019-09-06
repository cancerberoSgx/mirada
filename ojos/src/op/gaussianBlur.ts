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
export class GaussianBlur extends AbstractOperation<GaussianBlurOptions> {
  name: string = "GaussianBlur"
  sameSizeAndType = true
  protected async _exec(o: GaussianBlurOptions) {
    cv.GaussianBlur(o.src, o.dst!, o.ksize, o.sigmaX, o.sigmaY || 0, o.borderType || cv.BORDER_CONSTANT)
  }
}


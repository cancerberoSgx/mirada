import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize } from './types'

export interface GaussianBlurOptions extends OperationExecBaseOptions, GaussianBlurConcreteOptions {
}

export interface GaussianBlurConcreteOptions extends WithBorderType, WithKSize {
  sigmaX: number
  sigmaY?: number
}

/**
 * convolves the source image with the specified Gaussian kernel. In-place filtering is supported.
 */
export class GaussianBlur extends AbstractOperation<GaussianBlurOptions> {
  name = "GaussianBlur"
  description = 'convolves the source image with the specified Gaussian kernel. In-place filtering is supported.'
  sameSizeAndType = true
  protected _exec(o: GaussianBlurOptions) {
    cv.GaussianBlur(o.src, o.dst!, o.ksize, o.sigmaX, o.sigmaY || 0, o.borderType || cv.BORDER_CONSTANT)
  }
}


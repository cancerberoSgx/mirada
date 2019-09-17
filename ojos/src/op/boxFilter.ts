import { Point } from 'mirada'
import { toSize } from '../util'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize, WithKernelAnchor, WithDDepth } from './types'

export interface BoxFilterOptions extends OperationExecBaseOptions, BoxFilterConcreteOptions {
}

export interface BoxFilterConcreteOptions extends WithBorderType, WithKSize , WithKernelAnchor, WithDDepth{
  /**
   * 	flag, specifying whether the kernel is normalized by its area or not.
   */
  normalize?: boolean
}

/**
 * smooths an image. Unnormalized box filter is useful for computing various integral characteristics over each pixel neighborhood, such as covariance matrices of image derivatives (used in dense optical flow algorithms, and so on). 
 */
export class BoxFilter extends AbstractOperation<BoxFilterOptions> {
  name = "BoxFilter"
  description = 'smooths an image. Unnormalized box filter is useful for computing various integral characteristics over each pixel neighborhood, such as covariance matrices of image derivatives (used in dense optical flow algorithms, and so on). '
  sameSizeAndType = true
  protected _exec(o: BoxFilterOptions) {
    cv.boxFilter(o.src, o.dst!, o.ddepth || -1, toSize(o.ksize), o.anchor || new cv.Point(-1, -1), o.normalize, o.borderType || cv.BORDER_DEFAULT)
  }
}


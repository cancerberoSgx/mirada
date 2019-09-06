import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType } from './types'

export interface BilateralFilterOptions extends OperationExecBaseOptions, BilateralFilterConcreteOptions {
}

export interface BilateralFilterConcreteOptions extends WithBorderType {
  /**
   * Diameter of each pixel neighborhood that is used during filtering. If it is non-positive, it is computed from sigmaSpace.
   */
  d?: number
  /**
   * Filter sigma in the color space. A larger value of the parameter means that farther colors within the pixel neighborhood (see sigmaSpace) will be mixed together, resulting in larger areas of semi-equal color.
   */
  sigmaColor: number
  /**
   * Filter sigma in the coordinate space. A larger value of the parameter means that farther pixels will influence each other as long as their colors are close enough (see sigmaColor ). When d>0, it specifies the neighborhood size regardless of sigmaSpace. Otherwise, d is proportional to sigmaSpace.
   */
  sigmaSpace: number
}

/**
 * The function applies bilateral filtering to the input image, as described in bilateralFilter can reduce unwanted noise very well while keeping edges fairly sharp. However, it is very slow compared to most filters.
 * 
 * Sigma values*: For simplicity, you can set the 2 sigma values to be the same. If they are small (< 10), the filter will not have much effect, whereas if they are large (> 150), they will have a very strong effect, making the image look "cartoonish".
 * 
 * Filter size*: Large filters (d > 5) are very slow, so it is recommended to use d=5 for real-time applications, and perhaps d=9 for offline applications that need heavy noise filtering.
 */
export class BilateralFilter extends AbstractOperation<BilateralFilterOptions> {
  name: string = "BilateralFilter"
  noInPlace = true
  sameSizeAndType = true
  validChannels = [1, 3]
  protected async _exec(o: BilateralFilterOptions) {
    cv.bilateralFilter(o.src, o.dst!, o.d || -1, o.sigmaColor, o.sigmaSpace, o.borderType || cv.BORDER_DEFAULT)
  }

}


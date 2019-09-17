import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKernel, WithDDepth } from './types'

export interface Filter2DOptions extends OperationExecBaseOptions, Filter2DConcreteOptions {
}

export interface Filter2DConcreteOptions extends WithBorderType, WithKernel, WithDDepth {
  /**
   * optional value added to the filtered pixels before storing them in dst.
   */
  delta?: number
}

/**
 * Convolves an image with the kernel. The function applies an arbitrary linear filter to an image. In-place operation is supported. When the aperture is partially outside the image, the function interpolates outlier pixel values according to the specified border mode
 */
export class Filter2D extends AbstractOperation<Filter2DOptions> {
  name = "Filter2D"
  description = `Convolves an image with the kernel. The function applies an arbitrary linear filter to an image. In-place operation is supported. When the aperture is partially outside the image, the function interpolates outlier pixel values according to the specified border mode`
  sameSizeAndType=true
  protected _exec(o: Filter2DOptions) {
    cv.filter2D(o.src, o.dst!, o.ddepth||-1, o.kernel, o.anchor||new cv.Point(-1, -1), o.delta||0, o.borderType || cv.BORDER_DEFAULT)
  }
}


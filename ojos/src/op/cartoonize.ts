import { del, toRgba } from 'mirada'
import { AbstractOperation } from '.'
import { OperationExecBaseOptions, WithKSize } from './types'

export interface CartoonizeOptions extends OperationExecBaseOptions, CartoonizeConcreteOptions {

}

interface CartoonizeConcreteOptions extends Partial<WithKSize> {
  /**
   * times the original image is shrink and enlarged (internally using pyrDown and pyrUp) . Default: 2
   */
  downSampleCount?: number
  /**
   * number of times bilateralFilter is applied. Default: 20
   */
  filterIterations?: number
  /**
   * bilateralFilter filterDiameter option. Default: 9
   */
  filterDiameter?: number
  /**
   * bilateralFilter filterColor option. Default: 9
   */
  filterColor?: number
  /**
   * bilateralFilter filterSpace option. Default: 7
   */
  filterSpace?: number
  /**
   * kernel size of blur filter. Default 3.
   */
  blurSize?: number
  /**
   * black "dirt" spots - the lower the dirty - default: 2
   */
  dirt?: number
}

/**
 * convert an image into a cartoon-like image
 */
export class Cartoonize extends AbstractOperation<CartoonizeOptions> {
  name = "Cartoonize"
  description = `convert an image into a cartoon-like image`
  optionsOrder = ['src', 'dst', 'downSampleCount', 'filterIterations', 'filterDiameter', 'filterColor', 'filterSpace', 'blurSize'] as (keyof CartoonizeOptions)[]
  protected _exec(o: CartoonizeOptions) {
    // const rgb = new cv.Mat(o.src.rows, o.src.cols, o.src.type())
    toRgba(o.src, o.dst!)
    cv.cvtColor(o.dst!, o.dst!, cv.COLOR_RGBA2RGB)

    // downsample image using Gaussian pyramid
    const img_color = o.dst!.clone()
    for (let i = 0; i < (o.downSampleCount || 2); i++) {
      cv.pyrDown(img_color, img_color)
    }

    // repeatedly apply small bilateral filter instead of applying one large filter
    for (let i = 0; i < (o.filterIterations || 20); i++) {
      const c = img_color.clone()
      cv.bilateralFilter(c, img_color, o.filterDiameter || 9, o.filterColor || 9, o.filterSpace || 7)
      del(c)
    }

    // upsample image to original size
    for (let i = 0; i < (o.downSampleCount || 2); i++) {
      cv.pyrUp(img_color, img_color)
    }

    // convert to grayscale and apply median blur
    const img_gray = new cv.Mat(o.dst!.rows, o.dst!.cols, o.dst!.type())

    cv.cvtColor(o.dst!, img_gray, cv.COLOR_RGB2GRAY)
    // const img_blur = new cv.Mat(img_gray.rows, img_gray.cols, img_gray.type())
    cv.medianBlur(img_gray, img_gray, o.blurSize || 3)

    // detect and enhance edges
    o.dst!.create(img_gray.rows, img_gray.cols, img_gray.type())
    cv.adaptiveThreshold(img_gray, o.dst!, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, o.filterDiameter || 9, o.dirt || 2)

    // convert back to color so that it can be bit-ANDed with color image
    cv.resize(o.dst!, o.dst!, { width: img_color.cols, height: img_color.rows })
    cv.cvtColor(o.dst!, o.dst!, cv.COLOR_GRAY2RGB)

    cv.bitwise_and(img_color, o.dst!, o.dst!)
    toRgba(o.dst!, o.dst!)
    del(img_gray, img_color)
  }
}


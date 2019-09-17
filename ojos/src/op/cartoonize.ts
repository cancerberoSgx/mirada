import { del, toRgba } from 'mirada'
import { AbstractOperation } from '.'
import { OperationExecBaseOptions, WithKSize } from './types'

export interface CartoonizeOptions extends OperationExecBaseOptions, CartoonizeConcreteOptions {

}

interface CartoonizeConcreteOptions extends Partial<WithKSize> {
  downsampleCount?: number
  bilateralCount?: number
}

/**
 * convert an image into a cartoon-like image
 */
export class Cartoonize extends AbstractOperation<CartoonizeOptions> {
  name = "Cartoonize"
  description = `convert an image into a cartoon-like image`
  optionsOrder = ['src', 'dst'] as (keyof CartoonizeOptions)[]
  protected _exec(o: CartoonizeOptions) {
    const rgb = new cv.Mat(o.src.rows, o.src.cols, o.src.type())
    toRgba(o.src, rgb)
    cv.cvtColor(rgb, rgb, cv.COLOR_RGBA2RGB)

    // downsample image using Gaussian pyramid
    const img_color = rgb.clone()
    for (let i = 0; i < (o.downsampleCount || 2); i++) {
      cv.pyrDown(img_color, img_color)
    }

    // repeatedly apply small bilateral filter instead of applying one large filter
    for (let i = 0; i < (o.bilateralCount || 20); i++) {
      const c = img_color.clone()
      cv.bilateralFilter(c, img_color, 9, 9, 7)
      del(c)
    }

    // upsample image to original size
    for (let i = 0; i < (o.downsampleCount || 2); i++) {
      cv.pyrUp(img_color, img_color)
    }

    // convert to grayscale and apply median blur
    const img_gray = new cv.Mat(rgb.rows, rgb.cols, rgb.type())

    cv.cvtColor(rgb, img_gray, cv.COLOR_RGB2GRAY)
    const img_blur = new cv.Mat(img_gray.rows, img_gray.cols, img_gray.type())
    cv.medianBlur(img_gray, img_blur, 3)

    // detect and enhance edges
    const img_edge = new cv.Mat(img_blur.rows, img_blur.cols, img_blur.type())
    cv.adaptiveThreshold(img_blur, img_edge, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 9, 2)

    // convert back to color so that it can be bit-ANDed with color image
    cv.resize(img_edge, img_edge, { width: img_color.rows, height: img_color.cols })
    cv.cvtColor(img_edge, img_edge, cv.COLOR_GRAY2RGB)
    cv.bitwise_and(img_color, img_edge, o.dst!)
    del(rgb, img_gray, img_color, img_edge, img_blur)
  }
}


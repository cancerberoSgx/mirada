import { ColorConversionCodes } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface CvtColorOptions extends OperationExecBaseOptions, CvtColorConcreteOptions {
}

export interface CvtColorConcreteOptions {
  /**
   * color space conversion code (see ColorConversionCodes).
   */
  code: ColorConversionCodes
  /**
   * number of channels in the destination image; if the parameter is 0, the number of the channels is derived automatically from src and code.
   */
  dstCn?: number
}

/**
 * converts an input image from one color space to another. In case of a transformation to-from RGB color space, the order of the channels should be specified explicitly (RGB or BGR). Note that the default color format in OpenCV is often referred to as RGB but it is actually BGR (the bytes are reversed). So the first byte in a standard (24-bit) color image will be an 8-bit Blue component, the second byte will be Green, and the third byte will be Red. The fourth, fifth, and sixth bytes would then be the second pixel (Blue, then Green, then Red), and so on.
 */
export class CvtColor extends AbstractOperation<CvtColorOptions> {
  name = 'CvtColor'
  description = 'converts an input image from one color space to another. In case of a transformation to-from RGB color space, the order of the channels should be specified explicitly (RGB or BGR). Note that the default color format in OpenCV is often referred to as RGB but it is actually BGR (the bytes are reversed). So the first byte in a standard (24-bit) color image will be an 8-bit Blue component, the second byte will be Green, and the third byte will be Red. The fourth, fifth, and sixth bytes would then be the second pixel (Blue, then Green, then Red), and so on.'
  optionsOrder = ['src', 'dst', 'code', 'dstCn'] as (keyof CvtColorOptions)[]
  protected _exec(o: CvtColorOptions) {
    cv.cvtColor(o.src, o.dst!, o.code, o.dstCn || 0)
  }
}


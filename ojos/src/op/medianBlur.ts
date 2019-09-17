import { checkThrow } from 'misc-utils-of-mine-generic'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize } from './types'
import { toNumber } from '../util'

export interface MedianBlurOptions extends OperationExecBaseOptions, MedianBlurConcreteOptions {
}

export interface MedianBlurConcreteOptions extends WithBorderType,  WithKSize  {
}

/**
 *  smoothes an image using the median filter with the ksize x ksize aperture.
 */
export class MedianBlur extends AbstractOperation<MedianBlurOptions> {
  name = "MedianBlur"
  description = 'smoothes an image using the median filter with the ksize x ksize aperture.'
  protected _exec(o: MedianBlurOptions) {
    checkThrow(!o.ksize || o.ksize === 1 || toNumber(o.ksize) % 2 !== 0, 'MedianBlur Blur size must be odd and greater than 2')
    cv.medianBlur(o.src, o.dst!, o.ksize)
  }
}


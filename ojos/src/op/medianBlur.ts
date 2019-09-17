import { checkThrow } from 'misc-utils-of-mine-generic'
import { toNumber } from '../util/util'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize } from './types'

export interface MedianBlurOptions extends OperationExecBaseOptions, MedianBlurConcreteOptions {
}

export interface MedianBlurConcreteOptions extends WithBorderType, WithKSize {
}

/**
 *  smoothes an image using the median filter with the ksize x ksize aperture.
 */
export class MedianBlur extends AbstractOperation<MedianBlurOptions> {
  name = "MedianBlur"
  description = 'smoothes an image using the median filter with the ksize x ksize aperture.'
  protected _exec(o: MedianBlurOptions) {
    const ksize = toNumber(o.ksize)
    checkThrow(!ksize || ksize === 1 || ksize % 2 !== 0, 'MedianBlur Blur size must be odd and greater than 2')
    cv.medianBlur(o.src, o.dst!, ksize)
  }
}


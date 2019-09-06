import { checkThrow } from 'misc-utils-of-mine-generic'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType } from './types'

export interface MedianBlurOptions extends OperationExecBaseOptions, MedianBlurConcreteOptions {
}

export interface MedianBlurConcreteOptions extends WithBorderType {
  ksize: number
}

/**
 */
export class MedianBlur extends AbstractOperation<MedianBlurOptions> {
  name: string = "MedianBlur"
  protected async _exec(o: MedianBlurOptions) {
    checkThrow(!o.ksize || o.ksize === 1 || o.ksize % 2 !== 0, 'MedianBlur Blur size must be odd and greater than 2')
    // const dst = this.verifyDst(o, true)
    cv.medianBlur(o.src, o.dst!, o.ksize)
    // return dst
  }
}


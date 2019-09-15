import { AdaptiveThresholdTypes, ThresholdTypes } from 'mirada'
import { checkThrow } from 'misc-utils-of-mine-generic'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface AdaptiveThresholdOptions extends OperationExecBaseOptions, AdaptiveThresholdConcreteOptions {
}

export interface AdaptiveThresholdConcreteOptions {
  maxval: number
  thresholdType: ThresholdTypes
  adaptiveMethod: AdaptiveThresholdTypes
  blockSize: number
  C: number
}

/**
 * transforms a grayscale image to a binary image
 */
export class AdaptiveThreshold extends AbstractOperation<AdaptiveThresholdOptions> {
  name = 'AdaptiveThreshold'
  description = 'transforms a grayscale image to a binary image'
  validChannels = [1]
  sameSizeAndType = true
  protected _exec(o: AdaptiveThresholdOptions) {
    checkThrow(!o.blockSize || o.blockSize === 1 || o.blockSize % 2 !== 0, 'MedianBlur Blur size must be odd and greater than 2')
    cv.adaptiveThreshold(o.src, o.dst!, o.maxval, o.adaptiveMethod, o.thresholdType, o.blockSize, o.C)
  }
}


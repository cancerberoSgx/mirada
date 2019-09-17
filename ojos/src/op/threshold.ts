import { ThresholdTypes } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface ThresholdOptions extends OperationExecBaseOptions, ThresholdConcreteOptions {
}

export interface ThresholdConcreteOptions {
  /**
   * threshold value
   */
  thresh: number
  /**
   *  maximum value to use with the THRESH_BINARY and THRESH_BINARY_INV thresholding types.
   */
  maxval: number
  /**
   * thresholding type (see ThresholdTypes).
   */
  thresholdType: ThresholdTypes
}

/**
 * Applies fixed-level thresholding to a multiple-channel array. The function is typically used to get a bi-level (binary) image out of a grayscale image or for removing a noise, that is, filtering out pixels with too small or too large values. There are several types of thresholding supported by the function. They are determined by type parameter.
 */
export class Threshold extends AbstractOperation<ThresholdOptions> {
  name = 'Threshold'
  description = 'Applies fixed-level thresholding to a multiple-channel array. The function is typically used to get a bi-level (binary) image out of a grayscale image or for removing a noise, that is, filtering out pixels with too small or too large values. There are several types of thresholding supported by the function. They are determined by type parameter.'
  sameSizeAndType = true
  protected _exec(o: ThresholdOptions) {
    cv.threshold(o.src, o.dst!, o.thresh, o.maxval, o.thresholdType)
  }
}


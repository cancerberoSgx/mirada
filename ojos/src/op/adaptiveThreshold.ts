import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'
import {  ThresholdTypes, AdaptiveThresholdTypes } from 'mirada'
import { checkThrow } from 'misc-utils-of-mine-generic'

export interface AdaptiveThresholdOptions extends OperationExecBaseOptions, AdaptiveThresholdConcreteOptions {
}

export interface AdaptiveThresholdConcreteOptions {
  maxval: number
  thresholdType: ThresholdTypes
  adaptiveMethod: AdaptiveThresholdTypes
  blockSize: number
  C:number
}

export class AdaptiveThreshold extends AbstractOperation<AdaptiveThresholdOptions> {
  name: string = 'AdaptiveThreshold'
  validChannels=[1]
  sameSizeAndType = true
  protected async _exec(o: AdaptiveThresholdOptions) {
    checkThrow(!o.blockSize || o.blockSize === 1 || o.blockSize % 2 !== 0, 'MedianBlur Blur size must be odd and greater than 2')
    cv.adaptiveThreshold(o.src, o.dst!,  o.maxval, o.adaptiveMethod, o.thresholdType, o.blockSize, o.C)
  }
}


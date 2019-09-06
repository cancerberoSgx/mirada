import { ThresholdTypes } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface ThresholdOptions extends OperationExecBaseOptions, ThresholdConcreteOptions {
}

export interface ThresholdConcreteOptions {
  thresh: number
  maxval: number
  type: ThresholdTypes
}

export class Threshold extends AbstractOperation<ThresholdOptions> {
  name: string = 'Threshold'
  sameSizeAndType = true
  protected async _exec(o: ThresholdOptions) {
    cv.threshold(o.src, o.dst!, o.thresh, o.maxval, o.type)
  }
}


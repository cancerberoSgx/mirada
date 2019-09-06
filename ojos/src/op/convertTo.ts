import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface ConvertToOptions extends OperationExecBaseOptions, ConvertToConcreteOptions {
}

export interface ConvertToConcreteOptions {
  /**
   *  Color scale factor.
   */
  alpha?: number
  /**
   * Delta added to the scaled values.
   */
  beta?: number
  /**
   * Output image depth, for example, cv.CV_8U
   */
  dtype?: number
}

export class ConvertTo extends AbstractOperation<ConvertToOptions> {
  name: string = "ConvertTo"
  protected async _exec(o: ConvertToOptions) {
    o.src.convertTo(o.dst!, o.dtype || -1, o.alpha || 1.0, o.beta || 0.0)
  }
}


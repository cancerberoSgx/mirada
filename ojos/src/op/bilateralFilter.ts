import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType } from './types'

export interface BilateralFilterOptions extends OperationExecBaseOptions, BilateralFilterConcreteOptions {
}

export interface BilateralFilterConcreteOptions extends WithBorderType {
  d: number
  sigmaColor: number
  sigmaSpace: number
}

/**
 */
export class BilateralFilter extends AbstractOperation {
  name: string = "BilateralFilter"
  async exec(o: BilateralFilterOptions) {
    //TODO: check invalid kernel size
    const dst = this.verifyDst(o, true)
    cv.bilateralFilter(o.src, dst, o.d, o.sigmaColor, o.sigmaSpace, o.sigmaSpace || cv.BORDER_DEFAULT
    )
    return dst
  }
}


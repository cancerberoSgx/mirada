import { CVDataType, Mat, noArray } from 'mirada'
import { anyUndefined } from '../util'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface MathOptions extends OperationExecBaseOptions, MathConcreteOptions {

}

interface MathBaseOptions {
  /**
   * 	second input array of the same size and the same type as src
   */
  src2: Mat
  /**
   * optional depth of the output array
   */
  dtype?: CVDataType
}

interface AddWeightConcreteOptions {
  alpha: number
  beta: number
  gamma: number
}

export interface AddWeightOptions extends AddWeightConcreteOptions, MathBaseOptions, OperationExecBaseOptions {

}

export interface MathConcreteOptions extends MathBaseOptions, Partial<AddWeightConcreteOptions> {
  type: 'add' | 'subtract' | 'divide' | 'multiply' | 'addWeighted'
  /**
   * only applies to 'add' and 'subtract'
   */
  mask?: Mat
  /**
   * only applies to 'multiply' and 'divide'
   */
  scale?: number
}

/**
 * performs math operations per pixel on images, like add, subtract, divide, addWeighted and multiply
 */
export class Math extends AbstractOperation<MathOptions> {
  name = "Math"
  description = `performs math operations per pixel on images, like add, subtract, divide, addWeighted and multiply`
  sameSizeAndType = true

  protected validate(o: MathOptions) {
    if (anyUndefined(o.src2, o.alpha, o.beta, o.gamma) && ['addWeighted'].includes(o.type)) {
      return 'alpha, beta, gamma and src2 must be defined'
    }
  }

  protected _exec(o: MathOptions) {
    // TODO: check mask type and size
    // TODO: check src2 size and type
    if (o.type === 'add') {
      cv.add(o.src, o.src2, o.dst!, o.mask || noArray(), o.dtype || -1)
    } else if (o.type === 'subtract') {
      cv.subtract(o.src, o.src2, o.dst!, o.mask || noArray(), o.dtype || -1)
    } else if (o.type === 'multiply') {
      cv.multiply(o.src, o.src2!, o.dst!, o.scale || 1, o.dtype || -1)
    } else if (o.type === 'divide') {
      cv.multiply(o.src, o.src2!, o.dst!, o.scale || 1, o.dtype || -1)
    } else if (o.type === 'addWeighted') {
      cv.addWeighted(o.src, o.alpha, o.src2, o.beta, o.gamma, o.dst!, o.dtype || -1)
    }
  }
}


import { CVDataType, Mat, noArray } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface MathOptions extends OperationExecBaseOptions, MathConcreteOptions {
}

export interface MathConcreteOptions {
  type: 'add' | 'subtract' | 'divide' | 'multiply'
  /**
   * 	second input array of the same size and the same type as src
   */
  src2: Mat
  /**
   * only applies to 'add' and 'subtract'
   */
  mask?: Mat
  /**
   * only applies to 'multiply' and 'divide'
   */
  scale?: number
  /**
   * optional depth of the output array
   */
  dtype?: CVDataType
}

export class Math extends AbstractOperation<MathOptions> {
  name = "Math"
  description = `performs math operations per pixel on images, like add, subtract, divide and multiply`
  sameSizeAndType = true
  protected async _exec(o: MathOptions) {
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
    }
  }
}


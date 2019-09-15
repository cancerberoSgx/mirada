import { Mat, noArray } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface BitwiseOptions extends OperationExecBaseOptions, BitwiseConcreteOptions {
}

export interface BitwiseConcreteOptions {
  type: 'and' | 'or' | 'not' | 'xor'
  src2?: Mat
  mask?: Mat
}

export class Bitwise extends AbstractOperation<BitwiseOptions> {
  name: string = "Bitwise"
  sameSizeAndType = true
  noInPlace = true

  protected validate(o: BitwiseOptions) {
    if (!o.type) {
      return 'type option is required'
    }
    if (!o.src2 && ['add', 'or', 'xoe'].includes(o.type)) {
      return 'src2 option is required'
    }
  }

  protected _exec(o: BitwiseOptions) {
    // TODO: check mask type and size
    // TODO: check src2 size and type
    if (o.type === 'not') {
      cv.bitwise_not(o.src, o.dst!, o.mask || noArray())
    } else if (o.type === 'and') {
      cv.bitwise_and(o.src, o.src2!, o.dst!, o.mask || noArray())
    } else if (o.type === 'or') {
      cv.bitwise_or(o.src, o.src2!, o.dst!, o.mask || noArray())
    } else if (o.type === 'xor') {
      cv.bitwise_xor(o.src, o.src2!, o.dst!, o.mask || noArray())
    }
  }
}


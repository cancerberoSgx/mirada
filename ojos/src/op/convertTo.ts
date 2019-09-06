import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithKSize } from './types'
import { intBetween } from '../util'
import { Mat, Scalar, get, set } from 'mirada'

export interface ConvertToOptions extends OperationExecBaseOptions, ConvertToConcreteOptions {
}

export interface ConvertToConcreteOptions {
  alpha?: number
  beta?: number
  /**
   * Output image depth, for example, cv.CV_8U
   */
  dtype?: number
}

export function map(mat: Mat, dst: Mat, fn: (p: Scalar, x: number, y: number) => Scalar) {
  for (let y = 0; y < mat.rows; y++) {
    for (let x = 0; x < mat.cols; x++) {
      const v = fn(get(mat, x, y), x, y)
      set(dst, x, y, v)
    }
  }
}

export class ConvertTo extends AbstractOperation {
  name: string = "ConvertTo"
  async exec(o: ConvertToOptions) {
    const dst = this.verifyDst(o)
      o.src.convertTo(dst, o.dtype||-1, o.alpha||1.0, o.beta||0.0)
    // const alpha = typeof o.alpha === 'undefined' ? 1.0 : o.alpha
    // const beta = typeof o.beta === 'undefined' ? 0.0 : o.beta
    // map(o.src, dst, p=>p.map(v=>intBetween(alpha * v + beta, 0, 255)))
    // const C = o.src.channels()
    // const cols = o.src.cols
    // for (let y = 0; y < o.src.rows; y++) {
    //   for (let x = 0; x < cols; x++) {
    //     for (let c = 0; c < C; c++) {
    //       // const v = o.src.ptr(y, x)[c]
    //       // console.log(v);
    //       const i = y * cols * C + x * C + c
    //       const v = o.src.data[i]
    //       // dst.data[i] = intBetween(alpha * v + beta, 0, 255)
    //       //@ts-ignore
    //       // dst.set
    //       // dst.put(i, intBetween(alpha * v + beta, 0, 255))
    //       // dst.data8U[y * cols * C + x * C] = intBetween(alpha * v + beta, 0, 255)
    //       // dst.ptr(y, x)[c] = 111//intBetween(alpha * v + beta, 0, 255)
    //       // ConvertTo_cast.
    //       // let v = o.src.data[y * cols * C + x * C];
    //       // dst.data[y * cols * C + x * C] = v// Math.trunc(alpha * v + beta)

    //     }
    //   }
    // }
    return dst
  }
}


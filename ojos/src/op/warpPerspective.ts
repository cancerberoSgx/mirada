import { BorderTypes, isMat, Mat, Scalar, Size, SolvePnPMethod } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface WarpPerspectiveOptions extends OperationExecBaseOptions {
  inputs: Scalar | Mat
  outputs: Scalar | Mat
  solveMethod?: SolvePnPMethod
  borderMode?: BorderTypes
  borderValue?: Scalar
  size?: Size
}

/**
 * Input should be float type and 1, 3or 4 channels. In doubt use toRgba().
 */
export class WarpPerspective extends AbstractOperation {
  name: string = "warpPerspective"
  async exec(o: WarpPerspectiveOptions) {
    if (o.dst === o.src) {
      throw new Error('warpPerspective cannot operate in-place.')
    }
    const dst = this.verifyDst(o)
    let srcTri = isMat(o.inputs) ? o.inputs : cv.matFromArray(4, 1, cv.CV_32FC2, o.inputs)
    let dstTri = isMat(o.outputs) ? o.outputs : cv.matFromArray(4, 1, cv.CV_32FC2, o.outputs)
    let M = cv.getPerspectiveTransform(srcTri, dstTri)
    cv.warpPerspective(o.src, dst!, M, o.size || dst.size(),
      o.solveMethod || cv.INTER_LINEAR, o.borderMode || cv.BORDER_CONSTANT, o.borderMode || new cv.Scalar())
    return dst
  }
}


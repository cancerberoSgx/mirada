import { isMat, Mat, Scalar, Size, SolvePnPMethod } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType } from './types'

export interface WarpPerspectiveOptions extends OperationExecBaseOptions, WithBorderType {
  inputs: Scalar | Mat
  outputs: Scalar | Mat
  solveMethod?: SolvePnPMethod
  borderValue?: Scalar
  size?: Size
}

/**
 * Input should be float type and 1, 3or 4 channels. In doubt use toRgba().
 */
export class WarpPerspective extends AbstractOperation<WarpPerspectiveOptions> {
  name = "warpPerspective"
  noInPlace = true
  protected async _exec(o: WarpPerspectiveOptions) {
    // if (o.dst === o.src) {
    //   throw new Error('warpPerspective cannot operate in-place.')
    // }
    // const dst = this.verifyDst(o)
    let srcTri = isMat(o.inputs) ? o.inputs : cv.matFromArray(4, 1, cv.CV_32FC2, o.inputs)
    let dstTri = isMat(o.outputs) ? o.outputs : cv.matFromArray(4, 1, cv.CV_32FC2, o.outputs)
    let M = cv.getPerspectiveTransform(srcTri, dstTri)
    cv.warpPerspective(o.src, o.dst!, M, o.size || o.dst!.size(),
      o.solveMethod || cv.INTER_LINEAR, o.borderType || cv.BORDER_CONSTANT, o.borderType || new cv.Scalar())
    // return dst
  }
}


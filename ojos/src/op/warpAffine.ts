import { DecompTypes, del, Scalar } from 'mirada'
import { array } from 'misc-utils-of-mine-generic'
import { randomScalarColor } from '../util/color'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithBorderValue, WithSize } from './types'

export interface WarpAffineOptions extends OperationExecBaseOptions, WithBorderType, WithBorderValue, Partial<WithSize> {
  /**
   * Coordinates of quadrangle vertices in the source image.
   */
  inputs: Scalar
  /**
   * Coordinates of the corresponding quadrangle vertices in the destination image.
   */
  outputs: Scalar
  /**
   * Combination of interpolation methods (INTER_LINEAR or INTER_NEAREST) and the optional flag WARP_INVERSE_MAP, 
   * that sets M as the inverse transformation 
   */
  flags?: number
  /**
   * Method passed to cv::solve (DecompTypes)
   */
  solveMethod?: DecompTypes
  /**
   * If given input and output points will be drawn as circles. if true will randomly pick colors,
   * or an array of colors can be passed otherwise.
   */
  drawPoints?: Scalar[] | true
}

/**
 * Will use [estimateAffine2D] to calculate affine matrix from given [inputs] and [outputs] and then [warpAffine] to transform.
 */
export class WarpAffine extends AbstractOperation<WarpAffineOptions> {
  name = "WarpAffine"
  description = `Will use [estimateAffine2D] to calculate affine matrix from given [inputs] and [outputs] and then [warpAffine] to transform.`
  noInPlace = true
  protected _exec(o: WarpAffineOptions) {
    let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, o.inputs)
    let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, o.outputs)
    const M = cv.estimateAffine2D(srcTri, dstTri)
    let src = o.src
    if (o.drawPoints) {
      if (typeof o.drawPoints === 'boolean') {
        o.drawPoints = array(Math.trunc(o.inputs.length / 2)).map(randomScalarColor)
      }
      src = o.src.clone()
      array(Math.trunc(o.inputs.length / 2))
        .forEach(i => cv.circle(src, new cv.Point(o.outputs[i * 2], o.outputs[i * 2 + 1]), 5, (o.drawPoints as Scalar[])![i], cv.FILLED))
    }
    cv.warpAffine(src, o.dst!, M, o.size || o.dst!.size(), o.flags || cv.INTER_LINEAR,
      o.borderType || cv.BORDER_CONSTANT, o.borderValue || new cv.Scalar())
    if (o.drawPoints) {
      src.delete()
      array(Math.trunc(o.inputs.length / 2))
        .forEach(i => cv.circle(o.dst!, new cv.Point(o.inputs[i * 2], o.inputs[i * 2 + 1]), 5, (o.drawPoints as Scalar[])![i]))
    }
    del(srcTri, dstTri, M)
  }
}


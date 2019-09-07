import { del } from 'mirada'
import { checkThrow } from 'misc-utils-of-mine-generic'
import { OperationExecBaseOptions } from './types'
import { AbstractOperation } from './abstractOperation'

export interface CannyOptions extends CannyConcreteOptions, OperationExecBaseOptions {
}

export interface CannyConcreteOptions {
  threshold1?: number;
  /**
   * Observation: When this has low values flood pass through edges of color similar to the low channel
   */
  threshold2?: number;
  apertureSize?: number;
  L2gradient?: boolean;
}

export class Canny extends AbstractOperation<CannyOptions> {
  name: string = "Canny"
  noInPlace=true
  protected async _exec(o: CannyOptions) {
     checkThrow(!o.apertureSize || o.apertureSize < 3 || o.apertureSize % 2 !== 0, 'Aperture size must be odd and greater than 2')
  // const dst = o.dst = o.dst || new cv.Mat()
  // o.src.copyTo(dst)
  // cv.cvtColor(o.src, o.dst!, cv.CV_8UC1, 3)
  // const c = o.dst!.clone()
  cv.Canny(o.src, o.dst!, typeof o.threshold1 === 'undefined' ? 0 : o.threshold1,
    typeof o.threshold2 === 'undefined' ? 255 : o.threshold2,
    typeof o.apertureSize === 'undefined' ? 3 : o.apertureSize, o.L2gradient || false) // heads up ! dst needs to be bigger!
  // del(c)
  }
}


// export function canny(o: CannyOptions) {
//   checkThrow(!o.apertureSize || o.apertureSize < 3 || o.apertureSize % 2 !== 0, 'Aperture size must be odd and greater than 2')
//   const dst = o.dst = o.dst || new cv.Mat()
//   o.src.copyTo(dst)
//   cv.cvtColor(dst, dst, cv.CV_8UC1, 3)
//   const c = dst.clone()
//   cv.Canny(c, dst, typeof o.threshold1 === 'undefined' ? 0 : o.threshold1,
//     typeof o.threshold2 === 'undefined' ? 255 : o.threshold2,
//     typeof o.apertureSize === 'undefined' ? 3 : o.apertureSize, o.L2gradient || false) // heads up ! dst needs to be bigger!
//   del(c)
//   return o.dst
// }
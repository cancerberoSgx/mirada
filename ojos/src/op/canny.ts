import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithChannels } from './types'

export interface CannyOptions extends CannyConcreteOptions, OperationExecBaseOptions {
}
/**
 * The function finds edges in the input image and marks them in the output map edges using the Canny algorithm. The smallest value between threshold1 and threshold2 is used for edge linking. The largest value is used to find initial segments of strong edges. 
 */
export interface CannyConcreteOptions extends WithChannels {
  /**
   * first threshold for the hysteresis procedure.
   */
  threshold1?: number;
  /**
   * Observation: When this has low values flood pass through edges of color similar to the low channel
   */
  threshold2?: number;
  /**
   * aperture size for the Sobel operator.
   */
  apertureSize?: number;
  /**
   * if true a more accurate L2 norm will be used to calculate the image gradient magnitude
   */
  L2gradient?: boolean;
}

export class Canny extends AbstractOperation<CannyOptions> {
  name: string = "Canny"
  noInPlace = true

  protected validate(o: CannyOptions) {
    if (!(!o.apertureSize || o.apertureSize < 3 || o.apertureSize % 2 !== 0)) {
      return 'Aperture size must be odd and greater than 2'
    }
  }

  protected _exec(o: CannyOptions) {
    this.allChannels(o, o => this._execOne(o))
  }
  protected _execOne(o: CannyOptions) {
    cv.Canny(o.src, o.dst!, typeof o.threshold1 === 'undefined' ? 0 : o.threshold1,
      typeof o.threshold2 === 'undefined' ? 255 : o.threshold2,
      typeof o.apertureSize === 'undefined' ? 3 : o.apertureSize, o.L2gradient || false)
  }
}

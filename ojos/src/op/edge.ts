import { toNumber } from '../util/util'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithChannels, WithDDepth, WithKSize } from './types'

export interface EdgeOptions extends OperationExecBaseOptions, EdgeConcreteOptions {
}

export interface EdgeConcreteOptions extends WithBorderType, WithKSize, WithChannels, WithDDepth {
  type: 'sobel' | 'scharr' | 'laplacian'
  /**
   * Applies only for Scharr and Sobel (and are mandatory in that case). Also must less than 3
   */
  dx?: number
  /**
 * Applies only for Scharr and Sobel (and are mandatory in that case)
 */
  dy?: number
  /**
   * Optional delta value that is added to the results prior to storing them in dst .
   */
  delta?: number
  /**
   * Optional scale factor for the computed Laplacian values. By default, no scaling is applied. See getDerivKernels for details.
   */
  scale?: number
}

export class Edge extends AbstractOperation<EdgeOptions> {
  name: string = "Edge"
  description = "facade around cv.Sobel, cv.Laplacian and cv.Scharr"
  sameSizeAndType = true

  protected checkInputImage(o: EdgeOptions) {
    if (!o.channels && o.src.channels() > 1) {
      cv.cvtColor(o.src, o.src, cv.COLOR_RGB2GRAY, 0)
    }
  }

  protected validate(o: EdgeOptions) {
    if (['scharr', 'sobel'].includes(o.type) && !(typeof o.dx === 'number' && typeof o.dy === 'number' && o.dx < 3 && o.dy < 3)) {
      return 'dx and dy are mandatory and must be less than 3'
    }
    if (['sobel'].includes(o.type) && ![1, 3, 5, 7].includes(toNumber(o.ksize || 1))) {
      return 'If ksize is given then it must be 1, 3, 5, or 7'
    }
    if (['laplacian'].includes(o.type) && !(typeof o.ksize === 'undefined' || toNumber(o.ksize) > 0 && toNumber(o.ksize) % 2 === 1)) {
      return 'If ksize is given then it must be positive and odd'
    }
  }

  protected _exec(o: EdgeOptions) {
    this.allChannels(o, o => this._execOne(o))
  }

  protected _execOne(o: EdgeOptions) {
    if (o.type === 'sobel') {
      cv.Sobel(o.src, o.dst!, o.ddepth || -1, o.dx!, o.dy!, toNumber(o.ksize || 3), o.scale || 1, o.delta || 0, o.borderType || cv.BORDER_DEFAULT)
    } else if (o.type === 'scharr') {
      cv.Scharr(o.src, o.dst!, o.ddepth || -1, o.dx!, o.dy!, o.scale || 1, o.delta || 0, o.borderType || cv.BORDER_DEFAULT)
    } else if (o.type === 'laplacian') {
      cv.Laplacian(o.src, o.dst!, o.ddepth || -1, toNumber(o.ksize || 1), o.scale || 1, o.delta || 0, o.borderType || cv.BORDER_DEFAULT)
    }
  }
}


import { checkThrow } from 'misc-utils-of-mine-generic'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType } from './types'

export interface EdgeOptions extends OperationExecBaseOptions, EdgeConcreteOptions {
}

export interface EdgeConcreteOptions extends WithBorderType {
  type: 'sobel' | 'scharr' | 'laplacian'
  /**
   * Desired depth of the destination image. Combinations:
```
input           output
CV_8U	          -1/CV_16S/CV_32F/CV_64F
CV_16U/CV_16S	  -1/CV_32F/CV_64F
CV_32F	        -1/CV_32F/CV_64F
CV_64F	        -1/CV_64F
   */
  ddepth?: number
  /**
   * Applies only for Scharr and Sobel (and are mandatory in that case). Also must less than 3
   */
  dx?: number
  /**
 * Applies only for Scharr and Sobel (and are mandatory in that case)
 */
  dy?: number
  /**
   * Aperture size used to compute the second-derivative filters. See getDerivKernels for details. The size must be positive and odd. applies only for Sobel and Laplacian
   */
  ksize?: number
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
  protected async _exec(o: EdgeOptions) {
    if (o.type === 'sobel') {
      checkThrow(typeof o.dx === 'number' && typeof o.dy === 'number' && o.dx < 3 && o.dy < 3, 'dx and dy are mandatory and must be less than 3')
      checkThrow([1, 3, 5, 7].includes(o.ksize || 1), 'If given ksize must be 1, 3, 5, or 7')
      cv.Sobel(o.src, o.dst!, o.ddepth || -1, o.dx, o.dy, o.ksize = 3, o.scale || 1, o.delta || 0, o.borderType || cv.BORDER_DEFAULT)
    } else if (o.type === 'scharr') {
      checkThrow(typeof o.dx === 'number' && typeof o.dy === 'number' && o.dx < 3 && o.dy < 3, 'dx and dy are mandatory and must be less than 3')
      cv.Scharr(o.src, o.dst!, o.ddepth || -1, o.dx, o.dy, o.scale || 1, o.delta || 0, o.borderType || cv.BORDER_DEFAULT)
    } else if (o.type === 'laplacian') {
      checkThrow(typeof o.ksize === 'undefined' || o.ksize > 0 && o.ksize % 2 === 1, 'If given ksize must be positive and odd')
      cv.Laplacian(o.src, o.dst!, o.ddepth || -1, o.ksize || 1, o.scale || 1, o.delta || 0, o.borderType || cv.BORDER_DEFAULT)
    }
  }
}


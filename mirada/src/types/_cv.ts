import { FS } from './emscripten'
import { Algorithm, CV, double, Mat, Size } from './opencv'

declare global {
  var cv: CV & { FS: FS } & { CLAHE: CLAHE }
}


/**
 * Base class for Contrast Limited Adaptive Histogram Equalization.
 */
declare class CLAHE extends Algorithm {
  /**
   * @param clipLimit Threshold for contrast limiting. Default.  40.0,
   * @param totalGridSize Size of grid for histogram equalization. Input image will be divided into equally sized rectangular tiles. tileGridSize defines the number of tiles in row and column. Default: Size(8, 8) 
   */
  constructor(clipLimit?: double, totalGridSize?: Size)
  /**
   * Equalizes the histogram of a grayscale image using Contrast Limited Adaptive Histogram Equalization.
   * @param src Source image of type CV_8UC1 or CV_16UC1.
   * @param dst Destination image.
   */
  apply(src: Mat, dst: Mat): void
  collectGarbage(): void
  /**
   * Returns threshold value for contrast limiting.
   */
  getClipLimit(): double
  /**
   * Returns Size defines the number of tiles in row and column.
   */
  getTilesGridSize(): Size
  /**
   * Sets threshold for contrast limiting.
   */
  setClipLimit(clipLimit: double): void
  /**
   * Sets size of grid for histogram equalization. Input image will be divided into equally sized rectangular tiles.
   * @param tileGridSize defines the number of tiles in row and column.
   */
  setTilesGridSize(tileGridSize: Size): void

}

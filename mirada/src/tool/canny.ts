import { Scalar } from '../types/opencv';
import { ImageToolBaseOptions } from './replaceColor';
import { checkThrow } from 'misc-utils-of-mine-generic';
import { del } from '../util';


export interface CannyOptions extends CannyConcreteOptions, ImageToolBaseOptions {
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

export function canny(o: CannyOptions) {
  checkThrow(!o.apertureSize || o.apertureSize <3 || o.apertureSize % 2 !== 0, 'Aperture size must be odd and greater than 2')
  const dst = o.dst = o.dst || new cv.Mat();
  o.src.copyTo(dst)
  cv.cvtColor(dst, dst, cv.CV_8UC1, 3)
  // dst.create(o.src.rows + 2, o.src.cols + 2, cv.CV_8UC1);
  //  const mask = cv.Mat.zeros(o.dst.rows + 2, dst.cols + 2, cv.CV_8UC1)
  const c = dst.clone()
  cv.Canny(c, dst, typeof o.threshold1==='undefined' ? 0 :o.threshold1, 
  typeof o.threshold2==='undefined' ? 255 :o.threshold2, 
  typeof o.apertureSize==='undefined' ? 3 :o.apertureSize, o.L2gradient||false); // heads up ! dst needs to be bigger!
  // cv.copyMakeBorder(mask, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE) // thatr's why we need to copy again
  del(c)
  return o.dst;
}
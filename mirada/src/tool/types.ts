import { File } from '..';
import { ImageData, Rect, Scalar, Mat , Point} from '../types/opencv';

export interface GrabCutOptions extends Rect {
  image: File;
  /**
   * If given a rectangle frame will be drawn on given coordinates with that color.
   */
  frameColor?: Scalar;
}

export interface GrabCutResult {
  image: ImageData;
}

export interface ImageToolBaseOptions {
  src: Mat,
  dst?: Mat
}

export interface ReplaceColorOptions extends ImageToolBaseOptions {
  lowColor: Range | number[],
  highColor: Range | number[],
  newColorOrImage: Range | number[] | Mat,
}

export interface FloodFillOptions {
  src: Mat;
  seed: Point;
  dst?: Mat;
  preprocess?: FloodFillPreprocess[]
  newColorOrImage?: Scalar | number[] | Mat;
  connectivity?: 4 | 8;
  lowDiff?: Scalar | number[]
  upDiff?: Scalar | number[]
}

export type FloodFillPreprocess = ({ name: 'canny' } & CannyConcreteOptions) | ({ name: 'gaussianBlur' } & GaussianBlurOptions)

export interface GaussianBlurOptions {
  blur?: number;
}

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

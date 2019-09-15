import { BorderTypes, LineTypes, Mat, Point, Scalar, Size, adaptiveThreshold } from 'mirada'
import { AdaptiveThresholdOptions } from './adaptiveThreshold';
import { BilateralFilterOptions } from './bilateralFilter';
import { BitwiseOptions } from './bitwise';
import { BoxFilterOptions } from './boxFilter';
import { CannyOptions } from './canny';
import { CircleOptions } from './circle';
import { ConvertToOptions } from './convertTo';
import { EdgeOptions } from './edge';
import { EllipseOptions } from './ellipse';
import { FloodFillOptions } from './floodFill';


export interface ImageOperation<T extends OperationExecBaseOptions> {
  name: string
  description: string
  /**
   * The operation doesn't support "in-place" modifications. (passing the same mat as src and dst)
   */
  noInPlace: boolean
  /**
   * Does the dst mat need to be of the same size and type as src?
   */
  sameSizeAndType: boolean
  /**
   * The operation implementation doesn't support a dst Mat (always write to src)
   */
  noDst: boolean
  /**
   * valid channel numbers of input images
   */
  validChannels: number[] | undefined
  exec(o?: T): Mat
}

export interface OperationExecBaseOptions {
  src: Mat,
  dst?: Mat
}

export interface WithBorderType {
  /**
   * border mode used to extrapolate pixels outside of the image, see [BorderTypes]
   */
  borderType?: BorderTypes
}

export interface WithBorderValue {
  borderValue?: Scalar
}

export interface WithKSize {
  /**
   * blurring kernel size. In general only odd numbers greater than 2 are accepted 
   */
  ksize: Size,
}

export interface WithChannels {
  /**
   * If true then all channels will be processed independently and then joined to build the result. The only
   * exception is when there are 4 channels and in this case, if channels===true, the last 4th channel will be
   * omitted (alpha). If an array of numbers is given then those channels will be processed only. If not given
   * then the operation will behave normally, processing as single channel image.
   */
  channels?: true | number[]
}

export interface WithLineType {
  /**
   * The type of line drawn. cv.LINE_AA is default and is smoothly than others. 
   */
  lineType: LineTypes,
}

export interface WithColor {
  color: Scalar
}

export interface WithThickness {
  /**
   * Thickness of the shape outline, if positive. Negative values, like [FILLED], mean that a filled circle is to be drawn.
   */
  thickness: number
}

export interface WithShift {
  /**
   * Number of fractional bits in the point coordinates. If greater than 0 it affects bounds for example, 2 will divide bounds values by 2.
   */
  shift: number
}

export interface WithCenter {
  /**
   * Shape's center coordinates
   */
  center: Point
}

// export interface OperationsByName {
//   AdaptiveThreshold: AdaptiveThresholdOptions
//   BilateralFilter: BilateralFilterOptions
//   Bitwise: BitwiseOptions
//   BoxFilter: BoxFilterOptions
//   Canny: CannyOptions
//   Circle: CircleOptions
//   ConvertTo: ConvertToOptions
//   Edge: EdgeOptions
//   Ellipse: EllipseOptions
//   FloodFill: FloodFillOptions
// }
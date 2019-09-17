import { BorderTypes, LineTypes, Mat, Point, Scalar, Size } from 'mirada'
import { SizeRepresentation } from '../util'


export interface ImageOperation<T extends OperationExecBaseOptions> {
  /**
   * Unique name identifying this operation.
   */
  name: string
  /**
   * Operation description paragraph.
   */
  description: string
  /**
   * The operation doesn't support "in-place" modifications. (passing the same mat as [src] and [dst]).
   */
  noInPlace: boolean
  /**
   * Does the dst mat need to be of the same size and type as [src]?.
   */
  sameSizeAndType: boolean
  /**
   * The operation implementation doesn't support a [dst] Mat (always write to src).
   */
  noDst: boolean
  /**
   * Valid channel numbers of input images.
   */
  validChannels: number[] | undefined
  /**
   * If defined, the operation supports options as array, example: `new GaussianBlur().exec(src, dst, 5, 2.2)` and in the form of statements : `GaussianBlur src out1 5 2.2` which could be less verbose alternative.
   */
  optionsOrder?: (keyof T)[]

  exec(...o_: [T] | ((T[keyof T])[])): Mat
}

export interface OperationExecBaseOptions {
  /**
   * Input image.
   */
  src: Mat
  /**
   * Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.
   */
  dst?: Mat
}

export interface WithBorderType {
  /**
   * border mode used to extrapolate pixels outside of the image, see [BorderTypes].
   */
  borderType?: BorderTypes
}

export interface WithBorderValue {
  borderValue?: Scalar
}

export interface WithSize {
  /**
   * Output image or shape size.
   */
  size: Size
}

export interface WithKSize {
  /**
   * Transformation (blurring) kernel size. In general only odd numbers greater than 2 are accepted.
   */
  ksize: SizeRepresentation
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
   * Shape's center coordinates.
   */
  center: Point
}


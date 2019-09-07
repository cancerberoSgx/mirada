import { BorderTypes, Mat, Scalar, Size } from 'mirada'


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
   * valid channel numbers of input images
   */
  validChannels: number[] | undefined
  exec(o?: T): Promise<Mat>
  //TODO field descriptions
  //tODO: 
  // validOptions(o:Partial<GrabCutOptions>):boolean
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

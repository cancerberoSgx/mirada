import { BorderTypes, Mat, Size } from 'mirada'


export interface ImageOperation {
  name: string
  description: string
  //TODO field descriptions
  exec(o: OperationExecBaseOptions): Promise<Mat>
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

export interface WithKSize {
  /**
   * blurring kernel size. In general only odd numbers greater than 2 are accepted 
   */
  ksize: Size,
}

import { Mat, Point, Scalar } from 'mirada'


export interface ImageOperation {
  name: string
  description: string
  //TODO field descriptions
  exec(o: OperationExecBaseOptions): Mat
  //tODO: 
  // validOptions(o:Partial<GrabCutOptions>):boolean
}

export interface OperationExecBaseOptions {
  src: Mat,
  dst?: Mat
}

export interface ReplaceColorOptions extends OperationExecBaseOptions {
  lowColor: Scalar | number[],
  highColor: Scalar | number[],
  newColorOrImage: Scalar | number[] | Mat,
}

export interface FloodFillOptions extends OperationExecBaseOptions {
  seed: Point;
  preprocess?: FloodFillPreprocess[]
  newColorOrImage?: Scalar | number[] | Mat;
  connectivity?: 4 | 8;
  lowDiff?: Scalar | number[]
  upDiff?: Scalar | number[]
}

export type FloodFillPreprocess = ({ name: 'canny' } & CannyConcreteOptions) | ({ name: 'gaussianBlur' } & GaussianBlurConcreteOptions)

export interface GaussianBlurOptions extends OperationExecBaseOptions, GaussianBlurConcreteOptions {
}

export interface GaussianBlurConcreteOptions {
  blur?: number;
}

export interface CannyOptions extends CannyConcreteOptions, OperationExecBaseOptions {
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

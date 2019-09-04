// Scalar, Point, Rect, etc are defined by opencv.js (helpers.js) and we need to declare them manually:

export declare class Range {
  public start: number
  public end: number
  public constructor(start: number, end: number)
}

export declare class Scalar extends Array<number> {
  public static all(...v: number[]): Scalar;
}
// Hack: expose Mat super classes like Mat_, InputArray, Vector, OutputArray we make them alias of Mat to simplify and make it work
export { Mat as InputArray, Mat as InputArrayOfArrays, Mat as InputOutputArray, Mat as InputOutputArrayOfArrays, Mat as MatVector, Mat as OutputArray, Mat as OutputArrayOfArrays } from './Mat'
export { Scalar as GScalar }
export { Point as Point2f }
export { Point as KeyPoint }
export { Point as Point2l }
export { Size as Point2d }
export { Size as Size2d }
export { Size as Size2f }
export { Size as Size2l }
export { Rect as Rect_ }

export declare class Point {
  public constructor(x: number, y: number);
  public x: number;
  public y: number;
}

export declare class Size {
  public constructor(width: number, height: number);
  public width: number;
  public height: number;
}

export declare class Rect {
  public constructor();
  public constructor(point: Point, size: Size);
  public constructor(x: number, y: number, width: number, height: number);
  public x: number;
  public y: number;
  public width: number;
  public height: number;
}

export declare class TermCriteria {
  public type: number
  public maxCount: number
  public epsilon: number
  public constructor()
  public constructor(type: number, maxCount: number, epsilon: number)
}
export declare const TermCriteria_EPS: any
export declare const TermCriteria_COUNT: any
export declare const TermCriteria_MAX_ITER: any

export declare class MinMaxLoc {
  public minVal: number
  public maxVal: number
  public minLoc: Point
  public maxLoc: Point
  public constructor()
  public constructor(minVal: number, maxVal: number, minLoc: Point, maxLoc: Point)
}

// expose emscripten / opencv.js specifics

export declare function exceptionFromPtr(err: number): any
export declare function onRuntimeInitialized(): any
export declare function FS_createDataFile(arg0: string, path: string, data: Uint8Array, arg3: boolean, arg4: boolean, arg5: boolean): any

declare class Vector<T> {
  delete(): void
  get(i: number): T
  get(i: number, j: number, data: any): T
  set(i: number, t: T): void
  put(i: number, j: number, data: any): any
  // size(): number
  push_back(n: T): any
  resize(count: number, value?: T): void
  delete(): void
}

export declare class Vec3d extends Vector<any> { }
export declare class IntVector extends Vector<number> { }
export declare class FloatVector extends Vector<number> { }
export declare class DoubleVector extends Vector<number>{ }
export declare class PointVector extends Vector<Point> { }
export declare class KeyPointVector extends Vector<any> { }
export declare class DMatchVector extends Vector<any> { }
export declare class DMatchVectorVector extends Vector<Vector<any>> { }

export declare class RectVector extends Rect implements Vector<Rect>{
  get(i: number): Rect
  set(i: number, t: Rect): void
  put(i: number, j: number, data: any): any
  size(): number
  push_back(n: Rect): void
  resize(count: number, value?: Rect | undefined): void
  delete(): void
}

export declare class VideoCapture {
  public constructor(videoSource: HTMLVideoElement | string)
  public read(m: Mat): any
  public video: HTMLVideoElement
}



import { LineTypes, Mat, NormTypes, RotatedRect } from '.'
import '../_cv'

export declare function matFromImageData(imageData: ImageData): Mat
export declare function matFromArray(a:number, b:number, type: any, array: number[]): Mat

/** since we don't support inheritance yet we force Mat to extend Mat_ which type defined here: */
export declare class Mat_ extends Vector<Mat> {
  public data: Uint8Array
  public data8S: Int8Array
  public data8U: Uint8Array
  public data16U: Uint16Array
  public data16S: Int16Array
  public data32U: Uint32Array
  public data32S: Int32Array
  public data64F: Float64Array
  public data32F: Float32Array
  public ucharPtr(i: any, j: any): any
  public charPtr(i: any, j: any): any
  public shortPtr(i: any, j: any): any
  public ushortPtr(i: any, j: any): any
  public intPtr(i: any, j: any): any
  public floatPtr(i: any, j: any): any
  public doublePtr(i: any, j: any): any
  public intPtr(i: any, j: any): any
  /**
   * Sometimes, you will have to play with certain region of images. For eye detection in images, first face detection is done all over the image and when face is obtained, we select the face region alone and search for eyes inside it instead of searching whole image. It improves accuracy (because eyes are always on faces) and performance (because we search for a small area)
   */
  public roi(expr: Rect | Mat_, rowRange?: Range, colRange?: Range, res?: Mat_): Mat
}

export declare class ImageData {
  data: ArrayBufferView
  width: number
  height: number
}

// TODO this types should be exposed by the tool - want to make it work:
export declare const CV_8U: CVDataType
export declare const CV_8UC1: CVDataType
export declare const CV_8UC2: CVDataType
export declare const CV_8UC3: CVDataType
export declare const CV_8UC4: CVDataType
export declare const CV_8S: CVDataType
export declare const CV_8SC1: CVDataType
export declare const CV_8SC2: CVDataType
export declare const CV_8SC3: CVDataType
export declare const CV_8SC4: CVDataType
export declare const CV_16U: CVDataType
export declare const CV_16UC1: CVDataType
export declare const CV_16UC2: CVDataType
export declare const CV_16UC3: CVDataType
export declare const CV_16UC4: CVDataType
export declare const CV_16S: CVDataType
export declare const CV_16SC1: CVDataType
export declare const CV_16SC2: CVDataType
export declare const CV_16SC3: CVDataType
export declare const CV_16SC4: CVDataType
export declare const CV_32S: CVDataType
export declare const CV_32SC1: CVDataType
export declare const CV_32SC2: CVDataType
export declare const CV_32SC3: CVDataType
export declare const CV_32SC4: CVDataType
export declare const CV_32F: CVDataType
export declare const CV_32FC1: CVDataType
export declare const CV_32FC2: CVDataType
export declare const CV_32FC3: CVDataType
export declare const CV_32FC4: CVDataType
export declare const CV_64F: CVDataType
export declare const CV_64FC1: CVDataType
export declare const CV_64FC2: CVDataType
export declare const CV_64FC3: CVDataType
export declare const CV_64FC4: CVDataType
export type CVDataType = any
export declare const CV_L2: any

export declare function ellipse1(dst: Mat, rotatedRect: RotatedRect, ellipseColor: Scalar, arg0: number, line: LineTypes): void
export declare function norm1(a: Mat, b: Mat, type: NormTypes): number
export declare function imread(canvasOrImageHtmlElement: HTMLElement | string): Mat
export declare function imshow(canvasSource: HTMLElement | string, mat: Mat): void



// Missing imports: 
export type Mat4 = any
export type Mat3 = any
export type Vec3 = any
export type float_type = any
export type int = any
export type bool = any
export type FileNode = any
export type FileStorage = any
export type Ptr = any
export type size_t = any
export type double = any
export type DMatch = any
export type float = any
export type UMat = any
export type DetectionROI = any
export type Matrix = any
export type BucketKey = any
export type Bucket = any
export type LshStats = any
export type MatAllocator = any
export type uchar = any
export type MatSize = ()=>Size
export type MatStep = any
export type UMatData = any
export type typename = any
export type Vec = any
export type Point_ = any
export type Point3_ = any
export type MatCommaInitializer_ = any
export type MatIterator_ = any
export type MatConstIterator_ = any
export type AccessFlag = any
export type UMatUsageFlags = any
export type _Tp = any
export type Matx_AddOp = any
export type Matx_SubOp = any
export type _T2 = any
export type Matx_ScaleOp = any
export type Matx_MulOp = any
export type Matx_DivOp = any
export type Matx_MatMulOp = any
export type Matx_TOp = any
export type diag_type = any
export type _EqPredicate = any
export type cvhalDFT = any
export type schar = any
export type ushort = any
export type short = any
export type int64 = any
export type ErrorCallback = any
export type unsigned = any
export type uint64 = any
export type float16_t = any
export type AsyncArray = any
export type Net = any
export type Moments = any
export type uint64_t = any
export type uint32_t = any
export type int32_t = any
export type int64_t = any


// Missing imports:

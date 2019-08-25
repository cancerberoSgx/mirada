import { basename } from 'path'
import { notSame } from 'misc-utils-of-mine-generic'
export function renderImportHacks() {
  return `
${scalarTypes()}

${mat_()}

${missingImports()}
  `.trim()
}

function scalarTypes() {
  return `
// Scalar, Point, Rect, etc are defined by opencv.js (helpers.js) and we need to declare them manually:

export declare class Range {
  public start: number
  public end: number
  public constructor(start: number, end: number)
}

export declare class Scalar extends Array<number> {
  public static all(...v: number[]): Scalar;
}
export { Scalar as GScalar }

export declare class Point {
  public constructor(x: number, y: number);
  public x: number;
  public y: number;
}

export { Point as Point2f }
export { Point as KeyPoint }
export { Point as Point2l }

export declare class Size {
  public constructor(width: number, height: number);
  public width: number;
  public height: number;
}

export { Size as Point2d }
export { Size as Size2d }
export { Size as Size2f }
export { Size as Size2l }

export declare class Rect {
  public constructor(x: number, y: number, width: number, height: number);
  public x: number;
  public y: number;
  public width: number;
  public height: number;
}

export { Rect as Rect_ }

export declare class TermCriteria {
  public type: number
  public maxCount: number
  public epsilon: number
  public constructor()
  public constructor(type: number, maxCount: number, epsilon: number)
}

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
  get(i: number): T
  set(i: number, t: T): void
  size(): number
  push_back(n: T): any
  resize(count: number, value?: T): void
  delete(): void
}

export declare class Vec3d extends Vector<any> { }
export declare class IntVector extends Vector<number> { }
export declare class FloatVector extends Vector<number> { }
export declare class DoubleVector extends Vector<number>{ }
export declare class PointVector extends Vector<Point> { }
export declare class RectVector extends Vector<Rect> { }
export declare class KeyPointVector extends Vector<any> { }
export declare class DMatchVector extends Vector<any> { }
export declare class DMatchVectorVector extends Vector<Vector<any>> { }

`
}

function mat_() {
  const alias = ['InputArray', 'OutputArray', 'InputOutputArray', 'InputOutputArrayOfArrays', 'InputArrayOfArrays', 'OutputArrayOfArrays', 'MatVector'].filter(notSame).sort()
  return `
import {Mat} from './Mat'

export declare function  matFromImageData(imageData: ImageData): Mat

// Hack: expose Mat super classes like Mat_, InputArray, Vector, OutputArray we make them alias of Mat to
// simplify and make it work
${alias.map(a => `export { Mat as ${a} } from './Mat'`).join('\n')}

/** since we don't support inheritance yet we force Mat to extend Mat_ which type defined here: */
export declare class Mat_ extends Vector<Mat> {
  public delete(): void
  public data: ImageData
  public ucharPtr(i: number, j: number): any
}

export declare class ImageData {
  data: ArrayBufferView
  width: number
  height: number
}

`.trim()
}


function missingImports() {
  const anys = [
    // 'Moments', 'Matrix', 'BucketKey', 'Bucket', 'LshStats', 'FileNode', 'FileStorage', 'Ptr', 'DMatch', 
    // 'cvhalDFT', 'DetectionROI', 'diag_type', 'Vec', 'Mat4', 'Mat3', 'Vec3', 'float_type', 'GMat', 
    // 'GMatP', 'Net', 'AsyncArray', 'ErrorCallback', '_EqPredicate', 'Matx_AddOp', 'Matx_SubOp', 
    // '_T2', 'Matx_ScaleOp', 'Matx_MulOp', 'Matx_DivOp', 'Matx_MatMulOp', 'Matx_TOp', 'MatAllocator', 
    // 'MatSize', 'MatStep', 'UMatData', 'Vec', 'Point_', 'Point3_', 'MatCommaInitializer_', 
    // 'MatIterator_', 'MatConstIterator_', 'AccessFlag', 'UMatUsageFlags', 'UMat',
  ].filter(notSame).sort()
  return `
${anys.map(a => `export type ${a} = any`).join('\n')}

// TODO this types should be exposed by the tool - want to make it work:
export declare const CV_8UC1: number
export declare const CV_8U: number
export declare const CV_16S: number
export declare const CV_8UC3: any
export declare const CV_32S: number
export declare const CV_8S: number
export declare const CV_8UC4: number
  `.trim()
}


/**
 * I don't master yet doxygen output / cpp bindings exports and I'm currently getting coalitions of names
 * between different modules / groups / classes / structs. In JS we cannot export the same names from index so
 * this is a way of manually preventing some files to be rendered at all . TODO: find a better way.
 */
export function canRenderFileNamed(f: string) {
  const fileBlackList = ['calib3d_fisheye', 'core_basic', 'core_utils_softfloat', 'gapi_filters',
    'gapi_math', 'gapi_matrixop', 'gapi_pixelwise', 'gapi_transform', 'imgproc_hal_functions']
  return !fileBlackList.includes(basename(f, '.d.ts'))
}


import { basename } from 'path'
import { notSame, notSameNotFalsy } from 'misc-utils-of-mine-generic'
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
  public constructor();
  public constructor(point: Point, size: Size);
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
export declare class KeyPointVector extends Vector<any> { }
export declare class DMatchVector extends Vector<any> { }
export declare class DMatchVectorVector extends Vector<Vector<any>> { }

export declare class RectVector extends Rect implements Vector<Rect>{
  get(i: number): Rect
  set(i: number, t: Rect): void   
  size(): number
  push_back(n: Rect):void
  resize(count: number, value?: Rect | undefined): void 
  delete(): void  
}

export declare class VideoCapture {
  public constructor(videoSource: HTMLVideoElement | string)
  public read(m:Mat): any
  public video: HTMLVideoElement
}

`
}

function mat_() {
  const alias = ['InputArray', 'OutputArray', 'InputOutputArray', 'InputOutputArrayOfArrays', 'InputArrayOfArrays', 'OutputArrayOfArrays', 'MatVector'].filter(notSame).sort()
  return `
import {Mat} from '.'

export declare function  matFromImageData(imageData: ImageData): Mat

// Hack: expose Mat super classes like Mat_, InputArray, Vector, OutputArray we make them alias of Mat to simplify and make it work
${alias.map(a => `export { Mat as ${a} } from './Mat'`).join('\n')}

/** since we don't support inheritance yet we force Mat to extend Mat_ which type defined here: */
export declare class Mat_ extends Vector<Mat> {
  public delete(): void
  public data: ImageData
  public data32F: any
  public ucharPtr(i: any, j: any): any
  public charPtr(i: any, j: any): any
  public shortPtr(i: any, j: any): any
  public ushortPtr(i: any, j: any): any
  public intPtr(i: any, j: any): any
  public floatPtr(i: any, j: any): any
  public doublePtr(i: any, j: any): any
  public intPtr(i: any, j: any): any
  public roi(rect: Rect): Mat
}

export declare class ImageData {
  data: ArrayBufferView
  width: number
  height: number
}

`.trim()
}


function missingImports() {
       const cvs  =['CV_8U', 'CV_8UC1', 'CV_8UC2', 'CV_8UC3', 'CV_8UC4', 'CV_8S', 'CV_8SC1', 'CV_8SC2', 'CV_8SC3', 'CV_8SC4', 'CV_16U', 'CV_16UC1', 'CV_16UC2', 'CV_16UC3', 'CV_16UC4', 'CV_16S', 'CV_16SC1', 'CV_16SC2', 'CV_16SC3', 'CV_16SC4', 'CV_32S', 'CV_32SC1', 'CV_32SC2', 'CV_32SC3', 'CV_32SC4', 'CV_32F', 'CV_32FC1', 'CV_32FC2', 'CV_32FC3', 'CV_32FC4', 'CV_64F', 'CV_64FC1', 'CV_64FC2', 'CV_64FC3', 'CV_64FC4', ].filter(notSameNotFalsy)
  return `
// TODO this types should be exposed by the tool - want to make it work:
${cvs.map(c=>`export declare const ${c}: any`).join('\n')}

import {RotatedRect, LineTypes} from '.'
export declare function ellipse1(dst: Mat, rotatedRect: RotatedRect, ellipseColor: Scalar, arg0: number, line: LineTypes): void
export declare function imread(canvasOrImageHtmlElement: HTMLElement | string): Mat
export declare function imshow(canvasSource: HTMLElement | string, mat: Mat): void

import '../_cv'

  `.trim()
}

/**
 * I don't master yet doxygen output / cpp bindings exports and I'm currently getting coalitions of names
 * between different modules / groups / classes / structs. In JS we cannot export the same names from index so
 * this is a way of manually preventing some files to be rendered at all . TODO: find a better way.
 */
export function canRenderFileNamed(f: string) {
  const fileBlackList = ['calib3d_fisheye', 'core_basic', 'core_utils_softfloat', 'gapi_filters',
    'gapi_math', 'gapi_matrixop', 'gapi_pixelwise', 'gapi_transform', 'imgproc_hal_functions'].filter(notSame)
  return !fileBlackList.includes(basename(f, '.ts'))
}


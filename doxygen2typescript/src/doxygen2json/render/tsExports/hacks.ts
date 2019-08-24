import { basename } from 'path'

export function renderImportHacks() {
  return `
${scalarTypes()}
${renderMatHack()}
${renderMiscImportHacks()}
  `.trim()
}

function scalarTypes() {
  return `
// manual types for Scalar, Point, Rect, etc TODO: this should be exposed by the tool but BTW are implemented
// in helpers.js so to make it work we manually expose them here:

export declare class Range {
  public start: number
  public end: number
  public constructor(start: number, end: number)
}

export declare class Scalar extends Array<number> {
  public static all(...v: number[]): Scalar;
}

export declare class Point {
  public constructor(x: number, y: number);
  public x: number;
  public y: number;
}

export { Point as Point2f }

export { Point as Point2l }

export declare class Size {
  public constructor(width: number, height: number);
  public width: number;
  public height: number;
}

export { Size as Point2d }

export { Size as Size2d }

export { Size as Size2l }

export declare class Rect {
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

export declare class MinMaxLoc {
  public minVal: number
  public maxVal: number
  public minLoc: Point
  public maxLoc: Point
  public constructor()
  public constructor(minVal: number, maxVal: number, minLoc: Point, maxLoc: Point)
}
`
}

function renderMiscImportHacks() {
  const anys = [
    'Vec3d', 'Moments',
    'GMat', 'GMatP', 'GScalar',
'Net', 'AsyncArray', 'ErrorCallback', '_EqPredicate',
    'Matx_AddOp', 'Matx_SubOp', '_T2', 'Matx_ScaleOp', 'Matx_MulOp', 'Matx_DivOp', 'Matx_MatMulOp', 'Matx_TOp',
  ]
  return `
// lazy hack: this types should be exposed by the tool - want to make it work
${anys.map(a => `export type ${a} = any`).join('\n')}

// magica or others needs to expose objects in the namespace - do it in that file that won't be touched
export * from '../_opencvCustom'

export declare function exceptionFromPtr(err: number): TODO

export declare function onRuntimeInitialized:():void

export declare function FS_createDataFile(arg0: string, path: string, data: Uint8Array, arg3: boolean, arg4: boolean, arg5: boolean): TODO

export declare const  CV_8UC1: number

export declare const CV_8U: number

export declare const CV_16S: number

export declare const CV_8UC3: TODO

export declare const CV_32S: number

export declare const CV_8S: number

export declare const CV_8UC4: number
  `
}

function renderMatHack() {
  const alias = ['InputArray', 'OutputArray', 'InputOutputArray', 'InputOutputArrayOfArrays', 'InputArrayOfArrays', 'OutputArrayOfArrays']
  return `
// hack to expose Mat super classes like Mat_, InputArray, OutputArray we  make them alias of Mat to simplify
// and make it work
${alias.map(a => `export { Mat as ${a} } from './Mat'`).join('\n')}

/** since we don't support inheritance yet we force Mat to extend Mat_ which type defined here: */
export declare class Mat_ {
public delete(): void
  public ucharPtr(i: number, j: number):any
  public data: ImageData
}

import {Mat} from './Mat'
export declare function  matFromImageData(imageData: ImageData): Mat

export interface ImageData {
  data: ArrayBufferView
  width: number;
  height: number;
}

`
}
 
/**
 * I don't master yet doxygen output / cpp bindings exports and I'm currently getting coalissions of names
 * between different modules / groups / classes / structs. In JS we cannot export the same names from index so
 * this is a way of manually preventing some files to be rendered at all . TODO: find a better way.
 */
export function canRenderFileNamed(f: string) {
  return !fileBlackList.includes(basename(f, '.ts'))
}
const fileBlackList = ['calib3d_fisheye', 'core_basic', 'core_utils_softfloat', 'gapi_filters',
  'gapi_math', 'gapi_matrixop', 'gapi_pixelwise', 'gapi_transform', 'imgproc_hal_functions']

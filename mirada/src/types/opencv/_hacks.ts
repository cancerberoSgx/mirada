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

// hack to expose Mat super classes like Mat_, InputArray, OutputArray we  make them alias of Mat to simplify and make it work
export { Mat as InputArray } from './Mat'
export { Mat as OutputArray } from './Mat'
export { Mat as InputOutputArray } from './Mat'
export { Mat as InputOutputArrayOfArrays } from './Mat'
export { Mat as InputArrayOfArrays } from './Mat'
export { Mat as OutputArrayOfArrays } from './Mat'

/** since we don't support inheritance yet we force Mat to extend Mat_ which type defined here: */
export declare class Mat_ {
public delete(): void
  public data: ImageData
  public ucharPtr(i: number, j: number): any
  public delete(): any
}

import {Mat} from './Mat'
export declare function  matFromImageData(imageData: ImageData): Mat

export interface ImageData {
  data: ArrayBufferView
  width: number
  height: number
}

// lazy hack: this types should be exposed by the tool - want to make it work
export type Vec3d = any
export type Moments = any
export type GMat = any
export type GMatP = any
export type GScalar = any
export type Net = any
export type AsyncArray = any
export type ErrorCallback = any
export type _EqPredicate = any
export type Matx_AddOp = any
export type Matx_SubOp = any
export type _T2 = any
export type Matx_ScaleOp = any
export type Matx_MulOp = any
export type Matx_DivOp = any
export type Matx_MatMulOp = any
export type Matx_TOp = any

// magica or others needs to expose objects in the namespace - do it in that file that won't be touched
export * from '../_opencvCustom'

export declare function exceptionFromPtr(err: number): any

export declare function onRuntimeInitialized(): any

export declare function FS_createDataFile(arg0: string, path: string, data: Uint8Array, arg3: boolean, arg4: boolean, arg5: boolean): any

export declare const CV_8UC1: number

export declare const CV_8U: number

export declare const CV_16S: number

export declare const CV_8UC3: any

export declare const CV_32S: number

export declare const CV_8S: number

export declare const CV_8UC4: number
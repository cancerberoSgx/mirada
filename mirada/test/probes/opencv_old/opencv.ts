// import { TODO } from 'misc-utils-of-mine-generic'
// import { BorderTypes, CVCoreBorder } from './coreBoder'
// import { FS } from '../emscripten'
// import { CVImgProc, LineTypes } from './imgproc'
// import { Scalar, Rect, Point, Size } from './scalars';

// export interface CV extends CV_WASM, CVImgProc, CVCoreBorder {
//   Scalar: typeof Scalar;
//   Rect: typeof Rect
//   rectangle(src: Mat, point1: Point, point2: Point, color: Scalar, thickness?: number, lineType?: LineTypes, shift?: number): void;
//   dilate(src: Mat, dst: Mat, M: Mat, anchor: Point, iterations: number, borderType: BorderTypes, borderValue: Scalar): TODO
//   morphologyDefaultBorderValue(): TODO
//   Point: typeof Point
//   Size: typeof Size

//   CV_8UC1: number
//   CV_8U: number
//   CV_16S: number
//   CV_8UC3: TODO
//   CV_32S: number
//   CV_8S: number
//   CV_8UC4: number

//   /**
//    * Important, this method was modified by OpenCv.js and only works on the browser accepting an html canvas or image element id
//    */
//   imshow(canvasOrImgId: string, dst: Mat): TODO

//   /**
//    * Important, this method was modified by OpenCv.js and only works on the browser accepting an html canvas or image element id
//    */
//   imread(canvasOrImgId: string): Mat

//   getBuildInformation(): string

//   Mat: typeof Mat

//   matFromImageData(imageData: ImageData): Mat
// }
// export type InputArray = Mat
// export type OutputArray = Mat

// export interface ImageData {
//   data: ArrayBufferView
//   width: number;
//   height: number;
// }

// export declare class Mat {
//   public constructor(rows?: number, cols?: number, type?: number)
//   public cols: number
//   public rows: number
//   public data: Uint8ClampedArray
//   public ucharPtr(i: number, j: number): TODO
//   static ones(arg0: number, arg1: number, CV_8U: number): Mat
//   public convertTo(img: Mat, CV_8U: number, scale: number, shift: number): void
//   public type(): number
//   public delete(): void
// }

// interface CV_WASM {
//   exceptionFromPtr(err: number): TODO
//   onRuntimeInitialized: () => void
//   FS: FS
//   FS_createDataFile(arg0: string, path: string, data: Uint8Array, arg3: boolean, arg4: boolean, arg5: boolean): TODO
// }

// declare global {
//   var cv: CV
// }

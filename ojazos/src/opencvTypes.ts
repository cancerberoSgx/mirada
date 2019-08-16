import { FS } from './emscriptenFs'
import { TODO } from 'misc-utils-of-mine-generic';

export interface CV extends CV_WASM {
  rectangle(src: Mat, point1: Point, point2: Point, color: Scalar): TODO;
  GC_INIT_WITH_RECT: TODO;
  Scalar: typeof Scalar;
  Rect:typeof Rect
  COLOR_RGBA2RGB: string;
  dilate(src: Mat, dst: Mat, M: Mat, anchor: Point, arg4: number, BORDER_CONSTANT: TODO, arg6: TODO): TODO
  grabCut(src: Mat, mask: Mat, rect: TODO, bgdModel: Mat, fgdModel: Mat, arg5: number, GC_INIT_WITH_RECT: TODO): TODO;
  morphologyDefaultBorderValue(): TODO
  Point: typeof Point
  Mat: typeof Mat
  Size: typeof Size
  CV_8UC3: TODO
  BORDER_CONSTANT(src: Mat, dst: Mat, M: Mat, anchor: Point, arg4: number, BORDER_CONSTANT: TODO, arg6: TODO): TODO
  COLOR_RGB2RGBA: string
  COLOR_GRAY2RGBA: string
  CV_8UC1: TODO
  CV_8U: number
  CV_16S: number
  CV_32S: number
  CV_8S: number
  CV_8UC4: number
  COLOR_RGBA2GRAY: string
  imshow(canvasOrImgId: string, dst: Mat): TODO
  imread(canvasOrImgId: string): Mat
  cvtColor(src: TODO, dst: Mat, color: string, arg?:number): TODO
  getBuildInformation(): string
  matFromImageData(imageData: ImageData): Mat
}
export declare class Mat {
  ucharPtr(i: number, j: number): TODO 
  static ones(arg0: number, arg1: number, CV_8U: number): Mat 
  public cols: number
  public rows: number
  public convertTo(img: Mat, CV_8U: number, scale: number, shift: number): void
  public type(): number
  public constructor(rows?: number, cols?: number, type?: number)
  public delete(): void
  public data: Uint8ClampedArray
}

declare class  Scalar extends Array<number> {
static all(...v:number[]):Scalar
}

declare class Point {
  constructor(x:number,y:number)
  public x:number
  public y:number
}

declare class Size {
  constructor(width:number,height:number)
  public width:number
  public height:number
}

declare class Rect  {
  constructor(x:number,y:number,width:number,height:number)
  public x:number
  public y:number  
  public width:number
  public height:number
}

interface CV_WASM {
  exceptionFromPtr(err: number): TODO
  onRuntimeInitialized: () => void
  FS: FS
  FS_createDataFile(arg0: string, path: string, data: Uint8Array, arg3: boolean, arg4: boolean, arg5: boolean): TODO
}

declare global {
  var cv:CV
}
import { FS } from './emscriptenFs'

export interface CV extends CV_WASM {
  rectangle(src: Mat, point1: Point, point2: Point, color: Scalar): any;
  GC_INIT_WITH_RECT: any;
  Scalar: typeof Scalar;
  Rect:typeof Rect
  grabCut(src: Mat, mask: Mat, rect: any, bgdModel: Mat, fgdModel: Mat, arg5: number, GC_INIT_WITH_RECT: any): any;
  COLOR_RGBA2RGB: string;
  dilate(src: Mat, dst: Mat, M: Mat, anchor: Point, arg4: number, BORDER_CONSTANT: any, arg6: any): any
  morphologyDefaultBorderValue(): any
  BORDER_CONSTANT(src: Mat, dst: Mat, M: Mat, anchor: Point, arg4: number, BORDER_CONSTANT: Border, arg6: any): any
  Point: typeof Point
  Size: typeof Size
  CV_8UC3: any
  COLOR_RGB2RGBA: string
  COLOR_GRAY2RGBA: string
  CV_8UC1: any
  CV_8U: number
  CV_16S: number
  CV_32S: number
  CV_8S: number
  CV_8UC4: number
  COLOR_RGBA2GRAY: string
  imshow(canvasOrImgId: string, dst: Mat): any
  cvtColor(src: any, dst: Mat, color: string, arg:number): any
  Mat: typeof Mat
  imread(canvasOrImgId: string): Mat
  getBuildInformation(): string
  matFromImageData(imageData: ImageData): Mat
}
type Border = (src: Mat, dst: Mat, M: Mat, anchor: Point, arg4: number, BORDER_CONSTANT: any, arg6: any) => any
export declare class Mat {
  ucharPtr(i: number, j: number): any 
  static ones(arg0: number, arg1: number, CV_8U: number): Mat 
  public cols: number
  public rows: number
  public convertTo(img: Mat, CV_8U: number, scale: number, shift: number): void
  public type(): number
  public constructor(rows?: number, cols?: number, type?: number)
  public delete(): void
  public data: Uint8ClampedArray
}
declare class  Scalar extends Array<any >{
// constructor(a:number,b:number,c:number)
static all(v:number):Scalar
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
  exceptionFromPtr(err: number): any
  onRuntimeInitialized: () => void
  FS: FS
  FS_createDataFile(arg0: string, path: string, data: Uint8Array, arg3: boolean, arg4: boolean, arg5: boolean): any
}

declare global {
  var cv:CV
}
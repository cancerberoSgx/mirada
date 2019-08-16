import {FS} from './emscriptenFs'

export interface CV extends CV_WASM {
  CV_8UC3: any;
  COLOR_RGB2RGBA: string;
  COLOR_GRAY2RGBA: string;
  CV_8UC1: any;
  CV_8U: number;
  CV_16S: number;
  CV_32S: number;
  CV_8S: number;
  CV_8UC4:number
  COLOR_RGBA2GRAY:string
  imshow(canvasOrImgId: string, dst: Mat): any;
  cvtColor(src: any, dst: Mat, color: string): any;
  Mat: typeof Mat;
  imread(canvasOrImgId: string): Mat;
  getBuildInformation(): string
  matFromImageData (imageData: ImageData):Mat
}

export declare class Mat{
  public cols: number;
  public rows: number;
  public convertTo(img: Mat, CV_8U: number, scale: number, shift: number):void
  public type(): number
  public constructor(  rows?:number, cols?:number, type?:number)
  public delete():void
  public data:Uint8ClampedArray
}

interface CV_WASM {
  exceptionFromPtr(err: number): any
  onRuntimeInitialized: () => void
  FS:FS
  FS_createDataFile(arg0: string, path: string, data: Uint8Array, arg3: boolean, arg4: boolean, arg5: boolean): any
}


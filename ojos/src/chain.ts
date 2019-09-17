import { BorderTypes, CVDataType, File, Mat, Point, Rect, toRgba, jsonStringifyWithMat } from 'mirada'
import { Filter2D, ImageOperation, OperationExecBaseOptions, Filter2DConcreteOptions, Filter2DOptions, Threshold, OperationOptions, OperationExecParams, ToRgbaOptions, ToRgba, Roi } from './op'
import { RemoveProperties } from 'misc-utils-of-mine-generic'

type Params<T extends OperationExecBaseOptions> =  [RemoveProperties<T,'src'|'dst' >] | [...(T[keyof T])[]]


export class Chain {
  mode: 'map'|'array'
  constructor(protected mat: Mat = new cv.Mat()) {
    this.mode='map'//='map'|'array'
  }

  filter2D(...args: Params<Filter2DOptions>) {
    // // const p = new Filter2D({src: this.mat, dst: this.mat, ...o})
    // const p = new Filter2D()
    // const options =   p.resolveOptionsObject(...args as OperationExecParams<Filter2DOptions>  )
    // if(!options){
    //   throw new Error('Invalid properties given for '+p.name+' which were '+jsonStringifyWithMat(args))
    // }
    // p.exec({...options, src: this.mat, dst: this.mat})
    // // new Filter2D(this.mat, this.mat, )>
    // // cv.filter2D(this.mat, this.mat, depth, kernel, anchor, delta, border)
    // return this
    return this.handle(args, Filter2D)
  }

  toRgba(...args: Params<ToRgbaOptions>) {
    return this.handle(args, ToRgba)
  }

  private handle(args: Params<ToRgbaOptions>, Class : any) {
    const p = new Class();
    if(args.length===1) {
      Object.assign(args[0], {src: this.mat, dst: this.mat })
    }else {
      args=[this.mat, this.mat, ...args as any]
    }
      const options = p.resolveOptionsObject(...args );
      if (!options) {
      throw new Error('Invalid properties given for ' + p.name + ' which were ' + jsonStringifyWithMat(args));
    }
    console.log(options);
    
    p.exec(options);
      return this;
  }

  roi(...args: Params<ToRgbaOptions>) {
    // const dst = this.mat.roi(expr)
    // this.mat.delete()
    // this.mat = dst
    // return this
    return this.handle(args, Roi)
  }

  asFile(name?: string) {
    return File.fromMat(this.mat, name)
  }

  static fromFile(f:File){
    return new Chain(f.asMat())
  }
}

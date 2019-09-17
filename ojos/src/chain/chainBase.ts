import { File, jsonStringifyWithMat, Mat } from 'mirada'
import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { OperationExecBaseOptions } from '../op'
import { Chain } from './chain'

export type Params<T extends OperationExecBaseOptions> = [RemoveProperties<T, 'src' | 'dst'>] | [...(RemoveProperties<T, 'src' | 'dst'>[keyof RemoveProperties<T, 'src' | 'dst'>])[]]

export class ChainBase {
  protected _mode: 'map' | 'array'

  constructor(protected mat: Mat = new cv.Mat()) {
    this._mode = 'map'
  }

  protected handle(args: any, Class: any) {
    const p = new Class()
    if (this._mode === 'map') {
      Object.assign(args[0], { src: this.mat, dst: this.mat })
    } else {
      args = [this.mat, this.mat, ...args]
    }
    const options = p.resolveOptionsObject(...args)
    if (!options) {
      throw new Error('Invalid properties given for ' + p.name + ' which were ' + jsonStringifyWithMat(args))
    }
    p.exec(options)
    return this
  }

  static fromFile(f: File) {
    return new Chain(f.asMat())
  }

  mode(mode: 'map' | 'array') {
    this._mode = mode
    return this
  }

  asFile(name?: string) {
    return File.fromMat(this.mat, name)
  }

}

import { del, isSize, Mat } from 'mirada'
import { array, checkThrow, RemoveProperties } from 'misc-utils-of-mine-generic'
import { toSize } from '../util'
import { ImageOperation, OperationExecBaseOptions, WithChannels, WithKSize } from './types'

export type MandatoryDst<T extends OperationExecBaseOptions> = RemoveProperties<T, 'dst'> & { dst: Mat }

export abstract class AbstractOperation<T extends OperationExecBaseOptions> implements ImageOperation<T> {
  abstract name: string;
  description: string = 'TODO'
  noInPlace = false
  sameSizeAndType = false
  isInPlace = false
  noDst = false
  protected validateEachExec = false
  protected validated = false

  validChannels: number[] | undefined = undefined

  constructor(protected defaultOptions?: T) {

  }

  protected validate(o: T): string | undefined {
    return
  }

  protected abstract _exec(o: MandatoryDst<T>): void

  exec(o?: T) {
    const options = this.checkOptions(o)
    this.checkInPlaceBefore(options)
    if (!this.validated || this.validateEachExec) {
      var s = this.validate(options as T)
      if (s) {
        throw new Error(`${this.name} validation error: ${s}`)
      }
      this.validated = true
    }
    this._exec(options as any)
    this.checkInPlaceAfter(options)
    this.afterExec(options as any)
    return options.dst!
  }

  protected afterExec(options: MandatoryDst<T>) {
  }

  protected checkInputImage(o: T) {
  }

  protected checkOptions(o?: T) {
    if (!o && !this.defaultOptions) {
      throw new Error('No options provided not in the constructor or in exec() call. Aborting.')
    }
    Object.assign(o, this.defaultOptions, o)
    const options: T = o as T
    this.checkInputImage(options)
    if (this.validChannels && this.validChannels.length && !this.validChannels.includes(options.src.channels())) {
      throw new Error(`Invalid number of channels for input image which has ${options.src.channels()} and must be in [${this.validChannels.join(',')}]`)
    }
    if (isSize(toSize((options as any as WithKSize).ksize))) {
      const ksize = toSize((options as any as WithKSize).ksize)
      ksize.width = ksize.width < 3 ? 3 : ksize.width % 2 !== 1 ? ksize.width - 1 : ksize.width
      ksize.height = ksize.height < 3 ? 3 : ksize.height % 2 !== 1 ? ksize.height - 1 : ksize.height
    }
    this.checkDst(options)
    return options
  }

  protected checkDst(options: T) {
    if (!options.dst) {
      if (this.noDst) {
        options.dst = options.src.clone()
      }
      else if (this.sameSizeAndType) {
        options.dst = cv.Mat.zeros(options.src.rows, options.src.cols, options.src.type())
      }
      else {
        options.dst = new cv.Mat()
      }
    }
    else {
      if (this.noDst) {
        options.src.copyTo(options.dst)
      }
    }
  }

  protected checkInPlaceBefore(o: OperationExecBaseOptions) {
    if (this.noInPlace && o.dst === o.src) {
      this.isInPlace = true
      o.dst = o.src.clone()
    } else {
      this.isInPlace = false
    }
  }

  protected checkInPlaceAfter(o: OperationExecBaseOptions) {
    if (this.isInPlace && this.noInPlace && o.dst) {
      this.isInPlace = false
      o.dst.copyTo(o.src)
      checkThrow(o.dst !== o.src, 'Expected src and dst to be different objects')
      o.dst.delete()
      o.dst = o.src
    }
  }

  protected allChannels(o: T & WithChannels, op: (o: T) => void) {
    if (o.src.channels() === 1 || !o.channels) {
      op(o)
    } else {
      let rgbaPlanes = new cv.MatVector()
      cv.split(o.src, rgbaPlanes)
      const mats: Mat[] = [];
      (Array.isArray(o.channels) ? o.channels : array(o.src.channels() === 4 ? 3 : o.src.channels())).forEach(i => {
        const M = rgbaPlanes.get(i)
        mats.push(M)
        op({ ...o, src: M, dst: M })
      })
      cv.merge(rgbaPlanes, o.dst!)
      del(...mats, rgbaPlanes)
    }
  }
}

import { Mat, isSize } from 'mirada'
import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { ImageOperation, OperationExecBaseOptions, WithKSize } from './types'

export type MandatoryDst<T extends OperationExecBaseOptions> = RemoveProperties<T, 'dst'> & { dst: Mat }

export abstract class AbstractOperation<T extends OperationExecBaseOptions> implements ImageOperation<T> {
  abstract name: string;
  description: string = 'TODO'
  noInPlace = false
  sameSizeAndType = false
  protected isInPlace = false
  validChannels: number[] | undefined = undefined

  constructor(protected defaultOptions?: T) {

  }

  protected abstract _exec(o: MandatoryDst<T>): Promise<void>

  async exec(o?: T) {
    const options = this.checkOptions(o)
    this.checkInPlaceBefore(options)
    await this._exec(options)
    this.checkInPlaceAfter(options)
    return options.dst!
  }

  protected checkOptions(o?: T) {
    if (!o && !this.defaultOptions) {
      throw new Error('No options provided not in the constructor or in exec() call. Aborting.')
    }
    Object.assign(o, this.defaultOptions, o)
    const options: T = o as T
    if (this.validChannels && this.validChannels.length && !this.validChannels.includes(options.src.channels())) {
      throw new Error(`Invalid number of channels for input image which has ${options.src.channels()} and must be in [${this.validChannels.join(',')}]`)
    }
    if (isSize((options as any as WithKSize).ksize)) {
      const ksize = (options as any as WithKSize).ksize
      ksize.width = ksize.width < 3 ? 3 : ksize.width % 2 !== 1 ? ksize.width - 1 : ksize.width
      ksize.height = ksize.height < 3 ? 3 : ksize.height % 2 !== 1 ? ksize.height - 1 : ksize.height
    }
    if (!options.dst) {
      if (this.sameSizeAndType) {
        options.dst = cv.Mat.zeros(options.src.rows, options.src.cols, options.src.type())
      } else {
        options.dst = new cv.Mat()
      }
    }
    return options as MandatoryDst<T>
  }

  protected checkInPlaceBefore(o: OperationExecBaseOptions) {
    if (this.noInPlace && o.dst === o.src) {
      this.isInPlace = true
      o.dst = o.src.clone()
    }
  }

  protected checkInPlaceAfter(o: OperationExecBaseOptions) {
    if (this.isInPlace && this.noInPlace && o.dst) {
      this.isInPlace = false
      o.dst.copyTo(o.src)
      o.dst.delete()
      o.dst = o.src
    }
  }
}

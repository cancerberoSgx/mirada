import { del, Size, Mat } from 'mirada'
import { array } from 'misc-utils-of-mine-generic'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface HistEqualizationOptions extends OperationExecBaseOptions, HistEqualizationConcreteOptions {
}

export interface HistEqualizationConcreteOptions {
  mode: 'equalizeHist' | 'CLAHE'
  /**
   * Applies only when [mode] is 'CLAHE'
   */
  clipLimit?: number
  /**
  * Applies only when [mode] is 'CLAHE'
  */
  tileGridSize?: Size
}

export class HistEqualization extends AbstractOperation<HistEqualizationOptions> {
  name = "HistEqualization"
  description = "Applies histogram equalization using cv.equalizeHist or cv.CLAHE. In case src image has multiple channels, equalization is applied on each of them independently and then the result is merged"

  protected async _exec(o: HistEqualizationOptions) {
    if (o.src.channels() === 1) {
      this.histEqualizationOne(o)
    } else {
      let rgbaPlanes = new cv.MatVector()
      cv.split(o.src, rgbaPlanes)
      const mats :Mat[] = []
      array(o.src.channels()).forEach(i =>{
      const M = rgbaPlanes.get(i)
      mats.push(M)
        this.histEqualizationOne({ ...o, src: M, dst: M })
        }      )
      cv.merge(rgbaPlanes, o.dst!)
      del(...mats, rgbaPlanes)
    }
  }

  protected histEqualizationOne(o: HistEqualizationOptions) {
    if (o.mode === 'equalizeHist') {
      cv.equalizeHist(o.src, o.dst!)
    } else {
      //@ts-ignore
      let clahe = new cv.CLAHE(o.clipLimit || 1, o.tileGridSize || new cv.Size(8, 8))
      clahe.apply(o.src, o.dst!)
      del(clahe)
    }
  }
}


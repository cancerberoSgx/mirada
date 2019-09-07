import { del, Size } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithChannels } from './types'

export interface HistEqualizationOptions extends OperationExecBaseOptions, HistEqualizationConcreteOptions {
}

export interface HistEqualizationConcreteOptions extends WithChannels {
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
    this.allChannels(o, o.channels || true, o => this.histEqualizationOne(o))
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


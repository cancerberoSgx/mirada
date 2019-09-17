import { get, set } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithChannels } from './types'

export interface WaveOptions extends WaveConcreteOptions, OperationExecBaseOptions {
}

export interface WaveConcreteOptions extends WithChannels {
  type: 'vertical' //| 'horizontal' | 'both' 
  amplitude: number
  frequency: number
}

/**
 *  
 */
export class Wave extends AbstractOperation<WaveOptions> {
  name = "Wave"
  description = 'Waving like image warp'

  protected _exec(o: WaveOptions) {
    this.allChannels(o, o => this._execOne(o))
  }

  protected _execOne(o: WaveOptions) {
    if (o.type === 'vertical') {
      for (let y = 0; y < o.src.rows; y++) {
        for (let x = 0; x < o.src.cols; x++) {
          let vx = Math.round(o.amplitude * Math.sin(2 * Math.PI * y * o.frequency))
          vx = vx > 0 ? vx : (vx + o.src!.cols)
          vx = (vx < o.src!.cols) ? vx : (vx - o.src!.cols)
          const vy = 0
          set(o.dst!, x, y, get(o.dst!, x + vx, y + vy))
        }
      }
    }
    else {
      throw new Error('Not implemented')
    }

  }
}

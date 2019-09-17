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
  description = ' '

  protected _exec(o: WaveOptions) {
    this.allChannels(o, o => this._execOne(o))
  }

  protected _execOne(o: WaveOptions) {
    if (o.type === 'vertical') {
      for (let y = 0; y < o.src.rows; y++) {
        for (let x = 0; x < o.src.cols; x++) {
          // const xo = Math.round(8.0 * Math.sin(2.0 * Math.PI * y / 128.0));
          // const yo = Math.round(8.0 * Math.cos(2.0 * Math.PI * x / 128.0));
          //         set(o.dst!, x, y, get(o.dst!,(x + xo + o.dst!.cols) % o.dst!.cols, (y + yo + o.dst!.rows) % o.dst!.rows))
          // dest[y][x] = src[(y + yo + rows) % rows][(x + xo + cols) % cols];
          let vx = Math.round(o.amplitude * Math.sin(2 * Math.PI * y * o.frequency))
          vx = vx > 0 ? vx : (vx + o.src!.cols)//Math.round(70* Math.sin(2*Math.PI*y/128*-1))
          vx = (vx < o.src!.cols) ? vx : (vx - o.src!.cols)
          // let vx = 0
          //         let vy =Math.round(70* Math.sin(2*Math.PI*x/128))
          // vy = (vy> 0) ? vy : (vy+o.src!.rows)//Math.round(70* Math.sin(2*Math.PI*y/128*-1))
          // vy= (vy<o.src!.rows)?vy : (vy-o.src!.rows)
          const vy = 0
          // if(x+v<o.src.cols) {
          set(o.dst!, x, y, get(o.dst!, x + vx, y + vy))
          // }else {
          // set(o.dst!, x, y, 0 as any)
          // }
          // const vx = Math.round(x+v)%(o.src.cols-1)
          // const vy = y
          // set(o.dst!, Math.round(vx), Math.round(vy), get(o.dst!, x, y))
          // wave1:x(u,v)=u+20sin(2πv/128);y(u,v)=v;

          // const        offset_y = 0
          // if (x+offset_x < o.src.rows){
          // const offset_x = Math.round(25.0 * Math.sin(2 * 3.14 * y / 180))
          // o.dst!.data[]
          // o.dst!.data[y*o.src.cols+x] = o.dst!.data[y*o.src.cols + ((x+offset_x)%o.src.cols)]
          // set(o.dst!, j,i, get(o.src,  (j+offset_x)%o.src.cols, i))
          // }else {
          // set(o.dst!, j,i, 0 as any)
          //  o.dst!.data[y*o.src.cols+x]=0
        }
      }
      // for i in range(rows):
      //     for j in range(cols):
      //         offset_x = int(25.0 * math.sin(2 * 3.14 * i / 180))
      //         offset_y = 0
      //         if j+offset_x < rows:
      //             img_output[i,j] = img[i,(j+offset_x)%cols]
      //         else:
      //             img_output[i,j] = 0

      // }
    }
    else {
      throw new Error('Not implemented')
    }

  }
}

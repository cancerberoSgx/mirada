import { Emitter, unique } from 'misc-utils-of-mine-generic'
import { State } from '../../app/state'
import { getStore } from '../../app/store'
import { ImageWidget } from './imageWidget'

export interface Tool extends Emitter {
  setActive(b: boolean): void;
  active: boolean;
  name: string
  description: string
}

export abstract class AbstractTool extends Emitter implements Tool {
  active = false;
  name = unique('abstractTool')
  protected ctx: CanvasRenderingContext2D;
  description = 'TODO'
  protected options: Required<Options>
  constructor(protected image: ImageWidget, options?: Options) {
    super()
    this.options = { ...defaultToolOptions, ...options }
    this.ctx = this.image.canvas.getContext("2d")!
  }
  setActive(b: boolean) {
    this.active = b
    this.setState({
      activeTools: [...this.state.activeTools.filter(t => t !== this), ...b ? [this] : []]
    })
  }
  add(l: (e: SelectionEvent<'selection'>) => void) {
    super.add(l)
  }
  get state() {
    return getStore().getState()
  }
  setState(s: Partial<State>) {
    getStore().setState(s)
  }
}

type Events = 'selection'

interface SelectionEvent<N extends Events> {
  name: N;
  rect: Rectangle;
}

export interface Options {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  mouseMoveThrottle?: number;
}

export const defaultToolOptions: Required<Options> = {
  strokeStyle: 'black',
  lineWidth: 10,
  fillStyle: 'rgba(100,200,90, .5)',
  mouseMoveThrottle: 50
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const tools: Tool[] = []

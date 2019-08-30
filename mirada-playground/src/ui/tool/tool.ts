import { Emitter, unique, checkThrow } from 'misc-utils-of-mine-generic'
import { State, Rectangle } from '../../app/state'
import { getStore } from '../../app/store'
import { ImageWidget } from './imageWidget'
import { notUndefined } from 'misc-utils-of-mine-typescript';
import { AbstractComponent } from '../common/component';
import { ToolView } from './toolView';

export interface Tool<V extends ToolView = ToolView> extends Emitter {
  setActive(b: boolean): void;
  active: boolean;
  name: string
  description: string
  // getView():  ()=>V 
  viewClass: typeof ToolView 
}

export abstract class AbstractTool<V extends ToolView = ToolView> extends Emitter implements Tool<V> {
  active = false;
  view: V = null as any
viewClass: typeof ToolView = null as any
//  getView(): ()=>V {
//    checkThrow(this.viewClass, 'Expected to have a view class, ')
//    if(!this.view ){
//      this.view = new (this.viewClass as any)({}, this.state, this)
//    }
//    return ()=>this.view
// }

  // protected installView(v: typeof ToolView) {
  //   this.viewClass = new (v as any)({}, this.state, this)
  // }

  name = unique('abstractTool')
  description = 'TODO'
  protected ctx: CanvasRenderingContext2D;
  protected options: Required<Options>
  constructor(protected image: ImageWidget, options?: Options) {
    super()
    this.options = { ...defaultToolOptions, ...options }
    this.ctx = this.image.canvas.getContext("2d")!
  }
  setActive(b: boolean) {
    this.active = b
    const activeTools = [...this.state.activeTools.filter(t => t !== this), ...(b ? [this] : [])].filter(notUndefined)
    debugger
    this.setState({
      activeTools
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
  rect: Rectangle
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

export const tools: Tool[] = []

import { Emitter, unique } from 'misc-utils-of-mine-generic'
import { Rectangle, State } from '../../app/state'
import { getStore } from '../../app/store'
import { AbstractComponent, AbstractProps } from '../common/component'
// import { ComponentWithFields } from '../common/componentWithFields'
import { ImageWidget } from '../imageEditor/imageWidget'

export interface Tool extends Emitter {
  setActive(b: boolean): void;
  active: boolean;
  activeExclusive: boolean
  name: string
  description: string
  toolGroupIndex: number
     handleToolGroupVisibleToggle(toolGroupIndex: number) :void
  // toolGroupIndex 
  // viewClass: typeof ToolView
}

//  export abstract class ToolView extends AbstractComponent { 
//    abstract tool: Tool
//   }
export interface ToolViewProps extends AbstractProps { tool: Tool }
// type Constructor<T = {}> = new (...args: any[]) => T
// function TToolView<TBase extends Constructor>(Base: TBase) {
//   return class extends AbstractComponent<AbstractProps & { tool: Tool }, State>{
//     tool: Tool = null as any
//   }
// }

export abstract class AbstractTool extends Emitter {
  active = false;
  activeExclusive = false
  viewClass: typeof AbstractComponent = null as any
abstract toolGroupIndex:number
  name = unique('abstractTool')
  description = 'TODO'
  protected ctx: CanvasRenderingContext2D;
  // protected options: Required<Options>
  constructor(protected image: ImageWidget) {
    super()
    // this.options = { ...defaultToolOptions, ...options }
    this.ctx = this.image.canvas.getContext("2d")!
  }

  setActive(b: boolean) {
    this.active = b
    if (b && this.state.tools.find(t => t.activeExclusive)) {
      this.state.tools.filter(t => t !== this).forEach(t => {
        t.active = false
      })
    }
    this.setState({
      activeTools: this.state.tools.filter(t => t.active),
      tools: this.state.tools
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


  public handleToolGroupVisibleToggle(toolGroupIndex: number) {
    const active = this.state.shapesTool.menuActiveIndex.includes(toolGroupIndex)
   this. setState({
      shapesTool: {
        ...this.state.shapesTool,
        menuActiveIndex: active ? this.state.shapesTool.menuActiveIndex.filter(k => k !== toolGroupIndex) : [...this.state.shapesTool.menuActiveIndex, toolGroupIndex]
      }
    })
  }


}

type Events = 'selection'

interface SelectionEvent<N extends Events> {
  name: N;
  rect: Rectangle
}

// export interface Options {
// strokeStyle?: string;
// lineWidth?: number;
// fillStyle?: string;
// mouseMoveThrottle?: number;
// }

// export const defaultToolOptions: Required<Options> = {
//   strokeStyle: 'black',
//   lineWidth: 10,
//   fillStyle: 'rgba(100,200,90, 0.3)',
//   mouseMoveThrottle: 50
// }

export const tools: Tool[] = []

import { unique } from 'misc-utils-of-mine-generic'
import { State } from '../../app/state'
import { getState, getStore, setState } from '../../app/store'
import { AbstractComponent } from '../common/component'

export interface Tool {
  setActive(b: boolean): void;
  active: boolean;
  activeExclusive: boolean
  name: string
  description: string
  shortDescription: string
  handleToolGroupVisibleToggle(toolGroupIndex: number): void
}

export abstract class AbstractTool {
  active = false;
  activeExclusive = false
  viewClass: typeof AbstractComponent = null as any
  name = unique('abstractTool')
  description = 'TODO'
  shortDescription = 'TODO'
  protected constructor(){}
  setActive(b: boolean) {
    this.active = b
    if (b && getState().tools.find(t => this.activeExclusive)) {
      getState().tools.filter(t => t !== t).forEach(t => {
        this.active = false
      })
    }
    setState({
      activeTools: getState().tools.filter(t => this.active),
      tools: getState().tools
    })
  }

  protected get state() {
    return getStore().getState()
  }

  protected setState(s: Partial<State>) {
    getStore().setState(s)
  }

  handleToolGroupVisibleToggle(toolGroupIndex: number) {
    const active = this.state.shapesTool.menuActiveIndex.includes(toolGroupIndex)
    this.setState({
      shapesTool: {
        ...this.state.shapesTool,
        menuActiveIndex: active ? this.state.shapesTool.menuActiveIndex.filter(k => k !== toolGroupIndex) : [...this.state.shapesTool.menuActiveIndex, toolGroupIndex]
      }
    })
  }
}

export function getTool(n: string) {
  return tools.find(t => t.name === n)!
}

export const tools: Tool[] = []

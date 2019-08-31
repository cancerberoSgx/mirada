import { State } from '../../app/state'
import { AbstractComponent, AbstractProps } from '../common/component'
import { Tool } from './tool'

// import * as React from 'react'
// import { Header, Segment } from 'semantic-ui-react'
// import { AbstractComponent, AbstractProps } from '../common/component'
// import { SelectRectTool } from './selectRectTool';
// import { Tool } from './tool';
// import { State } from '../../app/state';
// import { getStore } from '../../app/store';
// // import { asDataUrl } from '../common/util'


type Constructor<T = {}> = new (...args: any[]) => T
// export interface ToolView {
//   tool: Tool;
// }
export function TToolView<TBase extends Constructor>(Base: TBase) {
  return class extends AbstractComponent<AbstractProps & { tool: Tool }, State>{
    tool: Tool = null as any
  }
}
// export abstract class ToolViewClass<T extends ToolView> extends AbstractComponent<AbstractProps&{tool: Tool}, State> implements ToolView{
//   tool: Tool ;
//   // tool: Tool<ToolView>=null as any
//   // shouldComponentUpdate(nextProps: AbstractProps, nextState: State, nextContext: any) {
//   // var output =
//   // return this.state.script!=nextState.script || this.state.showAllResultsOutput != nextState.showAllResultsOutput || JSON.stringify(this.getOutput(this.state).map(f => f.name)) != JSON.stringify(this.getOutput(nextState).map(f => f.name))
//   // }
//   constructor(p: AbstractProps&{tool: Tool}, s: State) {
//     super(p, s)
//     this.tool = p.tool
//   }
//   //   constructor(protected tool:Tool<ToolView>) {
//   //   super({},{} as any)
//   //   this.tool = tool
//   // }
//   abstract render():any

//   // setTool(t:Tool<ToolView>){
//   //   this.tool = t
//   // }
//   // private getOutput(s: State) {
//   //   if (!s.result) { return [] }
//   //   return s.showAllResultsOutput ? s.result.results.map(r => r.outputFiles).flat() : s.result.outputFiles
//   // }
// }

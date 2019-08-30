import * as React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { SelectRectTool } from './selectRectTool';
import { ToolView } from './toolView';
// import { asDataUrl } from '../common/util'

export class SelectRectView extends ToolView {
  // shouldComponentUpdate(nextProps: AbstractProps, nextState: State, nextContext: any) {
  // var output =
  // return this.state.script!=nextState.script || this.state.showAllResultsOutput != nextState.showAllResultsOutput || JSON.stringify(this.getOutput(this.state).map(f => f.name)) != JSON.stringify(this.getOutput(nextState).map(f => f.name))
  // }

  render() {
    const t = this.state.tools.find(d => d.name === SelectRectTool.NAME)!
    return <>
      <label><input type="checkbox" onChange={e => {
        t.setActive(e.currentTarget.checked)
      }} checked={this.state.activeTools.includes(t)} /> {t.name} : {t.description}</label>
       
    </>
  }

  // private getOutput(s: State) {
  //   if (!s.result) { return [] }
  //   return s.showAllResultsOutput ? s.result.results.map(r => r.outputFiles).flat() : s.result.outputFiles
  // }
}

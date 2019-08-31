import * as React from 'react'
import { Checkbox } from 'semantic-ui-react'
import { GrabCut } from './grabCut'
import { ToolView } from './tool'
// import { ToolView } from './toolView';
// import { asDataUrl } from '../common/util'

// type MyFields 
export class GrabCutView extends ToolView {
  // static fields  =[
  //   {name: '', 
  //   }
  // ]
  static firstTime = false
  // shouldComponentUpdate(nextProps: AbstractProps, nextState: State, nextContext: any) {
  // var output =
  // return this.state.script!=nextState.script || this.state.showAllResultsOutput != nextState.showAllResultsOutput || JSON.stringify(this.getOutput(this.state).map(f => f.name)) != JSON.stringify(this.getOutput(nextState).map(f => f.name))
  // }
  render() {
    if (this.state.showToolInitialTip) {
      // this.setState({...this.state.showToolInitialTip})
      // return helpModal()
    }
    const t = this.state.tools.find(d => d.name === GrabCut.NAME)!
    return <div>
      <label><input type="checkbox" onChange={e => {
        t.setActive(e.currentTarget.checked)
      }} checked={this.state.activeTools.includes(t)} /> {t.name} : {t.description}</label>

      <label> <Checkbox toggle
        //  defaultChecked={this.state.grabCutTool.selectBackgroundPencilEnabled} 
        onChange={e => {
          this.setState({            
grabCutTool: {
              ...this.state.grabCutTool,
              selectBackgroundPencilEnabled: e.currentTarget.checked
            }          
})
        }}
        checked={this.state.grabCutTool.selectBackgroundPencilEnabled}
      /> Mark background region with rectangles</label>

      {/* <ul>
        <li><input type="checkbox" onChange={e => {
        t.setActive(e.currentTarget.checked)
      }} checked={this.state.activeTools.includes(t)} /> {t.name} : {t.description}</label></li>
      </ul> */}
    </div>
  }
  // private getOutput(s: State) {
  //   if (!s.result) { return [] }
  //   return s.showAllResultsOutput ? s.result.results.map(r => r.outputFiles).flat() : s.result.outputFiles
  // }
  introModal() {
    return <>
      <h3>Grab cut background removal</h3>
      <p>This tool removes background from any photo auto magically. If at first it does not do the trick, add some rectangles on the background area using the selection tool. This will help to identify and separate it from the foreground shape. Maybe adjusting the settlings could also help. </p>
      <p>I'm interested know about image examples for which this tool has difficulties accomplishing the job and also ideas or suggestions. </p>
      {/* <label><input checked={''}type="checkbox"/>Don't show again</label> */}
    </>
  }
}


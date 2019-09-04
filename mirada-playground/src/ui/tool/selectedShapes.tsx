import 'magica'
import * as React from 'react'
import { getImageWidget, getCanvasOverlay } from '../../app/start'
import { AbstractTool } from './tool'
import { ISelectionCreated, Object } from 'fabric/fabric-impl';

export class SelectedShapesView extends React.Component<{}, { selected: Object[] }>{
  constructor(p: any, s: any) {
    super(p, s)
    this.state = { selected: [] }
    getCanvasOverlay().then(o => {
      o.canvas!.on('selection:created', e => this.setState({ selected: e.selected }))
      o.canvas!.on('selection:cleared', e => this.setState({ selected: [] }))
    })
  }
  render() {
    if (!this.state.selected || !this.state.selected.length) {
      return 'No selected shapes'
    }
    return (
      <ul>
        {this.state.selected.map(s => <li>{s.type}
        fill: <input type="color" defaultValue={s.fill+''} onChange={e=>{
          s.setColor(e.currentTarget.value)
          s.canvas!.renderAll()
          }}></input>
        opacity: <input type="number" min="0" max="1" step="0.05" defaultValue={s.opacity+''} onChange={e=>{
          s.set('opacity',e.currentTarget.valueAsNumber)
          s.canvas!.renderAll()
          }}></input>
        </li>)}
      </ul>
    )
  }
}

export class SelectedShapes extends AbstractTool {
  static INSTANCE = new SelectedShapes()
  static toolBarEntry = { tool: () => SelectedShapes.INSTANCE, el: () => <SelectedShapesView /> }
  name = 'Selected shapes'
  description = 'Shows selected shapes'
  shortDescription = 'Shows selected shapes'
}

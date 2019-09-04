import { IObjectAdded } from 'fabric/fabric-impl'
import { File, tool } from 'mirada'
import * as React from 'react'
import { Button, Checkbox, Icon, Label } from 'semantic-ui-react'
import { getCanvasOverlay, getImageWidget, getShapeDrawing } from '../../app/start'
import { GrabCutRegions } from '../../app/state'
import { AbstractComponent } from '../common/component'
import { AbstractTool } from './tool'

export class GrabCutView extends React.Component<{}, {interest:boolean,background:boolean}> {
  constructor(p:any,s:any){
    super(p,s)
    this.state={interest:false,background:false}
  }
  render() {
    return (  
      <Button.Group  size="medium">
   <Label><Checkbox  checked={this.state.interest}  toggle  label="Region of interest"  onChange={async (e, p) => { 
        this.setState({interest: !!p.checked})
      GrabCut.INSTANCE().setActive(!!p.checked);
      (await getShapeDrawing()).setEnabled(!!p.checked);
      }}/><Icon name="smile outline"/>  </Label> 
       <Label> <Checkbox  checked={this.state.background}  toggle  label="Background"  onChange={async (e, p) => { 
        this.setState({background: !!p.checked})
      GrabCut.INSTANCE().setActive(!!p.checked);
      (await getShapeDrawing()).setEnabled(!!p.checked);
      }}/><Icon name="remove"/>  </Label> 
      </Button.Group>
  
    )
  }
}

export class GrabCut extends AbstractTool {
  protected canvasOffset = { x: 0, y: 0 }
  protected static _instance: GrabCut
  name = 'Grab Cut'
  description = `Intelligent way of removing the background. It doesn't need to be a solid color and is intelligent separate the main object from its background. First select the region of interest (the object that's not the background) by drawing a containing rectangle. Sometimes is enough with just that but some images are very complex and require more work. You can also define what's the background and also use the brush tool that's more precise than rectangles. Remember that drawn shapes can be moved, resized and deleted if needed. `
  shortDescription = 'Intelligent background removal'
  static toolBarEntry = { tool: GrabCut.INSTANCE, el: () => <GrabCutView /> }
  static INSTANCE() {
    if (!GrabCut._instance) {
      GrabCut._instance = new GrabCut()
    }
    return GrabCut._instance
  }
  protected selectionChangeListenerRegistered = false
  protected constructor() {
    super()
    this.selectionChangeListener = this.selectionChangeListener.bind(this)
    getCanvasOverlay().then(o => {
      o.canvas!.on('selection:created', this.selectionChangeListener)
    })
  }
  protected async selectionChangeListener(e: IObjectAdded) {
    if (!this.active) {
      return
    }
    const r = { x: e.target.left!, y: e.target.top!, width: e.target.width!, height: e.target.height! }
    const i = await getImageWidget()
    let f = i.get()
    const result = await tool.grabCut({
      image: f,
      ...r
    })
    f = File.fromData(result.image, 'grabCut.png')
    i.load(f)
  }
}



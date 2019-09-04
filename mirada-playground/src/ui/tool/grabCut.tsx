import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import { GrabCutRegions } from '../../app/state'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { ImageWidget } from '../../imageEditor/imageWidget'
import { AbstractTool } from './tool'
import * as React from 'react'
import { Button, Checkbox, Icon } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { getImageWidget, getCanvasOverlay } from '../../app/start';
import { IObjectAdded } from 'fabric/fabric-impl';

export class GrabCutView extends AbstractComponent {
  render() {
    return (<>
      <Checkbox toggle className="toolEnabledToggle"
        onChange={(e, p) => GrabCut.INSTANCE().setActive(!!p.checked)}
        checked={GrabCut.INSTANCE().active} label={GrabCut.INSTANCE().name} />
      <Button.Group toggle size="medium" vertical fluid >
        <Button onClick={e => this.handleRegionTypeChange('interest')}><Icon name="smile outline" />Region of interest</Button>
        <Button onClick={e => this.handleRegionTypeChange('background')}><Icon name="remove" />Background</Button>
      </Button.Group>
    </>
    )
  }
  protected handleRegionTypeChange(region: GrabCutRegions) {
    this.setState({ grabCut: { ...this.state.grabCut, region } })
  }
}

export class GrabCut extends AbstractTool {
  protected canvasOffset = { x: 0, y: 0 }
  protected static _instance: GrabCut
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
    this.name = 'Grab Cut'
    this.description = `Intelligent way of removing the background. It doesn't need to be a solid color and is intelligent separate the main object from its background. First select the region of interest (the object that's not the background) by drawing a containing rectangle. Sometimes is enough with just that but some images are very complex and require more work. You can also define what's the background and also use the brush tool that's more precise than rectangles. Remember that drawn shapes can be moved, resized and deleted if needed. `
    this.shortDescription = 'Intelligent background removal'
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


  
import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import { GrabCutRegions } from '../../app/state'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { ImageWidget } from '../../imageEditor/imageWidget'
import { AbstractTool } from './tool'
import * as React from 'react'
import { Button, Checkbox, Icon } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { getTool } from './tool'
import { getImageWidget } from '../../app/start';

export class GrabCutView extends AbstractComponent {
  render() {
    return (<>
      {/* <Checkbox toggle className="toolEnabledToggle"
        onChange={e => t.setActive(e.currentTarget.checked)}
        checked={this.state.activeTools.includes(t)} label={GrabCut.NAME} /> */}
      <Button.Group toggle size="medium" vertical fluid >
        <Button onClick={e => this.handleRegionTypeChenge('interest')}><Icon name="smile outline" />Region of interest</Button>
        <Button onClick={e => () => this.handleRegionTypeChenge('background')}><Icon name="remove" />Background</Button>
      </Button.Group>
    </>
    )
  }
  handleRegionTypeChenge(region: GrabCutRegions) {
    this.setState({ grabCut: { ...this.state.grabCut, region } })
  }
}


export class GrabCut extends AbstractTool {
  protected canvasOffset = { x: 0, y: 0 }
  static INSTANCE =  new GrabCut()
  static toolBarEntry= { tool: () =>GrabCut.INSTANCE, el: () => <GrabCutView /> }
  constructor( ) {
    super()
    this.name = 'Grab Cut'
    this.description =`Intelligent way of removing the background. It doesn't need to be a solid color and is intelligent separate the main object from its background. First select the region of interest (the object that's not the background) by drawing a containing rectangle. Sometimes is enough with just that but some images are very complex and require more work. You can also define what's the background and also use the brush tool that's more precise than rectangles. Remember that drawn shapes can be moved, resized and deleted if needed. `
    this.shortDescription = 'Intelligent background removal'
    this.selectionChangeListener = this.selectionChangeListener.bind(this)
    addStateChangeListener('selectionChanged', {
      type: 'selectionChanged',
      fn: this.selectionChangeListener
    })
  }
  setRegion(s: GrabCutRegions) {
    this.setState({ grabCut: { ...this.state.grabCut, region: s } })
  }
  async selectionChangeListener(e: SelectionChangeEvent) {
    if (!this.active) {
      return
    }
    const rect = e.change.partial.selection && e.change.partial.selection.rectangles || []
    if (rect.length) {
    const i = await getImageWidget()
      let f = i.get()
      await serial(rect.map(r => async () => {
        const result = await tool.grabCut({
          image: f,
          ...r
        })
        f = File.fromData(result.image, 'grabCut.png')
      }))
      i.load(f)
    }
  }
}



import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import { GrabCutRegions } from '../../app/state'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { ImageWidget } from '../imageEditor/imageWidget'
import { AbstractTool } from './tool'

export class GrabCut extends AbstractTool {

  toolGroupIndex = 2

  setRegion(s: GrabCutRegions) {
    this.setState({ grabCut: { ...this.state.grabCut, region: s } })
  }

  protected canvasOffset = { x: 0, y: 0 }
  static NAME = 'Grab Cut'
  static SHORT_DESCRIPTION = 'Intelligent background removal'
  static DESCRIPTION = `Intelligent way of removing the background. It doesn't need to be a solid color and is intelligent separate the main object from its background. First select the region of interest (the object that's not the background) by drawing a containing rectangle. Sometimes is enough with just that but some images are very complex and require more work. You can also define what's the background and also use the brush tool that's more precise than rectangles. Remember that drawn shapes can be moved, resized and deleted if needed. `
  constructor(protected image: ImageWidget) {
    super()
    this.name = GrabCut.NAME
    this.description = GrabCut.DESCRIPTION
    this.selectionChangeListener = this.selectionChangeListener.bind(this)
    addStateChangeListener('selectionChanged', {
      type: 'selectionChanged',
      fn: this.selectionChangeListener
    })
  }

  async selectionChangeListener(e: SelectionChangeEvent) {
    if (!this.active) {
      return
    }
    const rect = e.change.partial.selection && e.change.partial.selection.rectangles || []
    if (rect.length) {
      let f = this.image.get()
      await serial(rect.map(r => async () => {
        const result = await tool.grabCut({
          image: f,
          ...r
        })
        f = File.fromData(result.image, 'grabCut.png')
      }))
      this.image.load(f)
    }

  }


}



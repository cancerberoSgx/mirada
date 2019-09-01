import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { ImageWidget } from '../imageEditor/imageWidget'
import { GrabCutView } from './grabCutView'
import { AbstractTool } from './tool'

interface Options {

}


export class GrabCut extends AbstractTool<GrabCutView> {
  protected canvasOffset = { x: 0, y: 0 }
  // activeExclusive=true
  static NAME = 'Grab Cut'
  static DESCRIPTION = `Intelligent way of removing the background. It doesn't need to be a solid color!. Use the selection tools to define the important regions`

  constructor(protected image: ImageWidget, options?: Options) {
    super(image, options)
    this.name = GrabCut.NAME
    this.description = GrabCut.DESCRIPTION
    this.viewClass = GrabCutView
    this.selectionChangeListener = this.selectionChangeListener.bind(this)
    addStateChangeListener('selectionChanged', {
      type: 'selectionChanged',
      fn: this.selectionChangeListener
    })
  }

  async selectionChangeListener(e: SelectionChangeEvent) {
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



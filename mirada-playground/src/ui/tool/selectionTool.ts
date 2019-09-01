import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import { RegionDefinitionShapes, SelectionActions } from '../../app/state'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { ImageWidget } from '../imageEditor/imageWidget'
import { AbstractTool } from './tool'

export class SelectionTool extends AbstractTool {

  toolGroupIndex = 0

  handleSelectionAction(s: SelectionActions) {
    throw 'TODO'
    // this.setState()
  }

  static NAME = 'Selection'
  static SHORT_DESCRIPTION = 'Selection management'
  static DESCRIPTION = `TODO`
  constructor(protected image: ImageWidget) {
    super(image)
    this.name = SelectionTool.NAME
    this.description = SelectionTool.DESCRIPTION
    this.selectionChangeListener = this.selectionChangeListener.bind(this)
    addStateChangeListener('selectionChanged', {
      type: 'selectionChanged',
      fn: this.selectionChangeListener
    })
  }

  async selectionChangeListener(e: SelectionChangeEvent) {
    if(!this.active){
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



import { fabric } from 'fabric'
import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import { getFabricCanvas } from '../../app/start'
import { SelectionActions } from '../../app/state'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { getState } from '../../app/store'
import { ImageWidget } from '../../imageEditor/imageWidget'
import { AbstractTool } from './tool'

export class SelectionTool extends AbstractTool {
  static NAME = 'Selection'
  static SHORT_DESCRIPTION = 'Selection management'
  static DESCRIPTION = 'Selection management'
  constructor(protected image: ImageWidget) {
    super()
    this.name = SelectionTool.NAME
    this.description = SelectionTool.DESCRIPTION
    this.shortDescription = SelectionTool.SHORT_DESCRIPTION
    this.selectionChangeListener = this.selectionChangeListener.bind(this)
    addStateChangeListener('selectionChanged', {
      type: 'selectionChanged',
      fn: this.selectionChangeListener
    })
  }
  async onAction(s: SelectionActions) {
    const c = await getFabricCanvas()
    if (s === 'delete') {
      c.getActiveObjects().forEach(e => c.remove(e))
      c.renderAll()
    } else if (s == 'select') {
      // do nothing
    } else if (s == 'selectAll') {
      const sel = SelectionTool.selectAll(c)
      this.setState({ editor: { ...getState().editor, objects: [...sel.getObjects()] } })
    } else {
      throw 'TODO'
    }
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
  static selectAll(c: fabric.Canvas) {
  c.discardActiveObject()
  var sel = new fabric.ActiveSelection(c.getObjects(), {
    canvas: c,
  })
  c.setActiveObject(sel)
  c.requestRenderAll()
  return sel
}

}

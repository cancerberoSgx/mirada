import { fabric } from 'fabric'
import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { getFabricCanvas, getImageWidget } from '../../app/start'
import { SelectionActions } from '../../app/state'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { getState } from '../../app/store'
import { AbstractComponent } from '../common/component'
import { AbstractTool } from './tool'

export class SelectionToolView extends AbstractComponent {
  render() {
    const tool = SelectionTool.INSTANCE
    return (
      <Button.Group toggle size="medium" vertical fluid>
        <Button onClick={e => tool.onAction('select')}>
          <Popup position="bottom left" flowing={false}
            mountNode={document.body} size="small" hoverable style={{ left: '-10vw' }}
            content="Select existing shapes with this  marquee tool to move resize or rotate or delete them. By dragging bigger rectangles you can select and apply transformation on several shapes. Also keyboard is supported like ctrl, shift, ect."
            trigger={
              <span><Icon name="mouse pointer" /> Select</span>} />
        </Button>
        <Button onClick={e => tool.onAction('delete')}>
          <Icon name="delete" />Delete Selection</Button>
        <Button onClick={e => tool.onAction('invertSelection')}>
          <Icon name="idea" />Invert Selection</Button>
        <Button onClick={e => tool.onAction('selectAll')}>
          <Icon name="hand rock" />Select All</Button>
      </Button.Group>
    )
  }
}

export class SelectionTool extends AbstractTool {
  static INSTANCE = new SelectionTool()
  static toolBarEntry = { tool: () => SelectionTool.INSTANCE, el: () => <SelectionToolView /> }
  protected constructor() {
    super()
    this.name = 'Selection'
    this.description = 'Selection management'
    this.shortDescription = 'Selection management'
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

  protected async selectionChangeListener(e: SelectionChangeEvent) {
    if (!this.active) {
      return
    }
    const i = await getImageWidget()
    const rect = e.change.partial.selection && e.change.partial.selection.rectangles || []
    if (rect.length) {
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


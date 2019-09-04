import * as React from 'react'
import { Accordion, Button, Menu, Segment } from 'semantic-ui-react'
import { getImageWidget } from '../../app/start'
import { AffineTransform } from './affineTransform'
import { CanvasAndImage } from './canvasAndImage'
import { PerspectiveTransform } from './perspectiveTransform'
import { AbstractComponent } from '../common/component'
import { AccordionToolbarAdapter } from './AccordionToolbarAdapter'
import { ShapeTool } from './drawingTool'
import { GrabCut } from './grabCut'
import { SelectionTool } from './selectionTool'

const tools = [
  SelectionTool.toolBarEntry,
  ShapeTool.toolBarEntry,
  GrabCut.toolBarEntry,
  AffineTransform.toolBarEntry,
  PerspectiveTransform.toolBarEntry,
  CanvasAndImage.toolBarEntry
]

export class ToolBar extends AbstractComponent {
  render() {
    if (this.state.toolBarCollapsed) {
      return ''
    }
    return (
      <Segment className="toolBar" basic>
        <Button primary onClick={async e => {
          const i = await getImageWidget()
          i.updateFromCanvas()
        }}>Apply</Button>
        <Accordion as={Menu} vertical fluid>
          {tools.map((t, i) => <AccordionToolbarAdapter tool={t.tool()} toolGroupIndex={i}>{t.el()}</AccordionToolbarAdapter>)}
        </Accordion>
      </Segment>
    )
  }
}

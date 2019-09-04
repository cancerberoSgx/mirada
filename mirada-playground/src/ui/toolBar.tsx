import * as React from 'react'
import { Accordion, Button, Menu, Segment } from 'semantic-ui-react'
import { getImageWidget } from '../app/start'
import { AffineTransform } from './tool/affineTransform'
import { CanvasAndImage } from './tool/canvasAndImage'
import { PerspectiveTransform } from './tool/perspectiveTransform'
import { AbstractComponent } from './common/component'
import { AccordionToolbarAdapter } from './tool/AccordionToolbarAdapter'
import { ShapeTool } from './tool/drawingTool'
import { GrabCut } from './tool/grabCut'
import { SelectionTool } from './tool/selectionTool'

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

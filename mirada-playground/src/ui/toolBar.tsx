import * as React from 'react'
import { Accordion, Button, Menu, Segment } from 'semantic-ui-react'
import { getImageWidget } from '../app/start'
import { AbstractComponent } from './common/component'
import { AccordionToolbarAdapter } from './tool/AccordionToolbarAdapter'
import { AffineTransform } from './tool/affineTransform'
import { CanvasAndImage } from './tool/canvasAndImage'
import { ShapeTool } from './tool/drawingTool'
import { GrabCut } from './tool/grabCut'
import { PerspectiveTransform } from './tool/perspectiveTransform'
import { SelectionTool } from './tool/selectionTool'
import { SelectedShapes } from './tool/selectedShapes';

const tools = [
  SelectionTool.toolBarEntry,
  ShapeTool.toolBarEntry,
  GrabCut.toolBarEntry,
  AffineTransform.toolBarEntry,
  PerspectiveTransform.toolBarEntry,
  CanvasAndImage.toolBarEntry,
  SelectedShapes.toolBarEntry
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

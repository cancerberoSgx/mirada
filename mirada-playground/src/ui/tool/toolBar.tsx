import * as React from 'react'
import { Accordion, Header, Menu, Segment, Button } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { AccordionToolbarAdapter } from './AccordionToolbarAdapter'
import { ShapeTool } from './drawingTool'
import { ShapeToolView } from './drawingToolView'
import { GrabCut } from './grabCut'
import { GrabCutView } from './grabCutViewr'
import { SelectionTool } from './selectionTool'
import { SelectionToolView } from './selectionToolView'
import { AffineTransform } from '../../pages/affineTransform';
import { getTool } from './tool';
import { PerspectiveTransform } from '../../pages/perspectiveTransform';
import { getImageWidget } from '../../app/start';
import { File } from 'mirada';
import { CanvasAndImage } from '../../pages/canvasAndImage';

const tools = [
  { tool: ()=>getTool(SelectionTool.NAME), el: () => <SelectionToolView /> },
  { tool: ()=>getTool(ShapeTool.NAME), el: () => <ShapeToolView /> },
  { tool: ()=>getTool(GrabCut.NAME), el: () => <GrabCutView /> },
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
        <Button primary onClick={async e=>{
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
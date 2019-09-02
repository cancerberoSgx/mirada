
import * as React from 'react'
import { Accordion, Header, Menu, Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { AccordionToolbarAdapter } from './AccordionToolbarAdapter'
import { GrabCut } from './grabCut'
import { GrabCutView } from './grabCutViewr'
import { SelectionTool } from './selectionTool'
import { SelectionToolView } from './selectionToolView'
import { ShapeTool } from './shapeTool'
import { ShapeToolView } from './shapeToolView'
import { getTool } from './tool'

export class ToolBar extends AbstractComponent {

  render() {
    if (this.state.toolBarCollapsed) {
      return ''
    }

    return (
      <Segment className="toolBar" basic>
        <Header>Tools</Header>
        <Accordion as={Menu} vertical fluid>

          <AccordionToolbarAdapter tool={getTool(SelectionTool.NAME)} toolGroupIndex={0}><SelectionToolView /></AccordionToolbarAdapter>
          <AccordionToolbarAdapter tool={getTool(ShapeTool.NAME)} toolGroupIndex={1}>  <ShapeToolView /> </AccordionToolbarAdapter>
          <AccordionToolbarAdapter tool={getTool(GrabCut.NAME)} toolGroupIndex={3}>  <GrabCutView /> </AccordionToolbarAdapter>

        </Accordion>

      </Segment>)
  }
}

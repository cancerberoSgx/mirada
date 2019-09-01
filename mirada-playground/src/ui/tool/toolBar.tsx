
import * as React from 'react'
import { Accordion, Header, Menu, Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { SelectionToolView } from './selectionToolView'
import { ShapeToolView } from './shapeToolView'
import { GrabCutView } from './grabCutViewr';

export class ToolBar extends AbstractComponent {

  render() {
    if (this.state.toolBarCollapsed) {
      return ''
    }
    return (
      <Segment className="toolBar" basic>
        <Header>Tools</Header>
        {/* Use the Selection tools to to indicate part of the image. Use concrete operation controls to adjust its settings. */}

        <Accordion as={Menu} vertical fluid>
          <SelectionToolView />
          <ShapeToolView />
          <GrabCutView />
        </Accordion>

      </Segment>)
  }
}

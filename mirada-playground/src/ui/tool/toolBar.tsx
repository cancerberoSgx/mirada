
import * as React from 'react'
import { Accordion, Header, List, Menu, Segment } from 'semantic-ui-react'
import { getState, setState } from '../../app/store'
import { AbstractComponent } from '../common/component'
import { GrabCut } from './grabCut'
import { GrabCutBar } from './GrabCutBar'
import { SelectionToolView } from './selectionToolView';
import { ShapeToolView } from './shapeToolView';


export class ToolBar extends AbstractComponent {

  render() {
    if (this.state.toolBarCollapsed) {
      return ''
    }
    return (
      <Segment className="toolBar" basic>
        <Header>Tools</Header>
        {/* Use the Selection tools to to indicate part of the image. Use concrete operation controls to adjust its settings. */}

        {/* <List> */}
          {/* <List.Item> */}

            <Accordion as={Menu} vertical fluid>
              <SelectionToolView />
              <ShapeToolView />
              <GrabCutBar
              //  tool={this.state.tools.find(t => t.name === GrabCut.NAME)!} 
               />
            </Accordion>

          {/* </List.Item> */}
          {/* {this.state.tools.map(t => <List.Item>  */}
          {/* <GrabCutBar tool={} */}
          {/* <t.viewClass tool={t} /> */}
          {/* </List.Item>  */}
          {/* )}  */}
          {/* <List.Item><label>
            <select onChange={e =>
              this.setState({ selection: { ...this.state.selection, mode: e.currentTarget.value as any } })}
            >{['exclusive', 'union'].map(mode =>
              <option selected={this.state.selection.mode === mode} value={mode}>{mode}</option>
            )}</select>Selection mode</label></List.Item> */}
        {/* </List> */}
      </Segment>)
  }
}

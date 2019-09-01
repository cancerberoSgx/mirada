
import * as React from 'react'
import { Header, List, Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { RegionDefinitionTool } from './regionDefinitionTool'

export class ToolBar extends AbstractComponent {
  render() {
    if (this.state.toolBarCollapsed) {
      return ''
    }
    return (
      <Segment className="toolBar">
        <Header>Tools</Header>
        Use the Selection tools to to indicate part of the image. Use concrete operation controls to adjust its settings.
      <List>
          <List.Item>
            <RegionDefinitionTool />
          </List.Item>
          {this.state.tools.map(t => <List.Item>
            <t.viewClass tool={t} />
          </List.Item>)}
          <List.Item><label>
            <select onChange={e =>
              this.setState({ selection: { ...this.state.selection, mode: e.currentTarget.value as any } })}
            >{['exclusive', 'union'].map(mode =>
              <option selected={this.state.selection.mode === mode} value={mode}>{mode}</option>
            )}</select>Selection mode</label></List.Item>
        </List>
      </Segment>)
  }
}

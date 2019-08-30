
import * as React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { State } from '../../app/state'
import { getState, getStore } from '../../app/store'
import { AbstractComponent, AbstractProps } from '../common/component'

export class ToolBar extends AbstractComponent {   
  render() { 
    return (
      <Segment >
        <Header>Tools</Header>
        Use the Selection tools to to indicate part of the image. Use concrete operation controls to adjust its settings.
      <ul>
          {this.state.tools.map(t => <li>
            <t.viewClass tool={t}/>
            hola nono
          </li>)}
        </ul>
<hr/>
        <ul>
          <li><label>
         <select  onChange={e => 
         this.setState({selection: {...this.state.selection, selectionModel: e.currentTarget.value as any}}) }
         >{['exclusive', 'union'].map(mode=>
         <option selected={this.state.selection.selectionModel===mode} value={mode}>{mode}</option>
         )}</select>Selection mode</label></li>
        </ul>
      </Segment>)
  }
}   
 
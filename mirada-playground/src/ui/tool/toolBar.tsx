
import * as React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { State } from '../../app/state'
import { getState, getStore } from '../../app/store'
import { AbstractComponent, AbstractProps } from '../common/component'

export class ToolBar extends AbstractComponent {
  // constructor(p: AbstractProps, s: State) {
  //   super(p, s)
  //   this.state = getState() as State
  //   getStore().add(() => {
  //     debugger
  //     super.setState({ ...getState() })
  //   })
  // }
  render() { 
    debugger 
    console.log('ToolBar', this.state.activeTools.map(t => t.name))
    return (
      <Segment >
        <Header>Tools</Header>
        Use the Selection tools to to indicate part of the image. Use concrete operation controls to adjust its settings.
      <ul>
          {this.state.tools.map(t => <li>
            <label><input type="checkbox" onChange={e => { debugger; t.setActive(!e.currentTarget.checked) }} checked={this.state.activeTools.includes(t)} /> {t.name} : {t.description}</label>
          </li>)}
        </ul>

      </Segment>)
  }
}

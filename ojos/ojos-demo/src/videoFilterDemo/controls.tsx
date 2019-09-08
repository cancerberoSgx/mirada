import { objectKeys, setObjectProperty } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { memoryReport } from '../miradaUi/util'
import { fpsFramesCounter, resetFpsFramesCounter, stop } from './processFunction'
import { loadVCamAndStartProcessing } from './start'
import { getState, State, ToolNames } from './state'
import { tools } from './tools'
import { createUrl } from './urlState'

export class Controls extends React.Component<{}, State> {
  protected timer: any

  constructor(p: any, s: State) {
    super(p, s)
    this.state = getState()
  }

  setState2(s: {
    [s: string]: any;
  }) {
    objectKeys(s).forEach(p => setObjectProperty(this.state, p, s[p]))
    console.log(this.state.replaceColor.newColorOrImage, s)
    this.setState(this.state)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidMount() {
    clearInterval(this.timer)
    const fpxLapse = 2
    this.timer = setInterval(() => {
      const fps = Math.round(fpsFramesCounter / (fpxLapse * 1.0))
      resetFpsFramesCounter()
      const m = memoryReport()
      this.setState({ fps, mem: m.usedMb + ' ' + m.percent })
    }, fpxLapse * 1000)
  }

  render() {
    return (<>
      <div>FPS: {this.state.fps} &nbsp;
      <span >{this.state.mem}</span>
        <button onClick={e => {
          this.componentWillUnmount()
          stop()
        }}>stop</button>
        <button onClick={e => {
          this.componentDidMount()
          loadVCamAndStartProcessing()
        }}>Start</button>
        <button onClick={createUrl}>Create URL</button>
      </div>
      <ol>
        {this.state.order.map(name => <li title={this.state[name].description}>
          <button onClick={e => this.move('up', name)}>up</button>
          <button onClick={e => this.move('down', name)}>down</button>
          {tools()[name].bind(this)()}
        </li>)}
      </ol>
    </>)
  }

  protected move(where: 'up' | 'down', name: ToolNames) {
    const order = this.state.order
    const i = order.findIndex(n => n === name)
    if (where === 'up' && i > 0) {
      order[i] = order[i - 1]
      order[i - 1] = name
    } else if (where === 'down' && i < order.length - 1) {
      order[i] = order[i + 1]
      order[i + 1] = name
    }
    this.setState({ order })
  }

}


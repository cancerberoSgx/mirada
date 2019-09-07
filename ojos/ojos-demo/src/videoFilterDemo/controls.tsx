import { Scalar } from 'mirada'
import { enumKeys, objectKeys, setObjectProperty } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { MorphTypesEnum } from '../../../dist/src'
import { Color } from '../miradaUi/color'
import { Point } from '../miradaUi/point'
import { fpsFramesCounter, resetFpsFramesCounter, stop } from './processFunction'
import { getManagers, loadVCamAndStartProcessing } from './start'
import { getState, State, ToolNames } from './state'

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
      this.setState({ fps })
    }, fpxLapse * 1000)
  }

  render() {
    return (<>
      <div>FPS: {this.state.fps} &nbsp;
      <button onClick={e => {
          this.componentWillUnmount()
          stop()
        }}>stop</button>
        <button onClick={e => {
          this.componentDidMount()
          loadVCamAndStartProcessing()
        }}>Start</button>
      </div>
      <ol>
        {this.state.order.map(name => <li title={this.state[name].description}>
          <button onClick={e => this.move('up', name)}>up</button>
          <button onClick={e => this.move('down', name)}>down</button>
          {this.tools[name]()}
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

  protected tools = {
    [ToolNames.replaceColor]: () => <>
      <label className="enable">
        <input type="checkbox" checked={this.state.replaceColor.active}
          onChange={e => this.setState2({ 'replaceColor.active': e.currentTarget.checked })} />
        replaceColor</label>
      <label>newColorOrImage
        <Color value={this.state.replaceColor.newColorOrImage as Scalar}
          onChange={c => this.setState2({ 'replaceColor.newColorOrImage': c })} selectButton targetEl={() => getManagers().canvas!} />
      </label>
      <label>lowColor
        <Color value={this.state.replaceColor.lowColor!} onChange={c => this.setState2({ 'replaceColor.lowColor': c })}
          selectButton targetEl={() => getManagers().canvas!} />
      </label>
      <label>highColor
        <Color value={this.state.replaceColor.highColor!} onChange={c => this.setState2({ 'replaceColor.highColor': c })}
          selectButton targetEl={() => getManagers().canvas!} />
      </label>
    </>
    ,
    [ToolNames.canny]: () => <>
      <label className="enable">
        <input type="checkbox" checked={this.state.canny.active}
          onChange={e => this.setState2({ 'canny.active': e.currentTarget.checked })} />
        canny</label>
      <label>apertureSize
          <input min="3" max="7" step="2" type="number" value={this.state.canny.apertureSize}
          onChange={e => [3, 5, 7].includes(e.currentTarget.valueAsNumber) && this.setState2({ 'canny.apertureSize': e.currentTarget.valueAsNumber })} />
      </label>
      <label>threshold1
          <input min="1" type="number" value={this.state.canny.threshold1}
          onChange={e => this.setState2({ 'canny.threshold1': e.currentTarget.valueAsNumber })} />
      </label>
      <label>threshold2
          <input min="1" type="number" value={this.state.canny.threshold2}
          onChange={e => this.setState2({ 'canny.threshold2': e.currentTarget.valueAsNumber })} />
      </label>
      <label>L2gradient
          <input type="checkbox" checked={this.state.canny.L2gradient}
          onChange={e => this.setState2({ 'canny.L2gradient': e.currentTarget.checked })} /></label>
    </>
    ,
    [ToolNames.threshold]: () => <>
      <label className="enable">
        <input type="checkbox" checked={this.state.threshold.active}
          onChange={e => this.setState2({ 'threshold.active': e.currentTarget.checked })} />
        threshold</label>
      <label>maxval
          <input min="0" max="255" step="2" type="number" value={this.state.threshold.maxval}
          onChange={e => this.setState2({ 'threshold.maxval': e.currentTarget.valueAsNumber })} />
      </label>
      <label>thresh
          <input min="0" max="255" step="2" type="number" value={this.state.threshold.thresh}
          onChange={e => this.setState2({ 'threshold.thresh': e.currentTarget.valueAsNumber })} />
      </label>
      <label>type
        <select onChange={e => this.setState2({ 'threshold.type': (cv as any)[e.currentTarget.value] })}>
          {['THRESH_BINARY', 'THRESH_TOZERO', 'THRESH_TRUNC'].map(name => <option selected={(cv as any)[name] === this.state.threshold.type}
            value={name}>{name}</option>)}
        </select>
      </label>
    </>
    ,
    [ToolNames.morphologyEx]: () => <>
      <label className="enable">
        <input type="checkbox" checked={this.state.morphologyEx.active}
          onChange={e => this.setState2({ 'morphologyEx.active': e.currentTarget.checked })} />
        morphologyEx</label>
      <label>type
        <select onChange={e => this.setState2({ 'morphologyEx.op': (cv as any)[e.currentTarget.value] })}>
          {enumKeys(MorphTypesEnum).map(name => <option selected={(cv as any)[name] === this.state.morphologyEx.op}
            value={name}>{name}</option>)}
        </select>
      </label>
      <label>iterations
          <input min="1" max="255" step="1" type="number" value={this.state.morphologyEx.iterations}
          onChange={e => this.setState2({ 'morphologyEx.iterations': e.currentTarget.valueAsNumber })} />
      </label>
    </>
    ,
    [ToolNames.gaussianBlur]: () => <>
      <label className="enable">
        <input type="checkbox" checked={this.state.gaussianBlur.active}
          onChange={e => this.setState2({ 'gaussianBlur.active': e.currentTarget.checked })} />
        gaussianBlur</label>
      <label>ksize
          <Point defaultValue={{ x: this.state.gaussianBlur.ksize.width, y: this.state.gaussianBlur.ksize.height }}
          onChange={p => this.setState2({ 'gaussianBlur.ksize': { width: p.x, height: p.y } })} />
      </label>
      <label>sigma
          <Point defaultValue={{ x: this.state.gaussianBlur.sigmaX, y: this.state.gaussianBlur.sigmaY! }}
          onChange={p => this.setState2({ 'gaussianBlur.sigmaX': p.x, 'gaussianBlur.sigmaY': p.y })} />
      </label>
    </>
    ,
    [ToolNames.floodFill]: () => <>
      <label className="enable">
        <input type="checkbox" checked={this.state.floodFill.active}
          onChange={e => this.setState2({ 'floodFill.active': e.currentTarget.checked })} />
        floodFill</label>
    </>
    ,
    [ToolNames.convertTo]: () => <>
      <label className="enable">
        <input type="checkbox" checked={this.state.convertTo.active}
          onChange={e => this.setState2({ 'convertTo.active': e.currentTarget.checked })} />
        convertTo</label>
      <label>alpha
          <input min="0" step="0.05" type="number" value={this.state.convertTo.alpha}
          onChange={e => this.setState2({ 'convertTo.alpha': e.currentTarget.valueAsNumber })} />
      </label>
      <label>beta
          <input step="2" type="number" value={this.state.convertTo.beta}
          onChange={e => this.setState2({ 'convertTo.beta': e.currentTarget.valueAsNumber })} />
      </label>
    </>

  }
}


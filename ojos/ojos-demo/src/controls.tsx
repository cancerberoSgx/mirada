import { Scalar } from 'mirada'
import { objectKeys, setObjectProperty } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Color } from './miradaUi/color'
import { fpsFramesCounter, getManagers, resetFpsFramesCounter } from './start'
import { getState, State } from './state'

export class Controls extends React.Component<{}, State> {

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

  componentDidMount() {
    const fpxLapse = 20
    setInterval(() => {
      const fps = Math.round(fpsFramesCounter / (fpxLapse * 1.0))
      resetFpsFramesCounter()
      this.setState({ fps })
    }, fpxLapse * 1000)
  }

  render() {
    return (<>
      <table>
        <tr>
          <th>FPS: <br />{this.state.fps}</th>
          <th>  Effect</th>
          <th>Options</th>
          <th>Description</th>
        </tr>
        <tr>
          <td></td>
          <td>
            <label><input type="checkbox" checked={this.state.replaceColor.active} onChange={e => this.setState2({ 'replaceColor.active': e.currentTarget.checked })}></input>replaceColor</label>
          </td>
          <td>
            <label>
              <Color value={this.state.replaceColor.newColorOrImage as Scalar} onChange={c => {
                this.setState2({ 'replaceColor.newColorOrImage': c })              
}} selectButton targetEl={() => getManagers().canvas!} />
              newColorOrImage</label>
            <label> <Color value={this.state.replaceColor.lowColor!} onChange={c => this.setState2({ 'replaceColor.lowColor': c })} selectButton targetEl={() => getManagers().canvas!} />
              lowColor</label>
            <label> <Color value={this.state.replaceColor.highColor!} onChange={c => this.setState2({ 'replaceColor.highColor': c })} selectButton targetEl={() => getManagers().canvas!} />
              highColor</label>
          </td>
          <td>{this.state.replaceColor.description}</td>
        </tr>
        <tr>
          <td></td>
          <td><label><input type="checkbox" checked={this.state.floodFill.active}></input>floodFill</label></td>
          <td><label><input type="number"></input>foo</label></td>
          <td>{this.state.floodFill.description}</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <label><input type="checkbox" checked={this.state.canny.active} onChange={e => this.setState2({ 'canny.active': e.currentTarget.checked })}></input>canny</label>
          </td>
          <td>
            <label>
              <input min="3" max="7" step="2" type="number" value={this.state.canny.apertureSize} onChange={e => [3, 5, 7].includes(e.currentTarget.valueAsNumber) && this.setState2({ 'canny.apertureSize': e.currentTarget.valueAsNumber })}></input>
              apertureSize</label>
            <label>
              <input min="1" type="number" value={this.state.canny.threshold1} onChange={e => this.setState2({ 'canny.threshold1': e.currentTarget.valueAsNumber })}></input>
              threshold1</label>
            <label>
              <input min="1" type="number" value={this.state.canny.threshold2} onChange={e => this.setState2({ 'canny.threshold2': e.currentTarget.valueAsNumber })}></input>
              threshold2</label>
            <label><input type="checkbox" checked={this.state.canny.L2gradient} onChange={e => this.setState2({ 'canny.L2gradient': e.currentTarget.checked })}></input>L2gradient</label>
          </td>
          <td>{this.state.canny.description}
          </td>
        </tr>
      </table></>)
  }
}

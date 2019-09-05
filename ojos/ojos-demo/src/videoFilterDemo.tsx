// cp ../mirada/static/opencv.js dist/ && npx parcel src/ui/probes/camera-simpler.html 

import * as React from 'react'
import 'babel-polyfill';
import { Scalar, DIST_L2, bitwise_not } from 'mirada'
import { ReplaceColorOptions, OperationExecBaseOptions, CannyOptions, FloodFillOptions } from 'ojos'
import { RemoveProperties, setObjectProperty, objectKeys, PropertyOptional } from 'misc-utils-of-mine-generic';
import { Color } from './miradaUi/color';
import {fpsFramesCounter, resetFpsFramesCounter} from './start'

enum Tools {
  'replaceColor' = 'replaceColor',
  'canny' = 'canny',
  'floodFill' = 'floodFill'
}

type ToolProps<T extends OperationExecBaseOptions> = RemoveProperties<T, keyof OperationExecBaseOptions> & { name: Tools, active: boolean, description: string }
export interface State {
  fps: number
  replaceColor: ToolProps<ReplaceColorOptions>
  canny: ToolProps<CannyOptions>
  floodFill: ToolProps<FloodFillOptions>
}
let _state: State
export const getState: () => State = () => {
  if (!_state) {
    _state = {
      fps: 0,
      replaceColor: {
        name: Tools.replaceColor,
        description: 'Will replace pixels between lowColor and highColor with given newColorOrImage',
        active: false,
        lowColor: new cv.Scalar(0, 0, 0, 255),
        highColor: new cv.Scalar(150, 150, 150, 255),
        newColorOrImage: new cv.Scalar(255, 0, 0, 255)
      },
      canny: {
        active: false,
        description: 'TODO',
        name: Tools.canny,
        threshold1: 222,
        threshold2: 38224,
        apertureSize: 7,
        L2gradient: false
      },
      floodFill: {
        description: 'TODO',
        active: false,
        name: Tools.floodFill,
        seed: new cv.Point(5, 6),
        newColorOrImage: new cv.Scalar(222, 0, 0, 0),
        lowDiff: new cv.Scalar(19, 19, 91, 255),
        upDiff: new cv.Scalar(229, 255, 255, 255)
      }
    }
  }
  return _state
}


export class Controls extends React.Component<{}, State> {
  constructor(p: any, s: State) {
    super(p, s)
    this.state = getState()
  }
  ss(s: { [s: string]: any }) {
    objectKeys(s).forEach(p => setObjectProperty(this.state, p, s[p]))
    this.setState(this.state)
  }
  componentDidMount() {
    const fpxLapse =2
    setInterval(() => {
      const fps = Math.round(fpxLapse*1000 / ( fpsFramesCounter))
  resetFpsFramesCounter()
      this.setState({  fps })
    }, fpxLapse*1000)
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
            <label><input type="checkbox" checked={this.state.replaceColor.active}
              onChange={e => this.ss({ 'replaceColor.active': e.currentTarget.checked })}
            ></input>       replaceColor</label>
          </td>
          <td>
            <label>
              <Color value={this.state.replaceColor.newColorOrImage as Scalar} onChange={c => this.ss({ 'replaceColor.newColorOrImage': c })} selectButton
                targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} />
              {/* <Color value={{ r: 221, g: 222, b: 223, a: .6 }} onChange={c => console.log(c)} selectButton  */}
              targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} /> newColorOrImage</label>
            <label> <Color value={this.state.replaceColor.lowColor!} onChange={c => this.ss({ 'replaceColor.lowColor': c })} />
              lowColor</label>
            <label> <Color value={this.state.replaceColor.highColor!} onChange={c => this.ss({ 'replaceColor.highColor': c })} />
              highColor</label>
          </td>
          <td>{this.state.replaceColor.description}</td>
        </tr>
        <tr>
          <td></td>

          <td><label><input type="checkbox" checked={this.state.floodFill.active}></input>floodFill</label></td>
          <td><label><input type="number"  ></input>foo</label></td>
          <td>{this.state.floodFill.description}</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <label><input type="checkbox" checked={this.state.canny.active}
              onChange={e => this.ss({ 'canny.active': e.currentTarget.checked })}
            ></input>       canny</label>
          </td>
          <td>
            <label>
              <input min="3" max="7" step="2" type="number" value={this.state.canny.apertureSize}
                onChange={e => [3, 5, 7].includes(e.currentTarget.valueAsNumber) && this.ss({ 'canny.apertureSize': e.currentTarget.valueAsNumber })} ></input>
              apertureSize</label>
            <label>
              <input min="1" type="number" value={this.state.canny.threshold1}
                onChange={e => this.ss({ 'canny.threshold1': e.currentTarget.valueAsNumber })} ></input>
              threshold1</label>
            <label>
              <input min="1" type="number" value={this.state.canny.threshold2}
                onChange={e => this.ss({ 'canny.threshold2': e.currentTarget.valueAsNumber })} ></input>
              threshold2</label>
            <label><input type="checkbox" checked={this.state.canny.L2gradient}
              onChange={e => this.ss({ 'canny.L2gradient': e.currentTarget.checked })}
            ></input>L2gradient</label>

          </td>
          <td>{this.state.canny.description}
          </td>
        </tr>
      </table></>)
  }
}
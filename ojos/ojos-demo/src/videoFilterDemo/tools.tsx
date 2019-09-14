import { Scalar } from 'mirada'
import { enumKeys, tryTo } from 'misc-utils-of-mine-generic'
import { MorphTypesEnum } from 'ojos'
import * as React from 'react'
import { Color } from '../miradaUi/color'
import { Point } from '../miradaUi/point'
import { pointToSize, sizeToPoint } from '../miradaUi/util'
import { Controls } from './controls'
import { getManagers } from './start'
import { ToolNames } from './state'

export const tools = () => ({
  [ToolNames.replaceColor](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.replaceColor.active} onChange={e => this.setState2({ 'replaceColor.active': e.currentTarget.checked })} />
        replaceColor</label>
      <label>newColorOrImage
        <Color value={this.state.replaceColor.newColorOrImage as Scalar} onChange={c => this.setState2({ 'replaceColor.newColorOrImage': c })} selectButton targetEl={() => getManagers().canvas!} />
      </label>
      <label>lowColor
        <Color value={this.state.replaceColor.lowColor!} onChange={c => this.setState2({ 'replaceColor.lowColor': c })} selectButton targetEl={() => getManagers().canvas!} />
      </label>
      <label>highColor
        <Color value={this.state.replaceColor.highColor!} onChange={c => this.setState2({ 'replaceColor.highColor': c })} selectButton targetEl={() => getManagers().canvas!} />
      </label>
    </>;
  },
  [ToolNames.canny](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.canny.active} onChange={e => this.setState2({ 'canny.active': e.currentTarget.checked })} />
        canny</label>
      <label>apertureSize
          <input min="3" max="7" step="2" type="number" value={this.state.canny.apertureSize} onChange={e => [3, 5, 7].includes(e.currentTarget.valueAsNumber) && this.setState2({ 'canny.apertureSize': e.currentTarget.valueAsNumber })} />
      </label>
      <label>threshold1
          <input min="1" type="number" value={this.state.canny.threshold1} onChange={e => this.setState2({ 'canny.threshold1': e.currentTarget.valueAsNumber })} />
      </label>
      <label>threshold2
          <input min="1" type="number" value={this.state.canny.threshold2} onChange={e => this.setState2({ 'canny.threshold2': e.currentTarget.valueAsNumber })} />
      </label>
      <label>L2gradient
          <input type="checkbox" checked={this.state.canny.L2gradient} onChange={e => this.setState2({ 'canny.L2gradient': e.currentTarget.checked })} />
      </label>
      <label>channels
        <input type="checkbox" checked={!!this.state.canny.channels} onChange={e => this.setState2({ 'canny.channels': e.currentTarget.checked })} />
      </label>
    </>;
  },
  [ToolNames.threshold](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.threshold.active} onChange={e => this.setState2({ 'threshold.active': e.currentTarget.checked })} />
        threshold</label>
      <label>maxval
          <input min="0" max="255" step="2" type="number" value={this.state.threshold.maxval} onChange={e => this.setState2({ 'threshold.maxval': e.currentTarget.valueAsNumber })} />
      </label>
      <label>thresh
          <input min="0" max="255" step="2" type="number" value={this.state.threshold.thresh} onChange={e => this.setState2({ 'threshold.thresh': e.currentTarget.valueAsNumber })} />
      </label>
      <label>type
        <select onChange={e => this.setState2({ 'threshold.type': (cv as any)[e.currentTarget.value] })}>
          {['THRESH_BINARY', 'THRESH_TOZERO', 'THRESH_TRUNC'].map(name => <option selected={(cv as any)[name] === this.state.threshold.type} value={name}>{name}</option>)}
        </select>
      </label>
    </>;
  },
  [ToolNames.bitwise](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.bitwise.active} onChange={e => this.setState2({ 'bitwise.active': e.currentTarget.checked })} />
        bitwise</label>
      <label>type
        <select onChange={e => this.setState2({ 'bitwise.type': e.currentTarget.value })}>
          {['not', 'and', 'or', 'xor'].map(name => <option selected={name === this.state.bitwise.type} value={name}>{name}</option>)}
        </select>
      </label>
    </>;
  },
  [ToolNames.morphologyEx](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.morphologyEx.active} onChange={e => this.setState2({ 'morphologyEx.active': e.currentTarget.checked })} />
        morphologyEx</label>
      <label>type
        <select onChange={e => this.setState2({ 'morphologyEx.op': (cv as any)[e.currentTarget.value] })}>
          {enumKeys(MorphTypesEnum).map(name => <option selected={(cv as any)[name] === this.state.morphologyEx.op} value={name}>{name}</option>)}
        </select>
      </label>
      <label>iterations
          <input min="1" max="255" step="1" type="number" value={this.state.morphologyEx.iterations} onChange={e => this.setState2({ 'morphologyEx.iterations': e.currentTarget.valueAsNumber })} />
      </label>
    </>;
  },
  [ToolNames.edge](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.edge.active} onChange={e => this.setState2({ 'edge.active': e.currentTarget.checked })} />
        edge</label>
      <label>type
        <select onChange={e => this.setState2({ 'edge.type': e.currentTarget.value })}>
          {['sobel', 'scharr', 'laplacian'].map(name => <option selected={name === this.state.edge.type} value={name}>{name}</option>)}
        </select>
      </label>
      <label>ksize
          <input min="1" max="7" step="2" type="number" value={this.state.edge.ksize} onChange={e => this.setState2({ 'edge.ksize': e.currentTarget.valueAsNumber })} />
      </label>
      <label>scale
          <input min="0" type="number" value={this.state.edge.scale} onChange={e => this.setState2({ 'edge.scale': e.currentTarget.valueAsNumber })} />
      </label>
      <label>delta
          <input min="0" type="number" value={this.state.edge.delta} onChange={e => this.setState2({ 'edge.delta': e.currentTarget.valueAsNumber })} />
      </label>
      <label>channels
        <input type="checkbox" checked={!!this.state.edge.channels} onChange={e => this.setState2({ 'edge.channels': e.currentTarget.checked })} />
      </label>
    </>;
  },
  [ToolNames.warpPerspective](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.warpPerspective.active} onChange={e => this.setState2({ 'warpPerspective.active': e.currentTarget.checked })} />
        warpPerspective</label>
      <label>inputs
        <input value={(this.state.warpPerspective.inputs as Scalar).join(', ')} onChange={e => tryTo(() => this.setState2({ 'warpPerspective.inputs': e.currentTarget.value.split(',').map((s, i) => parseInt(s.trim()) || (this.state.warpPerspective.inputs as Scalar)[i]) }))} />
      </label>
      <label>outputs
        <input value={(this.state.warpPerspective.outputs as Scalar).join(', ')} onChange={e => tryTo(() => this.setState2({ 'warpPerspective.outputs': e.currentTarget.value.split(',').map((s, i) => parseInt(s.trim()) || (this.state.warpPerspective.outputs as Scalar)[i]) }))} />
      </label>
      <label>drawPoints
        <input type="checkbox" checked={!!this.state.warpPerspective.drawPoints} onChange={e => this.setState2({ 'warpPerspective.drawPoints': e.currentTarget.checked })} />
      </label>
    </>;
  },
  [ToolNames.histEqualization](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.histEqualization.active} onChange={e => this.setState2({ 'histEqualization.active': e.currentTarget.checked })} />
        histEqualization</label>
      <label>mode
        <select onChange={e => this.setState2({ 'histEqualization.mode': name })}>
          {['histEqualization', 'CLAHE'].map(name => <option selected={name === this.state.histEqualization.mode} value={name}>{name}</option>)}
        </select>
      </label>
      <label>clipLimit
          <input min="1" max="255" step="1" type="number" value={this.state.histEqualization.clipLimit} onChange={e => this.setState2({ 'histEqualization.clipLimit': e.currentTarget.valueAsNumber })} />
      </label>
      <label>tileGridSize
           <Point value={sizeToPoint(this.state.histEqualization.tileGridSize!)} onChange={p => this.setState2({ 'histEqualization.tileGridSize': pointToSize(p) })} />
      </label>
    </>;
  },
  [ToolNames.gaussianBlur](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.gaussianBlur.active} onChange={e => this.setState2({ 'gaussianBlur.active': e.currentTarget.checked })} />
        gaussianBlur</label>
      <label>ksize
          <Point value={{ x: this.state.gaussianBlur.ksize.width, y: this.state.gaussianBlur.ksize.height }} onChange={p => this.setState2({ 'gaussianBlur.ksize': { width: p.x, height: p.y } })} />
      </label>
      <label>sigma
          <Point value={{ x: this.state.gaussianBlur.sigmaX, y: this.state.gaussianBlur.sigmaY! }} onChange={p => this.setState2({ 'gaussianBlur.sigmaX': p.x, 'gaussianBlur.sigmaY': p.y })} />
      </label>
    </>;
  },
  [ToolNames.floodFill](this: Controls) {
    return <>

      TODO
    </>;
  },
  [ToolNames.convertTo](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.convertTo.active} onChange={e => this.setState2({ 'convertTo.active': e.currentTarget.checked })} />
        convertTo</label>
      <label>alpha
          <input min="0" step="0.05" type="number" value={this.state.convertTo.alpha} onChange={e => this.setState2({ 'convertTo.alpha': e.currentTarget.valueAsNumber })} />
      </label>
      <label>beta
          <input step="2" type="number" value={this.state.convertTo.beta} onChange={e => this.setState2({ 'convertTo.beta': e.currentTarget.valueAsNumber })} />
      </label>
    </>;
  },
  [ToolNames.addWeighted](this: Controls) {
    return <>
      <label className="enable">
        <input type="checkbox" checked={this.state.addWeighted.active} onChange={e => this.setState2({ 'addWeighted.active': e.currentTarget.checked })} />
        addWeighted</label>
      <label>ratio
          <input type="range" min="0" max="1" step="0.05" value={this.state.addWeighted.alpha} onChange={e => this.setState2({
        'addWeighted.alpha': e.currentTarget.valueAsNumber,
        'addWeighted.beta': 1 - e.currentTarget.valueAsNumber
      })} />
      </label>

      <label>gamma
          <input step="2" type="number" value={this.state.addWeighted.gamma} onChange={e => this.setState2({ 'addWeighted.gamma': e.currentTarget.valueAsNumber })} />
      </label>
    </>;
  }
})

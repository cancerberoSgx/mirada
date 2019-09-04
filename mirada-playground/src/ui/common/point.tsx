import { Point as IPoint } from 'mirada'
import * as React from 'react'

interface P {
  label?: { x: string, y: string },
  min?: IPoint,
  max?: IPoint,
  step?: IPoint
  onChange: (p: IPoint) => void
  defaultValue?: IPoint
  targetEl?: () => Promise<HTMLElement>
}

export class Point extends React.Component<P, IPoint> {
  y: HTMLInputElement | null = null
  x: HTMLInputElement | null = null
  protected async onSelect(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const el = this.props.targetEl && await this.props.targetEl()
    if (el) {
      const l: (ev: MouseEvent) => any = async e => {
        const el = this.props.targetEl && await this.props.targetEl()!
        if (el) {
          el.removeEventListener('click', l)
          const p = { x: e.offsetX - el.offsetLeft, y: e.offsetY - el.offsetTop }
          // document.querySelector<HTMLCanvasElement>('canvas')!.getContext('2d')!.fillStyle='black'
          // document.querySelector<HTMLCanvasElement>('canvas')!.getContext('2d')!.fillRect(p.x, p.y, 2,2)
          this.setState(p)
          this.props.onChange && this.props.onChange(p)
        }
      }
      el.addEventListener('click', l)
    }
  }
  constructor(p: P, s: IPoint) {
    super(p, s)
    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.state = {
      x: p.defaultValue && p.defaultValue.x || 0,
      y: p.defaultValue && p.defaultValue.y || 0
    }
  }
  onChange() {
    const p = { x: this.x!.valueAsNumber, y: this.y!.valueAsNumber }
    this.props.onChange && this.props.onChange(p)
    this.setState(p)
  }
  render() {
    const {
      min = { x: -1000, y: -1000 },
      max = { x: 1000, y: 1000 },
      step = { x: 1, y: 1 },
      label = { x: '', y: '' },
      defaultValue = { x: 0, y: 0 },
    } = this.props
    return (
      <span>
        <label style={{ display: 'inline' }}>{label.x}<input style={{ display: 'inline' }} ref={c => this.x = c} type="number" min={min.x} max={max.x} step={step.x}
          onChange={this.onChange} defaultValue={defaultValue.x + ''} value={this.state.x} /></label>
        <label style={{ display: 'inline' }}>{label.y}
          <input style={{ display: 'inline' }} ref={c => this.y = c} type="number" min={min.y} max={max.y} step={step.y}
            onChange={this.onChange} defaultValue={defaultValue.y + ''} value={this.state.y} /></label>
        {this.props.targetEl ? <button style={{ display: 'inline' }} onClick={this.onSelect}>Select</button> : ''}
      </span>
    )
  }
}


// import 'babel-polyfill'
// import * as rd from 'react-dom'
// import { State } from '../../app/state';
// rd.render(<div>
//   <canvas style={{ border: '1px solid pink' }} width="100" height="100"></canvas>
//   <Point targetEl={() => document.querySelector('canvas')!} onChange={p => console.log(p)} />
// </div>, document.getElementById('main'))

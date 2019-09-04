import { Point as IPoint } from 'mirada'
import * as React from 'react'

interface P {
  label?: { x: string, y: string },
  min?: IPoint,
  max?: IPoint,
  step?: IPoint
  onChange: (p: IPoint) => void
  defaultValue?: IPoint
  selectButton?: boolean
  targetEl?: () => Promise<HTMLElement>
}
interface S extends IPoint {
  selectActive?: boolean
}
export class Point extends React.Component<P, S> {
  y: HTMLInputElement | null = null
  x: HTMLInputElement | null = null
  constructor(p: P, s: IPoint) {
    super(p, s)
    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onSelectListener = this.onSelectListener.bind(this)
    this.state = {
      x: p.defaultValue && p.defaultValue.x || 0,
      y: p.defaultValue && p.defaultValue.y || 0,
      selectActive: false,
    }
  }
  protected onChange() {
    const p = { x: this.x!.valueAsNumber, y: this.y!.valueAsNumber }
    this.props.onChange && this.props.onChange(p)
    this.setState({ ...this.state, ...p })
  }
  protected async onSelectListener(e: MouseEvent) {
    const el = this.props.targetEl && await this.props.targetEl()!
    if (el) {
      const p = { x: e.offsetX - el.offsetLeft, y: e.offsetY - el.offsetTop }
      this.setState({ ...this.state, ...p })
      this.props.onChange && this.props.onChange(p)
      if(this.props.selectButton){
         el.removeEventListener('click', this.onSelectListener)
      }
    }
  }
  protected async onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.currentTarget.checked
    const el = this.props.targetEl && await this.props.targetEl()
    if (el) {
      if (checked||this.props.selectButton) {
        el.addEventListener('click', this.onSelectListener)
      } else {
        el.removeEventListener('click', this.onSelectListener)
      }
    }
    this.setState({ ...this.state, selectActive: e.currentTarget.checked })
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
        <label>{label.x}<input ref={c => this.x = c} type="number" min={min.x} max={max.x} step={step.x}
          onChange={this.onChange} defaultValue={defaultValue.x + ''} value={this.state.x} /></label>
        <label>{label.y}
          <input ref={c => this.y = c} type="number" min={min.y} max={max.y} step={step.y}
            onChange={this.onChange} defaultValue={defaultValue.y + ''} value={this.state.y} /></label>
        {this.props.targetEl ?
        this.props.selectButton ? <button onClick={this.onSelect as any}>Select</button> : 
          <label> <input type="checkbox" checked={this.state.selectActive} onChange={this.onSelect} />Select</label> : ''}
      </span>
    )
  }
}

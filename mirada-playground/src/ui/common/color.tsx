import * as React from 'react'
import {  RGBColor, ColorResult , ChromePicker,} from 'react-color';
import { Scalar } from 'mirada';
import { between } from 'misc-utils-of-mine-generic';

interface P extends S {
  onChange: (c: Scalar) => void;
  targetEl?: () => Promise<HTMLCanvasElement>
  selectButton?: boolean
}

interface S {
  value: Scalar;
  displayColorPicker?: boolean;
  selectActive?: boolean
}

export class Color extends React.Component<P, S> {
  picker: ChromePicker | null = null

  constructor(p: P, s: S) {
    super(p, s);
    this.onSelect = this.onSelect.bind(this)
    this.onSelectListener = this.onSelectListener.bind(this)
    this.state = {
      displayColorPicker: false,
      selectActive: false,
      value:  p.value || {
        r: '241',
        g: '112',
        b: '19',
        a: '100',
      }
    };
  }

  protected async onSelectListener(e: MouseEvent) {
    const el = this.props.targetEl && await this.props.targetEl()!
    if (el) {
      const p = { x: e.offsetX - el.offsetLeft, y: e.offsetY - el.offsetTop }
      const [r, g, b, a] = document.querySelector<HTMLCanvasElement>('#inputCanvas')!.getContext('2d')!.getImageData(p.x, p.y, 1, 1).data
      const value = [ r, g, b, a ]
      this.setState({ value })
      this.props.onChange && this.props.onChange(value)
      if (this.props.selectButton) {
        el.removeEventListener('click', this.onSelectListener)
      }
    }
  }

  protected async onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.currentTarget.checked
    const el = this.props.targetEl && await this.props.targetEl()
    if (el) {
      if (checked || this.props.selectButton) {
        el.addEventListener('click', this.onSelectListener)
      } else {
        el.removeEventListener('click', this.onSelectListener)
      }
    }
    this.setState({ selectActive: e.currentTarget.checked })
  }

  protected handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  protected handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  protected handleChange = (color: ColorResult) => {
    const value = rgbColorToScalar(color.rgb) 
    this.setState({ value});
    this.props.onChange(value);
  };

  render() {
    return (<>
      <div style={this.styles().swatch} onClick={this.handleClick}>
        <div style={this.styles().color} />
      </div>
      {this.props.targetEl ?
        this.props.selectButton ? <button style={{ marginLeft: 10, display: 'inline-block', verticalAlign: 'super' }} onClick={this.onSelect as any}>Select</button> :
          <label style={{ marginLeft: 10, display: 'inline-block', verticalAlign: 'super' }}> <input style={{  display: 'inline-block', verticalAlign: 'super' }} type="checkbox" checked={this.state.selectActive} onChange={this.onSelect} />Select</label> : ''}
      {this.state.displayColorPicker ? <div style={this.styles().popover}>
        <div style={this.styles().cover} onClick={this.handleClose} />
        <ChromePicker color={scalarToRgbColor(this.state.value)}  onChange={this.handleChange} ref={c => this.picker = c} />
      </div> : null}
    </>);
  }

  protected styles() {
    const v = scalarToRgbColor(this.state.value)
    return {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: 2,
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }
    } as {
      [s: string]: React.CSSProperties;
    };
  }
}

export function scalarToRgbColor( c: Scalar, alphaMultiplier=1/255.0): RGBColor {
  return  {r: c[0],g: c[1],b: c[2],a: between(c[3]*alphaMultiplier, 0, 1)}
}
/**
 * the color piker library i'm using represents alpha channel with different scales depending on the widget... 
 */
export function rgbColorToScalar(c:RGBColor, alphaMultiplier=255.0 ): Scalar {
  return [c.r, c.g, c.b, typeof c.a!=='undefined' ? Math.round(c.a*alphaMultiplier) : 255]
}

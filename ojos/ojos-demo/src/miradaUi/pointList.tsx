import { Point as IPoint } from 'mirada'
import * as React from 'react'
import { PointProps, Point } from './point'
import { RemoveProperties } from 'misc-utils-of-mine-generic'

interface PointListProps extends RemoveProperties<PointProps, 'onChange'|'value'> {
  onChange: (p: IPoint[]) => void
  value?: IPoint[]
}

interface S  {
  points: IPoint[]
}

export class PointList extends React.Component<PointListProps, S> {
  y: HTMLInputElement | null = null
  x: HTMLInputElement | null = null

  constructor(p: PointListProps, s: IPoint) {
    super(p, s)
    this.onPointChange = this.onPointChange.bind(this)
    this.state = {
      points: p.value||[]
    }
  }
 
  protected onPointChange(p: IPoint, i: number){

  }

  render() {
    return (<>
    <button>Add</button>
      <ol>{this.state.points.map((p, i)=><li>
        <button>remove</button><button>up</button><button>down</button>
        <Point {...this.props} value={p} onChange={p=>this.onPointChange(p, i)}/>
        </li>)}</ol>
    </>)
  }
}

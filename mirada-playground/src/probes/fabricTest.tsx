import { fabric } from 'fabric'
import * as React from 'react'
import * as rd from 'react-dom'

export class FabricTest extends React.Component {
  c: HTMLCanvasElement = null as any
  render() {
    return <div>
      <canvas ref={c => this.ready(c)} height="400" width="400"></canvas>
    </div>
  }

  ready(c: HTMLCanvasElement | null): void {
    this.c = c!
    this.test1(c!)
    // var ctx = this.c.getContext('2d')!
    // set fill color of context
    // ctx.fillStyle = 'red';
    // create rectangle at a 100,100 point, with 20x20 dimensions
    // ctx.fillRect(100, 100, 20, 20);
  }

  test1(c: HTMLCanvasElement) {
    var staticCanvas = new fabric.Canvas(c)
    staticCanvas.add(
      new fabric.Rect({
        width: 101, height: 80,
        left: 100, top: 100,
        fill: 'green',
        angle: 30
      }))
  }
}


rd.render(<FabricTest />, document.getElementById('main'))

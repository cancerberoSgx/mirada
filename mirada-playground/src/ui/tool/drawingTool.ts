import { getShapeDrawing } from '../../app/start'
import { ShapeTypes } from '../../app/state'
import { ShapeFreeDrawingOptions } from '../../imageEditor/shapeDrawer'
import { AbstractTool } from './tool'

// export interface ShapeToolOptions extends ShapeFreeDrawingOptions {

// }

export class ShapeTool extends AbstractTool {
  toolGroupIndex: number = 1

  setRegion(s: ShapeTypes) {
    this.setState({ shapesTool: { ...this.state.shapesTool, activeShape: s } })
  }

  protected canvasOffset = { x: 0, y: 0 }
  static NAME = 'Shapes'
  // static SHORT_DESCRIPTION = 'Shape drawing tool'
  // static DESCRIPTION = 'Shape drawing tool'
  constructor() {
    super()
    this.name = ShapeTool.NAME
    this.description = 'Shape drawing tool'
    this.shortDescription = 'Shape drawing tool'
    // const drawingOptions = null as any
    // this.drawingTool = new ShapeFreeDrawing(drawingOptions)
    // this.selectionChangeListener = this.selectionChangeListener.bind(this)
    //   addStateChangeListener('selectionChanged', {
    //     type: 'selectionChanged',
    //     fn: this.selectionChangeListener
    //   })
  }
  // setShape(s: ShapeTypes) {
  // }

  async   setActive(b: boolean) {
    // console.log('ttoooo');
    // TODO: do this right though the State/Dispatcher and not directly here. 
    // debugger
    const manager = await getShapeDrawing()
    manager.setEnabled(true)
    super.setActive(b)
  }

}



import { ShapeTypes } from '../../app/state'
import {  ShapeFreeDrawingOptions } from '../imageEditor/rectangleFreeDrawing'
import { AbstractTool } from './tool'
import { getManagers } from '../../app/start';

export interface ShapeToolOptions extends ShapeFreeDrawingOptions {

}

export class ShapeTool extends AbstractTool {
  toolGroupIndex: number = 1
  // drawingTool: ShapeFreeDrawing;

  setRegion(s: ShapeTypes) {
    this.setState({ shapesTool: { ...this.state.shapesTool, activeShape: s } })
  }

  protected canvasOffset = { x: 0, y: 0 }
  static NAME = 'Shapes'
  static SHORT_DESCRIPTION = 'Shape drawing, management and classification tool'
  static DESCRIPTION = `Shape free drawing , grouping and tagging tool  TODO longer description`
  // protected image: ImageWidget
  constructor() {
    super()
    this.name = ShapeTool.NAME
    this.description = ShapeTool.DESCRIPTION

    const drawingOptions = null as any
    // this.drawingTool = new ShapeFreeDrawing(drawingOptions)
    // this.selectionChangeListener = this.selectionChangeListener.bind(this)
    //   addStateChangeListener('selectionChanged', {
    //     type: 'selectionChanged',
    //     fn: this.selectionChangeListener
    //   })
  }
  setShape(s: ShapeTypes) {

  }

async   setActive(b: boolean) {
  // TODO: do this right though the State/Dispatcher and not directly here. 
    const m = await getManagers()
    m.shapeDrawing.setEnabled(true)
    super.setActive(b)
  }

}



import { RegionDefinitionShapes } from '../../app/state'
import { ImageWidget } from '../imageEditor/imageWidget'
import { AbstractTool } from './tool'
import { RectangleFreeDrawing, RectangleFreeDrawingOptions } from '../imageEditor/rectangleFreeDrawing';

export interface ShapeToolOptions extends  RectangleFreeDrawingOptions {

}
export class ShapeTool extends AbstractTool {
  toolGroupIndex: number=1
  rectDrawing: RectangleFreeDrawing;

  setRegion(s: RegionDefinitionShapes) {
    this.setState({ shapesTool: { ...this.state.shapesTool, activeShape: s } })
  }

  protected canvasOffset = { x: 0, y: 0 }
  static NAME = 'Shapes'
  static SHORT_DESCRIPTION = 'Shape free drawing , grouping and tagging tool'
  static DESCRIPTION = `Shape free drawing , grouping and tagging tool  TODO longer description`

  constructor(protected image: ImageWidget, options: ShapeToolOptions) {
    super(image)
    this.name = ShapeTool.NAME
    this.description = ShapeTool.DESCRIPTION
    this.rectDrawing = new RectangleFreeDrawing(options)
    // this.selectionChangeListener = this.selectionChangeListener.bind(this)
  //   addStateChangeListener('selectionChanged', {
  //     type: 'selectionChanged',
  //     fn: this.selectionChangeListener
  //   })
  }
  setActive(b:boolean){
    this.rectDrawing.setEnabled(true)
    super.setActive(b)
  }

}



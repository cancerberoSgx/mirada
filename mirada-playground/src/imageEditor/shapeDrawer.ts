import { fabric } from 'fabric'
import { IEvent, Point } from 'fabric/fabric-impl'
import { throttle } from 'misc-utils-of-mine-generic'

export interface ShapeFreeDrawingOptions {
  canvas: fabric.Canvas
  /** rectangle  by default*/
  shapeKind?: ShapeKinds
  drawOnMove?: boolean
  disableAfterFinish?: boolean
  throttleOnMove?: number
  shapeOptions?: ShapeOptions
}

export type FabricObjectOptions = Exclude<(ConstructorParameters<typeof fabric.Object>)[0], undefined>
export type FabricRectOptions = Exclude<(ConstructorParameters<typeof fabric.Rect>)[0], undefined>
export type FabricEllipseOptions = Exclude<(ConstructorParameters<typeof fabric.Ellipse>)[0], undefined>
export type ShapeOptions = Partial<FabricObjectOptions & FabricRectOptions & FabricEllipseOptions>

export type ShapeKinds = 'rectangle' | 'ellipse'
const defaults: Required<ShapeFreeDrawingOptions> = {
  canvas: null as any,
  shapeKind: 'rectangle',
  drawOnMove: true,
  disableAfterFinish: true,
  throttleOnMove: 0,
  shapeOptions: {
    stroke: 'red',
    strokeWidth: 2,
    fill: '',
  }
}
interface ShapeEvent {
  shape: fabric.Object
}

export class ShapeFreeDrawing implements Required<ShapeFreeDrawingOptions>  {
  canvas: fabric.Canvas = null as any
  shapeKind: ShapeKinds = 'rectangle'
  drawOnMove: boolean = defaults.drawOnMove
  disableAfterFinish: boolean = defaults.disableAfterFinish
  shapeOptions: ShapeOptions = { ...defaults.shapeOptions }
  throttleOnMove = 0
  protected dragging = false
  protected enabled = false
  protected instance: fabric.Object | undefined
  protected initialPos = { x: 0, y: 0 };
  protected bounds = { x: 0, y: 0, width: 0, height: 0 }

  constructor(o: ShapeFreeDrawingOptions) {
    this.canvas = o.canvas
    Object.assign(this.shapeOptions, o.shapeOptions || {})
    Object.assign(this, { ...o, shapeOptions: undefined })
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.throttleOnMove > 0 ? throttle(this.onMouseMove.bind(this), this.throttleOnMove, { leading: true, trailing: true }) : this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.update = this.update.bind(this)
  }

  setEnabled(enabled: boolean) {
    debugger
    this.enabled = enabled
    if (this.enabled) {
      this.dragging = false
      this.instance = undefined
      this.canvas.on('mouse:down', this.onMouseDown)
      this.canvas.on('mouse:move', this.onMouseMove)
      this.canvas.on('mouse:up', this.onMouseUp)
    } else {
      this.dragging = false
      this.instance = undefined
      this.canvas.off('mouse:down', this.onMouseDown)
      this.canvas.off('mouse:move', this.onMouseMove)
      this.canvas.off('mouse:up', this.onMouseUp)
    }
  }

  protected onMouseDown(e: IEvent) {
    this.dragging = true
    if (!this.enabled || !e.pointer) {
      return
    }
    this.initialPos = { ...e.pointer }
    this.bounds = { x: 0, y: 0, width: 0, height: 0 }
    if (this.drawOnMove) {
      this.instance = new fabric.Rect({
        ...this.shapeOptions,
        left: this.initialPos.x,
        top: this.initialPos.y,
        width: 0, height: 0,
      })
      this.canvas.add(this.instance)
    }
  }

  protected update(pointer: Point) {
    if (this.initialPos.x > pointer.x) {
      this.bounds.x = Math.max(0, pointer.x)
      this.bounds.width = this.initialPos.x - this.bounds.x
    } else {
      this.bounds.x = this.initialPos.x
      this.bounds.width = pointer.x - this.initialPos.x
    }
    if (this.initialPos.y > pointer.y) {
      this.bounds.y = Math.max(0, pointer.y)
      this.bounds.height = this.initialPos.y - this.bounds.y
    } else {
      this.bounds.height = pointer.y - this.initialPos.y
      this.bounds.y = this.initialPos.y
    }
    if (this.drawOnMove && this.instance) {
      this.instance.left = this.bounds.x
      this.instance.top = this.bounds.y
      this.instance.width = this.bounds.width
      this.instance.height = this.bounds.height
      this.instance.dirty = true
      this.canvas.requestRenderAll()
    }
  }

  protected onMouseMove(e: IEvent) {
    if (!this.dragging || !this.enabled || !e.pointer) {
      return
    }
    requestAnimationFrame(() => this.update(e.pointer!))
  }

  protected onMouseUp(e: IEvent) {
    this.dragging = false
    if (!this.enabled) { return }
    if (this.drawOnMove && this.instance && (this.instance.width == 0 || this.instance.height === 0)) {
      this.canvas.remove(this.instance)
    }
    if (!this.drawOnMove || !this.instance) {
      this.instance = new fabric.Rect({
        ...this.shapeOptions,
        ...this.bounds, left: this.bounds.x, top: this.bounds.y,
      })
      this.canvas.add(this.instance)
    }
    this.instance.dirty = true
    this.instance!.setCoords()
    this.canvas.requestRenderAll()

    this.disableAfterFinish && this.setEnabled(false)
  }

}

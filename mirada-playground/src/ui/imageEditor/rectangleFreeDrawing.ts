import { fabric } from 'fabric'
import { IEvent, Point } from 'fabric/fabric-impl'

export interface RectangleFreeDrawingOptions {
  canvas: fabric.Canvas
  drawRect?: boolean
  onlyOne?: boolean
  rectProps?: RectProps
}

interface RectProps {
  stroke?: string
  strokeWidth?: number,
  fill?: string
}

type RequiredOptions = Required<RectangleFreeDrawingOptions> & {
  rectProps: Required<RectProps>;
}

const defaults: RequiredOptions = {
  canvas: null as any,
  drawRect: true,
  onlyOne: true,
  rectProps: {
    stroke: 'red',
    strokeWidth: 2,
    fill: ''
  }
}

export class RectangleFreeDrawing implements RequiredOptions {
  canvas: fabric.Canvas = null as any
  drawRect: boolean = defaults.drawRect
  onlyOne: boolean = defaults.onlyOne
  rectProps: Required<RectProps> = defaults.rectProps
  protected dragging = false
  protected enabled = false
  protected rect: fabric.Rect | undefined
  protected initialPos = { x: 0, y: 0 };
  protected bounds = { x: 0, y: 0, width: 0, height: 0 }

  constructor(o: RectangleFreeDrawingOptions) {
    Object.assign(this.rectProps, o.rectProps || {})
    Object.assign(this, { ...o, rectProps: undefined })
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.update = this.update.bind(this)
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (this.enabled) {
      this.dragging = false
      this.rect = undefined
      this.canvas.on('mouse:down', this.onMouseDown)
      this.canvas.on('mouse:move', this.onMouseMove)
      this.canvas.on('mouse:up', this.onMouseUp)
    } else {
      this.dragging = false
      this.rect = undefined
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
    if (this.drawRect) {
      this.rect = new fabric.Rect({
        left: this.initialPos.x,
        top: this.initialPos.y,
        width: 0, height: 0,
        ...this.rectProps
      })
      this.canvas.add(this.rect)
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
    if (this.drawRect && this.rect) {
      this.rect.left = this.bounds.x
      this.rect.top = this.bounds.y
      this.rect.width = this.bounds.width
      this.rect.height = this.bounds.height
      this.rect.dirty = true
      this.canvas.requestRenderAll()//.requestRenderAllBound()
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
    if (this.drawRect && this.rect && (this.rect.width == 0 || this.rect.height === 0)) {
      this.canvas.remove(this.rect)
    }
    if (!this.drawRect || !this.rect) {
      this.rect = new fabric.Rect({
        ...this.bounds, left: this.bounds.x, top: this.bounds.y,
        ...this.rectProps
      })
      this.canvas.add(this.rect)
      this.rect.dirty = true
      this.canvas.requestRenderAll()//.requestRenderAllBound()
    }
    this.onlyOne && this.setEnabled(false)
  }

}

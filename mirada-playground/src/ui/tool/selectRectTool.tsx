import { throttle } from 'misc-utils-of-mine-generic'
import { ImageWidget } from './imageWidget'
import { SelectRectView } from './selectRectView'
import { AbstractTool, defaultToolOptions, Options } from './tool'

export class SelectRectTool extends AbstractTool<SelectRectView> {

  static NAME = 'Rectangle Selection';
  static DESCRIPTION = `Let you select regions of the image as rectangles by frag & drop`
  viewClass = SelectRectView
  protected canvasOffset = { x: 0, y: 0 }
  protected rect = { x: 0, y: 0, width: 0, height: 0 }

  protected dragging = false

  constructor(protected image: ImageWidget, options?: Options) {
    super(image)
    this.name = SelectRectTool.NAME
    this.description = SelectRectTool.DESCRIPTION
    this.options = { ...defaultToolOptions, ...options }
    this.ctx = this.image.canvas.getContext("2d")!
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = throttle(this.onMouseMove.bind(this), this.options.mouseMoveThrottle)
    this.viewClass = SelectRectView
    // this.installView(SelectRectView)
  }

  public setActive(b: boolean) {
    super.setActive(b)
    this.checkListenersUninstalled()
    if (this.active) {
      this.image.canvas.addEventListener('mousedown', this.onMouseDown)
      this.image.canvas.addEventListener('mouseup', this.onMouseUp)
    }
    this.image.render(this.rect)
  }

  private checkListenersUninstalled() {
    if (!this.active) {
      this.image.canvas.removeEventListener('mouseup', this.onMouseDown)
      this.image.canvas.removeEventListener('mousedown', this.onMouseUp)
      this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
    }
  }

  protected onMouseDown(e: MouseEvent) {
    this.checkListenersUninstalled()
    this.canvasOffset = { x: this.image.canvas.offsetLeft, y: this.image.canvas.offsetTop }
    this.rect.x = e.pageX - this.canvasOffset.x
    this.rect.y = e.pageY - this.canvasOffset.y
    this.image.canvas.addEventListener('mousemove', this.onMouseMove)
    this.dragging = true
  }

  protected onMouseUp(e: MouseEvent) {
    this.checkListenersUninstalled()
    this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
    // if(this.state.selection.mode==='exclusive'){
    //TODO: cean current selection, and check it it was jsut a click make it empty
    // }
    const selectionRect = this.toMatRect()
    debugger
    this.setState({
      selection: {
        ...this.state.selection,
        rectangles: this.state.selection.mode === 'exclusive' ? [selectionRect] : [...this.state.selection.rectangles, selectionRect]
      }
    })
    // this.emit({ name: 'selection', rect: this.rect })
    this.dragging = false
  }

  protected onMouseMove(e: MouseEvent) {
    this.checkListenersUninstalled()
    if (!this.dragging) { return }
    this.rect.width = (e.pageX - this.canvasOffset.x) - this.rect.x
    this.rect.height = (e.pageY - this.canvasOffset.y) - this.rect.y

    const rectsToDraw = [this.rect]
    if (this.state.selection.mode === 'union') {
      // here we want to draw the current selection
      rectsToDraw.push(...this.state.selection.rectangles)
    }
    else if (this.state.selection.mode === 'exclusive') {
      // here only this rect but we dont erase the current ones yet
      this.image.render(this.toMatRect())
    }
    rectsToDraw.forEach(r => {
      //  if(this.ctx.strokeStyle) {
      this.ctx.strokeStyle = this.options.strokeStyle || 'black'
      this.ctx.lineWidth = this.options.lineWidth || 10
      //  }
      // if(this.ctx.fillStyle)
      this.ctx.fillStyle = this.options.fillStyle
      this.ctx.fillStyle ? this.ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height) : this.ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)

      this.ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
    })
  }

  private toMatRect(r = this.rect) {
    return {
      width: Math.abs(r.width),
      height: Math.abs(r.height),
      x: Math.abs(r.x - this.canvasOffset.x),
      y: Math.abs(r.y - this.canvasOffset.y)
    }
  }
}

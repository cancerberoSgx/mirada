import { throttle } from 'misc-utils-of-mine-generic'
import { ImageWidget } from './imageWidget'
import { AbstractTool, defaultToolOptions, Options } from './tool'

export class SelectRectTool extends AbstractTool {
  protected canvasOffset = { x: 0, y: 0 }
  protected rect = { x: 0, y: 0, width: 0, height: 0 }

  constructor(protected image: ImageWidget, options?: Options) {
    super(image)
    this.name = 'Rectangle Selection'
    this.description = `Let you select regions of the image as rectangles by frag & drop`
    this.options = { ...defaultToolOptions, ...options }
    this.ctx = this.image.canvas.getContext("2d")!
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = throttle(this.onMouseMove.bind(this), this.options.mouseMoveThrottle)
  }

  public setActive(b: boolean) {
    super.setActive(b)
    if (!b) {
      this.image.canvas.removeEventListener('mouseup', this.onMouseDown)
      this.image.canvas.removeEventListener('mousedown', this.onMouseUp)
      this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
    } else {
      this.image.canvas.addEventListener('mousedown', this.onMouseDown)
      this.image.canvas.addEventListener('mouseup', this.onMouseUp)
    }
    this.image.render(this.rect)
  }

  protected onMouseDown(e: MouseEvent) {
    this.canvasOffset = { x: this.image.canvas.offsetLeft, y: this.image.canvas.offsetTop }
    this.rect.x = e.pageX - this.canvasOffset.x
    this.rect.y = e.pageY - this.canvasOffset.y
    this.image.canvas.addEventListener('mousemove', this.onMouseMove)
    this.active = true
  }

  protected onMouseUp(e: MouseEvent) {
    this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
    this.emit({ name: 'selection', rect: this.rect })
    // this.setActive(false)
    // this.setState({active: false})
  }

  public onMouseMove(e: MouseEvent) {
    if (this.active) {
      this.rect.width = (e.pageX - this.canvasOffset.x) - this.rect.x
      this.rect.height = (e.pageY - this.canvasOffset.y) - this.rect.y
      this.image.render({ ...this.rect, x: this.rect.x - this.canvasOffset.x, y: this.rect.y - this.canvasOffset.y })
      this.ctx.strokeStyle = 'black'
      this.ctx.fillStyle = this.options.fillStyle
      this.ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
    }
  }
}

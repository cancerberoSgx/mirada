import { ImageWidget } from './imageWidget'
import { AbstractTool } from './tool'
import { File,  tool} from 'mirada';
import { GrabCutView } from './grabCutView';
import { StateChangeType, SelectionChangeListener, SelectionChangeEvent, addStateChangeListener } from '../../app/stateChangeExpert';

interface Options {

}


export class GrabCut extends AbstractTool<GrabCutView> {
  protected canvasOffset = { x: 0, y: 0 }
static NAME = 'Grab Cut'
static DESCRIPTION = `Intelligent way of removing the background. It doesn't need to be a solid color!. Use the selection tools to define the important regions`
  protected rect = { x: 0, y: 0, width: 0, height: 0 }
  protected drag = false


async selectionChangeListener(e: SelectionChangeEvent){
  const image = await File.fromFile('test/assets/lenna.jpg')
  const result = await cv.grabCutt({
    image,
    x: 50,
    y: 50,
    width: 260,
    height: 280
  })
  // const f = File.fromData(result.image, 'result.png')
  // t.deepEqual(f.size(), { width: 400, height: 400 })
  // t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
  // t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/lennaGrabCut.png')), 0)
  image.delete()
  f.delete()
}

// <T extends StateChangeType<T extends StateChangeType>(e: StateChangeEvent<T>)
  constructor(protected image: ImageWidget, options?: Options) {
    super(image, options)
    this.name = GrabCut.NAME
    this.description = GrabCut.DESCRIPTION
    this.viewClass= GrabCutView
// this.selectionChangeListener = this.selectionChangeListener.bind(this)
this.selectionChangeListener = this.selectionChangeListener.bind(this)
    addStateChangeListener('selectionChanged', {
  type: 'selectionChanged', 
  fn: this.selectionChangeListener
    })
    // this.installView(GrabCutView)
    // this.onMouseDown = this.onMouseDown.bind(this)
    // this.onMouseUp = this.onMouseUp.bind(this)
    // this.onMouseMove = throttle(this.onMouseMove.bind(this), this.options.mouseMoveThrottle)
  }

  // getView(){
    // const view:GrabCutView = new GrabCutView({}, this.getState(), this)
    // return view
    // t
  // }
  // public  setActive(b: boolean) {
  //   super.setActive(b)
  // if (!b) {
  // this.image.canvas.removeEventListener('mouseup', this.onMouseDown)
  // this.image.canvas.removeEventListener('mousedown', this.onMouseUp)
  // this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
  // } else {
  // this.image.canvas.addEventListener('mousedown', this.onMouseDown)
  // this.image.canvas.addEventListener('mouseup', this.onMouseUp)
  // }
  // this.image.render(this.rect)
  // }

  // protected onMouseDown(e: MouseEvent) {
  //   this.canvasOffset = { x: this.image.canvas.offsetLeft, y: this.image.canvas.offsetTop }
  //   this.rect.x = e.pageX - this.canvasOffset.x
  //   this.rect.y = e.pageY - this.canvasOffset.y
  //   this.image.canvas.addEventListener('mousemove', this.onMouseMove)
  //   this.drag = true
  // }

  // protected onMouseUp(e: MouseEvent) {
  //   this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
  //   this.drag = false
  //   this.emit({name: 'selection', rect: this.rect})
  // }

  // public onMouseMove(e: MouseEvent) {
  //   if (this.drag) {
  //     this.rect.width = (e.pageX - this.canvasOffset.x) - this.rect.x
  //     this.rect.height = (e.pageY - this.canvasOffset.y) - this.rect.y
  //     this.image.render({ ...this.rect, x: this.rect.x - this.canvasOffset.x, y: this.rect.y - this.canvasOffset.y })
  //     this.ctx.strokeStyle = 'black'
  //     this.ctx.fillStyle = this.options.fillStyle
  //     this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  //   }
  // }
}



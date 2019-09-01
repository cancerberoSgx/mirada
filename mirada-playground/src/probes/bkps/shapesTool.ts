// import { ImageWidget } from './imageWidget'
// import { AbstractTool } from './tool'
// import { File,  tool} from 'mirada';
// import { GrabCutView } from './grabCutView';
// import { StateChangeType, SelectionChangeListener, SelectionChangeEvent, addStateChangeListener } from '../../app/stateChangeExpert';

// interface Options {

// }


// export class Shapes extends AbstractTool<GrabCutView> {
// static NAME = 'Shapes'
// static DESCRIPTION = `add shapes in the image that support selection and many transformations`

// async selectionChangeListener(e: SelectionChangeEvent){
// }
//   constructor(protected image: ImageWidget, options?: Options) {
//     super(image, options)
//     this.name = Shapes.NAME
//     this.description = Shapes.DESCRIPTION
//     this.viewClass= ShapesView
// this.selectionChangeListener = this.selectionChangeListener.bind(this)
//   }

//   // getView(){
//     // const view:GrabCutView = new GrabCutView({}, this.getState(), this)
//     // return view
//     // t
//   // }
//   // public  setActive(b: boolean) {
//   //   super.setActive(b)
//   // if (!b) {
//   // this.image.canvas.removeEventListener('mouseup', this.onMouseDown)
//   // this.image.canvas.removeEventListener('mousedown', this.onMouseUp)
//   // this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
//   // } else {
//   // this.image.canvas.addEventListener('mousedown', this.onMouseDown)
//   // this.image.canvas.addEventListener('mouseup', this.onMouseUp)
//   // }
//   // this.image.render(this.rect)
//   // }

//   // protected onMouseDown(e: MouseEvent) {
//   //   this.canvasOffset = { x: this.image.canvas.offsetLeft, y: this.image.canvas.offsetTop }
//   //   this.rect.x = e.pageX - this.canvasOffset.x
//   //   this.rect.y = e.pageY - this.canvasOffset.y
//   //   this.image.canvas.addEventListener('mousemove', this.onMouseMove)
//   //   this.drag = true
//   // }

//   // protected onMouseUp(e: MouseEvent) {
//   //   this.image.canvas.removeEventListener('mousemove', this.onMouseMove)
//   //   this.drag = false
//   //   this.emit({name: 'selection', rect: this.rect})
//   // }

//   // public onMouseMove(e: MouseEvent) {
//   //   if (this.drag) {
//   //     this.rect.width = (e.pageX - this.canvasOffset.x) - this.rect.x
//   //     this.rect.height = (e.pageY - this.canvasOffset.y) - this.rect.y
//   //     this.image.render({ ...this.rect, x: this.rect.x - this.canvasOffset.x, y: this.rect.y - this.canvasOffset.y })
//   //     this.ctx.strokeStyle = 'black'
//   //     this.ctx.fillStyle = this.options.fillStyle
//   //     this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
//   //   }
//   // }
// }



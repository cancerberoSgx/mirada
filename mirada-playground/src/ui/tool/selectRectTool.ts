import * as cv from 'mirada';
import { ImageWidget } from './imageWidget';
import { renderInCanvas, Mat } from 'mirada';

export interface Tool {
  // setImage(arg0: this): any;
  // setCanvas(canvas: HTMLCanvasElement): void;
}

export class AbstractTool implements Tool {
  // setCanvas(canvas: HTMLCanvasElement): void {
  //   this.canvas = canvas
  // }
  // target: ImageWidget;
  constructor(protected image: ImageWidget) {
    // this.widget.initializeTool(this)
  }
}
interface Options {
  strokeStyle?: string
  lineWidth?: number
  fill?:string
}
const defaultOptions: Required<Options> = {
  strokeStyle: 'black',
  lineWidth: 10,
  fill: 'none'
}

export interface Region {
  x: number
  y:number
  width:number
  height:number
  color?: any;
  thickness?: any;
  lineType?: any;
  shift?: any;
}

export class SelectRectTool extends AbstractTool{
  ctx: CanvasRenderingContext2D;
  // startPosition= {x: 0, y: 0}
  options: Required<Options>
  // region: Region = {...this.startPosition, width: 0, height: 0}
  canvasOffset= {x: 0, y: 0}
  rect= {x:0, y: 0, width: 0, height: 0}
  drag=false
  constructor(protected image: ImageWidget, options?:Options) {
  super(image)
    this.options = {...defaultOptions, ...options}
  this.ctx = this.image.canvas.getContext("2d")!
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  onMouseDown(e: MouseEvent) {
    this.canvasOffset = {x:this.image.canvas.offsetLeft, y: this.image.canvas.offsetTop}
    // this.startPosition = this.getCursorPos(e)
     this.rect.x = e.pageX - this.canvasOffset.x;
  this.rect.y = e.pageY - this.canvasOffset.y;
    this.image.canvas.addEventListener('mousemove', this.onMouseMove);
    this.drag = true
  }
  onMouseUp(e: MouseEvent) {
    this.image.canvas.removeEventListener('mousemove', this.onMouseMove);
    // this.state = 'drawn';
     this. drag = false;
    // this.  startPosition= {x: 0, y: 0}
  }
  onMouseMove(e: MouseEvent) { // THROTTLE

  if (this.drag) {
    this.rect.width = (e.pageX - this.canvasOffset.x) - this.rect.x;
    this.rect.height = (e.pageY - this.canvasOffset.y) - this.rect.y ;
    // this.ctx.clearRect(0,0,this.image.canvas.width,this.image.canvas.height);
    // draw();
    this.image.render({...this.rect, x: this.rect.x-this.canvasOffset.x, y: this.rect.y-this.canvasOffset.y})
    this.ctx.strokeStyle='black'
     this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }

  // const cursor = this.getCursorPos(e)
  // const x = Math.min(this.startPosition.x, cursor.x)-this.canvasOffset.x, y = Math.min(this.startPosition.y, cursor.y)-this.canvasOffset.y, 
  // height= Math.max(this.startPosition.y, cursor.x)-this.canvasOffset.y - y, width =  Math.max(this.startPosition.x, cursor.x)-this.canvasOffset.x - x
  // this.region = {x, y,  width, height }
    // this.image.render(this.region)
      //  this.ctx.beginPath();
        // var width = mousex-last_mousex;
        // var height = mousey-last_mousey;
        // ctx.rect(last_mousex,last_mousey,width,height);
    // this.ctx.rect(this.region.x, this.region.y, this.region.width, this.region.height)
      // this.  ctx.strokeStyle = this.options.strokeStyle
      // this.  ctx.lineWidth = 10;
      // this.  ctx.stroke();
// renderInCanvas()
    //  ctx.clearRect(0,0,$(this).width(),$(this).height());
    //  var initialX = event.clientX - this.getBoundingClientRect().left;
    //  var initialY = event.clientY - this.getBoundingClientRect().top;

    //  $(this).mousemove(function(evt) {
    //      ctx.strokeRect(initialX, initialY, evt.clientX - event.clientX, evt.clientY - event.clientY);
    //  });
  }


//   function mouseDown(e) {
//   rect.startX = e.pageX - this.offsetLeft;
//   rect.startY = e.pageY - this.offsetTop;
//   drag = true;
// }

// function mouseUp() {
//   drag = false;
// }

// function mouseMove(e) {
//   if (drag) {
//     rect.w = (e.pageX - this.offsetLeft) - rect.startX;
//     rect.h = (e.pageY - this.offsetTop) - rect.startY ;
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     draw();
//   }
// }


setActive(b:boolean){
// this.state='idle'
if(!b){
    this.image.canvas.removeEventListener('mouseup', this.onMouseDown);
    this.image.canvas.removeEventListener('mousedown', this.onMouseUp);
    this.image.canvas.removeEventListener('mousemove', this.onMouseMove);
}else {
    this.image.canvas.addEventListener('mousedown', this.onMouseDown);
    this.image.canvas.addEventListener('mouseup', this.onMouseUp);
}
  this.image.render(this.rect)
}
  // state: 'idle' | 'dragging' | 'drawn' = 'idle';

  // private getCursorPos(e: MouseEvent) {
  //   return { x: e.clientX - this.canvasOffset.x, y: e.clientY - this.canvasOffset.y};
  // }
}

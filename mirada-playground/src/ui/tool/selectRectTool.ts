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
export class SelectRectTool extends AbstractTool{
  ctx: CanvasRenderingContext2D;
  startPosition= {x: 0, y: 0}
  options: Required<Options>
  // target: HTMLCanvasElement;
  constructor(protected image: ImageWidget, options?:Options) {
  super(image)
    this.options = {...defaultOptions, ...options}
  // this.image.canvas = image.canvas
  this.ctx = this.image.canvas.getContext("2d")!
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.image.canvas.addEventListener('mousedown', this.onMouseDown);
    this.image.canvas.addEventListener('mouseup', this.onMouseUp);
  }
  onMouseDown(e: MouseEvent) {
    this.startPosition =new cv.Point(e.offsetX, e.offsetY)
    this.image.canvas.addEventListener('mousemove', this.onMouseMove);
    // this.state = 'dragging';
  }
  onMouseUp(e: MouseEvent) {
    this.image.canvas.removeEventListener('mousemove', this.onMouseMove);
    // this.state = 'drawn';
    this.  startPosition= {x: 0, y: 0}
  }
  onMouseMove(e: MouseEvent) { // THROTTLE
  const region = {...this.startPosition, width: Math.abs(e.offsetX-this.startPosition.x), height: Math.abs(e.offsetY-this.startPosition.y) }
    this.image.render(region)
       this.ctx.beginPath();
        // var width = mousex-last_mousex;
        // var height = mousey-last_mousey;
        // ctx.rect(last_mousex,last_mousey,width,height);
    this.ctx.rect(region.x, region.y, region.width, region.height)
      this.  ctx.strokeStyle = this.options.strokeStyle
      this.  ctx.lineWidth = 10;
      this.  ctx.stroke();
// renderInCanvas()
    //  ctx.clearRect(0,0,$(this).width(),$(this).height());
    //  var initialX = event.clientX - this.getBoundingClientRect().left;
    //  var initialY = event.clientY - this.getBoundingClientRect().top;

    //  $(this).mousemove(function(evt) {
    //      ctx.strokeRect(initialX, initialY, evt.clientX - event.clientX, evt.clientY - event.clientY);
    //  });
  }
  // state: 'clean' | 'dragging' | 'drawn' = 'clean';
}

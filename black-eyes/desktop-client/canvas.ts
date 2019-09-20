import { dirname } from 'path'
import { basename } from 'misc-utils-of-mine-generic'
import { AbstractComponent, StateComponent } from "./abstractComponent";
import * as gui from 'gui'
import { State } from './state';
import { readFileSync } from 'fs';

interface CP {
  win: gui.Window
}
type RP ='imageBuffer'
export class Canvas extends StateComponent<CP> {
  protected view: gui.Scroll = null as any
  protected relevantProperties:RP[] = [  'imageBuffer'] 
  protected win: gui.Window = null as any
  protected canvas: gui.Canvas = null as any
  protected image: gui.Image = null as any
  protected canvasContainer: gui.Container = null as any
 protected imageData: ArrayBuffer|ArrayBufferView= null as any

  render() {
    this.view = gui.Scroll.create()
    this.view.setStyle({ flex: 1, flexgrow: 1, width: '100%', height: '100%', flexdirection: 'column' })
    this.canvasContainer = gui.Container.create()
    this.view.setContentView(this.canvasContainer)
    this.drawImage(readFileSync(this.state.image));
    this.canvasContainer.onDraw = (self: gui.Container, painter: gui.Painter, dirty: gui.RectF) => {
      painter.drawCanvasFromRect(this.canvas, dirty, dirty)  
    }
    return this.view
  }

  drawImage(p: ArrayBuffer|ArrayBufferView) {
    this.imageData = p
    this.image =  gui.Image.createFromBuffer(  this.imageData, 1)
    const size = this.image.getSize()
    this.view.setContentSize(size)
    // this.canvasContainer.setStyle({
    //   ...size,
    //   // minwidth: size.width,
    //   // minheight: size.height
    // })
    this. canvas = gui.Canvas.create(size, 1);
    this.canvas.getPainter().drawImage(this.image, { x: 0, y: 0, ...size });
    this.canvasContainer.schedulePaint()
  }

protected stateChanged(names: RP[], s:Partial<State>) {
  // if(names.includes('imageBuffer')&&s['imageBuffer']){
    this.drawImage(s['imageBuffer']!)
  // } 
  }
  // protected stateChanged(name: string, newValue: any, oldValue: any) {
  //   this.drawImage(typeof newValue==='string' ? readFileSync(newValue) : newValue);
  // }
}

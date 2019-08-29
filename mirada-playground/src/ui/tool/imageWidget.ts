import { tryTo } from 'misc-utils-of-mine-generic';
// import * as cv from 'mirada'
import { Tool, Region } from './selectRectTool';
import { renderInCanvas, Mat, File   } from 'mirada';

export class ImageWidget {
  protected buffer: Mat;

  protected images: {
    [n: string]: File;
  } = {};
  protected activeTool: Tool|undefined

  constructor(public readonly  canvas: HTMLCanvasElement, private image: File) {
    this.buffer = this.image.mat.clone();
    this.load(this.image)
  }

  save(n: string = this.image.name) {
    if (this.images[n]) {
      tryTo(() => this.images[n]!.delete());
    }
    this.images[n] = this.image;
  }

  load(i: File | string) {
    if (typeof i === 'string' && this.images[i]) {
      this.image = this.images[i];
    }
    if (File.isFile(i)) {
      this.image = i;
      this.images[this.image.name] = this.image;
    }
    this.canvas.width = this.buffer.cols;
    this.canvas.height = this.buffer.rows;
    this.render();
  }
  public render(r?: Region) {
    if(r){
     renderInCanvas(this.buffer, {canvas:this.canvas, forceSameSize: true, region: r})
    }else {
    cv.imshow(this.canvas, this.buffer);
    }
  }
// protected  renderRe(r: R) {
  // implements the visual feedback with a triangle - we use the canvas directly to not make the Mat dirty unnecessary. We use Mat only to restore the images (read) (erase the rectangles)
  // erase previous rectangles inside current region
 
    // this.image.image.copyTo(this.buffer);
// this
    // cv.rectangle(this.buffer, r.pt1, r.pt2, r.color, r.thickness, r.lineType, r.shift);
    // this.render();
  // }
  // installTool(t: Tool) {
    // t.setImage(this)
    // t.canvas =this.canvas
  // }
}

// class File extends File {
  // get width() {
  //   return this.mat.cols;
  // }
  // get height() {
  //   return this.mat.rows;
  // }
  // get image() {
  //   return this.mat;
  // }
// }

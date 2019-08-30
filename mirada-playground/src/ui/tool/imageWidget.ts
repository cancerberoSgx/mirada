import { File, Mat, renderInCanvas } from 'mirada'
import { tryTo } from 'misc-utils-of-mine-generic'
import { Rectangle } from '../../app/state';

export class ImageWidget {
  protected buffer: Mat;

  protected images: {
    [n: string]: File;
  } = {};

  constructor(public readonly canvas: HTMLCanvasElement, private image: File) {
    this.buffer = this.image.mat.clone()
    this.load(this.image)
  }

  save(n: string = this.image.name) {
    if (this.images[n]) {
      tryTo(() => this.images[n]!.delete())
    }
    this.images[n] = this.image
  }

  load(i: File | string) {
    if (typeof i === 'string' && this.images[i]) {
      this.image = this.images[i]
    }
    if (File.isFile(i)) {
      this.image = i
      this.images[this.image.name] = this.image
    }
    this.canvas.width = this.buffer.cols
    this.canvas.height = this.buffer.rows
    this.render()
  }
  public async render(r?: Rectangle) {
    if (r) {
      await renderInCanvas(this.buffer, { canvas: this.canvas, forceSameSize: true, region: r })
    } else {
     await  cv.imshow(this.canvas, this.buffer)
    }
  }
}


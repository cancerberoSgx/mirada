import { File, Mat, renderInCanvas } from 'mirada'
import { tryTo } from 'misc-utils-of-mine-generic'
import { Rectangle } from '../app/state'

export class ImageWidget {
  protected buffer: Mat = null as any;

  protected images: {
    [n: string]: File;
  } = {};

  constructor(public readonly canvas: HTMLCanvasElement, protected image: File) {
    this.load(this.image)
  }

  get imageSize() {
    return { width: this.image.width, height: this.image.height }
  }

  save(n: string = this.image.name) {
    this.delete(n)
    this.images[n] = this.image
  }

  delete(i: File | string) {
    var image = typeof i === 'string' ? this.images[i] : i || undefined
    try {
      image && image.delete()
      delete this.images[this.image.name]
    } catch (error) {
    }
    tryTo(() => image && image.delete())
  }

  load(i: File | string) {
    if (typeof i === 'string' && this.images[i]) {
      this.image = this.images[i]
    }
    if (File.isFile(i)) {
      this.image = i
      this.images[this.image.name] = this.image
    }
    try {
      this.buffer.delete()
    } catch (error) {
    }
    this.buffer = this.image.mat.clone()
    this.canvas.width = this.buffer.cols
    this.canvas.height = this.buffer.rows
    this.render()
  }

  get(name = this.image.name) {
    return this.images[name] || this.image
  }

  updateFromCanvas(c = this.canvas) {
    this.delete(this.image)
    this.load(File.fromCanvas(c))
  }

  public async render(r?: Rectangle) {
    if (r) {
      await renderInCanvas(this.buffer, { canvas: this.canvas, forceSameSize: true, region: r })
    } else {
      await cv.imshow(this.canvas, this.buffer)
    }
  }
}


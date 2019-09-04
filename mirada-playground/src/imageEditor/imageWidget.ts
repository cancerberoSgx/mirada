import { asImageData, File, Mat, renderInCanvas } from 'mirada'
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
    tryTo(() => image && image.delete())
    tryTo(() => this.buffer && this.buffer.delete())
    tryTo(() => this.images[this.image.name] && this.images[this.image.name].delete())
  }

  load(i: File | string) {
    if (typeof i === 'string' && this.images[i]) {
      this.image = this.images[i]
    }
    if (File.isFile(i)) {
      this.image = i
    }
    this.images[this.image.name] = this.image
    tryTo(() => this.buffer.delete())
    this.buffer = this.image.mat.clone()
    this.canvas.width = this.buffer.cols
    this.canvas.height = this.buffer.rows
    this.render()
  }

  async resizeCanvas(x: number, y: number) {
    this.canvas.width = x
    this.canvas.height = y
    const data = asImageData(this.buffer)
    this.canvas.getContext('2d')!.putImageData(new ImageData(data.data, data.width, data.height), 0, 0, 0, 0, 
      Math.max(0, Math.min(data.width, this.canvas.width)), Math.max(0, Math.min(data.height, this.canvas.height)))
    tryTo(() => this.buffer.delete())
    this.buffer = cv.matFromImageData(data)
  }

  imageOffset(x: number, y: number) {
    const c = this.canvas.getContext('2d')!
    const data = asImageData(this.buffer)
    c.fillStyle = "white"
    c.fillRect(0, 0, this.canvas.width, this.canvas.height)
    c.putImageData(new ImageData(data.data, data.width, data.height), x, y, 0, 0, 
      Math.max(0, Math.min(data.width, this.canvas.width)), Math.max(0, Math.min(data.height, this.canvas.height)))
    tryTo(() => this.buffer.delete())
    this.buffer = cv.matFromImageData(data)
  }

  get(name = this.image.name) {
    return this.images[name] || this.image
  }

  updateFromCanvas(c = this.canvas) {
    this.delete(this.image)
    this.load(File.fromCanvas(c))
  }

  setBuffer(b: Mat) {
    tryTo(() => this.buffer.delete())
    this.buffer = b
  }

  getBuffer() {
    return this.buffer
  }

  public async render(r?: Rectangle) {
    if (r) {
      await renderInCanvas(this.buffer, { canvas: this.canvas, forceSameSize: true, region: r })
    } else {
      await cv.imshow(this.canvas, this.buffer)
    }
  }
}


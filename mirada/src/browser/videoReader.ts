import { Mat, Size } from '..'

interface Options {
  size?: 'videoSize' | 'video' | 'canvas'
  noMatCheck?: boolean
  constraints?: MediaStreamConstraints
}

/**
Usage example:

```js
const video = document.querySelector<HTMLVideoElement>('video')!
const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
try {
const FPS = 30
await loadOpencv()
const c = new VideoReader(video, canvas)
await c.canPlay()
const src = c.mat // read only!
const dst = new cv.Mat(src.rows, src.cols, cv.CV_8UC1)
const process = () => {
  let t0 = now()
  c.read() // reads video frame on src
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
  cv.imshow(canvas, dst)
  let delay = 1000 / FPS - msFrom(t0)
  setTimeout(process, delay)
}
process()
} catch (error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  console.trace(error)
}
```

 */
export class VideoReader {
  ctx: CanvasRenderingContext2D;
  mat: Mat = null as any
  protected size: Size

  /**
   * Indicates if the video is currently being processed
   */
  streaming: boolean = false

  protected static defaultOptions: Options = {
    size: 'canvas',
    constraints: {
      audio: false,
      video: true
    }
  }

  constructor(protected video: HTMLVideoElement, protected canvas: HTMLCanvasElement, protected o: Options = VideoReader.defaultOptions) {
    this.o = { ...VideoReader.defaultOptions, ...o }
    this.ctx = canvas.getContext('2d')!
    this.size = this.getSize()
  }

  /**
   * reads current video frame into [mat]
   */
  read() {
    this.o.noMatCheck || this.matCheck()
    this.ctx.drawImage(this.video, 0, 0, this.size.width, this.size.height)
    this.mat.data.set(this.ctx.getImageData(0, 0, this.size.width, this.size.height).data)
  }

  canPlay() {
    const constraints = {
      audio: false,
      video: true
    }
    return new Promise(resolve => {
      this.video.addEventListener('canplay', () => {
        const size = this.getSize()
        this.canvas.width = size.width
        this.canvas.height = size.height
        this.mat = new cv.Mat(size.height, size.width, cv.CV_8UC4)
        this.streaming = true
        resolve()
      }, false)
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        this.video.srcObject = stream
      })
    })
  }

  protected getSize() {
    if (!this.size) {
      this.size = this.o.size === 'videoSize' ? {
        width: this.video.videoWidth,
        height: this.video.videoHeight
      } : this.o.size === 'video' ? {
        width: this.video.width,
        height: this.video.height
      } : {
            width: this.canvas.width,
            height: this.canvas.height
          }
    }
    return this.size
  }

  private matCheck() {
    if (!(this.mat instanceof cv.Mat)) {
      throw new Error('Please input the valid cv.Mat instance.')
    }
    if (this.mat.type() !== cv.CV_8UC4) {
      throw new Error('Bad type of input mat: the type should be cv.CV_8UC4.')
    }
    if (this.mat.cols !== this.size.width || this.mat.rows !== this.size.height) {
      throw new Error('Bad size of input mat: the size should be same as the video.')
    }
  }
}

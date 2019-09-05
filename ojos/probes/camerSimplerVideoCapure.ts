// import { Mat, Size } from '../../src'
// interface Options {
//   size?: 'videoSize' | 'video' | 'canvas'
//   noMatCheck?: boolean
//   constraints?: MediaStreamConstraints
// }

// export class VideoCapture {
//   ctx: CanvasRenderingContext2D;
//   mat: Mat = null as any
//   streaming: boolean = false
//   static defaultOptions: Options = {
//     size: 'canvas',
//     constraints: {
//       audio: false,
//       video: true
//     }
//   }
//   protected size: Size

//   constructor(protected video: HTMLVideoElement, protected canvas: HTMLCanvasElement, protected o: Options = VideoCapture.defaultOptions) {
//     this.o = { ...VideoCapture.defaultOptions, ...o }
//     this.ctx = canvas.getContext('2d')!
//     this.size = this.getSize()
//   }

//   canPlay() {
//     const constraints = {
//       audio: false,
//       video: true
//     }
//     return new Promise(resolve => {
//       this.video.addEventListener('canplay', () => {
//         const size = this.getSize()
//         this.canvas.width = size.width
//         this.canvas.height = size.height
//         this.mat = new cv.Mat(size.height, size.width, cv.CV_8UC4)
//         this.streaming = true
//         resolve()
//       }, false)
//       navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//         this.video.srcObject = stream
//       })
//     })
//   }

//   protected getSize() {
//     if (!this.size) {
//       this.size = this.o.size === 'videoSize' ? {
//         width: this.video.videoWidth,
//         height: this.video.videoHeight
//       } : this.o.size === 'video' ? {
//         width: this.video.width,
//         height: this.video.height
//       } : {
//             width: this.canvas.width,
//             height: this.canvas.height
//           }
//     }
//     return this.size
//   }

//   read() {
//     this.o.noMatCheck || this.matCheck()
//     this.ctx.drawImage(this.video, 0, 0, this.size.width, this.size.height)
//     this.mat.data.set(this.ctx.getImageData(0, 0, this.size.width, this.size.height).data)
//   }

//   private matCheck() {
//     if (!(this.mat instanceof cv.Mat)) {
//       throw new Error('Please input the valid cv.Mat instance.')
//     }
//     if (this.mat.type() !== cv.CV_8UC4) {
//       throw new Error('Bad type of input mat: the type should be cv.CV_8UC4.')
//     }
//     if (this.mat.cols !== this.size.width || this.mat.rows !== this.size.height) {
//       throw new Error('Bad size of input mat: the size should be same as the video.')
//     }
//   }
// }

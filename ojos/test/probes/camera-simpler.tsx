import 'babel-polyfill'
import { loadOpencv } from '../../src'
import { msFrom, now } from '../../src/util/misc'
import { VideoCapture } from './camerSimplerVideoCapure'

document.getElementById('main')!.innerHTML = `
<video width="500" height="300" playsinline autoplay ></video>
<canvas width="500" height="300"></canvas>
`
async function test() {
  const video = document.querySelector<HTMLVideoElement>('video')!
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
  try {
    const FPS = 30
    await loadOpencv()
    const c = new VideoCapture(video, canvas)
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
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
    console.trace(error)
  }
}
test()

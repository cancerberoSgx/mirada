import * as Mirada_ from 'mirada'
declare var Mirada: typeof Mirada_

;(async () => {
  const video = document.getElementById('videoInput')! as HTMLVideoElement
  const src = new cv.Mat(video.height, video.width, cv.CV_8UC4)
  const dst = new cv.Mat(video.height, video.width, cv.CV_8UC1)
  const FPS = 30
  const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
  const cap = new cv.VideoCapture(video)
  const processVideo = () => {
    try {
      if (!v.streaming) {
        src.delete()
        dst.delete()
        return
      } else {
        const begin = Date.now()
        cap.read(src)
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
        cv.imshow(canvas, dst)
        const delay = 1000 / FPS - (Date.now() - begin)
        setTimeout(processVideo, delay)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const v = new Mirada.CameraHelper(video, canvas, processVideo)
  setTimeout(() => v.start(), 0)
  setTimeout(() => v.stop(), 6660)
})()

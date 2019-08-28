import * as Mirada from 'mirada'
declare var cv: Mirada.CV

(async () => {
  let videoInput = document.getElementById('videoInput')! as HTMLVideoElement
  const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
  let cap = new cv.VideoCapture(videoInput)
  let [maxCorners, qualityLevel, minDistance, blockSize] = [30, 0.3, 7, 7]
  // parameters for lucas kanade optical flow
  let winSize = new cv.Size(15, 15)
  let maxLevel = 2
  let criteria = new cv.TermCriteria(cv.TermCriteria_EPS | cv.TermCriteria_COUNT, 10, 0.03)
  // create some random colors
  let color: Mirada.Scalar[] = []
  for (let i = 0; i < maxCorners; i++) {
    color.push(
      new cv.Scalar(
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        255
      )
    )
  }
  let frameGray = new cv.Mat()
  let oldFrame = new cv.Mat(videoInput.height, videoInput.width, cv.CV_8UC4)
  let oldGray = new cv.Mat()
  let p1 = new cv.Mat()
  let st = new cv.Mat()
  let err = new cv.Mat()
  const FPS = 30
  const v = new Mirada.CameraHelper(videoInput, canvas, processVideo)
  setTimeout(() => v.start(), 0)
  setTimeout(() => v.stop(), 10000)

  async function processVideo() {
    await new Promise(resolve => setTimeout(resolve, 500))
    cap.read(oldFrame)
    cv.cvtColor(oldFrame, oldGray, cv.COLOR_RGB2GRAY)
    let p0 = new cv.Mat()
    let none = new cv.Mat()
    let zeroEle = new cv.Scalar(0, 0, 0, 255)
    cv.goodFeaturesToTrack(oldGray, p0, maxCorners, qualityLevel, minDistance, none, blockSize)
    // Create a mask image for drawing purposes
    let mask = new cv.Mat(oldFrame.rows, oldFrame.cols, oldFrame.type(), zeroEle)
    let frame = new cv.Mat(videoInput.height, videoInput.width, cv.CV_8UC4)
    f()
    function f() {
      try {
        if (!v.streaming) {
          frame.delete()
          oldGray.delete()
          p0.delete()
          p1.delete()
          err.delete()
          mask.delete()
          return
        }
        let begin = Date.now()
        cap.read(frame)
        cv.cvtColor(frame, frameGray, cv.COLOR_RGBA2GRAY)
        // calculate optical flow
        cv.calcOpticalFlowPyrLK(oldGray, frameGray, p0, p1, st, err, winSize, maxLevel, criteria)
        // select good points
        let goodNew = []
        let goodOld = []
        for (let i = 0; i < st.rows; i++) {
          if (st.data[i] === 1) {
            goodNew.push(new cv.Point(p1.data32F[i * 2], p1.data32F[i * 2 + 1]))
            goodOld.push(new cv.Point(p0.data32F[i * 2], p0.data32F[i * 2 + 1]))
          }
        }
        // draw the tracks
        for (let i = 0; i < goodNew.length; i++) {
          cv.line(mask, goodNew[i], goodOld[i], color[i], 2)
          cv.circle(frame, goodNew[i], 5, color[i], -1)
        }
        cv.add(frame, mask, frame)
        cv.imshow(canvas, frame)
        // now update the previous frame and previous points
        frameGray.copyTo(oldGray)
        p0.delete()
        p0 = new cv.Mat(goodNew.length, 1, cv.CV_32FC2)
        for (let i = 0; i < goodNew.length; i++) {
          p0.data32F[i * 2] = goodNew[i].x
          p0.data32F[i * 2 + 1] = goodNew[i].y
        }
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin)
        setTimeout(f, delay)
      } catch (err) {
        console.error(err)
      }
    }
  }
})()

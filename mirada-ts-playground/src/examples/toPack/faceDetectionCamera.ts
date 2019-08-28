import * as Mirada from 'mirada'
declare var cv: Mirada.CV;

(async () => {
  // heads up - Mirada supports CameraHelper that simplify this code - but in this example we want to do it all manually

  async function test() {
    const height = parseInt(videoInput.getAttribute('height')!)
    const width = parseInt(videoInput.getAttribute('width')!)
    let src = new cv.Mat(height, width, cv.CV_8UC4)
    let dst = new cv.Mat(height, width, cv.CV_8UC4)
    let gray = new cv.Mat()
    let cap = new cv.VideoCapture(videoInput)
    let faces = new cv.RectVector()
    let classifier = new cv.CascadeClassifier()
    // load pre-trained classifiers
    classifier.load(await Mirada.loadDataFile('haarcascade_frontalface_default.xml'))
    const FPS = 30
    function processVideo() {
      try {
        if (!streaming) {
          // clean and stop.
          src.delete()
          dst.delete()
          gray.delete()
          faces.delete()
          classifier.delete()
          return
        }
        let begin = Date.now()
        // start processing.
        cap.read(src)
        src.copyTo(dst)
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0)
        // detect faces.
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0)
        // draw faces.
        for (let i = 0; i < faces.size(); ++i) {
          let face = faces.get(i)
          let point1 = new cv.Point(face.x, face.y)
          let point2 = new cv.Point(face.x + face.width, face.y + face.height)
          cv.rectangle(dst, point1, point2, [255, 0, 0, 255])
        }
        cv.imshow(outputCanvas, dst)
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin)
        setTimeout(processVideo, delay)
      } catch (err) {
        console.error(err)
      }
    }
    setTimeout(processVideo, 0)
  }
  // schedule the first one.
  setTimeout(start, 0)
  setTimeout(onVideoStopped, 10000)

  let streaming = false
  let videoInput = document.getElementById('videoInput')! as HTMLVideoElement
  let outputCanvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
  let canvasContext = outputCanvas.getContext('2d')!
  let stream: MediaStream
  function start() {
    if (!streaming) {
      startCamera('qvga', onVideoStarted, videoInput)
    } else {
      stopCamera()
      onVideoStopped()
    }
  }
  function onVideoStarted() {
    streaming = true
    outputCanvas.width = videoInput.videoWidth
    outputCanvas.height = videoInput.videoHeight
    test()
  }
  function onVideoStopped() {
    streaming = false
    canvasContext.clearRect(0, 0, outputCanvas.width, outputCanvas.height)
    stopCamera()
  }
  let onCameraStartedCallback: (...args: any[]) => any
  function onVideoCanPlay() {
    if (onCameraStartedCallback) {
      onCameraStartedCallback(stream, videoInput)
    }
  }
  function startCamera(resolution: 'qvga' | 'vga', callback: (...args: any[]) => any, video: HTMLVideoElement) {
    const constraints: any = {
      qvga: { width: { exact: 320 }, height: { exact: 240 } },
      vga: { width: { exact: 640 }, height: { exact: 480 } }
    }
    let videoConstraint = constraints[resolution]
    if (!videoConstraint) {
      videoConstraint = true
    }
    navigator.mediaDevices
      .getUserMedia({ video, audio: false })
      .then(function(s) {
        video.srcObject = s
        video.play()
        videoInput = video
        stream = s
        onCameraStartedCallback = callback
        video.addEventListener('canplay', onVideoCanPlay, false)
      })
      .catch(function(err) {
        console.error(err)
      })
  }
  function stopCamera() {
    if (videoInput) {
      videoInput.pause()
      videoInput.srcObject = null
      videoInput.removeEventListener('canplay', onVideoCanPlay)
    }
    if (stream) {
      stream.getVideoTracks()[0].stop()
    }
  }
})()

import * as cv from 'mirada'
import * as Mirada from 'mirada';

(async () => {

  var netDet: any = undefined, netRecogn: any = undefined
  var persons: any = {}

  //! [Run face detection model]
  function detectFaces(img: cv.Mat) {
    var blob = cv.blobFromImage(img, 1, { width: 192, height: 144 }, [104, 117, 123, 0], false, false)
    netDet.setInput(blob)
    var out = netDet.forward()

    var faces = []
    for (var i = 0, n = out.data32F.length; i < n; i += 7) {
      var confidence = out.data32F[i + 2]
      var left = out.data32F[i + 3] * img.cols
      var top = out.data32F[i + 4] * img.rows
      var right = out.data32F[i + 5] * img.cols
      var bottom = out.data32F[i + 6] * img.rows
      left = Math.min(Math.max(0, left), img.cols - 1)
      right = Math.min(Math.max(0, right), img.cols - 1)
      bottom = Math.min(Math.max(0, bottom), img.rows - 1)
      top = Math.min(Math.max(0, top), img.rows - 1)

      if (confidence > 0.5 && left < right && top < bottom) {
        faces.push({ x: left, y: top, width: right - left, height: bottom - top })
      }
    }
    blob.delete()
    out.delete()
    return faces
  }
  //! [Run face detection model]

  //! [Get 128 floating points feature vector]
  function face2vec(face: cv.Mat) {
    var blob = cv.blobFromImage(face, 1.0 / 255, { width: 96, height: 96 }, [0, 0, 0, 0], true, false)
    netRecogn.setInput(blob)
    var vec = netRecogn.forward()
    blob.delete()
    return vec
  }
  //! [Get 128 floating points feature vector]

  //! [Recognize]
  function recognize(face: cv.Mat) {
    var vec = face2vec(face)
    var bestMatchName = 'unknown'
    var bestMatchScore = 0.5  // Actually, the minimum is -1 but we use it as a threshold.
    for (let name in persons) {
      var personVec = persons[name]
      var score = vec.dot(personVec)
      if (score > bestMatchScore) {
        bestMatchScore = score
        bestMatchName = name
      }
    }
    vec.delete()
    return bestMatchName
  }
  //! [Recognize]

  async function loadModels() {
    await Mirada.loadDataFile('https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy_lowres.prototxt', 'face_detector.prototxt')
    await Mirada.loadDataFile('https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel', 'face_detector.caffemodel')
    await Mirada.loadDataFile('https://raw.githubusercontent.com/pyannote/pyannote-data/master/openface.nn4.small2.v1.t7', 'face_recognition.t7')
    netDet = cv.readNetFromCaffe('face_detector.prototxt', 'face_detector.caffemodel')
    netRecogn = cv.readNetFromTorch('face_recognition.t7')
  }
  // Create a camera object.
  var output = document.getElementById('outputCanvas')! as HTMLCanvasElement
  var camera = document.getElementById("videoInput")! as HTMLVideoElement
  output.setAttribute("width", camera.width + '')
  output.setAttribute("height", camera.height + '')

  // Get a permission from user to use a camera.
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      camera.srcObject = stream
      camera.onloadedmetadata = function (e) {
        camera.play()
      }
    })

  //! [Open a camera stream]
  var cap = new cv.VideoCapture(camera)
  var frame = new cv.Mat(camera.height, camera.width, cv.CV_8UC4)
  var frameBGR = new cv.Mat(camera.height, camera.width, cv.CV_8UC3)
  //! [Open a camera stream]

  //! [Define frames processing]
  var isRunning = false
  const FPS = 30  // Target number of frames processed per second.
  function captureFrame() {
    var begin = Date.now()
    cap.read(frame)  // Read a frame from camera
    cv.cvtColor(frame, frameBGR, cv.COLOR_RGBA2BGR)

    var faces = detectFaces(frameBGR)
    faces.forEach(function (rect) {
      cv.rectangle(frame, { x: rect.x, y: rect.y }, { x: rect.x + rect.width, y: rect.y + rect.height }, [0, 255, 0, 255])

      var face = frameBGR.roi(rect)
      var name = recognize(face)
      cv.putText(frame, name, { x: rect.x, y: rect.y }, cv.FONT_HERSHEY_SIMPLEX, 1.0, [0, 255, 0, 255])
    })
    cv.imshow(output, frame)
    if (isRunning) {
      var delay = 1000 / FPS - (Date.now() - begin)
      setTimeout(captureFrame, delay)
    }
  }
  //! [Define frames processing]

  async function toggle() {
    if (isRunning) {
      isRunning = false
    } else {
      if (netDet == undefined || netRecogn == undefined) {
        await loadModels()  // Load models and run a pipeline;
        isRunning = true
        captureFrame()
      }
    }
  }
  setTimeout(async () => {
    await toggle()
    await new Promise(resolve => setTimeout(resolve, 10000))
    await toggle()
  }, 500)
})()

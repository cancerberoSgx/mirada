import test from 'ava'
import { create, distance, read } from 'jimp'
import { File, fromFile, toRgba } from '../src'
import { loadMirada } from './testUtil'
import fileType = require('file-type')

test.before(loadMirada)

test('faceDetection', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  let gray = new cv.Mat()
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0)
  let faces = new cv.RectVector()
  let eyes = new cv.RectVector()
  let faceCascade = new cv.CascadeClassifier()
  let eyeCascade = new cv.CascadeClassifier()

  // load pre-trained classifier files (./test/assets/*.xml)
  // Note that current local folder is mounted at /work
  // Showing two two ways of reference files. 
  // Using absolute path:
  faceCascade.load('/work/test/assets/haarcascade_frontalface_default.xml')
  // Using relative path (we need to change the current working directory using FS.chdir() first): 
  cv.FS.chdir('/work')
  eyeCascade.load('test/assets/haarcascade_eye.xml')

  // detect faces
  let msize = new cv.Size(0, 0)
  faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize)

  for (let i = 0; i < faces.size(); ++i) {
    let roiGray = gray.roi(faces.get(i))
    let roiSrc = src.roi(faces.get(i))
    let point1 = new cv.Point(faces.get(i).x, faces.get(i).y)
    let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
      faces.get(i).y + faces.get(i).height)
    cv.rectangle(src, point1, point2, [255, 0, 0, 255])
    // detect eyes in face ROI
    eyeCascade.detectMultiScale(roiGray, eyes)
    for (let j = 0; j < eyes.size(); ++j) {
      let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y)
      let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width,
        eyes.get(j).y + eyes.get(j).height)
      cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255])
    }
    roiGray.delete(); roiSrc.delete()
  }
  const f = File.fromMat(toRgba(src), 'tmp1.jpg')
  await f.write('tmp1.jpg')
  t.deepEqual(f.size(), { width: 400, height: 400 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
  t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/lennaFaceDetection.jpg')), 0)
  src.delete(); gray.delete(); faceCascade.delete(); f.delete()
  eyeCascade.delete(); faces.delete(); eyes.delete()
})


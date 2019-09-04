import test from 'ava';
import { create, distance, read } from 'jimp';
import { compareL2, File, fromFile, Mat, tool, toRgba } from '../src';
import { loadMirada } from './testUtil';
import fileType = require('file-type')

test.before(loadMirada)

test('warpAffine', async t => {
  const f = await File.fromFile('test/assets/lenna.jpg')
  var src = f.asMat()
  var dst = new cv.Mat()
  t.deepEqual([src.type(), src.depth(), src.channels(), src.size()], [24, 0, 4, { width: 400, height: 400 }])
  let srcTri = cv.matFromArray(3, 1, cv.CV_32FC2, [0, 0, 0, 1, 1, 0])
  let dstTri = cv.matFromArray(3, 1, cv.CV_32FC2, [0.6, 0.2, 0.1, 1.3, 1.5, 0.3])
  let dsize = new cv.Size(src.rows, src.cols)
  let M = cv.getAffineTransform(srcTri, dstTri)
  cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar())
  const f2 = await fromFile('test/assets/lennaAffine.png')
  t.deepEqual(compareL2(dst, f2), 0)
  src.delete(); dst.delete(); f2.delete(); M.delete(); srcTri.delete(); dstTri.delete()
})

test('grabCut', async t => {
  const image = await File.fromFile('test/assets/lenna.jpg')
  const result = await tool.grabCut({
    image,
    x: 50,
    y: 50,
    width: 260,
    height: 280
  })
  const f = File.fromData(result.image, 'result.png')
  t.deepEqual(f.size(), { width: 400, height: 400 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
  t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/lennaGrabCut.png')), 0)
  image.delete()
  f.delete()
})

test('fillEllipse', async t => {
  const src = await fromFile('test/assets/shape.jpg')
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3)
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY)
  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()
  cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)
  const cnt = contours.get(0)
  const rotatedRect = cv.fitEllipse(cnt)
  const contoursColor = new cv.Scalar(255, 255, 255)
  const ellipseColor = new cv.Scalar(255, 0, 0)
  cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100)
  cv.ellipse1(dst, rotatedRect, ellipseColor, 1, cv.LINE_8)
  const f = File.fromMat(dst, 'tmp1.png')
  t.deepEqual(f.size(), { width: 125, height: 146 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
  t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/shape3.png')), 0)
  src.delete(); dst.delete(); contours.delete(); hierarchy.delete(); cnt.delete()
})

test('faceDetection', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  let gray = new cv.Mat()
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0)
  let faces = new cv.RectVector()
  let eyes = new cv.RectVector()
  let faceCascade = new cv.CascadeClassifier()
  let eyeCascade = new cv.CascadeClassifier()
  // load pre-trained classifier files (./test/assets/*.xml). Note that current local folder is mounted at /work
  // Using absolute path:
  faceCascade.load('/work/test/assets/haarcascade_frontalface_default.xml')
  // Using relative path: 
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
  t.deepEqual(f.size(), { width: 400, height: 400 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
  t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/lennaFaceDetection.jpg')), 0)
  src.delete(); gray.delete(); faceCascade.delete(); f.delete()
  eyeCascade.delete(); faces.delete(); eyes.delete()
})

test('watershed', async t => {
  const src: Mat = await fromFile('test/assets/coins.png')
  let dst = new cv.Mat()
  let gray = new cv.Mat()
  let opening = new cv.Mat()
  let coinsBg = new cv.Mat()
  let coinsFg = new cv.Mat()
  let distTrans = new cv.Mat()
  let unknown = new cv.Mat()
  let markers = new cv.Mat()
  // gray and threshold image
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(gray, gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
  // get background
  let M = cv.Mat.ones(3, 3, cv.CV_8U)
  cv.erode(gray, gray, M)
  cv.dilate(gray, opening, M)
  cv.dilate(opening, coinsBg, M, new cv.Point(-1, -1), 3)
  // distance transform
  cv.distanceTransform(opening, distTrans, cv.DIST_L2, 5)
  cv.normalize(distTrans, distTrans, 1, 0, cv.NORM_INF)
  // get foreground
  cv.threshold(distTrans, coinsFg, 0.7 * 1, 255, cv.THRESH_BINARY)
  coinsFg.convertTo(coinsFg, cv.CV_8U, 1, 0)
  cv.subtract(coinsBg, coinsFg, unknown)
  // get connected components markers
  cv.connectedComponents(coinsFg, markers)
  for (let i = 0; i < markers.rows; i++) {
    for (let j = 0; j < markers.cols; j++) {
      markers.intPtr(i, j)[0] = markers.ucharPtr(i, j)[0] + 1
      if (unknown.ucharPtr(i, j)[0] == 255) {
        markers.intPtr(i, j)[0] = 0
      }
    }
  }
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0)
  cv.watershed(src, markers)
  // draw barriers
  for (let i = 0; i < markers.rows; i++) {
    for (let j = 0; j < markers.cols; j++) {
      if (markers.intPtr(i, j)[0] == -1) {
        src.ucharPtr(i, j)[0] = 255 // R
        src.ucharPtr(i, j)[1] = 0 // G
        src.ucharPtr(i, j)[2] = 0 // B
      }
    }
  }
  const f = File.fromMat(toRgba(src), 'tmp1.jpg')
  t.deepEqual(f.size(), { width: 252, height: 312 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
  t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/coinsWatershed.jpg')), 0)
  src.delete(); dst.delete(); gray.delete(); opening.delete(); coinsBg.delete(); f.delete()
  coinsFg.delete(); distTrans.delete(); unknown.delete(); markers.delete(); M.delete()

})


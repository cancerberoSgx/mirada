import test from 'ava'
import jimp from 'jimp'
import { compareL2, File, fromFile, grabCut_obsolete } from '../src'
import { loadMirada } from './testUtil'
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
  const result = await grabCut_obsolete({
    image,
    x: 50,
    y: 50,
    width: 260,
    height: 280
  })
  const f = File.fromData(result.image, 'result.png')
  t.deepEqual(f.size(), { width: 400, height: 400 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
  t.deepEqual(jimp.distance(await jimp.create(await f.asArrayBuffer() as any), await jimp.read('test/assets/lennaGrabCut.png')), 0)
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
  t.deepEqual(jimp.distance(await jimp.create(await f.asArrayBuffer() as any), await jimp.read('test/assets/shape3.png')), 0)
  src.delete(); dst.delete(); contours.delete(); hierarchy.delete(); cnt.delete()
})



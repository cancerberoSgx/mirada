import test from 'ava'
import { create, distance, read } from 'jimp'
import { File, fromFile } from '../src'
import { loadMirada } from './testUtil'
import fileType = require('file-type')

test.before(loadMirada)

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
  //@ts-ignore
  cv.ellipse1(dst, rotatedRect, ellipseColor, 1, cv.LINE_8)
  // await f.write('tmp1.png')
  const f = File.fromMat(dst, 'tmp1.png')
  t.deepEqual(f.size(), { width: 125, height: 146 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
  t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/shape3.png')), 0)
  src.delete(); dst.delete(); contours.delete(); hierarchy.delete(); cnt.delete()
})

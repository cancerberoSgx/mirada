import test from 'ava'
import { distance, read } from 'jimp'
import { loadOjazos } from './testUtil';
import { loadOpencv } from '../src'

test.before(loadOjazos)

test('library loads', async t => {
  await loadOpencv()
  t.true(cv.getBuildInformation().includes('General configuration for OpenCV'))
})

test('load data', async t => {
  await loadOpencv()
  var img = await read('test/assets/shape.jpg')
  t.deepEqual([img.bitmap.width, img.bitmap.height, img.bitmap.data.byteLength], [125, 146, 73000])
  var src = cv.matFromImageData(img.bitmap)
  let dst = new cv!.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  img.bitmap.data = Buffer.from(dst.data)
  src.delete()
  M.delete()
  dst.delete()
  t.deepEqual(distance(img, await read('test/assets/shape2.jpg')), 0.015625)
})

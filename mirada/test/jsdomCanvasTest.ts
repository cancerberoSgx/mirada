import test from 'ava'
import * as jimp from 'jimp'
import { createCanvas, loadMirada } from './testUtil'

test.before(loadMirada)

test('using canvas in node-js', async t => {
  var el = createCanvas() as any
  var img = await jimp.read('test/assets/shape.jpg')
  t.deepEqual([img.bitmap.width, img.bitmap.height, img.bitmap.data.byteLength], [125, 146, 73000])
  var src = cv.matFromImageData(img.bitmap)
  cv.imshow(el, src)
  let dst = cv.imread(el)
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  img.bitmap.data = Buffer.from(dst.data)
  t.deepEqual(jimp.distance(img, await jimp.read('test/assets/shape2.jpg')), 0.015625)
  cv.imshow(el, dst)
  var m2 = cv.imread(el)
  img.bitmap.data = Buffer.from(m2.data)
  t.deepEqual(jimp.distance(img, await jimp.read('test/assets/shape2.jpg')), 0.015625)
  src.delete()
  M.delete()
  dst.delete()
  m2.delete()
})

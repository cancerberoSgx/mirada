import test from 'ava'
import { compareL2, fromFile, toRgba } from '../src'
import { File } from '../src/file'
import { replaceColor } from '../src/tool/image'
import { loadMirada, write } from './testUtil'

test.before(loadMirada)

test('inRange', async t => {
  const img = await fromFile('test/assets/n.png')
  const mask = new cv.Mat()
  const dst = new cv.Mat()
  const low = new cv.Mat(img.rows, img.cols, img.type(), [0, 0, 0, 0])
  const high = new cv.Mat(img.rows, img.cols, img.type(), [150, 150, 150, 255])
  cv.inRange(img, low, high, mask)
  const b = new cv.Mat(img.rows, img.cols, img.type(), new cv.Scalar(255, 0, 0, 255))
  b.copyTo(dst, mask)
  t.deepEqual(compareL2(await File.fromFile('test/assets/nInRange.png'), await toRgba(dst)), 0);
  [mask, dst, low, high, b].forEach(m => m.delete())
})


test('replaceColor', async t => {
  const src = await fromFile('test/assets/n.png')
  const dst = replaceColor(src, [0, 0, 0, 0], [150, 150, 150, 255], new cv.Scalar(255, 0, 0, 255))
  t.deepEqual(compareL2(await File.fromFile('test/assets/nInRange.png'), await toRgba(dst)), 0);
  [src, dst,].forEach(m => m.delete())
})

test('floodFill', async t => {
  const seed = new cv.Point(4, 4)
  const img = cv.Mat.zeros(100, 100, cv.CV_8UC1)
  cv.circle(img, seed, 20, new cv.Scalar(128), 3)
  //Create a mask from edges in the original image
  const mask = cv.Mat.zeros(img.rows + 2, img.cols + 2, cv.CV_8UC1)
  cv.Canny(img, mask, 100, 200)
  cv.copyMakeBorder(mask, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE)
  //Fill mask with value 128
  const fillValue = 128
  cv.floodFill(img, mask, seed, new cv.Scalar(255), 0, new cv.Scalar(), new cv.Scalar(), 4 | cv.FLOODFILL_MASK_ONLY | (fillValue << 8))
  t.deepEqual(compareL2(await File.fromFile('test/assets/floodfill.png'), File.fromMat(await toRgba(mask))), 0)
  await write(await toRgba(mask), 'tmp2.png')
})

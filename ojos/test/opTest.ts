import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { canny, CannyOptions, floodFill, FloodFillOptions, replaceColor, ReplaceColorOptions } from '../src'
import { loadMirada, write } from './testUtil'
import { ConvertTo } from '../src/op/convertTo'


test.before(loadMirada)

test('d', t => t.true(true))

test.only('convertTo', async t => {
  // const src1 = await fromFile('test/assets/b.jpg')
  // cv.cvtColor(src1, src, cv.CV_8UC3, 3)
  // src.
  const src = await fromFile('test/assets/n.png')
  src.convertTo(src, cv.CV_8U, 1.5, 20)
  // write( src, 'tmp221.jpg')
  const dst = await new ConvertTo().exec({ src, alpha: 1.8, beta: 0})
  write( dst, 'tmp221.jpg')
  t.true(compareL2(await File.fromFile('test/assets/bBoxFilter.png'), dst) < 0.02)
  del(src, dst)
})

test('floodFill', async t => {
  const o: FloodFillOptions = {
    src: await fromFile('test/assets/coins.png'),
    dst: new cv.Mat(),
    seed: new cv.Point(5, 6),
    newColorOrImage: new cv.Scalar(222, 0, 0, 0),
    lowDiff: new cv.Scalar(19, 19, 91, 255),
    upDiff: new cv.Scalar(229, 255, 255, 255) // when low values flood pass through edges of color similar to the low channel
  }
  floodFill(o)
  t.deepEqual(compareL2(o.dst!, await fromFile('test/assets/coinsFloodFill.png')), 0)
  del(o.src, o.dst!)
})

test('replaceColor', async t => {
  const src = await fromFile('test/assets/n.png')
  const o: ReplaceColorOptions = {
    src, lowColor: [0, 0, 0, 0], highColor: [150, 150, 150, 255],
    newColorOrImage: new cv.Scalar(255, 0, 0, 255)
  }
  const dst = replaceColor(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/nInRange.png'), toRgba(dst), true), 0)
  del(dst, src)
})

test('canny', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const o: CannyOptions = {
    src, threshold1: 11, threshold2: 224, apertureSize: 3, L2gradient: true
  }
  const dst = canny(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaCanny.png'), toRgba(dst), true), 0)
  del(dst, src)
})




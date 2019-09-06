import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { canny, CannyOptions, floodFill, FloodFillOptions, replaceColor, ReplaceColorOptions } from '../src'
import { ConvertTo } from '../src/op/convertTo'
import { loadMirada, write } from './testUtil'
import { Threshold } from '../src/op/threshold'
import { AdaptiveThreshold } from '../src/op/adaptiveThreshold'

test.before(loadMirada)

test('adaptiveThreshold', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  new AdaptiveThreshold().exec({ src, dst: src, maxval: 200, adaptiveMethod: cv.ADAPTIVE_THRESH_GAUSSIAN_C, blockSize: 3, thresholdType: cv.THRESH_BINARY, C: 2 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaAdaptiveThreshold.png'), await toRgba(src)), 0)
  del(src)
})

test('threshold', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  new Threshold().exec({ src, dst: src, maxval: 200, thresh: 177, type: cv.THRESH_BINARY })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaThreshold.png'), src), 0)
  del(src)
})

test('convertTo', async t => {
  const src = await fromFile('test/assets/n.png')
  const dst = await new ConvertTo().exec({ src, alpha: 1.8, beta: 0 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/nConvertTo.png'), dst), 0)
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




import test from 'ava'
import { compareL2, del, File, fromFile, get, toRgba } from 'mirada'
import { Bitwise, Canny, FloodFill, FloodFillOptions, ReplaceColor } from '../src'
import { AdaptiveThreshold } from '../src/op/adaptiveThreshold'
import { ConvertTo } from '../src/op/convertTo'
import { HistEqualization } from '../src/op/histEqualization'
import { Math } from '../src/op/math'
import { Threshold } from '../src/op/threshold'
import { loadMirada, write } from './testUtil'

test.before(loadMirada)


test('histEqualization mode=equalizeHist', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  t.deepEqual(get(src, 2, 2), [196, 114, 78, 255])
  new HistEqualization().exec({ src, dst: src, mode: 'equalizeHist' })
  write(src, 'tmp-ss2.png')
  t.deepEqual(get(src, 2, 2), [219, 208, 182, 255])
  del(src)
})

test('histEqualization mode=CLAHE', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  new HistEqualization().exec({ src, dst: src, mode: 'CLAHE', clipLimit: 1, tileGridSize: new cv.Size(8, 8) })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaHistEqClahe.png'), src), 0)
  del(src)
})

test('math add', async t => {
  const src = await fromFile('test/assets/nErode.png')
  const src2 = await fromFile('test/assets/nMedianBlur.png')
  const dst = await new Math().exec({ src, src2, type: 'add' })
  t.deepEqual(compareL2(await File.fromFile('test/assets/nAdd.png'), await toRgba(dst)), 0)
  del(src, src2, dst)
})

test.todo('math subtract')
test.todo('math multiply')
test.todo('math divide')

test('adaptiveThreshold', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0)
  new AdaptiveThreshold().exec({ src, dst: src, maxval: 200, adaptiveMethod: cv.ADAPTIVE_THRESH_GAUSSIAN_C, blockSize: 3, thresholdType: cv.THRESH_BINARY, C: 2 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaAdaptiveThreshold.png'), await toRgba(src)), 0)
  del(src)
})

test('bitwise not', async t => {
  const src = await fromFile('test/assets/n.png')
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0)
  await new Bitwise().exec({ src, dst: src, type: 'not' })
  t.deepEqual(compareL2(await File.fromFile('test/assets/nBitwiseNot.png'), await toRgba(src)), 0)
  del(src)
})

test.todo('bitwise and')
test.todo('bitwise or')
test.todo('bitwise xor')

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
  new FloodFill().exec(o)
  t.deepEqual(compareL2(o.dst!, await fromFile('test/assets/coinsFloodFill.png')), 0)
  del(o.src, o.dst!)
})

test('replaceColor inPlace removeRest', async t => {
  const src = await fromFile('test/assets/n.png')
  const dst = await new ReplaceColor().exec({
    src, dst: src, removeRest: true,
    lowColor: [0, 0, 0, 0],
    highColor: [150, 150, 150, 255],
    newColorOrImage: new cv.Scalar(255, 0, 0, 255)
  })
  t.true(src === dst)
  // write(toRgba(dst), 'tmprrr.png')
  t.deepEqual(compareL2(await fromFile('test/assets/nInRange.png'), toRgba(dst), true), 0)
  del(dst)
})

test('replaceColor', async t => {
  const src = await fromFile('test/assets/n.png')
  const dst = await new ReplaceColor().exec({
    src,
    lowColor: [160, 160, 160, 0],
    highColor: [222, 222, 222, 255],
    newColorOrImage: new cv.Scalar(55, 120, 110, 255)
  })
  t.false(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/nReplaceColor.png'), toRgba(dst), true), 0)
  del(dst)
})

test('canny inPlace', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const dst = await new Canny().exec({
    src, dst: src, threshold1: 11, threshold2: 224, apertureSize: 3, L2gradient: true
  })
  t.true(src === dst)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaCanny.png'), toRgba(src), true), 0)
  del(src)
})

test('canny allChannels', async t => {
  const src = await fromFile('test/assets/h.jpg')
  const dst = await new Canny().exec({
    src, threshold1: 11, threshold2: 994, apertureSize: 5, L2gradient: true, channels: true
  })
  // write(toRgba(dst), 'tmprrr.png')
  t.false(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/hCannyChannels.png'), dst, true), 0)
  del(src)
})


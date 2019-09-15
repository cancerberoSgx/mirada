import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { Bitwise, FloodFill, FloodFillOptions, InRange, ReplaceColor, scalarColor } from '../src'
import { AdaptiveThreshold } from '../src/op/adaptiveThreshold'
import { ConvertTo } from '../src/op/convertTo'
import { Math } from '../src/op/math'
import { Threshold } from '../src/op/threshold'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('inRange', async t => {
  const src = await fromFile('test/assets/h.jpg')
  new InRange().exec({ src, dst: src, lowerb: scalarColor('#00661100'), upperb: scalarColor('#ffeeeeff') })
  t.deepEqual(compareL2(await File.fromFile('test/assets/hInRange.png'), await toRgba(src), true), 0)
  del(src)
})

test('math add', async t => {
  const src = await fromFile('test/assets/nErode.png')
  const src2 = await fromFile('test/assets/nMedianBlur.png')
  const dst = new Math().exec({ src, src2, type: 'add' })
  t.deepEqual(compareL2(await File.fromFile('test/assets/nAdd.png'), await toRgba(dst), true), 0)
  del(src, src2, dst)
})

test.todo('math subtract')
test.todo('math multiply')
test.todo('math divide')

test('bitwise not', async t => {
  const src = await fromFile('test/assets/n.png')
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0) // we go rgb not because op limitation but because not alpha ff will produce alpha==0
  new Bitwise().exec({ src, dst: src, type: 'not' })
  t.deepEqual(compareL2(await File.fromFile('test/assets/nBitwiseNot.png'), await toRgba(src), true), 0)
  del(src)
})

test.todo('bitwise and')
test.todo('bitwise or')
test.todo('bitwise xor')

test('threshold', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  new Threshold().exec({ src, dst: src, maxval: 200, thresh: 177, type: cv.THRESH_BINARY })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaThreshold.png'), src, true), 0)
})

test('adaptiveThreshold', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0)
  new AdaptiveThreshold().exec({ src, dst: src, maxval: 200, adaptiveMethod: cv.ADAPTIVE_THRESH_GAUSSIAN_C, blockSize: 3, thresholdType: cv.THRESH_BINARY, C: 2 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaAdaptiveThreshold.png'), await toRgba(src), true), 0)
  del(src)
})

test('convertTo', async t => {
  const src = await fromFile('test/assets/n.png')
  const dst = new ConvertTo().exec({ src, alpha: 1.8, beta: 0 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/nConvertTo.png'), dst, true), 0)
  del(src)
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
  t.deepEqual(compareL2(o.dst!, await fromFile('test/assets/coinsFloodFill.png'), true), 0)
  del(o.src)
})

test('replaceColor inPlace removeRest', async t => {
  const src = await fromFile('test/assets/n.png')
  const dst = new ReplaceColor().exec({
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
  const dst = new ReplaceColor().exec({
    src,
    lowColor: [160, 160, 160, 0],
    highColor: [222, 222, 222, 255],
    newColorOrImage: new cv.Scalar(55, 120, 110, 255)
  })
  t.false(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/nReplaceColor.png'), toRgba(dst), true), 0)
  del(dst)
})

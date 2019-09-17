import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { AdaptiveThreshold, Bitwise, Cartoonize, ConvertTo, FloodFill, FloodFillOptions, HoughLinesP, InRange, Pyr, ReplaceColor, Roi, scalarColor, Wave } from '../src'
import { Math } from '../src/op/math'
import { Threshold } from '../src/op/threshold'
import { LineSegment } from '../src/op/types'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test.todo('options in constructor and exec() overrides')

test('houghLinesP', async t => {
  const src = await fromFile('test/assets/shape.jpg')
  const lines: LineSegment[] = []
  new HoughLinesP().exec({ src, dst: src, lines, rho: 1, theta: 3.14 / 180, threshold: 2, minLineLength: 0, maxLineGap: 0 })
  const o = cv.Mat.zeros(src.rows, src.cols, src.type())
  lines.forEach(l => cv.line(o, l.pt1, l.pt2, scalarColor('red')))
  // write(toRgba(o), 'tmp-warp.png')
  t.deepEqual(compareL2(await File.fromFile('test/assets/shapeHoughLinesP.png'), await toRgba(o), true), 0)
  del(src, o)
})

test.todo('houghLinesP ,color')

test('warp', async t => {
  const src = await fromFile('test/assets/h.jpg')
  const dst = src.clone()
  new Wave().exec({ src: dst, dst, type: 'vertical', amplitude: 70, frequency: 1 / 128 })
  t.false(src === dst)
  t.deepEqual(compareL2(await File.fromFile('test/assets/hWave.png'), await toRgba(dst), true), 0)
  del(src, dst)
})

test('cartoonize inPlace', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const dst = new Cartoonize().exec({ src, dst: src })
  t.true(src === dst)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaCartoonize.png'), await toRgba(src), true), 0)
  del(src)
})

test('roi inPlace', async t => {
  const src = await fromFile('test/assets/h.jpg')
  const dst = new Roi().exec({ src, dst: src, expr: new cv.Rect(20, 60, 40, 80) })
  t.true(src === dst)
  t.deepEqual(compareL2(await File.fromFile('test/assets/hRoi.png'), await toRgba(src), true), 0)
  del(src)
})

test('pyrDown inPlace', async t => {
  const src = await fromFile('test/assets/h.jpg')
  const dst = new Pyr().exec({ src, dst: src })
  t.true(src === dst)
  t.deepEqual(compareL2(await File.fromFile('test/assets/hPyrDown.png'), await toRgba(src), true), 0)
  del(src)
})
test.todo('pyrUp')

test('inRange inPlace', async t => {
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

import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { WarpPerspective, WarpPerspectiveOptions } from '../src'
import { scalarColor } from '../src/util/color'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('identity', async (t) => {
  const src = await fromFile('test/assets/lenna.jpg')
  let dst = cv.Mat.zeros(src.rows, src.cols, src.type())
  let o: WarpPerspectiveOptions = {
    src,
    dst,
    inputs: [
      56, 65,
      368, 52,
      28, 387,
      389, 390
    ],
    outputs: [
      56, 65,
      368, 52,
      28, 387,
      389, 390
    ],
    size: dst.size()
  }
  await new WarpPerspective().exec(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lenna.jpg'), toRgba(o.dst!), true), 0)
  del(dst, src)
})

test('change1', async (t) => {
  const src = await fromFile('test/assets/lenna.jpg')
  const o: WarpPerspectiveOptions = {
    src,
    inputs: [
      56, 65,
      368, 52,
      28, 387,
      389, 390
    ],
    outputs: [
      23, 75,
      388, 12,
      68, 337,
      359, 330
    ],
    size: src.size()
  }
  await new WarpPerspective().exec(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaPerspective.png'), toRgba(o.dst!), true), 0)
  del(src, o.dst!)
})

test('inPlace', async (t) => {
  const src = await fromFile('test/assets/lenna.jpg')
  const o: WarpPerspectiveOptions = {
    src,
    dst: src,
    inputs: [
      56, 65,
      368, 52,
      28, 387,
      389, 390
    ],
    outputs: [
      23, 75,
      388, 12,
      68, 337,
      359, 330
    ],
    size: src.size()
  }
  await new WarpPerspective().exec(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaPerspective.png'), toRgba(o.dst!), true), 0)
  del(src)
})

test('drawPoints', async (t) => {
  const src = await fromFile('test/assets/lenna.jpg')
  const o: WarpPerspectiveOptions = {
    src,
    dst: src,
    inputs: [
      10, 10,
      330, 10,
      10, 330,
      330, 330
    ],
    outputs: [
      5, 20,
      300, 20,
      30, 350,
      320, 310
    ],
    drawPoints: [scalarColor('red'), scalarColor('blue'), scalarColor('green'), scalarColor('orange')]
  }
  await new WarpPerspective().exec(o)
  // write(o.dst!, 'tmpdddd.png')
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaPerspectivePoints.png'), toRgba(o.dst!), true), 0)
  del(src)
})

import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { WarpAffine, WarpAffineOptions } from '../src'
import { scalarColor } from '../src/color'
import { loadMirada, write } from './testUtil'

test.before(loadMirada)

test('identity', async (t) => {
  const src = await fromFile('test/assets/lenna.jpg')
  let dst = cv.Mat.zeros(src.rows, src.cols, src.type())
  let o: WarpAffineOptions = {
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
  await new WarpAffine().exec(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lenna.jpg'), toRgba(o.dst!), true), 0)
  del(dst, src)
})

test('change1', async (t) => {
  const src = await fromFile('test/assets/n.png')
  const o: WarpAffineOptions = {
    src,
    inputs: [
     1, 1,
    80, 0,
    0, 80,
    80, 80
    ],
    outputs: [
      21, 51,
    70, 77,
    40, 40,
    10, 70
    ],
  }
const dst =   await new WarpAffine().exec(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/nEstimateAffine2D.png'), dst, true), 0)
  del(src)
})

test.todo('inPlace')
test.todo('drawPoints')
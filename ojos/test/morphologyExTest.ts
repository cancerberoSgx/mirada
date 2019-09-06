import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { MorphologyEx } from '../src/op/morphologyEx'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('erode', async t => {
  const src = await fromFile('test/assets/n.png')
  new MorphologyEx().exec({ src, dst: src, op: cv.MORPH_ERODE, kernel: cv.getStructuringElement(cv.MORPH_CROSS, { width: 5, height: 7 }) })
  // write(src, 'tmpMorr.png')
  t.deepEqual(compareL2(await File.fromFile('test/assets/nErode.png'), await toRgba(src)), 0)
  del(src)
})


test.todo('dilate')
test.todo('MORPH_OPEN')
test.todo('MORPH_CLOSE')
test.todo('MORPH_GRADIENT')
test.todo('MORPH_TOPHAT')
test.todo('MORPH_BLACKHAT')

import test from 'ava'
import { compareL2, File, fromFile, Mat } from 'mirada'
import { Chain } from '../src/chain'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('chain', async t => {
  let m1: Mat, m2: Mat
  const f1 = await File.fromFile('test/assets/lenna.jpg')
  const f2 = new Chain(f1.asMat()).roi(new cv.Rect(100, 100, 100, 80)).toRgba().asFile()
  t.deepEqual(compareL2(f2, m1 = await fromFile('test/assets/mask1.jpg')), 0); m1.delete()
})

import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { GaussianBlur } from '../src'
import { BoxFilter } from '../src/op/boxFilter'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('gaussianBlur', async t => {
  const src = await fromFile('test/assets/b.jpg')
  const dst = await new GaussianBlur().exec({ src, ksize: { width: 9, height: 5 }, sigmaX: 0.7 })
  // write( dst, 'tmp.png')
  t.deepEqual(compareL2(await fromFile('test/assets/bGaussianBlur.png'), await toRgba(dst)), 0)
  del(src, dst)
})

test('boxFilter', async t => {
  const src = await fromFile('test/assets/b.jpg')
  const dst = await new BoxFilter().exec({ src, ksize: { width: 5, height: 5 }, })
  // write( dst, 'tmp22.jpg')
  t.true(compareL2(await File.fromFile('test/assets/bBoxFilter.png'), dst) < 0.02)
  del(src, dst)
})




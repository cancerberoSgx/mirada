import test from 'ava'
import { compareL2, del, File, fromFile, toRgba } from 'mirada'
import { BilateralFilter, GaussianBlur, MedianBlur } from '../src'
import { BoxFilter } from '../src/op/boxFilter'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('gaussianBlur', async t => {
  const src = await fromFile('test/assets/b.jpg')
  const dst = await new GaussianBlur().exec({ src, ksize: { width: 9, height: 5 }, sigmaX: 0.7 })
  t.deepEqual(compareL2(await fromFile('test/assets/bGaussianBlur.png'), await toRgba(dst)), 0)
  del(src, dst)
})

test('boxFilter', async t => {
  const src = await fromFile('test/assets/b.jpg')
  const dst = await new BoxFilter().exec({ src, ksize: { width: 5, height: 5 }, })
  t.true(compareL2(await File.fromFile('test/assets/bBoxFilter.png'), dst) < 0.02)
  del(src, dst)
})

test('MedianBlur', async t => {
  const src = await fromFile('test/assets/n.png')
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 3)
  const dst = await new MedianBlur().exec({ src, ksize: 15 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/nMedianBlur.png'), await toRgba(dst)), 0)
  del(dst, src)
})

test('bilateralFilter', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 3)
  const dst = await new BilateralFilter().exec({ src, d: 9, sigmaColor: 175, sigmaSpace: 175 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaBilateralFilter.png'), await toRgba(dst)), 0)
  del(dst, src)
})

test('bilateralFilter inPlace', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 3)
  const dst = await new BilateralFilter().exec({ src, dst: src, d: 9, sigmaColor: 175, sigmaSpace: 175 })
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaBilateralFilter.png'), await toRgba(dst)), 0)
  t.deepEqual(compareL2(await toRgba(src), await toRgba(dst)), 0)
  t.true(src === dst)
  del(src)
})



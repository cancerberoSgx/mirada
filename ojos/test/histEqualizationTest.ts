import test from 'ava'
import { compareL2, del, File, fromFile, get, toRgba } from 'mirada'
import { HistEqualization } from '../src/op/histEqualization'
import { loadMirada, write } from './testUtil'

test.before(loadMirada)

test('histEqualization mode=equalizeHist inPlace', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  t.deepEqual(get(src, 2, 2), [196, 114, 78, 255])
  const dst = await new HistEqualization().exec({ src, dst: src, type: 'equalizeHist' })
  t.true(src === dst)
  // write(src, 'tmp-ss2.png')
  t.deepEqual(get(src, 2, 2), [209])
  del(src)
})

test('histEqualization mode=equalizeHist channels inPlace', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  t.deepEqual(get(src, 2, 2), [196, 114, 78, 255])
  const dst = await new HistEqualization().exec({ src, dst: src, type: 'equalizeHist', channels: true })
  t.true(src === dst)
  t.deepEqual(get(src, 2, 2), [219, 208, 182, 255])
  del(src)
})

test.failing('histEqualization mode=CLAHE inPlace dst output image', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(src!, src!, cv.CV_8UC1, 0)
  const dst = await new HistEqualization().exec({ src, dst: src, type: 'CLAHE', clipLimit: 1, size: new cv.Size(8, 8) })
  t.true(src === dst)
  console.log(dst)
  write(dst, 'tmp-ss3.png')
  t.deepEqual([get(dst, 2, 2), get(dst, 112, 122)], [[170], [79]])
  del(dst)
})

test.failing('histEqualization mode=CLAHE', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(src!, src!, cv.CV_8UC1, 0)
  const dst = await new HistEqualization().exec({ src, type: 'CLAHE', clipLimit: 1, size: new cv.Size(8, 8) })
  t.false(src === dst)
  write(toRgba(dst), 'tmp-ss3.png')
  write(toRgba(src), 'tmp-ss2.png')
  t.deepEqual([get(src, 2, 2), get(src, 112, 122)], [[170], [79]])
  del(src)
})


test('histEqualization mode=CLAHE channels inPlace', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const dst = await new HistEqualization().exec({ src, dst: src, type: 'CLAHE', clipLimit: 1, size: new cv.Size(8, 8), channels: true })
  t.true(src === dst)
  // write(src, 'tmp-ss2.png')
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaHistEqClahe.png'), toRgba(src), true), 0)
  del(src)
})

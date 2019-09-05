import test from 'ava'
import { File, Mat } from '../src'
import { compareL2, fromFile } from '../src/util/imageUtil'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('compareL2', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  t.deepEqual(compareL2(src, await fromFile('test/assets/lenna.jpg')), 0)
  const f = await File.fromMat(src.roi(new cv.Rect(100, 100, 100, 80))).toRgba()
  let m1: Mat, m2: Mat
  t.deepEqual(compareL2(f, m1 = await fromFile('test/assets/mask1.jpg')), 0); m1.delete()
  t.deepEqual(compareL2(f, m1 = await fromFile('test/assets/lenna.jpg')), 1); m1.delete()
  t.deepEqual(compareL2(m2 = await fromFile('test/assets/lennaFaceDetection.jpg'), m1 = await fromFile('test/assets/lenna.jpg')).toFixed(4), '0.0419')
  m1.delete(); m2.delete()
  t.deepEqual(compareL2(m2 = await fromFile('test/assets/shape.jpg'), m1 = await fromFile('test/assets/shape2.jpg')).toFixed(4), '0.6271')
  m1.delete(); m2.delete()
  f.delete()
  src.delete()
})

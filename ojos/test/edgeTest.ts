import test from 'ava'
import { compareL2, del, fromFile, toRgba } from 'mirada'
import { Edge } from '../src/op/edge'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('Sobel in place', async t => {
  const src = await fromFile('test/assets/n.png')
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0)
  const dst = await new Edge().exec({ type: 'sobel', dst: src, ddepth: cv.CV_8U, src, ksize: 7, dx: 2, dy: 1 })
  // write(toRgba(dst), 'tmpeeee.png') 
  t.deepEqual(compareL2(await fromFile('test/assets/nSobel.png'), await toRgba(dst)), 0)
  del(src)
})

test.todo('scharr')

test('Laplacian in place', async t => {
  const src = await fromFile('test/assets/n.png')
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0)
  const dst = await new Edge().exec({ type: 'laplacian', dst: src, ddepth: cv.CV_8U, src, ksize: 7 })
  // write(toRgba(dst), 'tmpeeee.png') 
  t.deepEqual(compareL2(await fromFile('test/assets/nLaplacian.png'), await toRgba(dst)), 0)
  del(src)
})

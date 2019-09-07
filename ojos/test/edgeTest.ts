import test from 'ava'
import { compareL2, del, fromFile, toRgba } from 'mirada'
import { Edge } from '../src/op/edge'
import { loadMirada, write } from './testUtil'
import { Canny } from '../src'

test.before(loadMirada)

test('Sobel in place', async t => {
  const src = await fromFile('test/assets/n.png')
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0)
  const dst = await new Edge().exec({ type: 'sobel', dst: src, ddepth: cv.CV_8U, src, ksize: 7, dx: 2, dy: 1 })
  t.true(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/nSobel.png'), await toRgba(dst)), 0)
  del(src)
})

test('Sobel channels', async t => {
  const src = await fromFile('test/assets/h.jpg')
  const dst = await new Edge().exec({ type: 'sobel', ddepth: cv.CV_8U, src, ksize: 3, 
    dx: 0, dy: 1 , scale: 2.2, delta: 10,  channels: true})
  t.false(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/hSobelChannels.png'), await toRgba(dst)), 0)
  del(src, dst)
})

test.todo('scharr')

test('Laplacian in place', async t => {
  const src = await fromFile('test/assets/n.png')
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0)
  const dst = await new Edge().exec({ type: 'laplacian', dst: src, ddepth: cv.CV_8U, src, ksize: 7 })
  t.true(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/nLaplacian.png'), await toRgba(dst)), 0)
  del(src)
})

test('canny inPlace', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const dst = await new Canny().exec({
    src, dst: src, threshold1: 11, threshold2: 224, apertureSize: 3, L2gradient: true
  })
  t.true(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/lennaCanny.png'), toRgba(src), true), 0)
  del(src)
})

test('canny allChannels', async t => {
  const src = await fromFile('test/assets/h.jpg')
  const dst = await new Canny().exec({
    src, threshold1: 11, threshold2: 994, apertureSize: 5, L2gradient: true, channels: true
  })
  t.false(src === dst)
  t.deepEqual(compareL2(await fromFile('test/assets/hCannyChannels.png'), dst, true), 0)
  del(src)
})


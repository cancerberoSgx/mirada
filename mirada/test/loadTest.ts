import test from 'ava'
import jimp from 'jimp'
import { compareL2, del, fromFile, JimpCodec, loadOpencv } from '../src'

test.serial('loadOpencv and proxies', async t => {
  await loadOpencv({ force: true, formatProxies: [() => new JimpCodec(jimp)] })
  t.true(cv.getBuildInformation().includes('General configuration for OpenCV'))
  const src = await fromFile('test/assets/n.png')
  t.deepEqual(compareL2(src, await fromFile('test/assets/n.png'), true), 0)
})

test.serial('cv.dilate loading image with jimp library', async t => {
  await loadOpencv()
  var img = await jimp.read('test/assets/shape.jpg')
  t.deepEqual([img.bitmap.width, img.bitmap.height, img.bitmap.data.byteLength], [125, 146, 73000])
  var src = cv.matFromImageData(img.bitmap)
  let dst = new cv!.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  img.bitmap.data = Buffer.from(dst.data)
  del(src, M, dst)
  t.deepEqual(jimp.distance(img, await jimp.read('test/assets/shape2.jpg')), 0.015625)
})

test.serial('cv.loadOpencv opencvJsExceptions 2', async t => {
  await loadOpencv()
  t.true(!cv.getBuildInformation().includes('-s DISABLE_EXCEPTION_CATCHING=0'))
})

test.serial('cv.loadOpencv opencvJsLocation', async t => {
  await loadOpencv({
    opencvJsLocation: 'static/opencv_exception.js',
    force: true
  })
  t.true(cv.getBuildInformation().includes('-s DISABLE_EXCEPTION_CATCHING=0'))
})

test.serial('cv.loadOpencv opencvJsExceptions', async t => {
  await loadOpencv({
    opencvJsExceptions: true,
    force: true
  })
  t.true(cv.getBuildInformation().includes('-s DISABLE_EXCEPTION_CATCHING=0'))
})

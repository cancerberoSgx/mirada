import test from 'ava'
import * as jimp from 'jimp'
import { loadOpencv } from '../src'


test('library loads manually without proxy', async t => {
  await loadOpencv()
  t.true(cv.getBuildInformation().includes('General configuration for OpenCV'))
})

test('cv.dilate loading image with jimp library', async t => {
  // Wait until the library is ready
  await loadOpencv()

  // use jimp.read() to load jpeg, then we can access the ImageData with `bitmap` and 
  // pass it directly to `cv.matFromImageData`to build the Mat
  var img = await jimp.read('test/assets/shape.jpg')
  t.deepEqual([img.bitmap.width, img.bitmap.height, img.bitmap.data.byteLength], [125, 146, 73000])
  var src = cv.matFromImageData(img.bitmap)
  let dst = new cv!.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  img.bitmap.data = Buffer.from(dst.data)
  src.delete()
  M.delete()
  dst.delete()
  t.deepEqual(jimp.distance(img, await jimp.read('test/assets/shape2.jpg')), 0.015625)
})

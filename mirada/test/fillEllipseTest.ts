import test from 'ava'
// import { create, distance, read } from 'jimp'
import { File, grabCut, fromFile } from '../src'
import { loadMirada } from './testUtil'
import fileType = require('file-type')

test.before(loadMirada)

test.skip('fillEllipse', async t => {
  const src = await fromFile('test/assets/shape.jpg')
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY);
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
  let cnt = contours.get(0);
  // You can try more different parameters
  let rotatedRect = cv.fitEllipse(cnt);
  let contoursColor = new cv.Scalar(255, 255, 255);
  let ellipseColor = new cv.Scalar(255, 0, 0);
  cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100);
  cv.ellipse(dst, rotatedRect, ellipseColor, 1, cv.LINE_8);

  const f = File.fromData(dst.data, 'result.png')
  await f.write('tmp1.png')
  // t.deepEqual(f.size(), { width: 400, height: 400 })
  // t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
  // t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/lennaGrabCut.png')), 0)
  // image.delete()
  // f.delete()

  // cv.imshow('canvasOutput', dst);
  src.delete(); dst.delete(); contours.delete(); hierarchy.delete(); cnt.delete();

})

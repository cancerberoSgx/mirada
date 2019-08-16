// npm run build && rm -rf docs && mkdir -p docs && cp static/opencv.js test/assets/* docs && npx parcel -d docs test/probes/probe.html
import { ok } from 'assert'
import 'babel-polyfill'
import { createFileFromUrl, getImageData, renderInCanvas } from '../../src/browserImageUtil'
import { loadOpencv } from '../../src/opencvReady'

async function filesTest() {
  await createFileFromUrl('shape.jpg', '/shape.jpg')
  const content = cv.FS.readFile('/shape.jpg')
  ok(content && content.byteLength > 0)
}

async function test() {
  await loadOpencv()
  filesTest()
  var src = cv.matFromImageData(await getImageData('shape.jpg'))
  let dst = new cv!.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  renderInCanvas(src)
  renderInCanvas(dst)
  src.delete()
  M.delete()
  dst.delete()
}

async function testMain() {
  await test()
  await testGrabCut()
}
testMain()

async function testGrabCut() {
  await loadOpencv()
  var src = cv.matFromImageData(await getImageData('lenna.jpg'))
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0)
  let mask = new cv.Mat()
  let bgdModel = new cv.Mat()
  let fgdModel = new cv.Mat()
  let rect = new cv.Rect(50, 50, 260, 280)
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT)
  // draw foreground
  for (let i = 0; i < src.rows; i++) {
    for (let j = 0; j < src.cols; j++) {
      if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
        src.ucharPtr(i, j)[0] = 0
        src.ucharPtr(i, j)[1] = 0
        src.ucharPtr(i, j)[2] = 0
      }
    }
  }
  // draw grab rect
  let color = new cv.Scalar(0, 0, 255)
  let point1 = new cv.Point(rect.x, rect.y)
  let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height)
  cv.rectangle(src, point1, point2, color)
  renderInCanvas(src)
  src.delete()
  mask.delete()
  bgdModel.delete()
  fgdModel.delete()
}


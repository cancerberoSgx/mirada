import test from 'ava'
import { compareL2, del, File, fromFile, get, toRgba } from 'mirada'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('inRange', async t => {
  const img = await fromFile('test/assets/n.png')
  const mask = new cv.Mat()
  const dst = new cv.Mat()
  const low = new cv.Mat(img.rows, img.cols, img.type(), [0, 0, 0, 0])
  const high = new cv.Mat(img.rows, img.cols, img.type(), [150, 150, 150, 255])
  cv.inRange(img, low, high, mask)
  const b = new cv.Mat(img.rows, img.cols, img.type(), new cv.Scalar(255, 0, 0, 255))
  b.copyTo(dst, mask)
  t.deepEqual(compareL2(await File.fromFile('test/assets/nInRange.png'), await toRgba(dst)), 0);
  [mask, dst, low, high, b].forEach(m => m.delete())
})

test('floodFill', async t => {
  const seed = new cv.Point(4, 4)
  const img = cv.Mat.zeros(100, 100, cv.CV_8UC1)
  cv.circle(img, seed, 20, new cv.Scalar(128), 3)
  //Create a mask from edges in the original image
  const mask = cv.Mat.zeros(img.rows + 2, img.cols + 2, cv.CV_8UC1)
  cv.Canny(img, mask, 100, 200)
  cv.copyMakeBorder(mask, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE)
  //Fill mask with value 128
  const fillValue = 128
  cv.floodFill(img, mask, seed, new cv.Scalar(255), 0, new cv.Scalar(), new cv.Scalar(), 4 | cv.FLOODFILL_MASK_ONLY | (fillValue << 8))
  t.deepEqual(compareL2(await File.fromFile('test/assets/floodfill.png'), File.fromMat(await toRgba(mask))), 0)
  // await write(await toRgba(mask), 'tmp2.png')
})

test('pixels 1', async t => {
  let mat = cv.Mat.ones(10, 10, cv.CV_8UC3)
  let view = mat.data
  const RValue = 3
  const GValue = 7
  const BValue = 197
  // Alter matrix[2, 1].
  let step = 3 * 10
  view[2 * step + 3] = RValue
  view[2 * step + 3 + 1] = GValue
  view[2 * step + 3 + 2] = BValue
  // Access matrix[2, 1].
  view = mat.ptr(2)

  t.deepEqual(view[3], RValue)
  t.deepEqual(view[3 + 1], GValue)
  t.deepEqual(view[3 + 2], BValue)
  // write(mat, 'tmppixels1.jpg')
  del(mat)
})

test('estimateAffine2D', async t => {
  const src = await fromFile('test/assets/n.png')
  const inputs = cv.matFromArray(4, 1, cv.CV_32FC2, [
    1, 1,
    80, 0,
    0, 80,
    80, 80
  ])
  const outputs = cv.matFromArray(4, 1, cv.CV_32FC2, [
    21, 51,
    70, 77,
    40, 40,
    10, 70
  ])
  const M = cv.estimateAffine2D(inputs, outputs)
  cv.warpAffine(src, src, M, src.size())
  t.deepEqual(compareL2(await File.fromFile('test/assets/nEstimateAffine2D.png'), src), 0)
  t.deepEqual(Array.from(M.data), [
    23, 55, 97, 126, 87, 139, 227, 63, 0, 0,
    0, 0, 0, 0, 232, 191, 71, 246, 12, 68,
    165, 35, 53, 64, 99, 56, 27, 66, 14, 254,
    212, 63, 103, 102, 102, 102, 102, 102, 182, 191,
    195, 252, 174, 22, 55, 97, 73, 64
  ])
  del(src, M)
})

test('equalizeHist', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  t.deepEqual(get(src, 2, 2), [196, 114, 78, 255])
  let rgbaPlanes = new cv.MatVector()
  cv.split(src, rgbaPlanes)
  let R = rgbaPlanes.get(0)
  let G = rgbaPlanes.get(1)
  let B = rgbaPlanes.get(2)
  cv.equalizeHist(R, R)
  cv.equalizeHist(G, G)
  cv.equalizeHist(B, B)
  cv.merge(rgbaPlanes, src)
  // write(src, 'tmp-esttt.png')
  t.deepEqual(get(src, 2, 2), [219, 208, 182, 255])
  del(src, R, G, B, rgbaPlanes)
})

test('CLAHE', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  t.deepEqual(get(src, 2, 2), [196, 114, 78, 255])
  let rgbaPlanes = new cv.MatVector()
  cv.split(src, rgbaPlanes)
  let R = rgbaPlanes.get(0)
  let G = rgbaPlanes.get(1)
  let B = rgbaPlanes.get(2)
  cv.equalizeHist(R, R)
  cv.equalizeHist(G, G)
  cv.equalizeHist(B, B)
  //@ts-ignore
  let clahe = new cv.CLAHE(1, new cv.Size(8, 8))
  clahe.apply(R, R)
  clahe.apply(G, G)
  clahe.apply(B, B)
  cv.merge(rgbaPlanes, src)
  // write(src, 'tmp-CLAHE.png')
  t.deepEqual(get(src, 2, 2), [231, 221, 193, 255])
  del(src, R, G, B, clahe, rgbaPlanes)
})

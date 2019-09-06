// import test from 'ava'
// import { compareL2, del, File, fromFile, toRgba, Mat, Scalar } from 'mirada'
// import { loadMirada, write } from './testUtil'
// import { Saturate } from '../src/op/convertTo'

// test.before(loadMirada)

// test('Saturate', async t => {
//   // const src1 = await fromFile('test/assets/b.jpg')
//   // cv.cvtColor(src1, src, cv.CV_8UC3, 3)
//   // src.
//   const src = await fromFile('test/assets/n.png')
//   src.convertTo(src, cv.CV_8U, 1.5, 0)
//   write( src, 'tmp221.jpg')
//   const dst = await new Saturate().exec({ src,alpha: .8, beta: 0})
//   // write( await toRgba(dst), 'tmp221.jpg')
//   t.true(compareL2(await File.fromFile('test/assets/bBoxFilter.png'), dst) < 0.02)
//   del(src, dst)

// })




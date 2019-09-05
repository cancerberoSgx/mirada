import test from 'ava'
import {  compareL2, del, File, fromFile, toRgba } from 'mirada'
import { canny, floodFill, replaceColor, FloodFillOptions, CannyOptions , ReplaceColorOptions, WarpPerspective, WarpPerspectiveOptions} from '../src'
import { loadMirada, write } from './testUtil'

test('d', t => t.true(true))

test.before(loadMirada)

test('floodFill', async t => {
  const o: FloodFillOptions = {
    src: await fromFile('test/assets/coins.png'),
    dst: new cv.Mat(),
    preprocess: [
      { name: 'gaussianBlur' }, { name: 'canny' }
    ],
    seed: new cv.Point(5, 6),
    newColorOrImage: new cv.Scalar(222, 0, 0, 0),
    lowDiff: new cv.Scalar(19, 19, 91, 255),
    upDiff: new cv.Scalar(229, 255, 255, 255) // when low values flood pass through edges of color similar to the low channel
  }
  floodFill(o)
  t.deepEqual(compareL2(o.dst!, await fromFile('test/assets/coinsFloodFill.png')), 0)
  del(o.src, o.dst!)
})

test('replaceColor', async t => {
  const src = await fromFile('test/assets/n.png')
  const o: ReplaceColorOptions = {
    src, lowColor: [0, 0, 0, 0], highColor: [150, 150, 150, 255],
    newColorOrImage: new cv.Scalar(255, 0, 0, 255)
  }
  const dst = replaceColor(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/nInRange.png'), toRgba(dst), true), 0)
  del(dst, src)
})

test('canny', async t => {
  const src = await fromFile('test/assets/lenna.jpg')
  const o: CannyOptions = {
    src, threshold1: 11, threshold2: 224, apertureSize: 3, L2gradient: true
  }
  const dst = canny(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/lennaCanny.png'), toRgba(dst), true), 0)
  del(dst, src)
})

test.only('warPerspective', async t => {
  console.log('sebsbs');
  
 const src = await fromFile('test/assets/lenna.jpg')

  //  await toRgba(src, src )
  // cv.cvtColor(src, src, )
    const dst = cv.Mat.zeros( src.rows, src.cols, src.type() );
  // console.log(src.type(), src.channels(), dst.type(), dst.channels());
  
  const o: WarpPerspectiveOptions = {
    src, 
    dst,
    inputs: [
      56, 65,
      368, 52, 
      28, 387, 
      389, 390
      ],  
      outputs: [
        56, 65,
      368, 52, 
      28, 387, 
      389, 390
        ], 
        size: dst.size()
  }
  await  new WarpPerspective().exec(o)
  // const dst =
  write(o.dst!, 'tmp-WarpPerspective.png')
  t.deepEqual(compareL2(await File.fromFile('test/assets/lenna.jpg'), toRgba(o.dst!), true), 0)
  // t.true(true)
  del(dst, src)
})

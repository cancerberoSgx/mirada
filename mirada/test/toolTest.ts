import test from 'ava'
import { compareL2, fromFile, toRgba } from '../src'
import { File } from '../src/file'
import { floodFill, FloodFillOptions } from "../src/tool/floodFill"
import { replaceColor, ReplaceColorOptions } from '../src/tool/image'
import { loadMirada, write } from './testUtil'

test.before(loadMirada)

test.only('floodfill', async t => {
  const o: FloodFillOptions = {
    src: await fromFile('test/assets/coins.png'),
    dst: new cv.Mat(),
    seed: new cv.Point(5, 6),
    newColorOrImage:  new cv.Scalar(255, 0, 0, 255),
    lowDiff: new cv.Scalar(9, 255, 255, 255),
    upDiff: new cv.Scalar(9, 255, 255, 255)
  }
  floodFill(o)
  t.deepEqual([o.dst!.cols, o.dst!.rows], [o.src.cols, o.src.rows])
  write(o.dst!, 'tmp3123123.png')
})

test('replaceColor', async t => {
  const src = await fromFile('test/assets/n.png')
  const o: ReplaceColorOptions = {
    src, lowColor: [0, 0, 0, 0], highColor: [150, 150, 150, 255], 
  newColorOrImage: new cv.Scalar(255, 0, 0, 255)
  }
  const dst = replaceColor(o)
  t.deepEqual(compareL2(await File.fromFile('test/assets/nInRange.png'), toRgba(dst), true), 0);
  [src, dst,].forEach(m => m.delete())
})

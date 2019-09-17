import test from 'ava'
import { compareL2, File, fromFile, Mat } from 'mirada'
import { Chain } from '../src/chain'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('chain', async t => {
  const f2 = new Chain(await fromFile('test/assets/lenna.jpg'))
  .roi(new cv.Rect(100, 100, 100, 80))
  .toRgba()
  .asFile()
  t.deepEqual(compareL2(f2,  await fromFile('test/assets/mask1.jpg'), true), 0); 
})

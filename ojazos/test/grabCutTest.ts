import test from 'ava'
import { create, distance, read } from 'jimp'
import { File, grabCut } from '../src'
import { loadOjazos } from './testUtil'
import fileType = require('file-type')
test.before(loadOjazos)

test('simple', async t => {
  const result = await grabCut({
    image: await File.fromFile('test/assets/lenna.jpg'),
    x: 50,
    y: 50,
    width: 260,
    height: 280
  })
  const f = File.fromData(result.image, 'result.png')
  t.deepEqual(f.size(), { width: 400, height: 400 })
  t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
  t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/lennaGrabCut.png')), 0)
})

import test from 'ava'
import { File } from '../src'
import { loadOjazos } from './testUtil'
import fileType = require('file-type')

test.before(loadOjazos)

test('fromFile', async t => {
  const file = await File.fromFile('test/assets/lenna.jpg')
  t.deepEqual(file.size(), { width: 400, height: 400 })
  t.deepEqual(fileType(await file.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
})

test('fromUrl', async t => {
  const file = await File.fromUrl('https://cancerberosgx.github.io/demos/geometrizejs-cli/bridge.jpg')
  t.deepEqual(file.size(), { width: 500, height: 333 })
  t.deepEqual(fileType(await file.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
})


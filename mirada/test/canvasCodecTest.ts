import test from 'ava'
import { Image, loadImage } from 'canvas'
import { readFileSync, writeFileSync } from 'fs'
import Jimp from 'jimp'
import { CanvasCodec, File, installFormatProxy, loadFormatProxies, loadOpencv, unInstallFormatProxies, unloadFormatProxies } from '../src'
import { createCanvas, loadDOM } from './testUtil'
import fileType = require('file-type')

test.before(async () => {
  loadDOM()
  unInstallFormatProxies()
  unloadFormatProxies()
  await installFormatProxy(() => new CanvasCodec())
  await loadFormatProxies()
  await loadOpencv()
})

test('write canvas codec', async t => {
  var img: Image = await loadImage('test/assets/shape.jpg')
  const el = createCanvas(img.width, img.height)
  el.getContext('2d')!.drawImage(img as any, 0, 0)
  writeFileSync('tmp222.png', el.toBuffer('image/png'))
  const mat = cv.imread(el as any)
  const b = await File.fromMat(mat).asArrayBuffer('png')
  writeFileSync('tmp3333.png', Buffer.from(b))
  t.deepEqual(Jimp.distance(await Jimp.read('tmp222.png'), await Jimp.read('tmp3333.png')), 0)
  t.deepEqual(Jimp.distance(await Jimp.read('tmp222.png'), await Jimp.read('test/assets/shape.jpg')), 0)
})

test('read canvas codec', async t => {
  const aa = readFileSync('test/assets/n.png')
  const ii = await File.fromArrayBuffer(aa.buffer, 'n.png')
  const img2 = ii.asMat()
  const el2 = createCanvas(img2.cols, img2.rows) as any
  ii.show(el2)
  writeFileSync('tmp444.png', el2.toBuffer('image/png'))
  t.deepEqual(Jimp.distance(await Jimp.read('tmp444.png'), await Jimp.read('test/assets/n.png')), 0)
})

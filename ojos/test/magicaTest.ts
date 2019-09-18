import test, { ExecutionContext } from 'ava'
import { File as MagicaFile, magickLoaded, run } from 'magica'
import { compareL2, File, fromFile, ImageData, loadOpencv } from 'mirada'
import { Ellipse, MagicaCodec, scalarColor } from '../src'

test.before(async () => {
  await magickLoaded
  const Magica = {
    fromArrayBuffer: MagicaFile.fromArrayBuffer,
    fromRGBAImageData: async (data: ImageData) => MagicaFile.fromRGBAImageData(data as any),
    run
  }
  await loadOpencv({ formatProxies: [() => new MagicaCodec(Magica)] })
})

test('tiff', async t => {
  await doTest(t, 'test/assets/chala.tiff', 'test/assets/chalaMagica.tiff')
})

test('webp', async t => {
  await doTest(t, 'test/assets/ear.webp', 'test/assets/earMagica.webp')
})

test('psd', async t => {
  await doTest(t, 'test/assets/bridge.psd', 'test/assets/bridgeMagica.psd')
})

test('gif', async t => {
  await doTest(t, 'test/assets/input.gif', 'test/assets/inputMagica.gif')
})

async function doTest(t: ExecutionContext, name1: string, name3?: string) {
  const f = await File.fromFile(name1)
  const dst = new Ellipse().exec({
    src: f.asMat(),
    dst: f.asMat(),
    angle: 33,
    size: { width: 22, height: 11 },
    center: { x: 14, y: 14 },
    color: scalarColor('red')
  })
  t.true(dst === f.asMat())
  name3 && t.deepEqual(compareL2(dst, await fromFile(name3), true), 0)
}

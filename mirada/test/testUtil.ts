import Jimp, { create } from 'jimp'
import { getMimeTypeForExtension } from 'misc-utils-of-mine-generic'
import { FormatProxy, ImageData, installFormatProxy, loadOpencv } from '../src'

class JimpFormatProxy implements FormatProxy {
  async decode(buffer: ArrayBuffer) {
    const img = await create(Buffer.from(buffer))
    return img.bitmap
  }
  async encode(data: ImageData, format: string) {
    const mime = getMimeTypeForExtension(format)
    if (!mime) {
      throw new Error('format not supported' + format)
    }
    var img = new Jimp({ ...data, data: Buffer.from(data.data.buffer) })
    const buffer = await img.getBufferAsync(mime)
    return buffer
  }
}

export async function loadMirada() {
  await loadOpencv()
  installFormatProxy(new JimpFormatProxy())
}

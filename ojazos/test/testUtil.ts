import { create } from 'jimp';
import Jimp from 'jimp';
import { loadOpencv, installFormatProxy, FormatProxy, ImageData } from '../src';
import { getMimeTypeForExtension } from 'misc-utils-of-mine-generic';

class JimpFormatProxy implements FormatProxy {
  async decode(buffer: ArrayBuffer) {
    const img = await create(Buffer.from(buffer));
    return img.bitmap;
  }
  async encode(data: ImageData, format: string) {
    const mime = getMimeTypeForExtension(format);
    if (!mime) {
      throw new Error('format not supported' + format);
    }
    var img = new Jimp({ ...data, data: Buffer.from(data.data.buffer) });
    const buffer = await img.getBufferAsync(mime);
    return buffer;
  }
}

export async function loadOjazos() {
  await loadOpencv();
  installFormatProxy(new JimpFormatProxy());
}

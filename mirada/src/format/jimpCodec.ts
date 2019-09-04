import { getMimeTypeForExtension } from 'misc-utils-of-mine-generic';
import { FormatCodec } from '../types/mirada';

type AnyConstructor = {
  [a: string]: any
  new(...args: any[]): any
}

type Jimp = AnyConstructor

/**
  Example of declaring a Jimp proxy as a class
  
```ts
import * as Jimp from 'jimp'
class JimpProxy implements FormatProxyClass {
  async create() {
   return new JimpFormatCodec(Jimp)
  }  
}
```
 */
export class JimpCodec implements FormatCodec {
  constructor(protected jimp: Jimp) {
  }

  async decode(buffer: ArrayBuffer): Promise<ImageData | undefined> {
    const img = await this.jimp.create(Buffer.from(buffer))
    return img.bitmap
  }

  async encode(data: ImageData, format: string, quality?: number): Promise<ArrayBuffer | undefined> {
    const mime = getMimeTypeForExtension(format)
    if (!mime) {
      throw new Error('format not supported' + format)
    }
    var img = new this.jimp({ ...data, data: Buffer.from(data.data.buffer) })
    // console.log({mime}, typeof mime);

    const buffer = await img.getBufferAsync(mime)
    return buffer
  }
}

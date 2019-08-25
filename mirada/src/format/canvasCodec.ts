import { inBrowser } from 'misc-utils-of-mine-generic'
import { renderArrayBufferInCanvas } from '../util/browserImageUtil'
import { FormatCodec } from '../types/mirada'

// type AnyConstructor = {
//   [a:string]:any
//   new (...args:any[]):any
// }
// // type Jimp = AnyConstructor
/**
  Example of declaring a format codec that uses DOM canvas instance which must be provided by the user.
  
```ts
import * as Jimp from 'jimp'
class JimpProxy implements FormatProxyClass {
  async create() {
   return new JimpFormatCodec(Jimp)
  }  
}
```
 */
export class CanvasCodec implements FormatCodec {
  constructor() {
  }
  async decode(buffer: ArrayBuffer): Promise<ImageData> {
    if (!inBrowser()) {
      throw new Error('This Codec needs a DOM / Browser ro execute')
    }
    // var c :HTMLCanvasElement= getCanvas()
    // var img:HTMLImageElement = get Iimage()
    const { canvas, height, width } = await renderArrayBufferInCanvas(buffer)
    var imgData = canvas!.getContext('2d')!.getImageData(0, 0, height, width)
    return imgData
    // resolve(imgData)
    //  c.
    // c!.getContext('2d')!.putImageData(imagedata, dx, dy)(new Uint8ClampedArray(buffer), dx, dy)
    // var b = new Blob([buffer])
    // b.type
    // if(!c.isConnected)
    //   var img = toRgba(mat)
    // var imgData = htmlImageData(img)
    // var ctx = canvas.getContext('2d')!
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // canvas.width = imgData.width
    // canvas.height = imgData.height
    // ctx.putImageData(imgData, 0, 0)
    // img.delete()
    //     var f = await File.fromArrayBuffer(buffer)
    // renderInCanvas(, name))
    //     renderInCanvas(mat)
    //     const img = await this.jimp.create(Buffer.from(buffer));
    // return img.bitmap;
  }
  async encode(data: ImageData, format: string): Promise<ArrayBuffer> {
    if (!inBrowser()) {
      throw new Error('This Codec needs a DOM / Browser ro execute')
    }
    throw new Error('TODO')
  }
}

// interface DomProvider {
//   canvas(): Promise<HTMLCanvasElement>
//   image(): Promise<HTMLImageElement>
// }

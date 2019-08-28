import { inBrowser } from 'misc-utils-of-mine-generic'
import { FormatCodec } from '../types/mirada'
import { renderArrayBufferInCanvas } from '../util/browserImageUtil'

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
  async decode(buffer: ArrayBuffer): Promise<ImageData | undefined> {
    if (!inBrowser()) {
      throw new Error('This Codec needs a DOM / Browser ro execute')
    }
    const { canvas, height, width } = await renderArrayBufferInCanvas(buffer)
    var imgData = canvas!.getContext('2d')!.getImageData(0, 0, width, height)
    return imgData
  }

  async encode(data: ImageData, format: string, quality?: number): Promise<ArrayBuffer | undefined> {
    if (!inBrowser()) {
      throw new Error('This Codec needs a DOM / Browser ro execute')
    }

    throw new Error('TODO')

    //     // const f = File.fromData(data)
    //     const mat = cv.matFromImageData(data)
    //     const rgba = toRgba(mat)
    //     const canvas = renderInCanvas(mat)
    //     mat.delete()
    //     return new Promise((resolve, reject)=>{
    //  canvas.toBlob(b=>{
    //       if(!b){
    //         return resolve(undefined)
    //       }
    //       // b.
    //   const r = new FileReader()
    //   r.onloadend = ()=>{
    //     resolve(r.result as any||undefined)
    //   }
    //   r.onerror = r.onabort = ()=>{
    //     r.error ? reject(r.error) : resolve(undefined)
    //   }
    //   // r.
    //   r.readAsArrayBuffer(b)
    //     }, getMimeTypeForExtension(format)||'image/png' , quality)
    //   })
  }
}

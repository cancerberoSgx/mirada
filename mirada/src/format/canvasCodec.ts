import { getMimeTypeForExtension } from 'misc-utils-of-mine-generic'
import { renderArrayBufferInCanvas, renderInCanvas, renderSvgInCanvas } from "../browser/canvasRender"
import { File } from '../file'
import { FormatCodec } from '../types/mirada'
import { arrayBufferToString } from '../util/base64'

/**
  Example of declaring a format codec that uses DOM canvas instance which must be provided by the user.
  
```ts
import  jimp from 'jimp'
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

  async decode(buffer: ArrayBuffer, format?: string): Promise<ImageData | undefined> {
    let tt: any
    const mime = format ? getMimeTypeForExtension(format) : (tt = File.fileType(buffer)) && tt.mime || undefined
    if (!mime) {
      return
    }
    const { canvas, height, width } = mime === 'image/svg+xml' ? await renderSvgInCanvas(arrayBufferToString(buffer)) : await renderArrayBufferInCanvas(buffer, mime)
    return canvas.getContext('2d')!.getImageData(0, 0, width, height)
  }

  async encode(data: ImageData, format: string, quality?: number): Promise<ArrayBuffer | undefined> {
    try {
      const mat = cv.matFromImageData(data)
      const canvas = renderInCanvas(mat, { forceSameSize: true, rgba: true })
      mat.delete()
      return new Promise((resolve, reject) => {
        canvas.toBlob(b => {
          if (!b) {
            return resolve(undefined)
          }
          const r = new FileReader()
          r.onloadend = (a) => {
            resolve(r.result as any || undefined)
          }
          r.onerror = r.onabort = () => {
            r.error ? reject(r.error) : resolve(undefined)
          }
          r.readAsArrayBuffer(b)
        }, getMimeTypeForExtension(format) || 'image/png', quality)
      })
    } catch (error) {
      console.error(error)
    }
  }
}

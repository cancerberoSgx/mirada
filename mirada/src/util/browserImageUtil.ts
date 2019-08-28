import { toImageData } from '..'
import { File } from '../file'
import { Mat } from '../types/opencv'
import { toRgba } from './imageUtil'

export async function fromInputFileElement(a: HTMLInputElement) {
  const files = await File.fromHtmlFileInputElement(a)
  return files.map(f => f.asMat())
}

export function fetchImageData(url: string) {
  return new Promise<ImageData>((resolve, reject) => {
    var img = new Image()
    img.onload = e => {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      resolve(imgData)
    }
    img.onerror = reject
    img.src = url
  })
}

/**
 * A subptimal method to load a image array buffer (encoded in jpg, png) wihtout knowing its format or size. 
  * 1) creates a blob and a url object 
  * * loads the url in a HTML Image (to know its dimentions )
  * * draw the image in a canvas ().
  * 
  * This method is useful as a decoder for the browser without libraries
 */
export function renderArrayBufferInCanvas(a: ArrayBuffer, canvas?: HTMLCanvasElement, appendToBody = false): Promise<{ canvas: HTMLCanvasElement, width: number, height: number }> {
  var blob = new Blob([new Uint8ClampedArray(a)])
  var url = URL.createObjectURL(blob)
  var img = new Image()
  return new Promise(resolve => {
    img.onload = () => {
      if (!canvas) {
        canvas = document.createElement('canvas')
        appendToBody && document.body.append(canvas)
      }
      canvas!.setAttribute('width', img.naturalWidth + '')
      canvas!.setAttribute('height', img.naturalHeight + '')
      canvas!.getContext('2d')!.drawImage(img, 0, 0)
      resolve({ canvas, width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(url)
    }
    img.src = url
  })
}

export function renderInCanvas(mat: Mat, canvas?: HTMLCanvasElement, appendToBody = false, rgba = true): HTMLCanvasElement {
  if (!canvas) {
    canvas = document.createElement('canvas')
    appendToBody && document.body.append(canvas)
  }
  var img = rgba ? toRgba(mat) : mat
  var imgData = getHtmlImageData(img)
  var ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = imgData.width
  canvas.height = imgData.height
  ctx.putImageData(imgData, 0, 0)
  rgba && img.delete()
  return canvas
}

export function getHtmlImageData(img: Mat) {
  var imgData = toImageData(img)
  const htmlImageData = new ImageData(imgData.data, imgData.width, imgData.height)
  return htmlImageData
}

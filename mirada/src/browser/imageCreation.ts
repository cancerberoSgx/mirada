import { File } from '../file';
import { Mat } from '../types/opencv';
import { toImageData } from '../util/imageUtil';

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

export function asHtmlImageData(img: Mat) {
  var imgData = toImageData(img)
  const htmlImageData = new ImageData(imgData.data, imgData.width, imgData.height)
  return htmlImageData
}


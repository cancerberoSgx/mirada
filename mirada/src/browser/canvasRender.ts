import { Mat, Rect } from '../types/opencv'
import { arrayBufferToUrl, dataToUrl } from '../util/base64'
import { toRgba } from '../util/imageUtil'
import { asHtmlImageData } from './imageCreation'

export interface ABOptions {
  name?: string;
  canvas?: HTMLCanvasElement;
  appendToBody?: boolean;
}

const defaultABOptions: ABOptions = {}

export interface Result {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

/**
 * A sub optimal method to load a image array buffer (encoded in jpg, png) whiteouts knowing its format or size.
  * 1) creates a blob and a url object
  * * loads the url in a HTML Image (to know its dimensions )
  * * draw the image in a canvas ().
  *
  * This method is useful as a decoder for the browser without libraries
 */
export function renderArrayBufferInCanvas(a: ArrayBuffer, mime: string, options: ABOptions = defaultABOptions): Promise<Result> {
  options = { ...defaultABOptions, ...options }
  const url = arrayBufferToUrl(a, mime, options.name)
  var img = new Image()
  return new Promise(resolve => {
    img.onload = () => {
      if (!options.canvas) {
        options.canvas = document.createElement('canvas')
        options.appendToBody && document.body.append(options.canvas)
      }
      options.canvas!.setAttribute('width', img.naturalWidth + '')
      options.canvas!.setAttribute('height', img.naturalHeight + '')
      options.canvas!.getContext('2d')!.drawImage(img, 0, 0)
      resolve({ canvas: options.canvas, width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = (e) => {
      console.log('ERROR', e)
    }
    img.src = url
  })
}

export function renderSvgInCanvas(svg: string, options: ABOptions = defaultABOptions): Promise<Result> {
  return new Promise(resolve => {
    var img = new Image()
    img.style.display = 'none'
    img.onerror = (e) => {
      console.log('ERROR', e)
      resolve(undefined as any)
    }
    img.onload = e => {
      if (!options.canvas) {
        options.canvas = document.createElement('canvas')
        options.appendToBody && document.body.append(options.canvas)
      }
      options.canvas!.setAttribute('width', (img.width || 500) + '')
      options.canvas!.setAttribute('height', (img.height || 500) + '')
      options.canvas!.getContext('2d')!.drawImage(img, 0, 0)
      resolve({ canvas: options.canvas, width: img.naturalWidth, height: img.naturalHeight })
      img.remove()
    }
    document.body.append(img)
    img.src = dataToUrl(svg, 'image/svg+xml', options.name || 'image.svg')
  })
}

export interface Options {
  appendToBody?: boolean;
  rgba?: boolean;
  canvas?: HTMLCanvasElement;
  region?: Rect;
  clear?: boolean;
  forceSameSize?: boolean;
}

const defaultOptions = {
  rgba: true,
  forceSameSize: true
}

export function renderInCanvas(mat: Mat, options?: Options): HTMLCanvasElement {
  options = { ...defaultOptions, ...options }
  if (!options.canvas) {
    options.canvas = document.createElement('canvas')
    options.appendToBody && !options.canvas.isConnected && document.body.append(options.canvas)
  }
  const img = options.rgba ? toRgba(mat) : mat
  const imgData = asHtmlImageData(img)
  const ctx = options.canvas.getContext('2d')!
  if (options.clear) {
    ctx.clearRect(0, 0, options.canvas.width, options.canvas.height)
  }
  if (options.forceSameSize) {
    options.canvas.width = imgData.width
    options.canvas.height = imgData.height
    ctx.putImageData(imgData, 0, 0, 0, 0, imgData.width, imgData.height)
  }
  else if (!options.region) {
    ctx.putImageData(imgData, 0, 0)
  }
  else {
    ctx.putImageData(imgData, options.region.x, options.region.y, options.region.x, options.region.y, options.region.width, options.region.height)
  }
  options.rgba && img.delete()
  return options.canvas
}

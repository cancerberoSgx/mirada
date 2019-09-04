import { File } from '../File'
import { Mat } from '../types/opencv'

/**
 * Creates an CV ImageData object from given image.
 */
export function toImageData(img: Mat) {
  return {
    data: new Uint8ClampedArray(img.data),
    width: img.cols,
    height: img.rows
  }
}
export const asImageData = toImageData

export function isMat(m:any):m is Mat{
  return m && typeof m.rows==='number'&& typeof m.cols==='number'&& typeof m.data==='object'&& typeof m.copyTo==='function'
}

/**
 * Returns a new image that is identical to given (1, 3 or 4 channels) but has 4 RGBA channels.
 */
export function toRgba(mat: Mat, dst = new cv.Mat()) {
  const depth = mat.type() % 8
  const scale = depth <= cv.CV_8S ? 1.0 : (depth <= cv.CV_32S ? 1.0 / 256.0 : 255.0)
  const shift = (depth === cv.CV_8S || depth === cv.CV_16S) ? 128.0 : 0.0
  mat.convertTo(dst, cv.CV_8U, scale, shift)
  switch (dst.type()) {
    case cv.CV_8UC1:
      cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA)
      break
    case cv.CV_8UC3:
      cv.cvtColor(dst, dst, cv.COLOR_RGB2RGBA)
      break
    case cv.CV_8UC4:
      break
    default:
      throw new Error('Bad number of channels (Source image must have 1, 3 or 4 channels)')
  }
  return dst
}

export async function fromFile(f: string) {
  const file = await File.fromFile(f)
  return file.asMat()
}

export async function fromArrayBuffer(a: ArrayBuffer) {
  const file = await File.fromArrayBuffer(a)
  return file.asMat()
}

export async function fromUrl(f: string) {
  const file = await File.fromUrl(f)
  return file.asMat()
}

/** 
 * Compare two images by getting the L2 error (square-root of sum of squared error). The lower the result the more similar are the images. 
 */
export function compareL2(f1: Mat | File, f2: Mat | File) {
  const a = asMat(f1), b = asMat(f2)
  if (a.rows > 0 && a.rows == b.rows && a.cols > 0 && a.cols == a.cols) {
    // Calculate the L2 relative error between images.
    const errorL2 = cv.norm1(a, b, cv.NORM_L2)
    // Convert to a reasonable scale, since L2 error is summed across all pixels of the image.
    const similarity = errorL2 / (a.rows * a.cols)
    return similarity
  }
  else {
    //Images have a different size
    return 1.0
  }
}

export function asMat(f: File | Mat) {
  return File.isFile(f) ? f.asMat() : f
}

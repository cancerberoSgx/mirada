// generic utilities for Mat (Images) that can be used in browser and node
import { Mat } from './types/opencvTypes'

export function imageData(img: Mat) {
  return {
    data: new Uint8ClampedArray(img.data),
    width: img.cols,
    height: img.rows
  }
}
/**
 * Returns a new image that is ideantical to given (1, 3 or 4 channels) but has 4 RGBA channels.
 */
export function toRgba(mat: Mat) {
  const img = new cv.Mat()
  const depth = mat.type() % 8
  const scale = depth <= cv.CV_8S ? 1.0 : (depth <= cv.CV_32S ? 1.0 / 256.0 : 255.0)
  const shift = (depth === cv.CV_8S || depth === cv.CV_16S) ? 128.0 : 0.0
  mat.convertTo(img, cv.CV_8U, scale, shift)
  switch (img.type()) {
    case cv.CV_8UC1:
      cv.cvtColor(img, img, cv.COLOR_GRAY2RGBA)
      break
    case cv.CV_8UC3:
      cv.cvtColor(img, img, cv.COLOR_RGB2RGBA)
      break
    case cv.CV_8UC4:
      break
    default:
      throw new Error('Bad number of channels (Source image must have 1, 3 or 4 channels)')
  }
  return img
}

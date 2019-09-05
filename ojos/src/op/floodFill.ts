import { del, isMat } from 'mirada'
import { checkThrow } from 'misc-utils-of-mine-generic'
import { CannyConcreteOptions, FloodFillOptions, GaussianBlurConcreteOptions } from './types'

export function floodFill(o: FloodFillOptions) {
  const preprocess = o.preprocess || [{ name: 'gaussianBlur' }, { name: 'canny' }]
  const dst = o.dst = o.dst || new cv.Mat()
  o.src.copyTo(dst)

  const blur = preprocess.find(p => p.name === 'gaussianBlur') as GaussianBlurConcreteOptions
  if (blur) {
    checkThrow(!blur.blur || blur.blur === 1 || blur.blur % 2 !== 0, 'Blur size must be odd and greater than 2')
    cv.medianBlur(o.src, dst, blur.blur || 3)
  }

  cv.cvtColor(dst, dst, cv.CV_8UC1, 3)
  const mask = cv.Mat.zeros(dst.rows + 2, dst.cols + 2, cv.CV_8UC1)

  const canny = preprocess.find(p => p.name === 'canny') as CannyConcreteOptions
  if (canny) {
    cv.Canny(dst, mask, canny.threshold1 || 0, canny.threshold2 || 255) // heads up ! dst needs to be bigger!
    cv.copyMakeBorder(mask, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE) // thatr's why we need to copy again
  } else {
    cv.copyMakeBorder(dst, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE)
  }

  const fillValue = 128
  cv.floodFill(dst, mask, o.seed, new cv.Scalar(255, 255, 255, 255), 0, o.lowDiff || new cv.Scalar(255, 255, 255, 255),
    o.upDiff || new cv.Scalar(255, 255, 255, 255), (o.connectivity || 4) | cv.FLOODFILL_MASK_ONLY | (fillValue << 8))

  // mask has canny edges in 255 and fill in 128 - we keep with just 128:
  cv.inRange(mask, new cv.Mat(mask.rows, mask.cols, mask.type(), new cv.Scalar(128, 128, 128)),
    new cv.Mat(mask.rows, mask.cols, mask.type(), new cv.Scalar(128, 128, 128)), mask)

  const dst2 = cv.Mat.zeros(o.src.rows + 2, o.src.cols + 2, o.src.type())
  cv.copyMakeBorder(o.src, dst2, 1, 1, 1, 1, cv.BORDER_REPLICATE)

  //copy b= o.newColorOrImage mask(dst2)
  const b = isMat(o.newColorOrImage) ? o.newColorOrImage : new cv.Mat(dst2.rows, dst2.cols, dst2.type(), o.newColorOrImage)
  b.copyTo(dst2, mask)

  // idea : o.src.copyTo(dst2, maskNegated)
  const r = dst2.roi({ x: 1, y: 1, width: mask.cols - 2, height: mask.rows - 2 })
  r.copyTo(dst)
  del(mask, dst2, r, ...isMat(o.newColorOrImage) ? [] : [b])
  return dst
}

// export function floodFill(o: FloodFillOptions) {
//   checkThrow(!o.blur || o.blur % 2 !== 0, 'Blur size must be odd')
//   const originalType = o.dst ? o.dst.type() : o.src.type()
//   const dst = o.dst = o.dst || new cv.Mat()
//   cv.medianBlur(o.src, dst, o.blur || 5)
//   cv.cvtColor(dst, dst, cv.CV_8UC1, 3)
//   const mask = cv.Mat.zeros(dst.rows + 2, dst.cols + 2, cv.CV_8UC1)
//   const ct = o.cannyThreshold || [0, 255]
//   cv.Canny(dst, mask, ct[0], ct[1])
//   cv.copyMakeBorder(mask, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE)
//   cv.floodFill(dst, mask, o.seed, new cv.Scalar(255, 255, 255, 255), 0, o.lowDiff || new cv.Scalar(255, 255, 255, 255),
//     o.upDiff || new cv.Scalar(255, 255, 255, 255), (o.connectivity || 4) | cv.FLOODFILL_MASK_ONLY | ((o.fill || 255) << 8))
//   const r = mask.roi({ x: 1, y: 1, width: mask.cols - 2, height: mask.rows - 2 })
//   dst.create(o.src.rows, o.src.cols, originalType)
//   r.copyTo(dst)
//   del(mask, r)
//   return dst
// }

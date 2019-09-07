import { Scalar, Point, Size } from 'mirada'
import { RGBColor } from 'react-color'

export function scalarToRgbColor(c: Scalar, alphaMultiplier = 1 / 255.0): RGBColor {
  return { r: c[0], g: c[1], b: c[2], a: between(c[3] * alphaMultiplier, 0, 1) }
}
/**
 * the color piker library i'm using represents alpha channel with different scales depending on the widget...
 */
export function rgbColorToScalar(c: RGBColor, alphaMultiplier = 255.0): Scalar {
  return [c.r, c.g, c.b, typeof c.a !== 'undefined' ? Math.round(c.a * alphaMultiplier) : 255]
}

const isBrowser = typeof performance !== 'undefined' && typeof performance.now === 'function'

export function now() {
  return isBrowser ? performance.now() : 0
}

export function between(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

export function pointToSize(p: Point) {
  return new cv.Size(p.x, p.y)
}

export function sizeToPoint(s:Size) {
  return new cv.Point(s.width, s.height)
}

export function memoryReport() {
  var m = (performance as any).memory
  if (!m) {
    return {
      usedMb: 'N/A', totalMb: 'N/A', percent: 'N/A'
    }
  }
  return {
    usedMb: (m.usedJSHeapSize / 1048576).toFixed(2) + 'Mb',
    percent: (100 * m.usedJSHeapSize / m.totalJSHeapSize).toFixed(1) + '%',
  }
}

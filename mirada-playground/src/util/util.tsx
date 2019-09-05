import { RGBColor } from 'react-color';
import {Range, Scalar} from 'mirada'
export function printMs(ms: number) {
  return (ms / 1000) + ''.padEnd(4, ' ') + ' seconds'
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

export function scalarToRgbColor(c:RGBColor|Scalar, alphaMultiplier=1/255.0): RGBColor {
  return Array.isArray(c) ? {r: c[0],g: c[0],b: c[0],a: between(c[0]*alphaMultiplier, 0, 1)} : c as RGBColor
}
/**
 * the color piker library i'm using represents alpha channel with different scales depending on the widget... 
 */
export function rgbColorToScalar(c:RGBColor, alphaMultiplier=255.0 ): Scalar {
  return [c.r, c.g, c.b, typeof c.a!=='undefined' ? Math.round(c.a*alphaMultiplier) : 255]
}

export function msFrom(t0: number) {
  return (now() - t0) / 1000000
}

export function timeFrom(t0: number) {
  return `${((now() - t0) / 1000000).toPrecision(1)} ms`
}

const isBrowser = typeof performance !== 'undefined' && typeof performance.now === 'function'
export function now() {
  return isBrowser ? performance.now() : 0
}

export function between(n:number, min:number, max: number){
  return Math.max(min, Math.min(n, max))
}
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
import { withoutExtension } from 'misc-utils-of-mine-generic'
import { join, relative, resolve as pathResolve } from 'path'

export function buildError(e: any) {
  console.error(e)
  if (typeof e.stack !== 'undefined') {
    console.log((e.stack + '').split('\n').join('\n'))
  }
  return e instanceof Error ? e : new Error(e)
}

export function resolveNodeModule(p: string) {
  // if(isAbsolute(p)){
  //   return p
  // }
  var r = withoutExtension(relative(join(__dirname, '..'), pathResolve(p)))
  if (!r.startsWith('.')) {
    r = './' + r
  }
  return r
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

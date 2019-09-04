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
  var r = withoutExtension(relative(join(__dirname, '..'), pathResolve(p)))
  if (!r.startsWith('.')) {
    r = './' + r
  }
  return r
} 

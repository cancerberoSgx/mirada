
import * as _CV from './_types'
export type CV = (typeof _CV)   // namespace type
// @ts-ignore
const __cv = cv                 // THIS is the instance - TODO: find a way to get it.
const _cv = __cv as any as CV   // cast it to the namespace type
export {_cv as cv}              // and export it
export * from './_types'
export * from './_hacks'

declare global {
  var cv: CV
}
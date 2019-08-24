
export function renderCvExports() {
  return `
import * as _CV from './_types'

export type CV = (typeof _CV)   // namespace type
// @ts-ignore
const __cv = cv                 // THIS is the instance - TODO: find a way to get it.
const _cv = __cv as any as CV   // cast it to the namespace type
export {_cv as cv}              // and export it
export * from './_types'
declare global {
  var cv: CV
}
`
}


// import * as hacks from './hacks'
// import * as enums from '../enums'
// import * as parsed from '../../../json2dts/parsed'

// export type CV = (typeof hacks) &  (typeof enums) &  (typeof parsed)

// const cv_=null as any as CV  // THIS is the instance
// export {cv_ as cv}


// import { Doxygen2tsOptions } from '../../doxygen2ts';

// interface TsExportHack extends Doxygen2tsOptions{
// files: string[]
// }

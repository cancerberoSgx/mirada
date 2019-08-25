import * as _CV from './_types'
export type CV = typeof _CV // namespace type
export * from './_types'
export * from './_hacks'

// magica or others needs to expose objects in the namespace - do it in that file that won't be touched
export * from '../_opencvCustom'
import { Size } from 'mirada'

/** UnionToIntersection<1|2|3>  will be 1 & 2 & 3 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export function anyUndefined(...a: any[]) {
  return !!a.find(a => typeof a === 'undefined')
}

export type SizeRepresentation = Size | [number, number] | number

export function toSize(r: SizeRepresentation): Size {
  return Array.isArray(r) ? { width: r[0], height: r[0] } : typeof r === 'number' ? { width: r, height: r } : r
}

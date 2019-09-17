import { Size } from 'mirada'

export type SizeRepresentation = Size | [number, number] | number

export function toSize(r: SizeRepresentation): Size {
  return Array.isArray(r) ? { width: r[0], height: r[0] } : typeof r === 'number' ? { width: r, height: r } : r
}

export function toNumber(s : SizeRepresentation) {
  return typeof s ==='number'?s : Array.isArray(s) ? s[0] : s.width
}
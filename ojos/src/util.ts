import { Size } from 'mirada'

export type SizeRepresentation = Size | [number, number] | number

export function toSize(r: SizeRepresentation): Size {
  return Array.isArray(r) ? { width: r[0], height: r[0] } : typeof r === 'number' ? { width: r, height: r } : r
}

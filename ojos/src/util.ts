import { MatData } from 'mirada'
import { notUndefined } from 'misc-utils-of-mine-generic'

export function between(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

export function intBetween(n: number, min: number, max: number) {
  return Math.trunc(Math.max(min, Math.min(n, max)))
}

export function isMatData(d: any): d is MatData {
  return typeof d === 'object' && typeof d.rows === 'number' && typeof d.rows === 'number' && typeof d.type !== 'undefined' && Array.isArray(d.data) && Object.keys(d).sort().join(',') === 'cols,data,rows,type'
}

export function anyUndefined(...a:any[]){
return !!a.find(a=>typeof a==='undefined')
}
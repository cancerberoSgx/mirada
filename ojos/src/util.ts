import { Mat, MatData, data2mat, mat2data, isMat } from 'mirada'

export function between(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

export function intBetween(n: number, min: number, max: number) {
  return Math.trunc(Math.max(min, Math.min(n, max)))
}

export function isMatData(d: any): d is MatData {
  return typeof d === 'object' && typeof d.rows === 'number'&& typeof d.rows === 'number'&&  typeof d.type!== 'undefined'&& Array.isArray(d.data) && Object.keys(d).sort().join(',')==='cols,data,rows,type'
}

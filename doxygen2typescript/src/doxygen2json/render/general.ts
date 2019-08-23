import { CompoundDef, Param } from '../doxygenTypes'
import { Options } from './main'
import { renderType } from "./ref"

export function getCompoundDefName(def: CompoundDef) {
  return normalizeId(def.compoundname.split('::').pop())
}

const invalidIdRegex = () => /[^a-z0-9_]/gi

function normalizeId(s: string) {
  return s.replace(invalidIdRegex(), '_')
}

export function isValidId(s: string) {
  return s && !s.trim().match(invalidIdRegex())
}

export function renderParam(p: Param, options: Options): string {
  return `${p.name}: ${renderType(p.type, options)}`
}

import { CompoundDef, Param , linkedTextType} from '../doxygenTypes'
import { Options } from './main'

export function getCompoundDefName(def: CompoundDef) {
  return getCompoundName(def.compoundname)
}

export function getCompoundName(s: string) {
  return normalizeId(s.split('::').pop());
}

const invalidIdRegex = () => /[^a-z0-9_]/gi

function normalizeId(s: string) {
  return s.replace(invalidIdRegex(), '_')
}

export function isValidId(s: string) {
  return s && s.trim() && !s.trim().match(invalidIdRegex())
}

export function renderParam(p: Param, options: Options): string {
  return `${p.name}${p.defval?'?':''}: ${renderType(p.type, options)}`
}

export function renderType(type: linkedTextType, options: Options) {
  return isValidId(type.name) ? type.name : 'any'
}
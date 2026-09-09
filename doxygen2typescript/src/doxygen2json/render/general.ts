import { notSame } from 'misc-utils-of-mine-generic'
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

/**
 * The direct base classes of `def`, taken from doxygen's own <basecompoundref>, normalized the same
 * way a compound's own name is (leaf name, template args stripped). TypeScript only supports single
 * inheritance so callers should use element [0]; anything beyond that is C++ multiple inheritance
 * that doesn't map to a `class ... extends`.
 *
 * This is real inheritance data doxygen already provides - it replaces the need to hand-maintain which
 * class extends which. It intentionally will NOT surface bases that are only meaningful to the JS/embind
 * runtime and don't exist in the C++ hierarchy at all (e.g. Algorithm has no C++ base, but the emscripten
 * embind glue - and therefore the generated .d.ts - still wants it to extend EmscriptenEmbindInstance);
 * those remain a small manual override, see exportsHacks.ts#fixMissingExtends.
 */
export function getBaseClassNames(def: CompoundDef): string[] {
  const ownName = getCompoundDefName(def)
  return (def.basecompoundref || [])
    .map(b => getCompoundName(stripTemplateArgs(b.text || '')))
    .filter(isValidId)
    .filter(name => name !== ownName)
    .filter(notSame)
}

function stripTemplateArgs(s: string) {
  return s.replace(/<.*>/, '').trim()
}

export function renderParam(p: Param, options: Options): string {
  return `${p.name}${p.defval?'?':''}: ${renderType(p.type, options)}`
}

/**
 * C++ builtin scalar types that doxygen reports verbatim (int, uchar, size_t, ...) but that aren't
 * valid TypeScript types on their own. Mapping them here, at render time, means the renderer never
 * emits a reference it doesn't already know how to resolve - so there's nothing left for
 * fixMissingImports to reverse-engineer from a "no exported member" compiler diagnostic afterwards.
 */
export const cppPrimitiveToTsType: { [cppType: string]: string } = {
  int: 'number', float: 'number', double: 'number', size_t: 'number',
  uchar: 'number', schar: 'number', ushort: 'number', short: 'number',
  long: 'number', int64: 'number', uint64: 'number', unsigned: 'number', char: 'number',
  bool: 'boolean',
}

export function renderType(type: linkedTextType, options: Options) {
  if (!isValidId(type.name)) {
    return 'any'
  }
  return cppPrimitiveToTsType[type.name] || type.name
}
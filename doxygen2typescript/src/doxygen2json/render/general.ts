import { Doxygen2tsOptionsBase } from '../doxygen2ts'
import { CompoundDef, Described, Param } from '../doxygenTypes'
import { toMarkdown } from '../toMarkdown'
import { Options } from './main'
import { renderType } from "./type"

type ToJsDocOptions = Doxygen2tsOptionsBase & {
  node: Described;
  asterix?: boolean;
  wrap?: boolean;
}

export function toJsDoc(o: ToJsDocOptions) {
  o.asterix = typeof o.asterix === 'undefined' ? false : o.asterix
  o.wrap = typeof o.wrap === 'undefined' ? true : o.wrap
  o.renderLocation = typeof o.renderLocation === 'undefined' ? true : o.renderLocation
  var node = o.node.detaileddescriptionNode
  var body = o.asterix ? `${toMarkdown({ ...o, node }).trim().split('\n').join('\n * ')}` : `${toMarkdown({ ...o, node })}`
  body = body.trim() + '\n\n' + renderLocation(o) + '\n'
  return `${o.wrap ? '/**\n' : ''}${body}${o.wrap ? '\n*/' : ''}`
}

function renderLocation(o: ToJsDocOptions) {
  return (!o.renderLocation || !o.node.location) ? '' : `Source: [${o.node.location.file}](${o.locationFilePrefix || 'https://github.com/opencv/opencv/tree/master/modules/core/include/'}${o.node.location.file}#L${o.node.location.line}).`
}

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

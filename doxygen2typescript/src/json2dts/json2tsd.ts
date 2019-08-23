import { isArray } from 'misc-utils-of-mine-generic'
import { ParsedArray, ParsedObject, Textual } from './parsed'
import { Parsed, ParseOptions } from './types'

export function render(o: ParseOptions) {
  if (o.arrayPolicy && o.arrayPolicy !== 'first') {
    throw `o.arrayPolicy !== 'first' TODO`
  }
  if (o.objectRenderPolicy && o.objectRenderPolicy !== 'literalObject') {
    throw 'o.objectRenderPolicy!==\'literalObject\' TODO'
  }
  if (o.jsdoc) {
    throw 'jsdoc TODO'
  }
  if (o.semicolons) {
    throw 'semicolons TODO'
  }
  o.tab = o.tab || '  '
  o.semicolons = typeof o.semicolons === 'undefined' ? '' : o.semicolons
  var parsed = _parse(o)
  return `
export ${parsed instanceof ParsedObject ? 'interface ' : 'type = '} ${parsed.render()}
  `
}

function _parse(o: ParseOptions): Parsed {
  if (isArray(o.node)) {
    const el = o.node.length ? _parse({ ...o, node: o.node[0] }) : new Textual(o, 'any')
    return new ParsedArray(o, el)
  }
  else if (typeof o.node === 'object') {
    var props = Object.keys(o.node).map(name => ({
      name,
      type: _parse({ ...o, node: o.node[name] })
    }))
    return new ParsedObject(o, props)
  }
  else {
    return new Textual(o, typeof o.node)
  }
}


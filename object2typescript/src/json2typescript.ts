import { isArray } from 'misc-utils-of-mine-generic'
import { printDiagnostics } from 'ts-simple-ast-extra'
import { ParsedArray, ParsedObject, ParsedTextual } from './parsed'
import { Parsed, ParseOptions } from './types'
import { formatCode } from './util'

const defaultParseOptions: Partial<ParseOptions> = {
  onTypeScriptErrorPolicy: 'warning',
  nodeName: 'RootType',
  arrayType: 'first',// TODO: implement merge and make it default
  objectType: 'literal', // TODO: implement interfaces and make it default
}

export function json2typescript(o: ParseOptions) {
  if (o.arrayType && o.arrayType !== 'first') {
    throw `o.arrayType !== 'first' TODO`
  }
  if (o.objectType && o.objectType !== 'literal') {
    throw 'o.objectTypePolicy!==\'literal\' TODO'
  }
  if (o.jsdoc) {
    throw 'jsdoc TODO'
  }
  o = { ...defaultParseOptions, ...o }
  var parsed = _parse(o)
  var s = `export ${parsed instanceof ParsedObject ? 'interface ' : 'type = '} ${o.nodeName} ${parsed.render()}`
  var { output, project } = formatCode(s, o.codeFormatOptions)
  if (o.onTypeScriptErrorPolicy !== 'dontCheck') {
    const d = printDiagnostics(project)
    if (d.length) {
      const msg = 'Errors have been detected in TypeScript generated code: \n * ' + d.join('\n * ')
      console.error(msg)
      if (o.onTypeScriptErrorPolicy === 'error') {
        console.error(`Aborting process since option onTypeScriptErrorPolicy is 'error'. try using another value for onTypeScriptErrorPolicy or not give it to be able to generate TS code anyway. This time we abort. `)
        process.exit(1)
      }
    }
  }
  return output.getText()
}

function _parse(o: ParseOptions): Parsed {
  if (isArray(o.node)) {
    const els = o.node.length&&o.arrayType==='first' ? [_parse({ ...o, node: o.node[0]})] :  o.node.map(node=>_parse({ ...o, node}))
    return new ParsedArray(o, els)
  }
  else if (typeof o.node === 'object') {
    var props = Object.keys(o.node).map(name => ({
      name,
      type: _parse({ ...o, node: o.node[name] })
    }))
    return new ParsedObject(o, props)
  }
  else {
    return new ParsedTextual(o, typeof o.node)
  }
}


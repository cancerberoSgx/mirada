import { isArray } from 'misc-utils-of-mine-generic'
import { printDiagnostics } from 'ts-simple-ast-extra'
import { ParsedArray, ParsedObject, ParsedTextual } from './parsed'
import { Parsed, ParseOptions } from './types'
import { formatCode } from './util'

const defaultParseOptions: Partial<ParseOptions> = {
  onTypeScriptErrorPolicy: 'warning',
  nodeName: 'RootType',
  arrayPolicy: 'first',// TODO: implement merge and make it default
  objectRenderPolicy: 'literalObject', // TODO: implement interfaces and make it default
}
export function json2typescript(o: ParseOptions) {
  if (o.arrayPolicy && o.arrayPolicy !== 'first') {
    throw `o.arrayPolicy !== 'first' TODO`
  }
  if (o.objectRenderPolicy && o.objectRenderPolicy !== 'literalObject') {
    throw 'o.objectRenderPolicy!==\'literalObject\' TODO'
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
    const el = o.node.length ? _parse({ ...o, node: o.node[0] }) : new ParsedTextual(o, 'any')
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
    return new ParsedTextual(o, typeof o.node)
  }
}


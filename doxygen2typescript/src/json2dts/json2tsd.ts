import { isArray, repeat } from 'misc-utils-of-mine-generic'
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

abstract class AbstractParsed implements Parsed {
  constructor(protected options: ParseOptions) { }
  public tabLevel = 0
  render(tabLevel: number = 0): string { throw 'abstract' }
}
class Textual extends AbstractParsed {
  constructor(protected options: ParseOptions, protected text: string) {
    super(options)
  }
  render() { return this.text }
}
class ParsedArray extends AbstractParsed {
  constructor(protected options: ParseOptions, protected el: Parsed) {
    super(options)
  }
  render(tabLevel: number = 0) {
    return this.el.render() + '[]'
  }
}
class ParsedObject extends AbstractParsed {
  constructor(protected options: ParseOptions, protected props: { name: string, type: Parsed }[], ) {
    super(options)
  }
  render(tabLevel: number = 0) {
    if (this.options.objectRenderPolicy && this.options.objectRenderPolicy !== 'literalObject') {
      throw `this.options.objectRenderPolicy!=='literalObject'`
    }
    return `{
${this.options.tab}${this.props.map(p => {
      return `${repeat(tabLevel + 1, this.options.tab)}${p.name}${this.options.optionalProperties ? '?' : ''}: ${p.type.render(this.tabLevel + 1)}`
    }).join(`\n${repeat(tabLevel + 1, this.options.tab)}`)}
${repeat(tabLevel, this.options.tab)}}`
  }
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
    // let type = 'undefined'
    // if (typeof o.node === 'string') {
    //   type = 'string';
    // }
    // else if (typeof o.node === 'number') {
    //   type = 'number';
    // }
    // else if (typeof o.node === 'boolean') {
    //   type = 'boolean';
    // }
  }
}



// function test() {
//   const s = render({
//     node: {
//       a: 1, b: ['ed']
//     },
//     nodeName: 'foo'
//   })
//   console.log(s)

// }
// test()

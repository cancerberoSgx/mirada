import { quote, PropertyOptional, RemoveProperties } from 'misc-utils-of-mine-generic'
import { Parsed, ParseOptions } from './types'

export abstract class AbstractParsed implements Parsed {
  constructor(protected options: ParseOptions) { }
  public tabLevel = 0;
  abstract render(): string
  resolvePropertyName(s: string) {
    return s.match(/^\d/) || s.match(/[^a-zA-Z_0-9]/) || this.options.propertyNames ? quote(s) : s
  }
  // abstract  equals(o:Parsed):boolean
}

export class ParsedTextual extends AbstractParsed {
  constructor(protected options: ParseOptions, protected text: string) {
    super(options)
  }
  render() { return this.text }
}

export class ParsedArray extends AbstractParsed {
  constructor(protected options: ParseOptions, protected els: Parsed[]) {
    super(options)
  }
  render() {
    let r:Parsed= new ParsedTextual(this.options, 'any')
   if (this.els.length) {
      if (this.options.arrayType === 'first') {
        r= this.els[0]
      }else {
        throw ' arrayType === != first not implemented'
      }
    }
    return  r.render() + '[]'
  }
}

export interface ParsedProperty {
  name: string
  type: Parsed
  parent: ParsedObject
}

export class ParsedObject extends AbstractParsed {
  public props: ParsedProperty[]
  constructor(protected options: ParseOptions, props: RemoveProperties<ParsedProperty, 'parent'>[]) {
    super(options)
    this.props = props.map(p => ({ ...p, parent: this }))
  }
  render() {
    if (this.options.objectType && this.options.objectType !== 'literal') {
      throw `this.options.objectTypePolicy!=='literalObject'`
    }
    return `{
${    this.props
        .map(p => `${this.resolvePropertyName(p.name)}${this.options.optionalProperties ? '?' : ''}: ${p.type.render()}`
        )
        .join(`\n`)}
}`
  }
}

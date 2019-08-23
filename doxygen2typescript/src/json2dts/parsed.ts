import { repeat } from 'misc-utils-of-mine-generic'
import { Parsed, ParseOptions } from './types'

abstract class AbstractParsed implements Parsed {
  constructor(protected options: ParseOptions) { }
  public tabLevel = 0;
  render(tabLevel: number = 0): string { throw 'abstract' }
}

export class Textual extends AbstractParsed {
  constructor(protected options: ParseOptions, protected text: string) {
    super(options)
  }
  render() { return this.text }
}

export class ParsedArray extends AbstractParsed {
  constructor(protected options: ParseOptions, protected el: Parsed) {
    super(options)
  }
  render(tabLevel: number = 0) {
    return this.el.render() + '[]'
  }
}

export class ParsedObject extends AbstractParsed {
  constructor(protected options: ParseOptions, protected props: {
    name: string;
    type: Parsed;
  }[]) {
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

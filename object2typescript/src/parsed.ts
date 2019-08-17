import { quote } from 'misc-utils-of-mine-generic'
import { Parsed, ParseOptions } from './types'

export abstract class AbstractParsed implements Parsed {
  constructor(protected options: ParseOptions) { }
  public tabLevel = 0;
  render(): string { throw 'abstract' }
  resolvePropertyName(s: string) {
    return s.match(/^\d/) || s.match(/[^a-zA-Z_0-9]/) || this.options.quotePropertyNames ? quote(s) : s
  }
}

export class ParsedTextual extends AbstractParsed {
  constructor(protected options: ParseOptions, protected text: string) {
    super(options)
  }
  render() { return this.text }
}

export class ParsedArray extends AbstractParsed {
  constructor(protected options: ParseOptions, protected el: Parsed) {
    super(options)
  }
  render() {
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
  render() {
    if (this.options.objectRenderPolicy && this.options.objectRenderPolicy !== 'literalObject') {
      throw `this.options.objectRenderPolicy!=='literalObject'`
    }
    return `{
${    this.props
        .map(p => `${this.resolvePropertyName(p.name)}${this.options.optionalProperties ? '?' : ''}: ${p.type.render()}`
        )
        .join(`\n`)}
}`
  }
}

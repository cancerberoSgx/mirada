import { JSONValue } from './json';
import {  isArray, quote} from 'misc-utils-of-mine-generic'
import {format, FormatOptions, tsMorph} from 'ts-simple-ast-extra'

export function json2typescript(o: ParseOptions) {
  if (o.arrayPolicy && o.arrayPolicy !== 'first') {
    throw `o.arrayPolicy !== 'first' TODO`
  }
  if(o.objectRenderPolicy && o.objectRenderPolicy!=='literalObject'){
    throw 'o.objectRenderPolicy!==\'literalObject\' TODO'
  }
  if(o.jsdoc){
    throw 'jsdoc TODO'
  }
  if(o.semicolons){
    throw 'semicolons TODO'
  }
  o.tab=o.tab||'  '
  o.semicolons = typeof o.semicolons==='undefined' ? '':o.semicolons
  var parsed = _parse(o)
  var s = `
export ${parsed instanceof ParsedObject ? 'interface ' : 'type = '} ${o.nodeName} ${parsed.render()}
  `
  var output = formatCode(s, o.codeFormatOptions)
  return output
}

interface Parsed {
  render( tabLevel?:number): string 
}
abstract class AbstractParsed implements Parsed {
  constructor( protected options:_ParseOptions){}
  public tabLevel=0
  render( tabLevel:number=0): string { throw 'abstract' }
  resolvePropertyName(s:string){
      return s.match(/^\d/)||s.match(/[^a-zA-Z_0-9]/)||this.options.quotePropertyNames ? quote(s):s
  }
}
class Textual extends AbstractParsed {
  constructor ( protected options:_ParseOptions, protected text:string){
    super(options)
  }
  render() { return this.text }
}
class ParsedArray extends AbstractParsed {
constructor( protected options:_ParseOptions, protected el:Parsed) {
  super(options)
}
render( tabLevel:number=0){
  return this.el.render()+'[]'
}
}
class ParsedObject extends AbstractParsed {
  constructor( protected options:_ParseOptions, protected props:{name:string,type:Parsed}[],) {
    super(options)
  }
  render( tabLevel:number=0){
    if(this.options.objectRenderPolicy && this.options.objectRenderPolicy!=='literalObject'){
      throw `this.options.objectRenderPolicy!=='literalObject'`
    }
    return `{
${this.options.tab}${this.props.map(p=>{
  return `${this.resolvePropertyName(p.name)}${this.options.optionalProperties?'?':''}: ${p.type.render(this.tabLevel+1)}`
}).join(`\n`)}
}`
  }
  }
function _parse(o: _ParseOptions): Parsed {
  if (isArray(o.node)) {
    
    const el= o.node.length ? _parse({ ...o, node: o.node[0] }) : new Textual(o, 'any')
    return new ParsedArray(o, el)
  }
  else if (typeof o.node === 'object') {
    var props = Object.keys(o.node).map(name=>({
      name, 
      type: _parse({...o, node:o.node[name]})
    }))
    return new ParsedObject( o, props)
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

interface ParseOptions {
  node: JSONValue
  nodeName:string
  /** 
   * first: only the first element will be examined and the output type will be T[] where T describe the first element
   * 
   * merge: similar to first, but all elements of the array are examined and their types will be merged according to these rules: 
   *   1) if incompatible types are found [1, {a:2}] then union types are generated (number|{a:number})
   *   2) for object elements, their properties will be merged recursively: [{a:{b:'s'}}, {x:1,a:{c:new Date()}}] will generate {a:{b:string,c:Date},x:number}[]
   * 
   * each: will generate a the exact tuple: [1, {a:2}] generates [number, {a:number}]
  */
  arrayPolicy?: 'each' | 'first' | 'merge'

  objectRenderPolicy?: 'interface'|'declareClass'|'literalObject'

  export?: boolean
  optionalProperties?: boolean
  tab?:string
  semicolons?:string
  jsdoc?:(parsed:Parsed, options:ParseOptions)=>string
  quotePropertyNames?: boolean
  codeFormatOptions?: Partial<FormatOptions>
}

interface _ParseOptions extends ParseOptions {

}

function formatCode(code:string, formatOptions: Partial<FormatOptions>){
  const project = new tsMorph.Project()
  const file = project.createSourceFile('f1.ts', code)
  const output = format({ file, project, ...formatOptions })
  return output.getFullText()
}
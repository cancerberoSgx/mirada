import { FormatOptions } from 'ts-simple-ast-extra'
import { JSONValue } from './json'

export interface ParseOptions extends CommonOptions {
  /**
   * The JavaScript object we want to parse. If it contains properties invalid in JSON , like functions they will be ignored.
   */
  node: JSONValue

  /**
   * implement this to add jsdoc comment on types and members
   */
  jsdoc?(parsed: Parsed, options: ParseOptions): string

  /**
   * Lots of rules to format the output code,: indentation, semicolons, quotes, custom spacing, etc
   */
  codeFormatOptions?: Partial<FormatOptions>

}
interface CommonOptions {

  /**
   * Name for the root type.
   */
  nodeName?: string

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

  /**
   * interface: will generate an interface for each object using the property name for the interface name
   *
   * declareClass is similar to interface but will generate `declare class Foo { bar: Bar }`
   */
  objectRenderPolicy?: 'interface' | 'declareClass' | 'literalObject'

  /**
   * Export all generated types
   */
  export?: boolean

  /**
   * if true all properties will be marked as optional no matter if they are found on all instances of an array for example.
   */
  optionalProperties?: boolean

  /**
   * Force all member names to be quoted. i.e : interface I { 'foo': Foo } no matter if they don't need to.
   */
  quotePropertyNames?: boolean

  /** 
   * Default is 'warning'
   */
  onTypeScriptErrorPolicy?: 'dontCheck' | 'warning' | 'error'
}

export interface CliOptions extends CommonOptions {
  /**
   * path to a valid formatCodeSettings.json that defines some FormatOptions properties
   */
  codeFormatOptions?: string

  /**
   * if given it will try to read input JSON from that path. If no file exists then it tries to load as a URL. 
   * 
   * If not given it will read JSON string form stdin
   */
  input?: string

  help?: boolean

  debug?: boolean

  /**
   * if given output typescript code will be written in that path, if not it will be on stdout
   */
  output?: string
}

export interface Parsed {
  render(): string;
}

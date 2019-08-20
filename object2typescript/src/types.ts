import { FormatOptions } from 'ts-simple-ast-extra'
import { JSONValue } from './json'
import { ParsedProperty, ParsedArray } from './parsed';

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

export interface Type {parsed:Parsed,name:string}

export type TypePredicate = (t:Type)=>boolean

export type PropertyPredicate = (p:ParsedProperty)=>boolean
export type ArrayTypePolicy = 'literal' | 'first' | 'uniform' | 'bigger' 
export type ObjectTypePolicy = 'interface' | 'declareClass' |  'typeAlias' | 'literal'
export type PolicySelector<T> = (a:T)=>T|undefined
export type  OptionalPropertyPolicy= 'all'|'none'|'infer' 
export type ExportPolicy = 'always'|'never'


interface CommonOptions {
  /**
   * Name for the root type.
   */
  nodeName?: string

  /**
   * In  case the array is empty the type will be any[]. Policies: 
   *    
   *  * uniform: Use it when you know all elements should be of the same type. The tool will do its best to
   *    represent that scenario and if elements are incompatible represent thm as one union type.
   *  * literalTuple: will generate a the exact tuple: [1, {a:2}] generates [number, {a:number}]
   *  * first: the type will be T[] where T is the first element type (the other elements are not considered.)
   *  * bigger:similar to first but the bigger element is choose (compare JSON strings length)
  */
  arrayType?: ArrayTypePolicy| PolicySelector <ArrayTypePolicy>

  /**
   *  * interface: will generate an interface for each object using the property name for the interface name
   *
   *  * declareClass is similar to interface but will generate `declare class Foo { bar: Bar }`
   * 
   *  * typeAlias: similar as interface byt declaring a type alias
   * 
   *  * literalObject* no new names are created and properties are represented literally
   */
  objectType?: ObjectTypePolicy | PolicySelector <ObjectTypePolicy>

  /**
   * Export all names generated.
   */
  export?: ExportPolicy|  PolicySelector<ExportPolicy>

  /**
   * if true all properties will be marked as optional no matter if they are found on all instances of an array for example.
   */
  optionalProperties?: PolicySelector<OptionalPropertyPolicy>   

/**
 * Define how are defined the types for object properties:
 * * Create a common type that is the union of all properties (anywhere) that have the same name. The type name will be similar to the property's
 * * nameCompatible: similar to nameAlways but only associate properties together if they are compatible
 * * never associate properties together in the same type - a unique type wil be create for them (almost the same as using objectType=literal && arrayType==literal)
 */
  propertyType?: 'nameAlways'|'nameCompatible'|'never'

  /**
   * Force all member names to be quoted. i.e : interface I { 'foo': Foo } no matter if they don't need to.
   */
  propertyNames?: ('quoteAlways'|'failOnInvalidId'|'prefix')[]

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

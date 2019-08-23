import { JSONValue } from 'misc-utils-of-mine-generic'


export interface ParseOptions {
  node: JSONValue
  nodeName: string
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

  objectRenderPolicy?: 'interface' | 'declareClass' | 'literalObject'

  export?: boolean
  optionalProperties?: boolean
  tab?: string
  semicolons?: string
  jsdoc?: (parsed: Parsed, options: ParseOptions) => string
}

export interface Parsed {
  render(tabLevel?: number): string
}

export interface ParsedDef {
  name: string;
  kind: "class" | 'struct' | 'union';
  extends: ParsedRef;
  public: boolean;
  data: ParsedDefData[];
}

interface ParsedRef {
  name: string;
  ref: string;
}

interface ParsedDefData {
  id: string;
  language: string
  kind: string;
  prot: "public" | 'protected' | 'private';
  'xmlns:xsi': string;
}

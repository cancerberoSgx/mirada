import { JSONValue } from './json';
import { isArray } from 'util';

export function parse(o: ParseOptions) {

}
function _parse(o: _ParseOptions) {
if(isArray(o.node)){

}else if (typeof o.node ==='object'){

}else {
  let type = 'undefined'
  if (typeof o.node === 'string') {
    type = 'string';
  }
  else if (typeof o.node === 'number') {
    type = 'number';
  }
  else if (typeof o.node === 'boolean') {
    type = 'boolean';
  }
}
}
interface ParseOptions {
  node: JSONValue
  rootName?: string
  /** 
   * first: only the first element will be examined and the output type will be T[] where T describe the first element
   * 
   * merge: similar to first, but all elements of the array are examined and their types will be merged according to these rules: 
   *   1) if incompatible types are found [1, {a:2}] then union types are generated (number|{a:number})
   *   2) for object elements, their properties will be merged recursively: [{a:{b:'s'}}, {x:1,a:{c:new Date()}}] will generate {a:{b:string,c:Date},x:number}[]
   * 
   * each: will generate a the exact tuple: [1, {a:2}] generates [number, {a:number}]
  */
  arrayPolicy?:'each'|'first'|'merge'
}

interface _ParseOptions extends ParseOptions {

}
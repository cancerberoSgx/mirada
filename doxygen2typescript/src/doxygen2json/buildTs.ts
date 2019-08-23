import {CompoundDef, Method, Param} from './types'
import {toMarkdown} from './toMarkdown'
import { unique } from 'misc-utils-of-mine-generic';
import { Q } from '../dom/domUtil';

interface BuildDtsOptions {
  defs : CompoundDef[]
}
interface Result {
  files: {def: CompoundDef, dts: string, fileName: string}
}
export function buildDts(options: BuildDtsOptions) {
return {
  files: options.defs.map(buildDefDts)
}
}
function buildDefDts(def: CompoundDef): string {
  if(def.kind!=='class'){
    throw new Error('CompoundDef kind '+def.kind+' not supported')
  }
  const className= getClassName(def)
  return `/**
${toJsDoc(def.detaileddescriptionNode)}
*/
declare class ${className} {
${def.publicFuncs.filter(validMethod).map(f=>{
  const name = f.name===className ? 'constructor' : f.name
  const returnDesc = Q('[kind="return"]', f.detaileddescriptionNode).map(node=>`${toMarkdown({node})}`).join('').trim()
  return `
/**
${toMarkdown({node: f.detaileddescriptionNode})}
${f.params.map(p=>`@param ${p.name} ${p.description||''}`).join('\n')}
${returnDesc ? `@return ${returnDesc}`: ''}
 */
${f.prot==='package'?'':f.prot} ${name} (${f.params.filter(validParam).map(renderParam).join(', ')})${name==='constructor' ? '' : `: ${f.type && f.type.name||'any'}`}`
}).join('\n\n')}
}
  `.trim()
}

function toJsDoc(node:Node, asterix=false){
  return asterix ? `${toMarkdown({node}).trim().split('\n').join('\n * ')}`: `${toMarkdown({node}).trim()}`
}
function getClassName(def: CompoundDef) {
  return normalizeId(def.compoundname.split('::').pop());
}

function normalizeId(s:string){
  return s.replace(/[^a-z0-9_]/gi, '_')
}

function renderParam(p: Param): string {
  return `${p.name}: ${p.type&&p.type.name||'any'}`;
}

function validParam(m:Param) {
  return true//m.declname||m.defname
}

function validMethod(m:Method) {
  return m.name && !m.name.startsWith( '~') && !m.name.match(/^operator[^a-z0-9A-Z_]/)
}
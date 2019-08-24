import { CompoundDef, Member } from '../doxygenTypes'
import { getCompoundDefName, isValidId, renderParam } from './general'
import { toJsDoc } from "./jsdoc"
import { Options } from './main'
import { renderType } from './ref'
import { renderOpenCvEnums } from './enums';



export function renderGroup(def: CompoundDef, options: Options): string {
  return `
${renderGroupHeader(def)}
${def.functions.map(f => renderFunction(f, def, options)).join('\n\n')}

${renderOpenCvEnums(def, options)}

`.trim();
}
// ${def.publicTypes.map(f => renderp(f, def, options)).join('\n\n')}


export function renderFunction(f: Member, def: CompoundDef, options: Options) {
  if (!isValidId(f.name)) {
    return ''
  }
  const className = getCompoundDefName(def)
  const name = f.name === className ? 'constructor' : f.name
  return `
/**
${toJsDoc({ ...options, node: f, wrap: false })}
${f.params.map(p => `@param ${p.name} ${p.description || ''}`).join('\n')}
*/
export declare function ${name} (${f.params.map(p => renderParam(p, options)).join(', ')})${name === 'constructor' ? '' : `: ${renderType(f.type, options)}`}`
}

export function renderGroupHeader(def: CompoundDef) {
  return `
/*
 * # ${def.compoundname}
 *
 * TODO  
 */
`.trim()
}

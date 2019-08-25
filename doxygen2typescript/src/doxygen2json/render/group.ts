import { CompoundDef, Member } from '../doxygenTypes'
import { getCompoundDefName, isValidId, renderParam, renderType } from './general'
import { toJsDoc, jsdocFunction } from "./jsdoc"
import { Options } from './main'
import { renderOpenCvEnums } from './enums';
import { toMarkdown } from '../toMarkdown';

export function renderGroup(def: CompoundDef, options: Options): string {
  return `
${renderGroupHeader(def, options)}
${def.functions.map(f => renderFunction(f, def, options)).join('\n\n')}

${renderOpenCvEnums(def, options)}
`.trim();
}

export function renderFunction(f: Member, def: CompoundDef, options: Options) {
  if (!isValidId(f.name)) {
    return ''
  }
  const className = getCompoundDefName(def)
  const name = f.name === className ? 'constructor' : f.name
  return `
${jsdocFunction(options, f)}
export declare function ${name} (${f.params.map(p => renderParam(p, options)).join(', ')})${name === 'constructor' ? '' : `: ${renderType(f.type, options)}`}
`.trim()
}

export function renderGroupHeader(def: CompoundDef,  options: Options) {
  return `
/*
 * # ${def.title}
 *
 * ${ toMarkdown({ ...options, node: def.detaileddescriptionNode }).split('\n').join('\n * ')}
 */
`.trim()
}

import { CompoundDef, Member } from '../doxygenTypes'
import { getCompoundDefName, isValidId, renderParam } from './general'
import { toJsDoc } from "./jsdoc";
import { Options } from './main'
import { renderEnum } from "./enums";
import { renderType } from "./ref"

// CLASS
export function renderCompoundClass(def: CompoundDef, options: Options) {
  const className = getCompoundDefName(def)
  return `
${toJsDoc({ node: def })}
export declare class ${className} {
${options.isOpenCv ? '' : def.publicTypes.filter(t => t.kind === 'enum').map(f => renderEnum(f, def, options)).join('\n\n')}
${def.publicAttribs.filter(validAttr).map(f => renderAttr(f, def, options)).join('\n\n')}
${def.publicFuncs.filter(validMethod).map(f => renderMethod(f, def, options)).join('\n\n')}
}`.trim()
}

function renderMethod(f: Member, def: CompoundDef, options: Options) {
  const className = getCompoundDefName(def)
  const name = f.name === className ? 'constructor' : f.name
  return `
/**
${toJsDoc({ ...options, node: f, wrap: false })}
${f.params.map(p => `@param ${p.name} ${p.description || ''}`).join('\n')}
*/
${f.prot === 'package' ? 'private' : f.prot} ${f.static === 'yes' ? 'static' : ''} ${name} (${f.params.map(p => renderParam(p, options)).join(', ')})${name === 'constructor' ? '' : `: ${renderType(f.type, options)}`}`
}

function renderAttr(f: Member, def: CompoundDef, options: Options) {
  if (f.kind !== 'variable') {
    options.debug && console.log('Warning, buildTs renderAttr kind not "variable" but ' + f.kind)
  }
  const className = getCompoundDefName(def)
  const name = f.name === className ? 'constructor' : f.name
  return `
${toJsDoc({ ...options, node: f })}
${f.prot === 'package' ? 'private' : f.prot} ${f.static === 'yes' ? 'static' : ''} ${name} : ${renderType(f.type, options)}`
}

function validAttr(m: Member) {
  return m.name && isValidId(m.name)
}

function validMethod(m: Member) {
  return m.name && isValidId(m.name) && !m.name.startsWith('~') && !m.name.match(/^operator[^a-z0-9A-Z_]/)
}

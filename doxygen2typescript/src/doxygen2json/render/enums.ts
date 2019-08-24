import { notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { CompoundDef, PublicType } from '../doxygenTypes'
import { getCompoundDefName, isValidId } from './general'
import { toJsDoc } from "./jsdoc"
import { Options } from './main'

export function renderOpenCvEnums(def: CompoundDef, options: Options) {
  if (!options.isOpenCv) {
    return ''
  }
  const enums = (def.publicTypes || []).filter(t => t.kind === 'enum')
  const names = enums.map(e => e.name).filter(notSameNotFalsy)
  return `
${enums.map(t => renderEnum(t, def, options)).join('\n\n')}
${names
      .map(name => ({ name, node: enums.find(e2 => e2.name === e2.name) }))
      .filter(e => isValidId(e.name))
      .map(({ name, node }) => `
${toJsDoc({ ...options, node })}
export type ${name} = any
`).join('\n\n')}
`
}

export function renderEnum(f: PublicType, def: CompoundDef, options: Options) {
  return (f.enumValues || []).filter(e => isValidId(e.name)).map(v => {
    if (options.isOpenCv) {
      const className = getCompoundDefName(def)
      return `
${toJsDoc({ ...options, node: v })}
export declare const ${className}_${v.name} : ${(f.name && !f.name.startsWith('@')) ? f.name : 'any'} // initializer: ${v.initializer}
`
    }
    else {
      return `
${toJsDoc({ ...options, node: v })}
${'public'} ${'static'} ${v.name}: ${(f.name && !f.name.startsWith('@')) ? f.name : 'any'} // initializer: ${v.initializer}
`
    }
  }).join('\n\n')
}

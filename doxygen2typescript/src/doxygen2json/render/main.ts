import { notUndefined } from 'misc-utils-of-mine-generic'
import { Doxygen2tsOptionsBase } from '../doxygen2ts'
import { CompoundDef, PublicType } from '../doxygenTypes'
import { renderCompoundClass } from './class'
import { formatCode } from './formatCode'
import { getCompoundDefName, toJsDoc } from './general'
import { renderFunction, renderGroupHeader } from './group'

export interface Options extends Doxygen2tsOptionsBase {
  defs: CompoundDef[]
}

interface Result {
  results: { def: CompoundDef, content: string }[]
}

export function buildDts(options: Options): Result {
  return {
    results: options.defs.map(def => buildDefDts(def, options)).filter(notUndefined).map(s => ({ ...s, content: formatCode(s.file, options) }))
  }
}

function buildDefDts(def: CompoundDef, options: Options) {
  if (!['class', 'struct', 'group', 'function', 'enumvalue'].includes(def.kind)) {
    console.error('CompoundDef kind ' + def.kind + ' not supported')
    return undefined
  }
  let file = ''
  if (['class', 'struct'].includes(def.kind)) {
    file = `
${renderCompoundClass(def, options)}

${!options.isOpenCv ? '' : (def.publicTypes || []).filter(t => t.kind === 'enum').map(t => renderEnum(t, def, options)).join('\n\n')}

${!options.debug ? '' : `/* debug
${JSON.stringify({ publicTypes: (def.publicTypes || []).map(d => d.kind).join(', ') }, null, 2)}
*/`}
`
  }
  else if (['group'].includes(def.kind)) {
    file = `
${renderGroupHeader(def)}
${def.functions.map(f => renderFunction(f, def, options)).join('\n\n')}
`.trim()
  }
  else {
    file = `/* ${def.kind} */`
  }
  return { file, def }
}

export function renderEnum(f: PublicType, def: CompoundDef, options: Options) {
  return (f.enumValues || []).map(v => {
    if (options.isOpenCv) {
      const className = getCompoundDefName(def)
      return `
${toJsDoc({ ...options, node: v })}
declare const ${className}_${v.name} : any; // initializer: ${v.initializer}
`
    }
    else {
      return `
${toJsDoc({ ...options, node: v })}
${'public'} ${'static'} ${v.name}: any; // initializer: ${v.initializer}
`
    }
  }).join('\n\n')
}







import { notUndefined, notFalsy } from 'misc-utils-of-mine-generic'
import { Doxygen2tsOptionsBase } from '../doxygen2ts'
import { CompoundDef } from '../doxygenTypes'
import { renderCompoundClass } from './class'
import { formatCode } from './formatCode'
import { renderFunction, renderGroupHeader } from './group'
import { renderOpenCvEnums } from './enums';

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

${renderOpenCvEnums(def, options)}

${!options.debug ? '' : `/* debug */`}
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



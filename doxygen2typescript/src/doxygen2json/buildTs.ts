import { notUndefined } from 'misc-utils-of-mine-generic'
import { formatString } from 'ts-simple-ast-extra'
import { Doxygen2tsOptionsBase, TsCodeFormatSettings } from './doxygen2ts'
import { CompoundDef, Described, Member, Method, Param, PublicType } from './doxygenTypes'
import { toMarkdown } from './toMarkdown'

interface Options extends Doxygen2tsOptionsBase {
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
  if (!['class', 'struct', 'group'].includes(def.kind)) {
    console.error('CompoundDef kind ' + def.kind + ' not supported')
    // throw new Error('CompoundDef kind ' + def.kind + ' not supported')
    return undefined
  }
  let file = ''
  if (['class', 'struct'].includes(def.kind)) {
    file = `
${renderCompoundClass(def, options)}

${!options.isOpenCv ? '' : (def.publicTypes || []).filter(t => t.kind === 'enum').map(t => renderEnum(t, def, options)).join('\n\n')}

${!options.debug ? '' : `/* debug
${JSON.stringify(
      { publicTypes: (def.publicTypes || []).map(d => d.kind).join(', ') },
      null, 2)
        }
*/`}
`
  }
  else if (['group'].includes(def.kind)) {
    file = ``
  }
  return { file, def }
}

function renderCompoundClass(def: CompoundDef, options: Options) {
  const className = getClassName(def)
  return `
${toJsDoc({ node: def })}
declare class ${className} {
${options.isOpenCv ? '' : def.publicTypes.filter(t => t.kind === 'enum').map(f => renderEnum(f, def, options)).join('\n\n')}
${def.publicAttribs.filter(validAttr).map(f => renderAttr(f, def, options)).join('\n\n')}
${def.publicFuncs.filter(validMethod).map(f => renderMethod(f, def, options)).join('\n\n')}
}`.trim()
}

function renderMethod(f: Method, def: CompoundDef, options: Options) {
  const className = getClassName(def)
  const name = f.name === className ? 'constructor' : f.name
  // const returnDesc = Q('[kind="return"]', f.).map(node => `${toMarkdown({ node })}`).join('').trim();
  // ${returnDesc ? `@return ${returnDesc}` : ''}
  return `
/**
${toJsDoc({ ...options, node: f, wrap: false })}
${f.params.map(p => `@param ${p.name} ${p.description || ''}`).join('\n')}
 */
${f.prot === 'package' ? 'private' : f.prot} ${f.static === 'yes' ? 'static' : ''} ${name} (${f.params.filter(validParam).map(renderParam).join(', ')})${name === 'constructor' ? '' : `: ${f.type && f.type.name || 'any'}`}`
}

function renderAttr(f: Member, def: CompoundDef, options: Options) {
  if (f.kind !== 'variable') {
    options.debug && console.log('Warning, buildTs renderAttr kind not "variable" but ' + f.kind)
  }
  const className = getClassName(def)
  const name = f.name === className ? 'constructor' : f.name
  return `
${toJsDoc({ ...options, node: f })}
${f.prot === 'package' ? 'private' : f.prot} ${f.static === 'yes' ? 'static' : ''} ${name} : ${f.type && f.type.name || 'any'}`
}

function renderEnum(f: PublicType, def: CompoundDef, options: Options) {
  return (f.enumValues || []).map(v => {
    if (options.isOpenCv) {
      const className = getClassName(def)
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

type ToJsDocOptions = Doxygen2tsOptionsBase & { node: Described, asterix?: boolean, wrap?: boolean }
function toJsDoc(o: ToJsDocOptions) {
  o.asterix = typeof o.asterix === 'undefined' ? false : o.asterix
  o.wrap = typeof o.wrap === 'undefined' ? true : o.wrap
  o.renderLocation = typeof o.renderLocation === 'undefined' ? true : o.renderLocation
  var node = o.node.detaileddescriptionNode
  var body = o.asterix ? `${toMarkdown({ ...o, node }).trim().split('\n').join('\n * ')}` : `${toMarkdown({ ...o, node })}`
  body = body.trim() + '\n\n' + renderLocation(o) + '\n'
  return `${o.wrap ? '/**\n' : ''}${body}${o.wrap ? '\n*/' : ''}`
}

function renderLocation(o: ToJsDocOptions) {
  return (!o.renderLocation || !o.node.location) ? '' : `Source: [${o.node.location.file}](${o.locationFilePrefix || 'https://github.com/opencv/opencv/tree/master/modules/core/include/'}${o.node.location.file}#L${o.node.location.line}).`
}

function getClassName(def: CompoundDef) {
  return normalizeId(def.compoundname.split('::').pop())
}

function normalizeId(s: string) {
  return s.replace(/[^a-z0-9_]/gi, '_')
}

function renderParam(p: Param): string {
  return `${p.name}: ${p.type && p.type.name || 'any'}`
}

function validParam(m: Param) {
  return true
}

function validAttr(m: Member) {
  return true
}


function validMethod(m: Method) {
  return m.name && !m.name.startsWith('~') && !m.name.match(/^operator[^a-z0-9A-Z_]/)
}

const defaultFormat: TsCodeFormatSettings = {
  trailingSemicolons: 'always',
  indentSize: 2,
  convertTabsToSpaces: true,
  quotePreference: 'single',
  emptyLinesMax: 1,
  formatJsdocs: true,
  formatJsdocsFormatBefore: true
}

function formatCode(code: string, o: Options) {
  var output = code
  try {
    output = formatString({ ...defaultFormat, ...o.tsCodeFormatSettings || {}, code })
  } catch (error) {
    o.debug && console.log('Warning: failed to format code. Reason', error)
  }
  return output
}

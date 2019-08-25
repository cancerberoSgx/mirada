import { Doxygen2tsOptionsBase } from '../doxygen2ts'
import { Described, Member } from '../doxygenTypes'
import { toMarkdown } from '../toMarkdown'
import { Options } from './main';

interface ToJsDocOptions extends Doxygen2tsOptionsBase {
  node: Described;
  asterix?: boolean;
  wrap?: boolean;
}

export function toJsDoc(o: ToJsDocOptions) {
  o.asterix = typeof o.asterix === 'undefined' ? false : o.asterix
  o.wrap = typeof o.wrap === 'undefined' ? true : o.wrap
  o.renderLocation = typeof o.renderLocation === 'undefined' ? true : o.renderLocation
  var node = o.node.detaileddescriptionNode
  var body = o.asterix ? `${toMarkdown({ ...o, node }).trim().split('\n').join('\n * ')}` : `${toMarkdown({ ...o, node })}`.trim()
  if(!body){
    return ''
  }
  body = body.trim().replace(/\\/g, '\\\\').replace(/\*\//g, '*\\/') + '\n\n' + renderLocation(o) + '\n'
  return `${o.wrap ? '/**\n' : ''}${body}${o.wrap ? '\n*/' : ''}`
}

function renderLocation(o: ToJsDocOptions) {
  return (!o.renderLocation || !o.node.location) ? '' : `Source: [${o.node.location.file}](${o.locationFilePrefix || 'https://github.com/opencv/opencv/tree/master/modules/core/include/'}${o.node.location.file}#L${o.node.location.line}).`
}

export function jsdocFunction(options: Options, f: Member) {
  let s =  `${toJsDoc({ ...options, node: f, wrap: false })}${jsdocParams(f)}`.trim()
return !s?'':`
/**
${s}
*/
`.trim()
}

function jsdocParams(f: Member) {
  return f.params.filter(p=>p.description).map(p => `\n\n@param ${p.name} ${p.description || ''}`).join('');
}

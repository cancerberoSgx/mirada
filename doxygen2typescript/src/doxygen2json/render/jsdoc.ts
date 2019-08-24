import { Doxygen2tsOptionsBase } from '../doxygen2ts'
import { Described } from '../doxygenTypes'
import { toMarkdown } from '../toMarkdown'

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
  var body = o.asterix ? `${toMarkdown({ ...o, node }).trim().split('\n').join('\n * ')}` : `${toMarkdown({ ...o, node })}`
  body = body.trim().replace(/\\/g, '\\\\').replace(/\*\//g, '*\\/') + '\n\n' + renderLocation(o) + '\n'
  return `${o.wrap ? '/**\n' : ''}${body}${o.wrap ? '\n*/' : ''}`
}

function renderLocation(o: ToJsDocOptions) {
  return (!o.renderLocation || !o.node.location) ? '' : `Source: [${o.node.location.file}](${o.locationFilePrefix || 'https://github.com/opencv/opencv/tree/master/modules/core/include/'}${o.node.location.file}#L${o.node.location.line}).`
}

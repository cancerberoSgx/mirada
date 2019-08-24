import { checkThrow } from 'misc-utils-of-mine-generic'
import { Doxygen2tsOptionsBase } from './doxygen2ts'
import { renderRef } from "./render/ref"

interface Options extends Doxygen2tsOptionsBase {
  node: Node
}

function renderChildren(el: Element, options: Options, join = '') {
  return Array.from(el.childNodes).map(c => toMarkdown({ ...options, node: c })).join(join)
}

export function toMarkdown(options: Options): string {
  const node = options.node
  checkThrow(node && (node.nodeType === node.ELEMENT_NODE || node.nodeType === node.TEXT_NODE), 'node type invalid for ' + node.nodeName)
  if (node.nodeType === node.TEXT_NODE) {
    return node.textContent
  }
  const el = node as Element
  if (el.tagName === 'emphasis') {
    return `*${renderChildren(el, options)}*`
  }
  else if (['simplesect', 'codeline', 'highlight', 'detaileddescription'].includes(el.tagName)) {
    return `${renderChildren(el, options)}`
  }
  else if (['sp'].includes(el.tagName)) {
    return ` `
  }
  else if (el.tagName === 'bold') {
    return `**${renderChildren(el, options)}**`
  }
  else if (['parametername', 'computeroutput', 'formula'].includes(el.tagName)) {
    return `\`${renderChildren(el, options)}\``
  }
  else if (['programlisting'].includes(el.tagName)) {
    return `\n\n\`\`\`cpp\n${renderChildren(el, options)}\`\`\`\n\n`
  }
  else if (['anchor'].includes(el.tagName)) {
    return `<a name="${el.id}"></a>`
  }
  else if (['ref'].includes(el.tagName)) {
    return renderRef({ ...options, text: renderChildren(el, options), refid: `#${el.getAttribute('refid')}` })
  }
  else if (['itemizedlist', 'orderedlist'].includes(el.tagName)) {
    return `\n\n${renderChildren(el, options)}`
  }
  else if (['listitem'].includes(el.tagName)) {
    return `\n * ${renderChildren(el, options)}`
  }
  else if (['heading'].includes(el.tagName)) {
    return `\n\n## ${renderChildren(el, options)}`
  }
  else if (['para'].includes(el.tagName)) {
    return [el.parentElement, el.parentElement.parentElement].map(e => e.tagName).includes('listitem') ? `${renderChildren(el, options)}` : `\n\n${renderChildren(el, options)}`
  }
  else if (['parameterlist'].includes(el.tagName)) {
    return `` // ignore since we have parsed this data and others are responsible of render it
  }
  else {
    // console.assert(false, el.tagName + ' not supported.')
    return ''
  }
}


function getRef(el: Element, options: Options) {
  return `#${el.getAttribute('refid')}`
}

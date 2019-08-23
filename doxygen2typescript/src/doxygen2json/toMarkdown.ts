import { checkThrow } from 'misc-utils-of-mine-generic'


interface Options {
  node: Node
  refType?: 'typedoc' | 'mdRefLink'
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
    return options.refType === 'typedoc' ? `[${renderChildren(el, options)}]` : `[${renderChildren(el, options)}](${getRef(el, options)}})`
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
    console.assert(false, el.tagName + ' not supported.')
    return ''
    // return `\`<TODO_${el.tagName}>\` ${renderChildren(el, options)} \`</TODO_${el.tagName}>\``
  }

}

function getRef(el: Element, options: Options) {
  return `#${el.getAttribute('refid')}`
}

        // opening the element
        // switch (el.tagName) {
          // case 'ref': return s + markdown.link(toMarkdown(element.$$), '#' + element.$.refid, true);            
          // case '__text__': s = element._; break;
          // case 'emphasis': s = '*'; break;
          // case 'bold': s = '**'; break;
          // case 'parametername':
          // case 'computeroutput': s = '`'; break;
          // case 'parameterlist': s = '\n#### Parameters\n'; break;
          // case 'parameteritem': s = '* '; break;            
          // case 'programlisting': s = '\n```cpp\n'; break;
          // case 'itemizedlist': s = '\n\n'; break;
          // case 'listitem': s = '* '; break;
          // case 'sp': s = ' '; break;
          // case 'heading': s = '## '; break;
          // case 'xrefsect': s += '\n> '; break;
          // case 'simplesect':
          //   if (node.$.kind == 'attention') {
          //     s = '> ';
          //   }
          //   else if (node.$.kind == 'return') {
          //     s = '\n#### Returns\n'
          //   }
          //   else if (node.$.kind == 'see') {
          //     s = '\n**See also**: '
          //   }
          //   else {
          //     console.assert(node.$.kind + ' not supported.');
          //   }
          //   break;

          // case 'xreftitle':
          // case 'entry':
          // case 'row':
          // case 'ulink':
          // case 'codeline':
          // case 'highlight':
          // case 'table':
          // case 'para':
          // case 'parameterdescription':
          // case 'parameternamelist':
          // case 'xrefdescription':
          // case undefined:
          //   break;

          // default:
          //   console.assert(false, node['#name'] + ': not yet supported.');
        // }

        // recurse on children elements
        // if (node.$$) {
        //   s += toMarkdown(node.$$, context);
        // }

        // // closing the element
        // switch (node['#name']) {
        //   case 'parameterlist':
        //   case 'para': s += '\n\n'; break;
        //   case 'emphasis': s += '*'; break;
        //   case 'bold': s += '**'; break;
        //   case 'parameteritem': s += '\n'; break;
        //   case "computeroutput": s += '`'; break;
        //   case 'parametername': s += '` '; break;
        //   case 'entry': s = markdown.escape.cell(s) + '|'; break;
        //   case 'programlisting': s += '```\n'; break;
        //   case 'codeline': s += '\n'; break;
        //   case 'ulink': s = markdown.link(s, node.$.url); break;
        //   case 'itemizedlist': s += '\n'; break;
        //   case 'listitem': s += '\n'; break;
        //   case 'entry': s = ' | '; break;
        //   case 'xreftitle': s += ': '; break;
        //   case 'row':
        //     s = '\n' + markdown.escape.row(s);
        //     if (node.$$ && node.$$[0].$.thead == "yes") {
        //       node.$$.forEach(function (th, i) {
        //         s += (i ? ' | ' : '\n') + '---------';
        //       });
        //     }
            // break;
  //       }

  //     }
  //     break;

  //   default:
  //     console.assert(false);
  // }

  // return s;

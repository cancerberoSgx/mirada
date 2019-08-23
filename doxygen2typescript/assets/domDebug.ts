// import { removeWhites, shorter } from 'misc-utils-of-mine-generic'
// import { Q } from '../src/dom/domUtil'

// // //TODO
// // function tree(e: Element, parentBox: Element = undefined) {
// //   function f(e: Element, parent: Element) {
// //     var p = append(`<li><label>${print(e)}</label><ul></ul></li>`, parent)
// //     var ul = Q1<Element>('ul', parent)
// //     Q<Element>(e.childNodes).filter(isElement).forEach(c => {
// //       f(c, ul)
// //     })
// //   }
// //   function print(e: Element) {
// //     return e.tagName
// //   }
// //   return f(e, parentBox || append('<ul></ul>')[0])
// // }

// export function dummyTreeView(document: Document) {
//   return `
//  + doxygen
//    + ${Q('doxygen>*').filter((e, i, a) => a.findIndex(n => e.tagName === n.tagName) === i).map(f => f.tagName).join('\n   + ')}
//      + ${Q('doxygen>*>*').filter((e, i, a) => a.findIndex(n => e.tagName === n.tagName) === i).map(f => f.tagName + '. Attrs:' + f.getAttributeNames().join(',')).join('\n     + ')}
//        + ${Q('doxygen>*>*>*').filter((e, i, a) => a.findIndex(n => e.tagName === n.tagName) === i).map(f => f.tagName + '. Attrs:' + f.getAttributeNames().join(',')).join('\n       + ')}
//          + ${Q('doxygen>*>*>*>*').filter((e, i, a) => a.findIndex(n => e.tagName === n.tagName) === i).map(f => f.tagName + '. Attrs:' + f.getAttributeNames().join(',') + '. Text: ' + removeWhites(shorter(f.textContent))).join('\n         + ')}
//            + ${Q('doxygen>*>*>*>*>*').filter((e, i, a) => a.findIndex(n => e.tagName === n.tagName) === i).map(f => f.tagName + '. Attrs:' + f.getAttributeNames().join(',') + '. Text: ' + removeWhites(shorter(f.textContent))).join('\n           + ')}
//              + ${Q('doxygen>*>*>*>*>*>*').filter((e, i, a) => a.findIndex(n => e.tagName === n.tagName) === i).map(f => f.tagName + '. Attrs:' + f.getAttributeNames().join(',') + '. Text: ' + removeWhites(shorter(f.textContent))).join('\n             + ')}
//                + ${Q('doxygen>*>*>*>*>*>*>*').filter((e, i, a) => a.findIndex(n => e.tagName === n.tagName) === i).map(f => f.tagName + '. Attrs:' + f.getAttributeNames().join(',') + '. Text: ' + removeWhites(shorter(f.textContent))).join('\n               + ')}
// `
// }

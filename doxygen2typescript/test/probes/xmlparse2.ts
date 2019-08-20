import { JSDOM, VirtualConsole } from "jsdom"
import { serial, tryTo, asArray, notSame } from 'misc-utils-of-mine-generic';
import { writeFileSync, readFileSync } from 'fs';

const vc = new VirtualConsole();
vc.sendTo(console);

const target = '/Users/sebastiangurin/git/opencv/build/doc/doxygen/xml/d3/d63/classcv_1_1Mat.xml'
const { window } = new JSDOM('', { virtualConsole: vc });
const { DOMParser, Node } = window;
const parser = new DOMParser();
const doc = parser.parseFromString(readFileSync(target).toString(),  "text/xml");
const document = doc.documentElement
function Q<T extends Element = Element>(s:string|Element[]|Element|NodeList):T[] {
  if(typeof s==='string'){
    return Array.from(document.querySelectorAll<T>(s) )
  }
  else if(s instanceof NodeList) {
    return Array.from(s).filter(isElement) as T[]
  }else {
    return asArray(s) as T[]
  }
} 
function isElement(e:any):e is Element {
  return e && (e as Element).nodeType===document.ELEMENT_NODE
}
// const de = Q('doxygen>*').map(f=>f.tagName)
const s = dummyTreeView(doc)
process.stdout.write(s)

// console.log(Q('doxygen').map(f=>f.tagName));
// console.log(Q('doxygen').map(f=>f.tagName).fill(' ').join('') + Q('doxygen>*').map(f=>f.tagName));
// // console.log(Q('doxygen>*>*').map(f=>f.tagName));





function dummyTreeView(document :Document) {
  return `
 + doxygen
   + ${Q('doxygen>*').map(f => f.tagName).filter(notSame).join('\n   + ')}
     + ${Q('doxygen>*>*').map(f => f.tagName + '. Attrs:'+f.getAttributeNames().join(',')).filter(notSame).join('\n     + ')}
       + ${Q('doxygen>*>*>*').map(f => f.tagName + '. Attrs:'+f.getAttributeNames().join(',')).filter(notSame).join('\n       + ')}
         + ${Q('doxygen>*>*>*>*').map(f => f.tagName + '. Attrs:'+f.getAttributeNames().join(',')).filter(notSame).join('\n         + ')}
           + ${Q('doxygen>*>*>*>*>*').map(f => f.tagName + '. Attrs:'+f.getAttributeNames().join(',')).filter(notSame).join('\n           + ')}
             + ${Q('doxygen>*>*>*>*>*>*').map(f => f.tagName + '. Attrs:'+f.getAttributeNames().join(',')).filter(notSame).join('\n             + ')}
               + ${Q('doxygen>*>*>*>*>*>*>*').map(f => f.tagName + '. Attrs:'+f.getAttributeNames().join(',')+'. Text: '+f.textContent).filter(notSame).join('\n               + ')}
`;
}

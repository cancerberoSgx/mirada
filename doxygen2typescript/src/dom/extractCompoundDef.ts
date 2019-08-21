import { createXMLDom, Q, Q1, attrs } from './domUtil';
import { TODO } from 'misc-utils-of-mine-generic';
interface Named {
  name: string, 
}
interface Described extends Named { 
  briefdescription: string; 
  detaileddescription: string; 
  inbodydescription?: string
  location?: Location
  }
export interface CompoundDef extends Described {
  kind: Kind
  prot: Prot
  id: string
  name: string 
  publicTypes: PublicType[]
  version: string
  static: string
  derivedcompoundref: Derivedcompoundref[]
}
interface Derivedcompoundref {
  prot: Prot
  refid: string
  virt: string
  name: string
}
interface Location {
  "file": string
  "line": string
  "column": string
  "bodyfile": string
  "bodystart": string
  "bodyend": string
}
type Kind ='emun'|'class'|'function'
type Prot = 'public'|'protected'|'private'

interface PublicType extends Described {
  enumValues: { initializer: string; } & [];
}
export function extractCompoundDef(xml: string) {
  createXMLDom(xml);
  return Q('compounddef').map(c => ({
...getDescribed(c),
    ...attrs(c, ['kind', 'prot',  'version']),
    derivedcompoundref: Q('derivedcompoundref', c).map(d => ({
      ...attrs(d, ['refid', 'prot', 'virt']),
      name: d.textContent
    })),

    publicTypes: Q('sectiondef[kind="public-type"] memberdef', c).map(s => ({
      ...attrs(s, ['kind', 'prot', 'static', 'mutable']),
...getDescribed(s),
      enumValues: Q('enumvalue', s).map(v => ({
        ...attrs(v, ['prot']),
        ...getDescribed(v),
        initializer: Q1('initializer', v).textContent,
      }))
    })),

inheritancegraph: 'TODO',
collaborationgraph: 'TODO',
 listofallmembers: 'TODO'

  }));
}
function getDescribed(c:Element){
  return {
        name: (Q1('name', c) || Q1('compoundname', c)|| {textContent:c.getAttribute('name')||undefined}) .textContent,
    location: attrs(Q1('location', c, {})),
    briefdescription: Q1('briefdescription', c, {textContent: ''}).textContent.trim(),
    detaileddescription: Q1('detaileddescription', c, {textContent: ''}).textContent.trim(),
    inbodydescription: Q1('inbodydescription', c, {textContent: ''}).textContent.trim(),
  }
}
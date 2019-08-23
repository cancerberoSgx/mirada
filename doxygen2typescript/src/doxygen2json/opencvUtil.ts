import { readFileSync } from 'fs'
import { notSameNotFalsy, notUndefined } from 'misc-utils-of-mine-generic'
import { join } from 'path'
import { Q, Q1 } from '../dom/domUtil'
import { loadXmlDom, getCurrentDom } from '../dom/jsdom'

export interface GetBindingsCppCompoundRefsOptions {
  opencvBuildFolder: string
}

interface RefsResult<T extends Ref> {
  constants: T[]
  classes: T[]
  functions: T[]
}

interface Ref {
  name: string;
  indexMember: Element;
  indexCompound: Element
}

interface RefFile extends Ref {
  filePath: string
}

interface RefMemberdef extends Ref {
  memberdef: Element
}


 function parseBindingsCpp(code: string) {
  const functionsRe = /\s+function\("([^"]+)"/g
  let r: any
  const functions: string[] = []
  while ((r = functionsRe.exec(code))) {
    functions.push(r[1])
  }
  const classRe = /emscripten::class.+\("([^"]+)"\)/g
  const classes: string[] = []
  while ((r = classRe.exec(code))) {
    classes.push(r[1])
  }
  const constantsRe = /\s+constant\("([^"]+)"/g
  const constants: string[] = []
  while ((r = constantsRe.exec(code))) {
    constants.push(r[1])
  }
  return {
    functions: functions.filter(notSameNotFalsy).sort(),
    classes: classes.filter(notSameNotFalsy).sort(),
    constants: constants.filter(notSameNotFalsy).sort()
  }
}

 function getBindingsCppCompoundRefs(o: GetBindingsCppCompoundRefsOptions): RefsResult<Ref> {
  const bindingsPath = join(o.opencvBuildFolder, 'modules/js/bindings.cpp')
  var parsed = parseBindingsCpp(readFileSync(bindingsPath).toString())
  const index = join(o.opencvBuildFolder, 'doc/doxygen/xml/index.xml')
  loadXmlDom(readFileSync(index).toString())
  const fn = (a: string[]) => a.map(c => Q('name').filter(s => s.textContent === c)).flat().filter(notUndefined).map(b => ({
    name: b.textContent,
    indexMember: b.parentElement,
    indexCompound: b.parentElement.parentElement
  })).filter(notUndefined).filter(r => !['namespace', 'file'].includes(r.indexCompound.getAttribute('kind'))).filter(notUndefined)
  return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }
}

// const bigString = repeat(999, ' ')
 function getBindingsCppCompoundFiles(o: GetBindingsCppCompoundRefsOptions): RefsResult<RefFile> {
  var parsed = getBindingsCppCompoundRefs(o)
  const fn = (r: Ref[]) => r.map(ref => ({
    ...ref,
    filePath: join(o.opencvBuildFolder, 'doc/doxygen/xml/', ref.indexCompound.getAttribute('refid') + '.xml')
  }))
    .filter(notUndefined)
    .filter((n, i, a) => i === a.findIndex(a => a.filePath === n.filePath && a.name === n.name))
    .filter(notUndefined)

  return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }
}

export function getBindingsCppMemberdefs(o: GetBindingsCppCompoundRefsOptions): RefsResult<RefMemberdef> {
  const fn = (r: RefFile[]) => r.map(ref => {
     loadXmlDom(readFileSync(ref.filePath).toString());
    // const {document} = getCurrentDom()
    const refIdSelector = `memberdef[id="${ref.indexMember.getAttribute('refid')}"]`
    // const refIdSelector = `#${ref.indexMember.getAttribute('refid')}`
      // Q('compound').forEach(compound => {})
    const memberdef = Q1(refIdSelector);// getMemberdefElement(ref);
    // console.log(refIdSelector, ref.filePath, !!document, Q('memberdef').length,  !!memberdef);    
    return {
      ...ref,
      memberdef
    }
  })
  .filter(r=>!!r.memberdef)
  // deduplicate names by selecting the ones with shorter compound names
  // .filter((n,i,a)=>!!n && !a.find(c=>c!==n && c.name===n.name && (()=>{console.log(text('definition', c.memberdef, bigString),  text('definition', n.memberdef, bigString)); return true})() && text('definition', c.memberdef, bigString).length < text('definition', n.memberdef, bigString).length))
  // .filter((n,i,a)=>i===a.findIndex((a, j)=> a.name===n.name ? text('name', a.compound).length > text('name', n.compound).length ? i : j: i))
  const parsed = getBindingsCppCompoundFiles(o)
  return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }
}
// const files:{[n:string]:Window}  ={}
// function getMemberdefElement(ref: RefFile) {
  // if(!files[ref.filePath]){
    // const {window} = createXMLDom(readFileSync(ref.filePath).toString()); // TODO: cache
    // files[ref.filePath] = window
  // }
  // return  Q1(`memberdef[id="${ref.indexMember.getAttribute('refid')}"]`);

// }
// /Users/sebastiangurin/git/opencv/build_js
// build_js/modules/js/bindings.cpp


import { readFileSync } from 'fs'
import { notSameNotFalsy, notUndefined } from 'misc-utils-of-mine-generic'
import { join } from 'path'
import { Q, Q1, findAncestor } from '../dom/domUtil'
import { loadXmlDom } from '../dom/jsdom'
import { Doxygen2tsOptionsBase } from './doxygen2ts';

export interface GetBindingsCppCompoundRefsOptions extends Doxygen2tsOptionsBase {
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


export function parseBindingsCpp(code: string) {
  const functionsRe = /\s+function\s*\("([^"]+)"/g
  let r: any
  const functions: string[] = []
  while ((r = functionsRe.exec(code))) {
    functions.push(r[1])
  }
  const classRe = /emscripten::class.+\s*\("([^"]+)"\)/g
  const classes: string[] = []
  while ((r = classRe.exec(code))) {
    classes.push(r[1])
  }
  const constantsRe = /\s+constant\s*\("([^"]+)"/g
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

export function getBindingsCppCompoundRefs(o: GetBindingsCppCompoundRefsOptions): RefsResult<Ref> {
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

export function getBindingsCppCompoundFiles(o: GetBindingsCppCompoundRefsOptions): RefsResult<RefFile> {
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
    const refIdSelector = `memberdef[id="${ref.indexMember.getAttribute('refid')}"]`
    let memberdef = Q1(refIdSelector);
    // if(memberdef.tagName!=='memberdef') {
    //   memberdef = findAncestor(memberdef, n=>n.tagName==='memberdef')
    // }
    o.debug && !memberdef && console.log(' * getBindingsCppMemberdefs no memberdef found matching '+refIdSelector+' on file '+ref.filePath)
    return {
      ...ref,
      memberdef
    }
  })
    .filter(r => !!r.memberdef)
    // .filter((r,i,a)=>i===a.findIndex(p=>p.memberdef.getAttribute('id')===r.memberdef.getAttribute('id')))
  const parsed = getBindingsCppCompoundFiles(o)
  return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }
}


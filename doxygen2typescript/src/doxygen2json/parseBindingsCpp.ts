import { readFileSync } from 'fs'
import { notSameNotFalsy, notUndefined } from 'misc-utils-of-mine-generic'
import { join } from 'path'
import { Q, Q1, findAncestor } from '../dom/domUtil'
import { loadXmlDom } from '../dom/jsdom'
import { Doxygen2tsOptionsBase } from './doxygen2ts';

export interface GetBindingsCppCompoundRefsOptions extends Doxygen2tsOptionsBase {
  opencvBuildFolder: string
  opencvDocBuildFolder?: string

}

interface RefsResult<T extends Ref> {
  constants: T[]
  classes: T[]
  functions: T[]
}

interface UnmatchedNames {
  constants: string[]
  classes: string[]
  functions: string[]
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

/**
 * Every name registered in bindings.cpp (class_<T>("X"), function("x", ...), constant("X", ...)) is
 * matched against doxygen's index.xml by exact text equality on a <name> node. A bindings.cpp name that
 * doesn't literally equal a doxygen <name> - e.g. anything doxygen only exposes under its fully qualified
 * form - simply never appears in the matched lists below, with nothing recorded anywhere. That silently
 * shrinks the generated API surface (a real class/function/constant that opencv.js exposes at runtime
 * just never gets a .ts file) with no way to tell it happened short of diffing against bindings.cpp by
 * hand. `unmatched` makes that failure visible instead: it's the same input names, minus whatever made it
 * into the matched lists, so callers (and `debug: true`) can see exactly what got dropped and why.
 */
function withUnmatched<T extends Ref>(parsed: { constants: string[], classes: string[], functions: string[] }, matched: RefsResult<T>, o: GetBindingsCppCompoundRefsOptions): UnmatchedNames {
  const diff = (all: string[], found: T[]) => all.filter(name => !found.some(r => r.name === name))
  const unmatched: UnmatchedNames = {
    constants: diff(parsed.constants, matched.constants),
    classes: diff(parsed.classes, matched.classes),
    functions: diff(parsed.functions, matched.functions),
  }
  if (o.debug) {
    (Object.keys(unmatched) as (keyof UnmatchedNames)[]).forEach(k => {
      if (unmatched[k].length) {
        console.warn(`getBindingsCppCompoundRefs: ${unmatched[k].length} ${k} registered in bindings.cpp have no matching doxygen node and will be silently missing from the generated types: ${unmatched[k].join(', ')}`)
      }
    })
  }
  return unmatched
}

export function getBindingsCppCompoundRefs(o: GetBindingsCppCompoundRefsOptions): RefsResult<Ref> & { unmatched: UnmatchedNames } {
  // const bindingsPath = join(o.opencvBuildFolder, 'modules/js/bindings.cpp')
  const bindingsPath = join(o.opencvBuildFolder, 'modules/js_bindings_generator/gen/bindings.cpp')
  // build_js/modules/js_bindings_generator/gen/bindings.cpp

  var parsed = parseBindingsCpp(readFileSync(bindingsPath).toString())
  const index = join(o.opencvDocBuildFolder||o.opencvBuildFolder, 'doc/doxygen/xml/index.xml')
  loadXmlDom(readFileSync(index).toString())
  const fn = (a: string[]) => a.map(c => Q('name').filter(s => s.textContent === c)).flat().filter(notUndefined).map(b => ({
    name: b.textContent,
    indexMember: b.parentElement,
    indexCompound: b.parentElement.parentElement
  })).filter(notUndefined).filter(r => !['namespace', 'file'].includes(r.indexCompound.getAttribute('kind'))).filter(notUndefined)
  const matched: RefsResult<Ref> = {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
  }
  return { ...matched, unmatched: withUnmatched(parsed, matched, o) }
}

export function getBindingsCppCompoundFiles(o: GetBindingsCppCompoundRefsOptions): RefsResult<RefFile> & { unmatched: UnmatchedNames } {
  var parsed = getBindingsCppCompoundRefs(o)
  const fn = (r: Ref[]) => r.map(ref => ({
    ...ref,
    filePath: join(o.opencvDocBuildFolder||o.opencvBuildFolder, 'doc/doxygen/xml/', ref.indexCompound.getAttribute('refid') + '.xml')
  }))
    .filter(notUndefined)
    .filter((n, i, a) => i === a.findIndex(a => a.filePath === n.filePath && a.name === n.name))
    .filter(notUndefined)
  return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
    unmatched: parsed.unmatched,
  }
}

export function getBindingsCppMemberdefs(o: GetBindingsCppCompoundRefsOptions): RefsResult<RefMemberdef> & { unmatched: UnmatchedNames } {
  const fn = (r: RefFile[]) => r.map(ref => {
    loadXmlDom(readFileSync(ref.filePath).toString());
    const refIdSelector = `memberdef[id="${ref.indexMember.getAttribute('refid')}"]`
    let memberdef = Q1(refIdSelector);
    !memberdef && console.warn(' * getBindingsCppMemberdefs no memberdef found matching '+refIdSelector+' on file '+ref.filePath+' - '+ref.name+' will be silently missing from the generated types')
    return {
      ...ref,
      memberdef
    }
  })
    .filter(r => !!r.memberdef)
  const parsed = getBindingsCppCompoundFiles(o)
  return {
    constants: fn(parsed.constants),
    classes: fn(parsed.classes),
    functions: fn(parsed.functions),
    unmatched: parsed.unmatched,
  }
}


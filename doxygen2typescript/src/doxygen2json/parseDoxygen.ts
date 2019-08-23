import { attrs, Q, Q1, text } from '../dom/domUtil'
import { createXMLDom } from "../dom/jsdom"
import { ParseDoxygenOptions, CompoundDef, Described, Descriptions, Location, DoxBool, DoxProtectionKind, DoxVirtualKind, PublicType, Member, DoxSectionKind, DoxMemberKind, linkedTextType, refTextType, DoxCompoundKind, Param } from './types'
import { unique } from 'misc-utils-of-mine-generic';

export let _currentOptions: ParseDoxygenOptions = { xml: '' }

/**
 * Transform a single doxygen XML source file in a more or less equivalent .json
 * TODO: type return value
 */
export function parseDoxygen(options: ParseDoxygenOptions): CompoundDef[] {
  _currentOptions = options
  createXMLDom(options.xml, options.debug)

  var r =  Q('compounddef').map(c => ({
    ...getDescribed(c),
    ...attrs<{kind:DoxCompoundKind}>(c, ['kind']),
    ...attrs<{static: DoxBool}>(c, ['static']),
    compoundname: text('compoundname', c).trim(),

    derivedcompoundref: Q('derivedcompoundref', c).map(d => ({
      ...attrs<{refid: DoxBool, prot: DoxProtectionKind, virt: DoxVirtualKind}>(d, ['refid', 'prot', 'virt']),
      name: d.textContent
    })),

    publicTypes: getCompoundDefPublicTypes(c),    

    publicAttribs: Q('sectiondef[kind="public-attrib"] memberdef', c).map(s => ({
      ...getMember(s)
    })),

    publicFuncs: Q('sectiondef[kind="public-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: getParams(s),
      templateparamlist: Q('templateparamlist param', s).map(p => ({
        ...getType(p),
         description: getParamDescription(s, p)
      })),
    })),

    publicStaticFuncs: Q('sectiondef[kind="public-static-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        ...getType(p),
        declname: text('declname', p),
        description: getParamDescription(s, p)
      }))
    })),

    protectedFuncs: Q('sectiondef[kind="protected-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        ...getType(p),
        declname: text('declname', p),
        description: getParamDescription(s, p)
      }))
    })),
    inheritancegraph: 'TODO',
    collaborationgraph: 'TODO',
    listofallmembers: 'TODO'

  }))
  return r
}

function getParams(s: Element): Param[] {
  return Q('param', s).map(p => ({
    ...getType(p),
    // declname: text('declname', p),
    // defname: text('defname', p),
    name: text('declname', p)||text('defname', p)||unique('arg'),
    // defval: text('defname', p),
    description: getParamDescription(s, p)
  }));
}

function getCompoundDefPublicTypes(c: Element): PublicType[] {
  return Q('sectiondef[kind="public-type"] memberdef', c).map(s => ({
    ...getDescribed(s),
    ...attrs<{kind:DoxSectionKind}>(c, ['kind']),
    enumValues: Q('enumvalue', s).map(v => ({
      ...getDescribed(v),
      initializer: Q1('initializer', v, {}).textContent,
    }))
  }));
}

function getParamDescription(s: Element, p:Element) {
  var pi = Q('detaileddescription parameterlist[kind="param"] parameteritem', s)
    .find(pi=>text('parametername', pi).trim()===text('declname', p))
  if(pi) {
    return text('parameterdescription', pi).trim()
  }
  else{
    return undefined
  }
}

function getDescribed(c: Element) : Described {
  return {
    // name: (Q1('name', c) || Q1('compoundname', c) || { textContent: c.getAttribute('name')}).textContent,
    location: location(c),
    ...attrs<{id:string}>(c, ['id']),
    ...getDescriptions(c)
  } as Described
}

function location(c:Element): Location{
  var o = attrs(Q1('location', c, {})) as any
  o.line = o.line && parseInt(o.line) || o.line
  o.column = o.column && parseInt(o.column) || o.column
  o.bodystart = o.bodystart && parseInt(o.bodystart) || o.bodystart
  o.bodyend = o.bodyend && parseInt(o.bodyend) || o.bodyend
  return o
}

function getDescriptions(c: Element) :  Descriptions {
  return {
    briefdescription: Q(c.childNodes).filter(c=>c.tagName==='briefdescription').map(c=>c.innerHTML).join('\n'),
    detaileddescription: Q(c.childNodes).filter(c=>c.tagName==='detaileddescription').map(c=>c.innerHTML).join('\n'),
    inbodydescription: Q(c.childNodes).filter(c=>c.tagName==='inbodydescription').map(c=>c.innerHTML).join('\n'),
    detaileddescriptionNode: Q(c.childNodes).find(c=>c.tagName==='detaileddescription')
    // detaileddescription: text('detaileddescription', c),
    // inbodydescription: text('inbodydescription', c),
  }
}

function getMember(s: Element) : Member{
  return {
    ...getDescribed(s),
    ...attrs<{static: DoxBool, prot: DoxProtectionKind,kind: DoxMemberKind, mutable: DoxBool, implicit: DoxBool, inline: DoxBool, const: DoxBool, version: DoxBool, }>(s, ['prot', 'kind', 'static', 'mutable', 'implicit', 'inline', 'const', 'version']),
    ...getType(s),
    definition: text('definition', s),
      name: text('name', s),
    argsstring: text('argsstring', s),
    references: Q('references', s).map(r => ({ ...attrs(s, []), text: text('references', s) })),
    referencedby: Q('referencedby', s).map(r => ({ ...attrs(s, []), text: text('referencedby', s) })),
  }
}

function getType(s: Element, prefix='type'): {type:linkedTextType} {
  return {
    type: {
      ...attrs(Q1(`${prefix}>ref`, s), []),
      name: text(`${prefix}>ref`, s, ``),
      text: text(`${prefix}`, s),
      refs: Q(`${prefix}>ref`, s).map(r=>attrs<refTextType>(r, ['refid', 'kindref', 'text']))
    }
  }
}

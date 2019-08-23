import { objectKeys, unique } from 'misc-utils-of-mine-generic'
import { attrs, Q, Q1, text } from '../dom/domUtil'
import { loadXmlDom } from "../dom/jsdom"
import { CompoundDef, Described, Descriptions, DoxBool, DoxCompoundKind, DoxMemberKind, DoxProtectionKind, DoxSectionKind, DoxVirtualKind, linkedTextType, Location, Member, Param, PublicType, refTextType } from './doxygenTypes'

interface Options {
  xml: string;
  debug?: boolean;
  formulas2Svg?: boolean;
  createParentNodes?: boolean
}

/**
 * Transform a single doxygen XML source file in a more or less equivalent .json
 * TODO: type return value
 */
export function parseDoxygen(options: Options): CompoundDef[] {
  loadXmlDom(options.xml)

  var r = Q('compounddef').map(c => ({
    ...getDescribed(c),
    ...attrs<{ kind: DoxCompoundKind, prot: DoxProtectionKind }>(c, ['kind', 'prot']),
    compoundname: text('compoundname', c).trim(),

    derivedcompoundref: Q('derivedcompoundref', c).map(d => ({
      ...attrs<{ refid: DoxBool, prot: DoxProtectionKind, virt: DoxVirtualKind }>(d, ['refid', 'prot', 'virt']),
      text: d.textContent
    })),

    publicTypes: getCompoundDefPublicTypes(c),

    publicAttribs: Q('sectiondef[kind="public-attrib"] memberdef', c).map(s => ({
      ...getMember(s)
    })),

    publicFuncs: Q('sectiondef[kind="public-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: getParams(s),
      templateparamlist: Q('templateparamlist param', s).map(p => ({
        type: getType(p),
        description: getParamDescription(s, p)
      })),
    })),

    publicStaticFuncs: Q('sectiondef[kind="public-static-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        type: getType(p),
        declname: text('declname', p),
        description: getParamDescription(s, p)
      }))
    })),

    protectedFuncs: Q('sectiondef[kind="protected-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        type: getType(p),
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
    type: getType(p),
    name: text('declname', p) || text('defname', p) || unique('arg'),
    description: getParamDescription(s, p)
  }))
}

function getCompoundDefPublicTypes(c: Element): PublicType[] {
  return Q('sectiondef[kind="public-type"] memberdef', c).map(s => ({
    ...getDescribed(s),
    ...attrs<{ kind: DoxSectionKind }>(s, ['kind']),
    enumValues: Q('enumvalue', s).map(v => ({
      ...getDescribed(v),
      initializer: text('initializer', v, ''),
      name: text('name', v, '')
    }))
  }))
}

function getParamDescription(s: Element, p: Element) {
  var pi = Q('detaileddescription parameterlist[kind="param"] parameteritem', s)
    .find(pi => text('parametername', pi).trim() === text('declname', p))
  if (pi) {
    return text('parameterdescription', pi).trim()
  }
  else {
    return undefined
  }
}

function getDescribed(c: Element): Described {
  return {
    location: location(c),
    ...attrs<{ id: string }>(c, ['id']),
    ...getDescriptions(c)
  } as Described
}

function location(c: Element): Location | undefined {
  var o = attrs<Location>(Q1('location', c), ['file', 'line', 'column', 'bodyfile', 'bodystart', 'bodyend'])
  if (!objectKeys(o).length) {
    return
  }
  o.line = o.line && parseInt(o.line + '')
  o.column = o.column && parseInt(o.column + '')
  o.bodystart = o.bodystart && parseInt(o.bodystart + '')
  o.bodyend = o.bodyend && parseInt(o.bodyend + '')
  return o
}

function getDescriptions(c: Element): Descriptions {
  return {
    briefdescription: Q(c.childNodes).filter(c => c.tagName === 'briefdescription').map(c => c.innerHTML).join('\n'),
    detaileddescription: Q(c.childNodes).filter(c => c.tagName === 'detaileddescription').map(c => c.innerHTML).join('\n'),
    inbodydescription: Q(c.childNodes).filter(c => c.tagName === 'inbodydescription').map(c => c.innerHTML).join('\n'),
    detaileddescriptionNode: Q(c.childNodes).find(c => c.tagName === 'detaileddescription')
  }
}

function getMember(s: Element): Member {
  return {
    ...getDescribed(s),
    ...attrs<{ static: DoxBool, prot: DoxProtectionKind, kind: DoxMemberKind, mutable: DoxBool, implicit: DoxBool, inline: DoxBool, const: DoxBool, version: DoxBool, }>(s, ['prot', 'kind', 'static', 'mutable', 'implicit', 'inline', 'const', 'version']),
    type: getType(s),
    definition: text('definition', s),
    name: text('name', s),
    argsstring: text('argsstring', s),
  }
}

function getType(s: Element, prefix = 'type'): linkedTextType {
  return {
    ...attrs(Q1(`${prefix}>ref`, s), []),
    name: text(`${prefix}>ref`, s, ``),
    text: text(`${prefix}`, s),
    refs: Q(`${prefix}>ref`, s).map(r => attrs<refTextType>(r, ['refid', 'kindref', 'text']))
  }
}

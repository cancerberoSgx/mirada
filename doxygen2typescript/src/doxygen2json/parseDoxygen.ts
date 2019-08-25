import { objectKeys, unique, notSame, notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { attrs, Q, Q1, text, findAncestor } from '../dom/domUtil'
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

  var r: CompoundDef[] = Q('compounddef').map(c => ({
    ...getDescribed(c),
    ...attrs<{ kind: DoxCompoundKind, prot: DoxProtectionKind }>(c, ['kind', 'prot']),
    compoundname: text('compoundname', c).trim(),
    title: text('title', c).trim(),

    derivedcompoundref: Q('derivedcompoundref', c).map(d => ({
      ...attrs<{ refid: DoxBool, prot: DoxProtectionKind, virt: DoxVirtualKind }>(d, ['refid', 'prot', 'virt']),
      text: d.textContent
    })),

    // Heads up - the design based on kind="public-type", kind="public-attrib", etc is wrong since here also compounddef kind="group" are also considered and they don't have sectiondef kind="public-type" but just directly sectiondef kind="enum"
    // TODO: we should change these names and eal directly with enum or concrete public types.
    publicTypes: [...Q('sectiondef[kind="public-type"] memberdef'), ...Q('memberdef[kind="enum"]', c)].filter(notSameNotFalsy).map(getCompoundDefPublicTypes),

    publicAttribs: Q('sectiondef[kind="public-attrib"] memberdef', c).map(getMember),

    publicFuncs: [...Q('sectiondef[kind="public-func"] memberdef', c), ...Q('sectiondef[kind="public-static-func"] memberdef', c)].map(getMember),

    functions: Q('sectiondef[kind="func"] memberdef', c).map(getMember),

    // inheritancegraph: 'TODO',
    // collaborationgraph: 'TODO',
    // listofallmembers: 'TODO'

  } as CompoundDef))
  return r
}

function getParams(s: Element): Param[] {
  let optional = false
  return Q('param', s).map(p => {
    const defval = optional || text('defval', p)
    optional = optional || !!defval
    return {
      type: getType(p),
      name: text('declname', p) || text('defname', p) || unique('arg'),
      defval,
      description: getParamDescription(s, p)
    }
  })
}

export function getMember(s: Element): Member {
  return {
    ...getDescribed(s),
    ...attrs<{ static: DoxBool, prot: DoxProtectionKind, kind: DoxMemberKind, mutable: DoxBool, implicit: DoxBool, inline: DoxBool, const: DoxBool }>(s,
      ['prot', 'kind', 'static', 'mutable', 'implicit', 'inline', 'const']),
    type: getType(s),
    definition: text('definition', s),
    name: text('name', s),
    argsstring: text('argsstring', s),
    params: getParams(s),
    templateparamlist: Q('templateparamlist param', s).map(p => ({
      type: getType(p),
      description: getParamDescription(s, p)
    })),
  }
}

function getCompoundDefPublicTypes(s: Element): PublicType {
  return {
    ...getDescribed(s),
    // enums starting with @ are anon
    name: (text('name', s, undefined) && !text('name', s, undefined).startsWith('@')) ? text('name', s, undefined)! : undefined,
    ...attrs<{ kind: DoxSectionKind }>(s, ['kind']),
    enumValues: Q('enumvalue', s).map(v => ({
      ...getDescribed(v),
      initializer: text('initializer', v, ''),
      name: text('name', v, '')
      // enum in class compounds have their names prefixed with the class'
      // name: (c && c.getAttribute('king') === 'class' ? getCompoundName(text('name', c, undefined)) + '_' : '') + text('name', v, '')
    }))
  }
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

function getType(s: Element, prefix = 'type'): linkedTextType {
  // examples of with and without ref: 
  // <type><ref refid="d1/d10/classcv_1_1MatExpr" kindref="compound">MatExpr</ref>  </type> 
  // <type>int</type>
  var ref = Q1(`${prefix}>ref`, s)
  return {
    name: (ref ? ref.textContent : '' || text(`${prefix}`, s, ``)).trim() || undefined,
    ref: ref && { ...attrs<refTextType>(ref, ['refid', 'kindref']), text: (ref.textContent || '').trim() }
  }
}

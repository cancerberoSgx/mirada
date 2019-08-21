import { attrs, Q, Q1, text } from './domUtil'
import { createXMLDom } from "./jsdom";
import { Options } from './types';

export let _currentOptions:Options = {xml: ''}

export function extractCompoundDef(options:Options) {
  _currentOptions=options
  createXMLDom(options.xml)
  return Q('compounddef').map(c => ({
    ...getDescribed(c),
    derivedcompoundref: Q('derivedcompoundref', c).map(d => ({
      ...attrs(d, ['refid', 'prot', 'virt']),
      name: d.textContent
    })),

    publicTypes: Q('sectiondef[kind="public-type"] memberdef', c).map(s => ({
      ...getDescribed(s),
      enumValues: Q('enumvalue', s).map(v => ({
        ...getDescribed(v),
        initializer: Q1('initializer', v).textContent,
      }))
    })),

    publicAttribs: Q('sectiondef[kind="public-attrib"] memberdef', c).map(s => ({
      ...getMember(s)
    })),

    publicFuncs: Q('sectiondef[kind="public-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        ...getType(p),
        declname: text('declname', p)
      })),
      templateparamlist:  Q('templateparamlist param', s).map(p => ({
        ...getType(p)
      })),
    })),

    publicStaticFuncs: Q('sectiondef[kind="public-static-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        ...getType(p),
        declname: text('declname', p),
        ...getParamDescriptions(s)
      }))
    })),

    protectedFuncs: Q('sectiondef[kind="protected-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        ...getType(p),
        declname: text('declname', p),
        ...getParamDescriptions(s)
      }))
    })),

    inheritancegraph: 'TODO',
    collaborationgraph: 'TODO',
    listofallmembers: 'TODO'

  }))
}

function getParamDescriptions(s: Element) {
  return Q('detaileddescription parameterlist[kind="param"]>parameteritem', s).map(i => ({
    parameternamelist: Q('parameternamelist', i).map(n => text('parametername', n)),
    parameterdescription: text('parameterdescription', i)
  }))
}

function getDescribed(c: Element) {
  return {
    name: (Q1('name', c) || Q1('compoundname', c) || Q1('name', c)|| { textContent: c.getAttribute('name') || undefined }).textContent,
    location: attrs(Q1('location', c, {})),
    ...attrs(c, ['id', 'kind'])
  }
}
function getDescriptions(c: Element) {
  return {
    briefdescription: text('briefdescription', c),
    detaileddescription: text('detaileddescription', c),
    inbodydescription: text('inbodydescription', c),
  }
}

function getMember(s: Element) {
  return {
    ...getDescribed(s),
    ...attrs(s, ['prot', 'static', 'mutable', 'implicit', 'inline', 'const', 'version']),
    ...getType(s),
    ...getDescriptions(s),
    definition: text('definition', s),
    argsstring: text('argsstring', s),
    references: Q('references', s).map(r=>({...attrs(s, []), text: text('references', s)})),
    referencedby: Q('referencedby', s).map(r=>({...attrs(s, []), text: text('referencedby', s)})),
  }
}

function getType(s: Element) {
  return {
    type: {
      ...attrs(Q1('type>ref', s), []),
      name: text('type>ref', s, ''),
      text: text('type', s),
    }
  }
}
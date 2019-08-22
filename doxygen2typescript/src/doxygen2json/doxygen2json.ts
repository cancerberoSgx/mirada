import { attrs, Q, Q1, text } from '../dom/domUtil'
import { createXMLDom } from "../dom/jsdom"
import { doxygen2JsonOptions, CompoundDef } from './types'

export let _currentOptions: doxygen2JsonOptions = { xml: '' }

/**
 * Transform a single doxygen XML source file in a more or less equivalent .json
 * TODO: type return value
 */
export function doxygen2json(options: doxygen2JsonOptions) {
  _currentOptions = options
  createXMLDom(options.xml, options.debug)
  var r =  Q('compounddef').map(c => ({
    ...getDescribed(c),
    derivedcompoundref: Q('derivedcompoundref', c).map(d => ({
      ...attrs(d, ['refid', 'prot', 'virt']),
      name: d.textContent
    })),

    publicTypes: Q('sectiondef[kind="public-type"] memberdef', c).map(s => ({
      ...getDescribed(s),
      enumValues: Q('enumvalue', s).map(v => ({
        ...getDescribed(v),
        initializer: Q1('initializer', v, {}).textContent,
      }))
    })),    

    publicAttribs: Q('sectiondef[kind="public-attrib"] memberdef', c).map(s => ({
      ...getMember(s)
    })),

    publicFuncs: Q('sectiondef[kind="public-func"] memberdef', c).map(s => ({
      ...getMember(s),
      params: Q('param', s).map(p => ({
        ...getType(p),
        declname: text('declname', p) ,
        description: getParamDescription(s, p)
      })),
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


function getParamDescription(s: Element, p:Element) {
  var pi = Q('detaileddescription parameterlist[kind="param"] parameteritem', s).find(pi=>text('parametername', pi).trim()===text('declname', p))
  if(pi) {
    return text('parameterdescription', pi).trim()
  }
  else{
    return undefined
  }
}

function getDescribed(c: Element) : Described {
  return {
    name: (Q1('name', c) || Q1('compoundname', c) || { textContent: c.getAttribute('name')}).textContent,
    location: attrs(Q1('location', c, {})),
    ...attrs(c, ['id', 'kind']),
    ...getDescriptions(c)
  }
}
function getDescriptions(c: Element) :  Descriptions {
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
    definition: text('definition', s),
    argsstring: text('argsstring', s),
    references: Q('references', s).map(r => ({ ...attrs(s, []), text: text('references', s) })),
    referencedby: Q('referencedby', s).map(r => ({ ...attrs(s, []), text: text('referencedby', s) })),
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

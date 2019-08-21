import { asArray } from 'misc-utils-of-mine-generic'
import { _currentOptions } from '../doxygen2json/doxygen2json'
import { doc, window } from './jsdom'

export function Q<T extends Element = Element>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection, ancestor: Element = doc.documentElement): T[] {
  if (typeof s === 'string') {
    return Array.from(ancestor.querySelectorAll<T>(s))
  }
  else if (s instanceof window.NodeList || s instanceof window.HTMLCollection) {
    return Array.from(s).filter(isElement) as T[]
  }
  else {
    return Array.from(asArray(s)).filter(isElement) as T[]
  }
}

export function Q1<T extends Element = Element>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection, ancestor: Element = doc.documentElement, def?: any): T {
  var a = Q(s, ancestor)
  if (!a || a.length === 0) {
    _currentOptions.debug && console.warn('expected element ' + s + '. ancestor.outerHTML: \n' + ancestor.outerHTML)
    return def
  }
  return a[0] as T
}

export function append<T extends HTMLElement = HTMLElement>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection | HTMLElement[], parent?: Element): T[] {
  parent = parent || doc.createElement('div')
  var targets: Element[] | undefined
  if (typeof s === 'string') {
    var e = doc.createElement('div')
    e.innerHTML = s
    targets = Q(e.children)
  }
  else {
    targets = Q(s)
  }
  parent.append(...targets)
  return targets as T[]
}

export function isElement(e: any): e is Element {
  return e && (e as Element).nodeType === doc.ELEMENT_NODE
}

// export function visitTopDown(e: Element, v: (e: Element) => void) {
//   v(e)
//   Q(e.childNodes).forEach(c => visitTopDown(c, v))
// }

/**
 * return an object with given element's attributes (given in second arg)
 */
export function attrs<O extends Element, T extends ((ReturnType<O['getAttributeNames']>))>(e?: O, attrs?: T): Partial<{ [k in T[number]]: string | null }> {
  if (!e || typeof attrs === 'undefined') {
    return {}
  }
  var o: Partial<{ [k in T[number]]: string | null }> = {};
  (attrs.length === 0 ? e.getAttributeNames() : attrs).forEach(k => {
    o[k] = e.getAttribute(k)
  })
  return o as any
}

export function text(s: string, c: Element, def = '') {
  return Q1(s, c, { textContent: def }).textContent.trim()
}

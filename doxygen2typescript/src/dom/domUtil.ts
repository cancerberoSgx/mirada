import { asArray } from 'misc-utils-of-mine-generic'
import { getCurrentDom } from './jsdom'

export function Q<T extends Element = Element>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection, ancestor?: Element): T[] {
  const { document, window } = getCurrentDom()
  ancestor = ancestor ||document
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

export function Q1<T extends Element = Element>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection, ancestor?: Element, def?: any): T {
  const { document } = getCurrentDom()
  ancestor = ancestor || document
  var a = Q(s, ancestor)
  if (!a || a.length === 0) {
    return def
  }
  return a[0] as T
}

export function append<T extends HTMLElement = HTMLElement>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection | HTMLElement[], parent?: Element): T[] {
  const { doc } = getCurrentDom()
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
  const { document } = getCurrentDom()
  return e && (e as Element).nodeType === document.ELEMENT_NODE
}

/**
 * return an object with given element's attributes (given in second arg)
 */
export function attrs<T extends {} = {}>(e?: Element, attrs?: string[]): T {
  if (!e || typeof attrs === 'undefined') {
    return {} as T
  }
  var o: T = {} as any
  (attrs.length === 0 ? e.getAttributeNames() : attrs).forEach(k => {
    o[k] = e.getAttribute(k)
  })
  return o
}

export function text(s: string, c: Element, def = '') {
  return Q1(s, c, { textContent: def }).textContent.trim()
}

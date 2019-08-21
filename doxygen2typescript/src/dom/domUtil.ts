import { JSDOM, VirtualConsole, DOMWindow } from "jsdom";
import { asArray } from 'misc-utils-of-mine-generic';

export function createXMLDom(s: string) {
  const vc = new VirtualConsole();
  vc.sendTo(console);
  const dom = new JSDOM('', { virtualConsole: vc });
  window = dom.window
  const { DOMParser, Node } = window;
  const parser = new DOMParser();
  doc = parser.parseFromString(s, "text/xml");
  document = doc.documentElement;
  return { doc, document, window, parser, Node };
}

/** the last created documentElement with createXMLDom */
export let document: HTMLElement
/** the last created document with createXMLDom */
export let doc: Document
/** the last created window with createXMLDom */
export let window: DOMWindow

export function Q<T extends Element = Element>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection, ancestor: Element = doc.documentElement): T[] {
  if (typeof s === 'string') {
    return Array.from(ancestor.querySelectorAll<T>(s));
  }
  else if (s instanceof window.NodeList || s instanceof window.HTMLCollection) {
    return Array.from(s).filter(isElement) as T[];
  }
  else {
    return Array.from(asArray(s)).filter(isElement) as T[];
  }
}

export function Q1<T extends Element = Element>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection, ancestor: Element = doc.documentElement, def?: any): T {
  var a = Q(s, ancestor);
  if (!a || a.length === 0) {
    if (typeof def === 'undefined') {
      throw new Error('expected element ' + s);
    }
    else {
      return def
    }
  }
  return a[0] as T;
}

export function append<T extends HTMLElement = HTMLElement>(s: string | Element[] | Element | NodeList | HTMLElement | HTMLCollection | HTMLElement[], parent?: Element): T[] {
  parent = parent || doc.createElement('div');
  var targets: Element[] | undefined;
  if (typeof s === 'string') {
    var e = doc.createElement('div');
    e.innerHTML = s;
    targets = Q(e.children);
  }
  else {
    targets = Q(s);
  }
  parent.append(...targets);
  return targets as T[];
}

export function isElement(e: any): e is Element {
  return e && (e as Element).nodeType === doc.ELEMENT_NODE;
}

export function visitTopDown(e: Element, v: (e: Element) => void) {
  v(e);
  Q(e.childNodes).forEach(c => visitTopDown(c, v));
}

/**
 * return an object with given element's attributes (given in second arg)
 */
export function attrs<O extends Element, T extends ((ReturnType<O['getAttributeNames']>))>(e?: O, attrs?: T): Partial<{ [k in T]: string | null }> {
  if (!e || !attrs) {
    return {}
  }
  var o: Partial<{ [k in T]: string | null }> = {};
  (attrs || e.getAttributeNames()).forEach(k => {
    o[k] = e.getAttribute(k) as T
  })
  return o
}

import { DOMWindow, JSDOM, VirtualConsole } from "jsdom"
import { getGlobal } from 'misc-utils-of-mine-generic'

const REUSE_JSDOM = true
const CACHE_DOM = true

interface DomRepresentation {
  doc: Document;
  window: DOMWindow;
  document: HTMLElement;
  parser: DOMParser;
}

export function loadXmlDom(s: string): DomRepresentation {
  const hash = hashCode(s)
  if (!CACHE_DOM || !doms[hash]) {
    const dom = getJSDOM()
    const window = dom.window
    const parser = new dom.window.DOMParser()
    const doc = parser.parseFromString(s, "text/xml")
    const document = doc.documentElement
    doms[hash] = { doc, window, document, parser }
  }
  const d = doms[hash]
  installGlobalDOM(d)
  return d
}

const doms: { [s: number]: DomRepresentation } = {}

function installGlobalDOM(o: DomRepresentation) {
  const g = getGlobal()
  g.doc = o.doc
  g.document = o.document
  g.window = o.window
  g.domRepresentation = o
}

export function getCurrentDom(): DomRepresentation {
  return getGlobal().domRepresentation
}

let dom: JSDOM | undefined
function getJSDOM() {
  if (!REUSE_JSDOM || !dom) {
    dom = new JSDOM('', { virtualConsole: new VirtualConsole() })
  }
  return dom
}

/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
function hashCode(s: string) {
  var h = 0, l = s.length, i = 0
  if (l > 0)
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0
  return h
}

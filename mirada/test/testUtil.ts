import { Canvas, createCanvas as createCanvas_, Image, ImageData } from 'canvas'
import Jimp from 'jimp'
import { DOMWindow, JSDOM, VirtualConsole } from "jsdom"
import { getGlobal } from 'misc-utils-of-mine-generic'
import { installFormatProxy, JimpCodec, loadFormatProxies, loadOpencv } from '../src'

let loaded = false

export async function loadMirada() {
  if (!loaded) {
    loaded = true
    await installFormatProxy(() => new JimpCodec(Jimp))
    await loadFormatProxies()
    await loadOpencv()
  }
}

export function createCanvas(width = 200, height = 200): HTMLCanvasElement {
  getGlobal().HTMLCanvasElement = Canvas
  getGlobal().ImageData = ImageData
  getGlobal().HTMLImageElement = Image
  var el = createCanvas_(200, 300) as any
  return el
}

interface DomRepresentation<T extends HTMLElement = HTMLElement> {
  window: DOMWindow;
  document: Document
  el: T
}

function loadDOM<T extends HTMLElement = HTMLElement>(body = '', selector?: string): DomRepresentation {
  const html = `
<!DOCTYPE html><html>  <head>    <title>test</title>  </head>  <body>  ${body}  </body></html>`.trim()
  const dom = new JSDOM(html, { virtualConsole: new VirtualConsole() })
  const window = dom.window
  getGlobal().HTMLCanvasElement = window.HTMLCanvasElement
  getGlobal().ImageData = (window as any).ImageData
  const document = window.document
  const d: DomRepresentation = { window, document, el: document.querySelector<T>(selector || 'body') || document.body }
  installGlobalDOM(d)
  return d
}

function installGlobalDOM(o: DomRepresentation) {
  const g = getGlobal()
  g.document = o.document
  g.window = o.window
  g.domRepresentation = o
}

export function getCurrentDom(): DomRepresentation {
  return getGlobal().domRepresentation
}

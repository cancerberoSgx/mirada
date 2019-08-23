import { DOMWindow, JSDOM, VirtualConsole } from "jsdom"
import { getGlobal, hashCode } from 'misc-utils-of-mine-generic';

export function loadXmlDom(s: string): DomRepresentation {
  const hash = hashCode(s)
  if(!doms[hash]){
    const dom = getJSDOM()
 const window = dom.window
  const parser = new dom.window.DOMParser()
  const doc =  parser.parseFromString(s, "text/xml");
   const  document = doc.documentElement
    doms[hash] =  {doc, window ,document, parser}
  }
  const d = doms[hash]  
   installGlobalDOM(d)
   return d
}

const doms : {[s:number]:DomRepresentation}={}

interface DomRepresentation {
    doc: Document;
    window: DOMWindow;
    document: HTMLElement;
    parser: DOMParser;
}

function installGlobalDOM(o:DomRepresentation){
  const g = getGlobal()
  g.doc=o.doc
  g.document=o.document
  g.window = o.window
  g.domRepresentation = o
}

export function getCurrentDom(): DomRepresentation{
  return getGlobal().domRepresentation
}

let dom : JSDOM|undefined

function getJSDOM(){
  if(!dom){
dom=  new JSDOM('', { virtualConsole: new VirtualConsole() })
  }
  return dom
}

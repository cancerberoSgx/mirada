import { checkThrow, serial } from 'misc-utils-of-mine-generic'
import { File } from '../file'
import { loadOpencv } from '../opencvReady'
import { FormatCodec, FormatProxy } from '../types/mirada'
import { ImageData } from '../types/opencv'

/**
 * Nor or opencv.js or this library implement any image format so users are 
 * responsible of providing a FormatProxy using some library.
 * 
 */
export async function installFormatProxy(proxy: FormatProxy) {

  proxies.push(proxy)
}

const proxies: FormatProxy[] = []
const codecs: FormatCodec[] = []

let _proxyLoaded = false

async function createCodec(proxy: FormatProxy) {
  return typeof proxy === 'function' ? await proxy() : await proxy.create()
}

/**
 * @internal
 */
export async function loadFormatProxies() {
  if (!_proxyLoaded) {
    _proxyLoaded = true
    await serial(proxies.map(proxy => async () => {
      var p = await createCodec(proxy)
      codecs.push(p)
    }))
    await loadOpencv()
  }
}

export function getDefaultCodec() {
  var c = codecs.length ? codecs[0] : undefined
  if (!c) {
    throw new Error('No code found. you need to provide a proxy and wait for loadFormatProxies()')
  }
  return c
}

export async function decodeOrThrow(buffer: ArrayBuffer, format?: string) {
  return checkThrow(await getDefaultCodec().decode(buffer, format),
    `Fail to decode buffer. ${format ? `requested format: ${format}` : ''}. Detected format: ${File.getBufferFileType(buffer) && File.getBufferFileType(buffer).mime || 'unknown'}`)

}


export async function encodeOrThrow(data: ImageData, format: string, quality?: number) {
  return checkThrow(await getDefaultCodec().encode(data, format, quality),
    'Fail to encode to requested format ' + format + '. Given: ' + format)
}

// function prop<T,S>(o:T, p:keyof T, map: S|((k:keyof T)=>S)):S {
//   var v = o[p]
// }

// function valueOf<T, P extends keyof T, D>(t:T,p:P, def:D, pred?: (v: T[P])=>boolean):T[P]|D {
// return (pred?pred(t[p]) : true ) 
// }
// an operation OP is expensive and we want to print: `${OP(a) && OP(a).foo || '' }` - we need to create a variable in order to not call it twice
// solution : a function get which : `${get(OP(a), 'foo')||'' }`
// useful if nested: `${get(OP(a), 'foo', 'bar', 'name')||'' }`
// for particular falsy (we do want to print 0 and false): `${get(OP(a), 'foo', 'bar', v=>v===undefined?'':v)}` (will print empty string only for undefined not for all falsy)

// var a: {name:B}[]

// a.map(b=>b.name)   vs: a.map(P('name'))n 

// a.map(a=>a.name||'asd')  vs a.map(P('name', 'asd'))  

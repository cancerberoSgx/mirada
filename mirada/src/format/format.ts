import { serial } from 'misc-utils-of-mine-generic'
import { loadOpencv } from '../opencvReady'
import { FormatCodec, FormatProxy } from '../types/mirada'

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

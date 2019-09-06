import { checkThrow, serial } from 'misc-utils-of-mine-generic'
import { File } from '../file'
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

export async function unInstallFormatProxies() {
  proxies.length = 0
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
    proxies.length && await serial(proxies.map(proxy => async () => {
      var p = await createCodec(proxy)
      codecs.push(p)
    }))
  }
}

export function unloadFormatProxies() {
  codecs.length = 0
}

export function getDefaultCodec() {
  var c = codecs.length ? codecs[0] : undefined
  if (!c) {
    throw new Error('No codec found. you need to provide a proxy and wait for loadFormatProxies()')
  }
  return c
}

export async function decodeOrThrow(buffer: ArrayBuffer, format?: string) {
  const r = await getDefaultCodec().decode(buffer, format)
  checkThrow(r,
    `Fail to decode buffer. ${format ? `requested format: ${format}` : ''}. Detected format: ${File.getBufferFileType(buffer) && File.getBufferFileType(buffer).mime || 'unknown'}`)
  return r as ImageData
}

export async function encodeOrThrow(data: ImageData, format: string, quality?: number) {
  const r = await getDefaultCodec().encode(data, format, quality)
  checkThrow(r,
    'Fail to encode to requested format ' + format + '. Given: ' + format)
  return r as ArrayBuffer
}

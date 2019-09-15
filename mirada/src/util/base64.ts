import {Buffer} from 'buffer/'

export function dataToUrl(data: string, mimeType: string, fileName?: string) {
  return base64ToUrl(dataToBase64(data), mimeType, fileName)
}

export function dataToBase64(data: string): string {
  return Buffer.from(data).toString('base64')
}

/**
 * Creates a DataUrl like `data:image/jpeg;name=hindenburg.jpg;base64,` using given base64 content, mimeType and fileName.
 */
export function base64ToUrl(base64: string, mimeType: string, fileName?: string): string {
  return `data:${mimeType}${fileName ? `;name=${fileName}` : ''};base64,${base64}`
}

export function urlToBase64(s: string) {
  return s.substring(s.indexOf(';base64,') + ';base64,'.length)
}

/**
 * Extracts the name of a data url like `data:image/jpeg;name=hindenburg.jpg;base64,`..., if any.
 */
export function getDataUrlFileName(url: string) {
  let p = url && url.split(';base64,')
  const q = p.length ? p[0].split(';').find(s => s.includes('name=')) : ''
  p = q ? q.split('=') : []
  return p[p.length - 1]
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString('base64')
}

export function arrayBufferToUrl(buffer: ArrayBuffer, mime: string, name?: string) {
  var b64 = arrayBufferToBase64(buffer)
  return base64ToUrl(b64, mime, name)
}

export function arrayBufferToString(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString()
}


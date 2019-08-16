import { FormatProxy } from './types/opencvTypes'

/**
 * Nor or opencv.js or this library implement any image format so users are responsible of providing a FormatProxy using some library.
 * 
 */
export function installFormatProxy(proxy: FormatProxy) {
  formatProxy = proxy
}

export let formatProxy: FormatProxy | undefined

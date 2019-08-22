import Jimp from 'jimp'
import { installFormatProxy, JimpFormatCodec } from '../src'
import { loadFormatProxies } from '../src/format'
import { opencvReady } from './probes/nodeFsAlone/nodeAlone'

let loaded = false

export async function loadMirada() {
  if (!loaded) {
    loaded = true
    await installFormatProxy(() => new JimpFormatCodec(Jimp))
    await opencvReady()
    await loadFormatProxies()
  }
}


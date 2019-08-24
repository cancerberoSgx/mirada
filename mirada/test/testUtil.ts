import Jimp from 'jimp'
import { installFormatProxy, JimpCodec } from '../src'
import { loadFormatProxies } from '../src/format'
import { opencvReady } from './probes/nodeFsAlone/nodeAlone'

let loaded = false

export async function loadMirada() {
  if (!loaded) {
    loaded = true
    await installFormatProxy(() => new JimpCodec(Jimp))
    await opencvReady()
    await loadFormatProxies()
  }
}


import Jimp from 'jimp'
import { installFormatProxy, JimpCodec, loadOpencv } from '../src'
import { loadFormatProxies } from '../src/format'
// import { opencvReady } from './probes/nodeFsAlone/nodeAlone';
// import {   opencvReady } from '../src'

let loaded = false

export async function loadMirada() {
  if (!loaded) {
    loaded = true
    await installFormatProxy(() => new JimpCodec(Jimp))
    await loadFormatProxies()
    await loadOpencv()
  }
}


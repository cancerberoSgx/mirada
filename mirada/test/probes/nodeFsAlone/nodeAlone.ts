import { existsSync } from 'fs'
import { getGlobal, isNode, withoutExtension } from 'misc-utils-of-mine-generic'
import { relative, resolve as pathResolve } from 'path'
import { resolveNodeModule } from '../../../src/mist';

// /**
//  * An exposed promise that is resolved when the library is ready to be used. 
//  * At that time the global variable 'cv' should be available and ready.
//  */
// export const opencvReady = new Deferred<void>()
// const  promise =opencvReady()
let isLoaded = true 

export function opencvReady() {
  if (isLoaded) {
    return Promise.resolve(true)
  }
  return new Promise(resolve => {
    var path: string
    const g = getGlobal()
    if (existsSync('./node_modules/mirada/dist/src/opencv.js')) {
      path = resolveNodeModule('./node_modules/mirada/dist/src/opencv.js')
    }
    else if (existsSync('./dist/src/opencv.js')) {
      path = resolveNodeModule('./dist/src/opencv.js')
    }
    else {
      throw new Error('opencv.js not found. Locations tried: ./node_modules/mirada/dist/src/opencv.js and ./dist/src/opencv.js')
    }
    g.Module = {
      preRun: () => {
        if (isNode) {
          g.Module.FS.mkdir('/work')
          g.Module.FS.mount(g.Module.FS.filesystems.NODEFS, { root: pathResolve('.') }, '/work')
        }
      },
      onRuntimeInitialized: () => {
        resolve()
      }
    }
    g.cv = require(path)
  })
}



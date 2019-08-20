import { existsSync } from 'fs'
import { Deferred, getGlobal, isNode, withoutExtension } from 'misc-utils-of-mine-generic'
import { relative, resolve as pathResolve } from 'path'
import { FS } from './types/emscripten';

/**
 * An exposed promise that is resolved when the library is ready to be used. 
 * At that time the global variable 'cv' should be available and ready.
 */
export const opencvReady = new Deferred<FS>()
export let FS_ : FS 
opencvReady.then(FS => {
  opencvLoaded = true
  FS_=FS
})
export function getFS (){
  return FS_
}
let opencvLoaded = false

interface LoadOptions {
  onloadCallback?: (FS:FS) => void
  opencvUrl?: string
}

/**
 * Loads opencv.js file. It will do it only once no matter if called multiple times. 
 * In the browser a new script element is created to load the file while in Node.js
 * the file is loaded using a require() call.
 * 
 * Returns a promise resolved when the library is ready or rejected if there's a problem.
 * 
 * Notice that among the options users can define the location of opencv.js file, which 
 * in the case of the browser it could be in an external server.
 */
export function loadOpencv(o: LoadOptions = {}) {
  if (opencvLoaded) {
    o.onloadCallback && o.onloadCallback(FS_)
    return Promise.resolve(FS_)
  }
  if (isNode()) {
    return loadOpencvNode(o)
  }
  else {
    return loadOpencvBrowser(o)
  }
}

function loadOpencvNode(o: LoadOptions = {}) {
  return new Promise<FS>(resolve => {
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
        opencvLoaded = true
        opencvReady.resolve(g.Module)
        o.onloadCallback && o.onloadCallback(FS_)
        resolve(g.Module)
      }
    }
    g.cv = require(path)
  })
}

function resolveNodeModule(p: string) {
  var r = withoutExtension(relative(__dirname, pathResolve(p)))
  if (!r.startsWith('.')) {
    r = './' + r
  }
  return r
}

function loadOpencvBrowser(o: LoadOptions = {}) {
  return new Promise<FS>((resolve, reject) => {
    let script = document.createElement('script')!
    script.setAttribute('async', '')
    script.setAttribute('type', 'text/javascript')
    script.addEventListener('load', async () => {
      const g = getGlobal()
      if (typeof g.cv !== 'undefined' && typeof g.cv.getBuildInformation !== 'undefined') {
        opencvReady.resolve(g.cv.FS)
        o.onloadCallback && o.onloadCallback(FS_)
        resolve()
      }
      else {
        g.cv = typeof g.cv === 'undefined' ? {} : g.cv
        g.cv.onRuntimeInitialized = () => {
          opencvReady.resolve(g.cv.FS)
          o.onloadCallback && o.onloadCallback(FS_)
          resolve()
        }
      }
    })
    script.addEventListener('error', () => {
      reject('Failed to load ' + o.opencvUrl)
    })
    script.src = o.opencvUrl || 'opencv.js'
    let node = document.getElementsByTagName('script')[0]
    node.parentNode!.insertBefore(script, node)
  })
}


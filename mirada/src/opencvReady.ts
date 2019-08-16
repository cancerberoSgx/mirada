import { existsSync } from 'fs'
import { Deferred, getGlobal, isNode, withoutExtension } from 'misc-utils-of-mine-generic'
import { relative, resolve as pathResolve } from 'path'

export const opencvReady = new Deferred<void>()

opencvReady.then(() => {
  opencvLoaded = true
})

let opencvLoaded = false

interface LoadOptions {
  onloadCallback?: (...args: any[]) => void
  opencvUrl?: string
}

export function loadOpencv(o: LoadOptions = {}) {
  if (opencvLoaded) {
    o.onloadCallback && o.onloadCallback()
    return Promise.resolve()
  }
  if (isNode()) {
    return loadOpencvNode(o)
  }
  else {
    return loadOpencvBrowser(o)
  }
}

function loadOpencvNode(o: LoadOptions = {}) {
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
        opencvLoaded = true
        opencvReady.resolve()
        o.onloadCallback && o.onloadCallback()
        resolve()
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
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')!
    script.setAttribute('async', '')
    script.setAttribute('type', 'text/javascript')
    script.addEventListener('load', async () => {
      const g = getGlobal()
      if (typeof g.cv !== 'undefined' && typeof g.cv.getBuildInformation !== 'undefined') {
        opencvReady.resolve()
        o.onloadCallback && o.onloadCallback()
        resolve()
      }
      else { // WASM
        g.cv = typeof g.cv === 'undefined' ? {} : g.cv
        g.cv.onRuntimeInitialized = () => {
          opencvReady.resolve()
          o.onloadCallback && o.onloadCallback()
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


import { existsSync } from 'fs'
import { Deferred, getGlobal, isNode } from 'misc-utils-of-mine-generic'
import { loadFormatProxies } from './format'
import { buildError, resolveNodeModule } from './mist'
import { FS } from './types/emscripten'
import { resolve as pathResolve} from 'path'

export const FS_ROOT = '/work'
/**
 * An exposed promise that is resolved when the library is ready to be used. 
 * At that time the global variable 'cv' should be available and ready.
 */
export const opencvReady = new Deferred<void>()

let FS_: FS
/**
 * gets the emscripten FS API
 */
export function getFS() {
  return FS_
}

interface LoadOptions {
  onloadCallback?: () => void
  opencvUrl?: string
  /**
   * node.js : current working dir. By default is '.'
   */
  cwd?: string
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
let opencvLoaded = false

function loadOpencvNode(o: LoadOptions = {}) {
  return new Promise<FS>(resolve => {
    const paths = ['./node_modules/mirada/dist/src/opencv.js', './dist/src/opencv.js']
    const g = getGlobal()
    var path = paths.find(existsSync)
    const resolved = path && resolveNodeModule(path)
    if (!resolved) {
      throw buildError(`opencv.js not found. in any of these: ${paths.join(', ')}`)
    }
    g.Module = {
      preRun: () => {
        if (isNode()) {
          g.Module.FS.mkdir(FS_ROOT)
          g.Module.FS.mount(g.Module.FS.filesystems.NODEFS, { root: o.cwd || process.cwd() || '.' }, FS_ROOT)
        }
      },
      onRuntimeInitialized: async () => {
        await finishSetup()
        o.onloadCallback && o.onloadCallback()
        resolve()
      }
    }
    g.cv = require(resolved)
  })
}


async function finishSetup() {
  opencvLoaded = true
  await loadFormatProxies()
  FS_ = getGlobal().Module.FS
  opencvReady.resolve()
}

function loadOpencvBrowser(o: LoadOptions = {}) {
  return new Promise<FS>((resolve, reject) => {
    let script = document.createElement('script')!
    script.setAttribute('async', '')
    script.setAttribute('type', 'text/javascript')
    script.addEventListener('load', async () => {
      const g = getGlobal()
      if (typeof g.cv !== 'undefined' && typeof g.cv.getBuildInformation !== 'undefined') {
        await finishSetup()
        o.onloadCallback && o.onloadCallback()
        resolve()
      }
      else {
        g.cv = typeof g.cv === 'undefined' ? {} : g.cv
        g.cv.onRuntimeInitialized = async () => {
          await finishSetup()
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


import { existsSync } from 'fs'
import { getGlobal, isNode, notFalsy, serial } from 'misc-utils-of-mine-generic'
import { installFormatProxy, loadFormatProxies, CanvasCodec } from './format'
import { FS } from './types/emscripten'
import { LoadOptions, FormatProxy } from './types/mirada'
import { buildError, resolveNodeModule } from './util/misc'

export const FS_ROOT = '/work'

let FS_: FS | undefined

/**
 * gets the emscripten FS API
 */
export function getFS() {
  return FS_!
}

let opencvLoaded = false

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
export async function loadOpencv(options: LoadOptions = {}) {
  if (options.force) {
    opencvLoaded = false
    getGlobal().Module = undefined
    FS_ = undefined
  }
  if (opencvLoaded) {
    options.onloadCallback && options.onloadCallback()
    return
  }

  // install and load given format proxies. If none given and in browser we install CanvasCodec
  const formatProxies = options.formatProxies || [...isNode()?[]:[() => new CanvasCodec()]] as FormatProxy[]
  await serial(formatProxies.map(p => async () => {
    await installFormatProxy(p)
  }))
  await loadFormatProxies()

  if (isNode()) {
    await loadOpencvNode(options)
  }
  else {
    await loadOpencvBrowser(options)
  }
}

async function loadFormatCodecs(o: LoadOptions) {
  await serial((o.formatProxies || []).map(p => async () => {
    await installFormatProxy(p)
  }))
  await loadFormatProxies()
}

function loadOpencvNode(o: LoadOptions) {
  return new Promise<FS>(resolve => {
    const fileName = o.opencvJsExceptions ? 'opencv_exception.js' : 'opencv.js'
    const paths = [o.opencvJsLocation, `./node_modules/mirada/dist/src/${fileName}`, `./dist/src/${fileName}`].filter(notFalsy)
    const g = getGlobal()
    var path = paths.find(existsSync)
    const resolved = path && resolveNodeModule(path)
    if (!resolved) {
      throw buildError(`${fileName} not found. in any of these: ${paths.join(', ')}`)
    }
    g.Module = {
      preRun: () => {
        if (typeof window !== 'object' && !g.Module.FS.analyzePath(FS_ROOT).exists) {
          g.Module.FS.mkdir(FS_ROOT)
          g.Module.FS.mount(g.Module.FS.filesystems.NODEFS, { root: o.cwd || process.cwd() || '.' }, FS_ROOT)
        }
      },
      onRuntimeInitialized: async () => {
        opencvLoaded = true
        FS_ = getGlobal().Module.FS
        o.onloadCallback && o.onloadCallback()
        resolve()
      },
      onAbort: (e: any) => {
        console.error('Error has occurred in WebAssembly Module', e, e.stack)
        console.trace()
      }
    }
    try {
      g.cv = require(resolved)
    } catch (error) {
      console.error(`An error occurred when trying to load ${fileName} form ` + resolved, error, error.stack)
      throw error
    }
  })
}

function loadOpencvBrowser(o: LoadOptions) {
  return new Promise<FS>((resolve, reject) => {
    let script = document.createElement('script')!
    script.setAttribute('async', '')
    script.setAttribute('type', 'text/javascript')
    script.addEventListener('load', async () => {
      const g = getGlobal()
      if (typeof g.cv !== 'undefined' && typeof g.cv.getBuildInformation !== 'undefined') {
        opencvLoaded = true
        FS_ = getGlobal().Module.FS
        o.onloadCallback && o.onloadCallback()
        resolve()
      }
      else {
        g.cv = typeof g.cv === 'undefined' ? {} : g.cv
        g.cv.onRuntimeInitialized = async () => {
          opencvLoaded = true
          FS_ = getGlobal().Module.FS
          o.onloadCallback && o.onloadCallback()
          resolve()
        }
      }
    })
    const src = o.opencvJsLocation || (o.opencvJsExceptions ? 'opencv_exception.js' : 'opencv.js')
    script.addEventListener('error', () => {
      reject('Failed to load ' + src)
    })
    script.src = src
    let node = document.getElementsByTagName('script')[0]
    node.parentNode!.insertBefore(script, node)
  })
}


import { Deferred, getGlobal, isNode } from 'misc-utils-of-mine-generic'
export const opencvReady = new Deferred<void>()

let opencvLoaded = false

opencvReady.then(() => {
  opencvLoaded = true
})
interface LoadOptions {
  onloadCallback?: (...args: any[]) => void
  opencvUrl?: string
}
export function loadOpencv(o: LoadOptions = {}) {
  if (isNode()) { throw 'TODO' }
  else {
    return loadOpencvBrowser(o)
  }
}
function loadOpencvBrowser(o: LoadOptions = {}) {
  if (opencvLoaded) {
    o.onloadCallback && o.onloadCallback()
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')!
    script.setAttribute('async', '')
    script.setAttribute('type', 'text/javascript')
    script.addEventListener('load', async () => {
      const g = getGlobal()
      if (typeof g.cv !== 'undefined' && typeof g.cv.getBuildInformation !== 'undefined') {
        opencvReady.resolve()
        console.log(g.cv.getBuildInformation())
        o.onloadCallback && o.onloadCallback()
        resolve(g.cv)
      }
      else { // WASM
        g.cv = typeof g.cv === 'undefined' ? {} : g.cv
        g.cv.onRuntimeInitialized = () => {
          opencvReady.resolve()
          console.log(g.cv.getBuildInformation())
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


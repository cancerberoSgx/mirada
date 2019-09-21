
// (process as any).guiStarted=false
// var originalSetTimeout = global.setTimeout
// global.setTimeout=(f:Fn, n:number) => ! (process as any).guiStarted ? originalSetTimeout(f,n): gui. MessageLoop.postDelayedTask(n,f) as any
// var originalSetImmediate= global.setImmediate
// global.setImmediate=(f:Fn) => ! (process as any).guiStarted ? originalSetImmediate (f): gui. MessageLoop.postTask(f) as any
import { flat } from 'misc-utils-of-mine-generic'
import { spawn } from 'threads'
import { loadLibraries } from '../src/loadLibraries'
import { App1 } from './app'
import { Handlers } from './libWorker'
import { getInitialState, _setState } from './state'


if (typeof Array.prototype.flat === 'undefined') {
  Array.prototype.flat = function(this: any[]) {
    return flat(this)
  }
}

export let handlers: Handlers

export let app: App1

async function main() {
  console.log('Loading libraries...')
  await loadLibraries()
  console.log('Starting App...')

  _setState(getInitialState())
  app = new App1({})
  app.render()
  app.start()
}
main().catch(console.error)

async function main2() {
  const w = new Worker("./libWorker")
  const handlers = await spawn(w)
  await handlers.loadLibraries()
  console.log('res', await handlers.test())
  console.log('res', await handlers.test3())
  w.terminate()
}

// main2().catch(console.error)

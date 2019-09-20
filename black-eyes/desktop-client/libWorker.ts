
import { expose } from "threads/worker"
import { loadLibraries } from '../src/loadLibraries'
import { run } from 'magica'

async function test(){
  const r = await run({script: 'identify rose:'})
  return r.stdout
}
async function test2(name:string, content: ArrayBuffer, output:string){
   await run({script: `convert ${name} -rotate 33 ${output}`}) 
}
async function test3(name:string, content: ArrayBuffer, output:string){
   return cv.getBuildInformation()
}
const handlers = {loadLibraries, test, test2, test3}
export type Handlers = typeof handlers
expose(handlers )


// interface Op<A, B, N extends string> {
//   name: N
//   fn(req: A): Promise<B>
// }

// type LoadLibsOp = Op<{}, { t: number }, 'loadLibraries'>
// const loadLibs: LoadLibsOp = {
//   name: 'loadLibraries',
//   async fn(req) {
//     const t0 = Date.now()
//     console.log(`Loading image libraries...`);
//    const c =  await  loadLibraries()
//     const t = Date.now() - t0
//     console.log('Loaded ' + (t), c, 'asdasd');
//     return { t }
//   }
// }
// export type Handlers = {
//   loadLibs: LoadLibsOp['fn']
// }


// const g = (global as any)
// g.ENVIRONMENT_IS_WEB=false
// g.ENVIRONMENT_IS_WORKER=false
// g.ENVIRONMENT_IS_NODE=true
// g.ENVIRONMENT_IS_SHELL=false


// self.MAGICA_WASM_LOCATION='/Users/sebastiangurin/git/magica/dist/src/imageMagick/compiled/magick.wasm'
// self.location = {href: '/Users/sebastiangurin/git/magica/dist/src/imageMagick/compiled/magick.wasm'}
//@ts-ignore
// self.importScripts=undefined
//@ts-ignore
// self.process = {}
// delete self.importScripts

// import { App1 } from './app'
// import { getInitialState, setState } from './state'
// import { sleep, getGlobal } from 'misc-utils-of-mine-generic'
// import { loadLibraries } from '../src/loadLibraries'

// const { expose } = require("threads")

// expose(loadLibs.fn)
// expose(async ()=>99999999999)
// type LibHandler <A, B, N extends string>= (op: Op<A, B, N>)=>Promise<B> 
// export async function getHandlers() {
  // return {
  //   //@ts-ignore
  //   version: '1.2.',
  //   loadLibs: loadLibs.fn
  // }
  // console.log('returning');
  
  // return loadLibs.fn
// }


// main().catch(console.error)


// export const  libHandler : LibHandler= async ()=>{
//   if (op.name === 'loadLibraries') {
//     return await loadLibsOp.fn(op) as any
//   } else {
//     return {error: 'op not known '+op.name} as any
//   }
// }
// import { fromNow } from 'hrtime-now'
// import {
//   Worker, isMainThread, parentPort, workerData
// } from 'worker_threads'

// async function main() {
//   if (isMainThread) {
//     const t0 = Date.now()
//     const worker = new Worker(__filename, {
//       workerData: ''
//     });
//     worker.on('message', m => {
//       console.log('message Libraries loaded in ' + (Date.now() - t0));

//     });
//     worker.on('error', error => {
//       console.error('ERROR loading libraries', error);
//     });
//     worker.on('exit', code => {
//       if (code !== 0) {
//         console.error('ERROR loading libraries', code);
//       } else {
//         console.log('exit Libraries loaded in ' + (Date.now() - t0));
//       }
//     })
//     new App1().render()
//     setState({ working: `Loading image libraries...` })
//   } else {
//     console.log(`Loading image libraries...` );
//     await fromNow(loadLibraries, t => setState({ working: `Libraries loaded in ${t}` }))
//     console.log('Loaded');
//   }
// }
// main()



import { flat } from 'misc-utils-of-mine-generic'
// import { spawn, Thread, Worker } from "threads"
import { loadLibraries } from '../src/loadLibraries'
import { App1 } from './app'
import { Handlers } from './libWorker'

if (typeof Array.prototype.flat === 'undefined') {
  Array.prototype.flat = function(this: any[]) {
    return flat(this)
  }
}

export let handlers: Handlers

export let app: App1

async function main() {
  // const w = new Worker("./libWorker")
  // handlers = await spawn(w)  as any
  console.log('Loading libraries...')
  await loadLibraries()
  console.log('Starting App...')
  app = new App1()
  app.render()
  app.start()
}
main().catch(console.error)

// const img = 'test/assets/lenna.jpg'
  // const name = `tmp${basename(img)}`
  // const f = new File(basename(img), new Uint8ClampedArray(readFileSync(img)))
  // const command = `convert ${f.name} -rotate 33 ${name}`
  // const result = mainSync({
  //   command,
  //   inputFiles: [f],
  //   debug: true
  // })
  // writeFileSync(name, result.outputFiles[0].content)

// async function main2() {
//   console.log('res', typeof cv)
//   const w = new Worker("./libWorker")
//   // setTimeout(() => {
//   //   w.terminate()
//   // }, 20000);
//   const handlers = await spawn(w)
//   await handlers.loadLibraries()
//   console.log('res', await handlers.test())
//   console.log('res', await handlers.test3())
//   w.terminate()
// }

// main2().catch(console.error)


// (global as any).MAGICA_WASM_LOCATION='/Users/sebastiangurin/git/magica/dist/src/imageMagick/compiled/magick.wasm'

// f Module!=="undefined"?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=function(status,toThrow){throw toThrow};Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;Module["


// import { getGlobal } from 'misc-utils-of-mine-generic'

// const { spawn, Thread, Worker } = require("threads")
// async function main2() {
//   try {

// // // console.log('before');

//   const handlers = await spawn(new Worker("./libWorker"))  
// // //   // const handlers = await spawn(new Worker("../dist/desktop-client/libWorker.js"))  
// // // console.log('About to');

// // // // console.log('req');
// const r = await handlers({})
// console.log('res', r);

// // // console.log(typeof cv, r);

// // //   } catch (error) {
// // //     console.error('lkasjdlkasjd');

// // //   }
// // // setTimeout(() => {
// // // console.log(typeof cv);

// // // }, 4000);
// // // debugger  
// //   // console.log('handlers', handlers);

// //   // const r = await handlers.loadLibs({})
// //   // console.log(r);

// //   //  node --inspect-brk node_modules/ts-node/dist/bin.js  -T /Users/sebastiangurin/git/mirada/black-eyes/desktop-client/main.ts

// // // const loadLibraries = fn as 
// // //     setState({ working: `Loading image libraries...` })
// // //    await fromNow((fn), t => setState({ working: `Libraries loaded in ${t}` }))



// // //   // const sum = await add(2, 3)

// //   // console.log(`2 + 3 = ${sum}`)

// //   // await Thread.terminate(add)
// }

// main2().catch(console.error)



// import {
//   Worker, isMainThread, parentPort, workerData
// } from 'worker_threads'

// async function main() {
//    await fromNow(loadLibraries, t => setState({ working: `Libraries loaded in ${t}` }))
//     new App1().render()
//     setState({ working: `Loading image libraries...` })
// main()

//   if (isMainThread) {
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


//   } else {
//     console.log(`Loading image libraries...` );
//     console.log('Loaded');
//   }
// }


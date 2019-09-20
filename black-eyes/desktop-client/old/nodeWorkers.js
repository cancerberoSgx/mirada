// const {
//   Worker, isMainThread, parentPort, workerData
// } = require('worker_threads');

// // console.log( {
// //   Worker, isMainThread, parentPort, workerData
// // } );

// if (isMainThread) {
//   // console.log('hola');
  
//   module.exports = function parseJSAsync(script) {
//     return new Promise((resolve, reject) => {
//       const worker = new Worker(__filename, {
//         workerData: script
//       });
//       worker.on('message', d=>{
//         // console.log('seba', d);
//         resolve()
//       });
//       worker.on('error', reject);
//       worker.on('exit', (code) => {
//         if (code !== 0)
//           reject(new Error(`Worker stopped with exit code ${code}`));
//       });
//     });
//   };
// } else {
//   console.log(typeof importScripts==="function", 'sebabababab');
  
//   // const { parse } = require('some-js-parsing-library');
//   // const script = workerData;
//   parentPort.postMessage('parse(script)');
// }
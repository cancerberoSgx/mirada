// import test, {ExecutionContext, CbExecutionContext} from 'ava'

// import { OjosServer } from '../../src/server';
// import { connect } from 'net';
// import {  decodeAsync, decode, encode   } from '@msgpack/msgpack'
// import { promises, mkdirSync } from 'fs';
// import {magickLoaded, File as MagicaFile, run } from 'magica'
// import {loadOpencv} from 'mirada'
// import {MagicaCodec} from 'ojos'
// import { FsOperation, FsResult } from '../../src/fs';
// import {fromNow} from 'hrtime-now'
// const { readFile } = promises

// test.cb('ok1', async t => {

// await fromNow( loadLibraries, t=>console.log(`Lading libraries took ${t}`))
// test2(t)
// const s = new OjosServer({ listen: { port: 9988, readableAll: true, writableAll: true } })
//   // const s = new OjosServer({listen: {path: '/tmp/unixOjos.sock'}})
//   s.start()
// })


// // main()

// // async function main() {
// //   // const t0 = Date.now()
// //   // await loadLibraries()
// // // console.log(print);

// // }

// async function loadLibraries() {
//   await magickLoaded;
//   const Magica = {
//     fromArrayBuffer: MagicaFile.fromArrayBuffer,
//     fromRGBAImageData: async (data: ImageData) => MagicaFile.fromRGBAImageData(data as any),
//     run
//   };
//   await loadOpencv({ formatProxies: [() => new MagicaCodec(Magica)] });
// }

// function test2(t: CbExecutionContext) {
//   setTimeout(async () => {
//     const socket = connect({ port: 9988, readable: true, writable: true }, async () => {
//       const d: FsOperation = {
//         name: 'writeFile',
//         file: {
//           name: 'lenna.jpg',
//           content: new Uint8ClampedArray(await readFile('../ojos/test/assets/shape.jpg'))
//         }
//       };
//       socket.on("data", async (data) => {
//         const res = decode(data) as FsResult
//         console.log('response 1', res);
//         t.true(res.file && res.file.name==='lenna.jpg')
//       });
//       socket.write(encode(d));
//     });
//   }, 2000);
//   setTimeout(() => {
//     const socket = connect({ port: 9988, readable: true, writable: true }, () => {
//       socket.on("data", async (data) => {
//         const res = decode(data) as FsResult
//         // console.log('response2', res);
//         t.true(res.file && res.file.name==='lenna.jpg')
//         t.end()
//       });
//       const d: FsOperation = {
//         name: 'readFile',
//         fileName: 'lenna.jpg'
//       };
//       socket.write(encode(d));
//     });
//   }, 4000);
// }

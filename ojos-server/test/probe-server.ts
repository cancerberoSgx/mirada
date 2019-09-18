import { OjosServer } from '../src/server';
import { getFs, FsOperation } from '../src/fs';
import { get } from 'http';
import { connect } from 'net';
import { encode, decode, Encoder, Decoder, createDecodeStream, createEncodeStream } from 'msgpack-lite'
import { promises, mkdirSync } from 'fs';
const { readFile } = promises

async function main() {
  setTimeout(async () => {
    const socket = connect({ port: 9988, readable: true, writable: true }, ()=>{
// socket.on('data', data=>console.log('client' , decode(data)))
//       socket.write(encode({m: 'hello'}))
      // console.log('c1');
// encodeStream.end()
    const d: FsOperation = {
      name: 'writeFile',
      //@ts-ignore
      file: {
        name: 'lenna.jpg',
        content: []//new Uint8ClampedArray( [1])//await readFile('test/assets/lenna.jpg'))
      }
    }
    // var encodeStream = createEncodeStream();
// encodeStream.pipe(socket);
// var decodeStream = createDecodeStream();

socket .on("data", async data=>{
  console.log('ds data asdasdasd', data)
    })
      // const result = await handleOp(data)
// encodeStream.end();

socket.write(encode(d));
// encodeStream.end();
});


    // const ds = createDecodeStream()
    // c.pipe(ds)
    // const es = createEncodeStream()
    // es.pipe(c)

    // ds.on('data', d => console.log('ds data asdasdasd', d))
    // ds.on('end', () => console.log('ds end'))
    // es.end(d)
  }, 2000);

  setTimeout(() => {
    const socket = connect({ port: 9988, readable: true, writable: true }, ()=>{
      // console.log('c11');
// var decodeStream = createDecodeStream();
socket.on("data", async data=>{
  const res = decode(data)
  // console.log('ds data asdasdasd', data)
      // const result = await handleOp(data)
// encodeStream.end();
})
  const d: FsOperation = {
      name: 'readFile',
      fileName: 'lenna.jpg'
    }
    // var encodeStream = createEncodeStream();
// encodeStream.pipe(socket);
// encodeStream.write(d);
// encodeStream.end();
socket.write(encode(d))
    })
  


    // // c.on('data', d => console.log('ddddd', d))
    // const ds = createDecodeStream()
    // c.pipe(ds)
    // const es = createEncodeStream()
    // es.pipe(c)
    // ds.on('data', d => console.log('ds data 123123123123', d))
    // ds.on('end', () => console.log('ds end'))
    // // ds.on('data', async data => {
    // //   console.log('ds data 123123123123', data)
    // //   // es.write(d)
    // // })
    // es.end(d)
  }
    , 4000);


  // ds.on('end',() =>console.log('ds end'))

  // var e = new Encoder();
  // e.on('end', ()=>console.log('client encoding end'))
  // e.on('data', ()=>console.log('client data'))
  //  e.encode(d)
  // c.end(Buffer.from('hello'))
  //   // var e = new Encoder();
  //   e.on('end', ()=>{
  //     console.log('client encoding end')})
  //   e.on('data', data=>{
  //     console.log('client data', data, data.toString(), decode(data))
  //   var decoder = new Decoder();
  //   // decoder.on('end', (err, d)=>{
  //   //   console.log('client encoding end', err, d)
  //   //   })
  //   // decoder.on('data', (err, data)=>{
  //   //   console.log('data', err, data)
  //   //  const d =  decoder.decode(data)
  //   //  decoder.end(data)
  //   //   })

  //     })
  //  //  e.encode(d)
  //  e.encode(d)
  //   c.end(Buffer.from('hello'))
  // //   c.end(Buffer.from('hello'))
  //   // c.end(Buffer.from('hello'))
  //   })
  //   c.on('data', (d)=>{
  //     console.log('CLICICICIC', d);

  //   })


  const s = new OjosServer({ listen: { port: 9988, readableAll: true, writableAll: true } })
  // const s = new OjosServer({listen: {path: '/tmp/unixOjos.sock'}})
  s.start()
}

main()
// async function init(){
//   await getFs()
// }
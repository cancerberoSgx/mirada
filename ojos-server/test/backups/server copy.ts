// import { createServer, Server, ListenOptions, Socket } from 'net';
// import { encode, Encoder, Decoder, createDecodeStream, createEncodeStream, EncodeStream, DecodeStream, decode } from 'msgpack-lite'
// import { handleOp } from './ops';
// import { getFs } from './fs';

// interface ServerOptions {
//   listen: ListenOptions
// }
// export class OjosServer {
//   server: Server = null as any
//   // ds: DecodeStream;
//   // es: EncodeStream;
//   constructor(protected options: ServerOptions) {
//     this.handleServerCreate = this.handleServerCreate.bind(this)
//     this.handleServerError = this.handleServerError.bind(this)
//     this.handleSocketConnection = this.handleSocketConnection.bind(this)
//     this.onSigInt = this.onSigInt.bind(this)
//     //     this.ds = createDecodeStream()
//     // this. es = createEncodeStream()
//   }

//   handleSocketConnection(socket: Socket) {
//     console.log('s1');
    
// var decodeStream = createDecodeStream();
// socket.pipe(decodeStream).on("data", async data=>{
//     console.log('s2');
//       const result = await handleOp(data)
//     var encodeStream = createEncodeStream();
// encodeStream.pipe(socket);
// encodeStream.write({result: Date.now()});
// // encodeStream._flush(()=>{

// // })
// // encodeStream.write('\n')
// encodeStream.end();
// });

//     // const b = new 

// // send multiple objects to stream
// // encodeStream.write({baz: "qux"});

// // call this once you're done writing to the stream.

//     // socket.on('data', data=>{
      
//     // })
//     // socket.on('end', ()=>{
      
//     // })
//     const data = decode
//     // socket.write()
//     const ds = createDecodeStream()
//     socket.pipe(ds)
//     const es = createEncodeStream()
//     es.pipe(socket)
//     ds.on('data', async data => {
//       // console.log('server ds data', data);
//       const result = await handleOp(data)
//       // console.log('server sending result', result);
//       // es.write(result)
//       es.end({r: 'result '+Date.now()})
//       // ds.end(result)
//     })
//   }

//   start() {
//     this.server = createServer(this.handleSocketConnection)
//     this.server.on('error', this.handleServerError)
//     this.server.listen(this.options.listen, this.handleServerCreate)
//   }

//   handleServerError(err: any) {
//     console.error('Server error ', err);
//     throw err
//   }

//   handleServerCreate() {
//     console.log('Server Listening at ' + JSON.stringify(this.server.address()))
//     getFs()
//     process.on('SIGINT', this.onSigInt);
//   }

//   onSigInt() {
//     // console.log('\n', "Terminating.", '\n');
//     this.server.close();
//     process.exit(0);
//   }


//   // socket.on('end', () => this.handleSocketEnd(socket));
//   // socket.on('data', (buffer) => this.handleSocketData(buffer, socket));
//   // socket.on('connection', this.handleSocketConnection)
//   // }

//   //   handleSocketData(data: Buffer, socket: Socket) {
//   //     console.log('SERVER handleSock1tData.');
//   //      var decoder = new Decoder();
//   //   decoder.on('end', (err, d)=>{
//   //     console.log('SERVER encoding end', err, d)
//   //     })
//   //   decoder.on('data', (err, data)=>{
//   //     console.log('SERVER data', err, data)
//   //   //  const d =  decoder.decode(data)
//   //   //  console.log(d);

//   //     })
//   //     // console.log(data);

//   // console.log(decoder.decode(data));

//   //   }

//   handleSocketEnd(socket: Socket) {
//     console.log('Client disconnected.');
//   }

// }

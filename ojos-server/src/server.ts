import { createServer, Server, ListenOptions, Socket } from 'net';
import { encode, Encoder, Decoder, createDecodeStream, createEncodeStream, EncodeStream, DecodeStream, decode } from 'msgpack-lite'
import { handleOp, Msg, ResponseMsg } from './ops';
import { getFs } from './fs';

interface ServerOptions {
  listen: ListenOptions
}
export class OjosServer {
  server: Server = null as any
  cons: any = {}
  constructor(protected options: ServerOptions) {
    this.handleServerCreate = this.handleServerCreate.bind(this)
    this.handleServerError = this.handleServerError.bind(this)
    this.handleConnectionAcknowledged = this.handleConnectionAcknowledged.bind(this)
    this.handleSocketConnection = this.handleSocketConnection.bind(this)
    this.onSigInt = this.onSigInt.bind(this)
  }

  async handleSocketConnection(socket: Socket) {
    console.log('Client connected.');
    console.log("Sending {name: 'welcome'}");
    await this.write(socket, { name: 'welcome' })
    // const response = await this.read(socket)
    // console.log('Connection successful, response: ', response);

  }
  async write<T extends ResponseMsg>(socket: Socket, op: T): Promise<void> {
    const b = encode(op)
    socket.write(b)
  }

  // async read<T extends Msg>(socket: Socket) : Promise<T>{
  //   return new Promise(resolve=>{
  //     socket.on('data', data=>{
  //       const b = decode(data)
  //       resolve(b)
  //     })
  //   })
  // }

  async  start() {
    process.on('SIGINT', this.onSigInt);
    await getFs()
    this.server = createServer(this.handleConnectionAcknowledged)
    this.server.on('error', this.handleServerError)
    this.server.listen(this.options.listen, this.handleServerCreate)
    this.server.on('connection', this.handleSocketConnection)
  }
  async handleConnectionAcknowledged(socket: Socket) {
    console.log('Connection acknowledged.');
    var self = Date.now();
    this.cons[self] = (socket);
    socket.on('end', () => {
      console.log('Client disconnected.');
      delete this.cons[self];
    });

    socket.on('data', async data => {
      console.log('server data');
      
      const req = decode(data)

      console.log('Client response: ', req);
      if (req.name === 'welcome') {
        console.log("Client's snoot confirmed booped.");
        return;
      }
      const result = await handleOp(req)
      console.log('Response: ', result);

      await this.write(socket, result)
      // resolve(b)
    })

    // const req = await this.read(socket)


    // const result = await handleOp(req)
    // await this.write(socket, result)
  }

  handleServerError(err: any) {
    console.error('Server error ', err);
    throw err
  }

  handleServerCreate() {
    console.log('Server Listening at ' + JSON.stringify(this.server.address()))
  }

  onSigInt() {
    console.log('\n', "Terminating.", '\n');
    this.server.close();
    process.exit(0);
  }

  handleSocketEnd(socket: Socket) {
    console.log('Client disconnected.');
  }

}

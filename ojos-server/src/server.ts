import { createServer, Server, ListenOptions, Socket } from 'net';
import {  decodeAsync, decode, encode   } from '@msgpack/msgpack'
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

  protected async handleSocketConnection(socket: Socket) {
    await this.write(socket, { name: 'welcome' })
  }

  protected async write<T extends ResponseMsg>(socket: Socket, op: T): Promise<void> {
    const b = encode(op)
    socket.write(b)
  }

  async  start() {
    process.on('SIGINT', this.onSigInt);
    await getFs()
    this.server = createServer(this.handleConnectionAcknowledged)
    this.server.on('error', this.handleServerError)
    this.server.listen(this.options.listen, this.handleServerCreate)
    this.server.on('connection', this.handleSocketConnection)
  }

  protected async handleConnectionAcknowledged(socket: Socket) {
    console.log('Connection acknowledged.');
    var self = Date.now();
    this.cons[self] = (socket);
    socket.on('end', () => {
      console.log('Client disconnected.');
      delete this.cons[self];
    });

    socket.on('data', async data => {
      const req = decode(data) as Msg
      if (req.name === 'welcome') {
        return;
      }
      const result = await handleOp(req)
      await this.write(socket, result)
    })
  }

  protected handleServerError(err: any) {
    console.error('Server error ', err);
    throw err
  }

  protected handleServerCreate() {
    console.log('Server Listening at ' + JSON.stringify(this.server.address()))
  }

  protected onSigInt() {
    console.log('\n', "Terminating.", '\n');
    this.server.close();
    process.exit(0);
  }

 protected handleSocketEnd(socket: Socket) {
    console.log('Client disconnected.');
  }

  // protected async read<T extends Msg>(socket: Socket) : Promise<T>{
  //   return new Promise(resolve=>{
  //     socket.on('data', data=>{
  //       const b = decode(data)
  //       resolve(b)
  //     })
  //   })
  // }
}

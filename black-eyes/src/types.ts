
export interface OperationHandler<T extends Msg = Msg>{
handle(payload:T):Promise<ResponseMsg>
}

export interface ResponseMsg extends Msg {
  error?: string;
}

export interface Msg {
  name: string;
}

export interface FsResource {
  name:string
  content:Uint8ClampedArray 
}

export interface FsResult extends ResponseMsg {
  file?: FsResource
}

export interface Fs extends  OperationHandler<FsOperation>{
  noOpenCvIoSupport?: boolean
  noImageMagickIoSupport?: boolean
  write(f:FsResource):Promise<void>
  read(name:string):Promise<FsResource|undefined>
  handle(p:FsOperation):Promise<FsResult>
  name:string
}

export interface FsOperation extends Msg {
  file?: FsResource
  fileName?:string
  name:'writeFile'|'readFile'
}

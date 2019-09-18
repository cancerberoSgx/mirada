import { FsResource } from './fs'

const ops:{[a:string]:OperationHandler} = {}

export function registerOperation<T extends Msg>(name:string, handler:OperationHandler<T>) {
ops[name] = handler
}

export async function handleOp(o:Msg):Promise<ResponseMsg>{
  const h = ops[o.name]
  if(!h){
    return {
      ...o,
      error: 'Operation handler not found for '+o.name
    }
  }
  return await h.handle(o)
}

export interface OperationHandler<T extends Msg = Msg>{
handle(payload:T):Promise<ResponseMsg>
}

export interface ResponseMsg extends Msg{
  error?: string
}

export interface Msg {
  name:string
}
import { Msg, ResponseMsg, OperationHandler } from './types'

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

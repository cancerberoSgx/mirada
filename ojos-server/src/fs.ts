import { promises, mkdirSync } from 'fs';
import { join } from 'path';
import { registerOperation} from './ops';
import { ResponseMsg, Msg, Fs, FsResource, FsOperation, FsResult } from "./types";
const {writeFile, readFile} = promises

interface FsOptions {
  folder:string
}

class FsImpl implements Fs{
  name='fs'
  constructor (protected options:FsOptions) {    
  }

  async write(f:FsResource) {
    await writeFile(this.path(f.name),f.content)
  }

  async read(name:string) {
   const content = new Uint8ClampedArray(await readFile(this.path(name) ))
   return {content, name}
  }

  private path(f: string): string  {
    return join(this.options.folder, f);
  }

  async handle(t:FsOperation): Promise<FsResult>{
    if(t.name==='writeFile'){
   await this.write(t.file!)
   return {
...t, 
   }
    }
    else    if(t.name==='readFile'){
      return {
        ...t,
        file: await this.read(t.fileName!)
      }
    }
    else {
      return {
        ...t,
        error: 'Incorrect operation'
      }
    }
  }
}

let _fs:Fs=null as any
export function getFs():Fs {
if(!_fs) {
  mkdirSync('tmp_server_fs', {recursive: true})
  _fs=new FsImpl({folder: 'tmp_server_fs'})
  registerOperation('writeFile', _fs)
  registerOperation('readFile', _fs)
}
return _fs
}
import { fromArrayBuffer, fromFile } from 'mirada'
import { asArray, RemoveProperties, serial } from 'misc-utils-of-mine-generic'
import { run, RunOptions } from 'ojos'
import { FsResource } from './types'

type Operations = any

export interface LibOperation<T extends Operations = Operations> {
  name: T
  src: LibFile[]
  dst: LibFile[]
}

export interface LibFile {
  name?: string
  path: string
}

interface LibRunOptions<T extends LibOperation[]> {
  src: LibFile | LibFile[]
  ops: T
}

interface OjosRunOptions<T extends LibOperation[]> extends RemoveProperties<RunOptions, 'src' | 'ops'>, LibRunOptions<T> {
  src: LibFile | LibFile[]
}
interface LibRunResult {
  files: LibFile[]
}

export async function ojosRun<T extends LibOperation[]>(options: LibRunOptions<T>): Promise<LibRunResult> {
  const o = await buildRunOptions(options)
  const r = await run(o)
  return { ...r, files: r.images.map(i => ({ name: i.name, path: i.name })) }
}


async function buildRunOptions<T extends LibOperation[]>(o: OjosRunOptions<T>): Promise<RunOptions> {
  return {
    ...o,
    src: await serial(asArray(o.src).map(f => async () => {
      return { ...f, mat: await fromFile(f.path), name: f.name || f.path }
    })),
    ops: o.ops.map(op => ({
      ...op,
      src: op.src.find(f => f)!,
      dst: op.dst.find(f => f)
    })).map(op => ({
      ...op,
      src: op.src.name || op.src.path,
      dst: op.dst ? op.dst.name || op.dst.path : 'todoDst.png'
    }))
  }
}

function matFromFile(f: FsResource) {
  return fromArrayBuffer(f.content.buffer)
}


// class OjosFile extends File implements LibFile {
//   constructor(public path:string, public mat:Mat, public name:string=basename(path)){
//     super(name, mat)
//   }
// }

// interface OpenCvFile extends Required<LibFile>, RemoveProperties< ScriptMat, 'name'>  {
// }

// interface OjosBaseOperationOptions extends RemoveProperties< OperationExecBaseOptions, 'src'|'dst'> , LibOperation{
//   src:string|OpenCvFile
//   dst?:string|FsResource
// }

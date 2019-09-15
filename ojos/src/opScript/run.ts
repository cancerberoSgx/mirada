import { Mat } from 'mirada'
import { asArray, RemoveProperties } from 'misc-utils-of-mine-generic'
import { operationClasses, OperationNames, OperationOptions } from '../op/metadata'
import { ParseOptions, parseStatementLines, template, parseStatement, ScriptLanguage, OpsGenerator } from './script'

export interface RunOptions<T extends ScriptOperation<OperationNames>[] = ScriptOperation<OperationNames>[]> {
  ops: T|string
  language?: ScriptLanguage
  src?: ScriptMat | ScriptMat[]
}

export interface ScriptMat {
  name: string,
  mat: Mat
}

export type ScriptOptions<N extends OperationNames> = Partial<RemoveProperties<OperationOptions[N], 'src' | 'dst'>>

export type ScriptOperation<N extends OperationNames = OperationNames> = ScriptOptions<N> & {
  name: N
  src: string
  dst: string
}

export interface ScriptContext {
  images: ScriptMat[]
  options: RunOptions
}

export async function run<T extends ScriptOperation[]>(options: RunOptions<T>) {
  const context:ScriptContext = {images: asArray(options.src || []), options}
 const gen = new OpsGenerator(Array.isArray(options.ops) ? options.ops : {script: options.ops, language: options.language})
 let op : ScriptOperation<OperationNames>
 while((op=await gen.next(context) as any)){
  //  if(!op){}
//  }
  // const ops = resolveOps(options)
  // options.ops.forEach(op => {
    const src = context.images.find(o => o.name === op.src)
    if (!src) {
      throw new Error('Input image "' + op.src + '" not found. Aborting.')
    }
    const Class = operationClasses[op.name] as any
    if (!Class) {
      throw new Error('Operation "' + op.name + '" not recognized. Aborting.')
    }
    const dst = context.images.find(o => o.name === op.dst)
    const options = { ...op, src: src.mat, dst: dst ? dst.mat : undefined }
    new Class().exec(options as any)
    if (!dst) {
      context.images.push({ name: op.dst, mat: options.dst! })
    }
  // })
 }
  return context
}

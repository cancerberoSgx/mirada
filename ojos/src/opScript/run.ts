import { Mat } from 'mirada'
import { asArray, RemoveProperties } from 'misc-utils-of-mine-generic'
import { operationClasses, OperationNames, OperationOptions } from '../op/metadata'

export interface RunOptions<T extends ScriptOperation<OperationNames>[] = ScriptOperation<OperationNames>[]> {
  ops: T
  src?: ScriptMat | ScriptMat[]
}

export interface ScriptMat {
  name: string,
  mat: Mat
}

export type ScriptOperation<N extends OperationNames = OperationNames> = RemoveProperties<OperationOptions[N], 'src' | 'dst'> & {
  name: N
  src: string
  dst: string
}

export function run<T extends ScriptOperation[]>(o: RunOptions<T>) {
  const images = asArray(o.src || [])
  o.ops.forEach(op => {
    const src = images.find(o => o.name === op.src)
    if (!src) {
      throw new Error('Input image "' + op.src + '" not found. Aborting.')
    }
    const Class = operationClasses[op.name] as any
    if (!Class) {
      throw new Error('Operation "' + op.name + '" not recognized. Aborting.')
    }
    const dst = images.find(o => o.name === op.dst)
    const options = { ...op, src: src.mat, dst: dst ? dst.mat : undefined }
    new Class().exec(options as any)
    if (!dst) {
      images.push({ name: op.dst, mat: options.dst! })
    }
  })
  return {
    images
  }
}

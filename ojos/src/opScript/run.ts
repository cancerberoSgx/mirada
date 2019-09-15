import { ImageOperation, OperationExecBaseOptions } from '../op/types';
import { RemoveProperties, asArray } from 'misc-utils-of-mine-generic';
import { OperationNames, operationClasses, OperationOptions } from '../op/metadata';
import { Mat } from 'mirada';

export interface RunOptions<T extends ScriptOperation<OperationNames>[] = ScriptOperation<OperationNames>[]>{
  ops: T
  src?: ScriptMat | ScriptMat[]
}

export interface ScriptMat {
  name: string,
  mat: Mat
}

export type ScriptOperation<N extends OperationNames=OperationNames> = RemoveProperties<OperationOptions[N], 'src' | 'dst'> & {
  name: N
  src: string
  dst: string
}

// TODO: test src:'foo', dst:'foo'
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


// /**
//  * Returns an fixed length array with item type TItem. Tuple will validate that a value assigned dont have
//  * more than L keys but when accessing it doesn't validate. ie: `let a1:Tuple<number, 2> = [1,2,3]` causes
//  * error but this is not:  `declare let a1:Tuple<{ a: number }, 2>  let b = a1[5]`.
//  *
//  * If you want to validate this, go to ArrayLiteral, but will only work for limited L value
//  */
// export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
//   length: TLength
// }
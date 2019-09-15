import { asArray } from 'misc-utils-of-mine-generic'
import { operationClasses, OperationNames } from '../op/metadata'
import { OpsGenerator } from './script'
import { RunOptions, ScriptContext, ScriptOperation } from './types'

export async function run<T extends ScriptOperation[]>(options: RunOptions<T>) {
  const context: ScriptContext = { images: asArray(options.src || []), options, vars: {} }
  const gen = new OpsGenerator(Array.isArray(options.ops) ? options.ops : { script: options.ops, language: options.language })
  let op: ScriptOperation<OperationNames>
  while ((op = await gen.next(context) as any)) {
    const src = context.images.find(o => o.name === op.src)
    if (!src) {
      throw new Error('Input image "' + op.src + '" not found. Aborting.')
    }
    const Class = operationClasses()[op.name] as any
    if (!Class) {
      throw new Error('Operation "' + op.name + '" not recognized. Aborting.')
    }
    const dst = context.images.find(o => o.name === op.dst)
    const options = { ...op, src: src.mat, dst: dst ? dst.mat : undefined }
    new Class().exec(options as any)
    if (!dst) {
      context.images.push({ name: op.dst, mat: options.dst! })
    }
  }
  return context
}

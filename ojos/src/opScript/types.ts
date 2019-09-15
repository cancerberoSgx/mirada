import * as mirada from 'mirada'
import { FS, Mat } from 'mirada'
import { RemoveProperties, UnionToIntersection } from 'misc-utils-of-mine-generic'
import { OperationNames, OperationOptions } from '../op/metadata'

export interface RunOptions<T extends ScriptOperation<OperationNames>[] = ScriptOperation<OperationNames>[]> {
  ops: T | string;
  language?: ScriptLanguage;
  src?: ScriptMat | ScriptMat[];
}

interface ScriptMat {
  name: string;
  mat: Mat;
}

export type ScriptOperation<N extends OperationNames = OperationNames> = Partial<RemoveProperties<OperationOptions[N], 'src' | 'dst'>> & {
  name: N;
  src: string;
  dst: string;
}

export interface ScriptContext {
  images: ScriptMat[];
  options: RunOptions;
  vars: {
    [s: string]: any;
  };
}

export type ScriptLanguage = 'json' | 'statements'

export interface ParseOptions {
  script: string
  language?: ScriptLanguage
}

export interface TemplateContext extends ScriptContext {
  cv: typeof cv
  mirada: typeof mirada
  FS: FS
}

export type AllOptionNames = keyof UnionToIntersection<OperationOptions[keyof OperationOptions]>

export type ParsedResult = RemoveProperties<Partial<{ [s in AllOptionNames]: any }>, 'src' | 'dst'> & {
  name: OperationNames
  src: string
  dst: string
}

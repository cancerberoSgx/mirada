import { Options } from './main';
import { ls } from 'shelljs';
import { Doxygen2tsOptions } from '../doxygen2ts';
import { withoutExtension, notFalsy, notSameNotFalsy } from 'misc-utils-of-mine-generic';
import { writeFileSync } from 'fs';
import{Project, tsMorph} from 'ts-simple-ast-extra'
import { join } from 'path';

export function writeIndexTs(o: Doxygen2tsOptions){
  const s = `${[...ls(o.tsOutputFolder).filter(e=>e.endsWith('.ts')), 'cTypes.ts']
  .map(withoutExtension)
  .map(f=>`export * from './${f}'`).join('\n')}`
  writeFileSync(join(o.tsOutputFolder, 'cTypes.ts'), renderBuiltInTypes())
  writeFileSync(join(o.tsOutputFolder, 'index.ts'), s)
}

function getTypeReferences(content: string){
  const p = new Project()
  const file = p.createSourceFile('f.ts', content)
  return file.getDescendantsOfKind(tsMorph.SyntaxKind.TypeReference).map(r=>r.getFirstChildByKind(tsMorph.SyntaxKind.Identifier).getText()).filter(notSameNotFalsy)
}

export function addImports(content: string, o:Doxygen2tsOptions){
return `
import ${getTypeReferences(content).join(', ')} from './index.ts'
`
}

function renderBuiltInTypes(){
  return `
export type int = number
export type char = any
export type bool = boolean
export type float = number
export type double = number
export type uint64 = any
export type uint64_t = any
export type uint32 = any
export type uint32_t = any
export type uint8 = any
export type uint8 = any
export type uchar = any
export type char = any
export type size_t = any
export type uint = any
export type short = any
export type ushort = any
  `.trim()
}

const cTypeMap_ = {
    'unsignedint': 'uint',
  'unsigned': 'any',
  'unsignedchar': 'uchar',
  'unsignedshort': 'ushort',
  'char*': 'any',
  'int*': 'any',
    'unsignedint*': 'any',
  'unsigned*': 'any',
  'unsignedchar*': 'any',
  'unsignedshort*': 'any',
}

export function cTypeMap(s:string) {
s = s.replace(/\s/g, '')
return cTypeMap_[s] || 'any'
}
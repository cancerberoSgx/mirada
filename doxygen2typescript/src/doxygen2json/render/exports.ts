import { readFileSync, writeFileSync } from 'fs'
import { notSameNotFalsy, withoutExtension } from 'misc-utils-of-mine-generic'
import { join } from 'path'
import { ls, mkdir } from 'shelljs'
import { Project, tsMorph } from 'ts-simple-ast-extra'
import { Doxygen2tsOptions } from '../doxygen2ts'
import { renderCTypesImports, renderCvExports } from './tsExports/types'
import { renderImportHacks } from './tsExports/hacks'

export function writeIndexTs(o: Doxygen2tsOptions) {
  const files = [
    ...ls(o.tsOutputFolder)
      .filter(e => e.endsWith('.ts'))
      .map(f => {
        addImports(f, o)
        return f
      }), '_cTypes.ts', '_hacks.ts']
  writeFileSync(join(o.tsOutputFolder, '_cTypes.ts'), renderCTypesImports())
  writeFileSync(join(o.tsOutputFolder, '_hacks.ts'), renderImportHacks())
  writeFileSync(join(o.tsOutputFolder, 'index.ts'), renderCvExports())
  writeFileSync(join(o.tsOutputFolder, '_types.ts'), `${files.map(f => `export * from './${withoutExtension(f)}'`).join('\n')}`)
  // heads up ! we are writing '../_opencvCustom.ts' so don't target the build directly on mirada's but on empty folder and copy it without overriding this file.
  writeFileSync(join(o.tsOutputFolder, '../_opencvCustom.ts'), `
export declare const FS: any
import {CV} from './opencv'
export declare var cv: CV
`)
  finalHacks(o)
}

function getExternalTypeReferences(content: string) {
  const p = new Project()
  const file = p.createSourceFile('f.ts', content)
  return file.getDescendantsOfKind(tsMorph.SyntaxKind.TypeReference)
    // // only import type references to types not declared in this file
    // .filter(t=>tryTo(()=>!t.getType().getSymbol().getDeclarations().find(d=>d.getSourceFile()===file)), true)
    .map(r => r.getFirstChildByKind(tsMorph.SyntaxKind.Identifier).getText()).filter(notSameNotFalsy)
}

function addImports(f: string, o: Doxygen2tsOptions) {
  const content = readFileSync(join(o.tsOutputFolder, f)).toString()
  var s = `
import { ${getExternalTypeReferences(content).join(', ')} } from './_types'
${content}
`
  writeFileSync(join(o.tsOutputFolder, f), s)
}


export function finalHacks(o: Doxygen2tsOptions) {
  const s = readFileSync(join(o.tsOutputFolder, 'Mat.ts')).toString()
  const s2 = s.replace(`} from './_types'`, `, Mat_} from './_types'`).replace(`export declare class Mat`, `export declare class Mat extends Mat_`)
  writeFileSync(join(o.tsOutputFolder, 'Mat.ts'), s2)
}

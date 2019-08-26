import { readFileSync, writeFileSync } from 'fs';
import { notSame, notSameNotFalsy, unique, dedup } from 'misc-utils-of-mine-generic';
import { basename, join } from 'path';
import { ls } from 'shelljs';
import { getTypeReferencesByDefinitionOrigin, Project } from 'ts-simple-ast-extra';
import { Doxygen2tsOptions } from '../doxygen2ts';
import { renderImportHacks } from './tsExports/hacks';
import { withoutTypeScriptExtension } from '../opencv2ts';

export function writeIndexTs(o: Doxygen2tsOptions) {
  const files = [
    ...ls(o.tsOutputFolder)
      .filter(e => e.endsWith('.d.ts'))
      .map(f => {
        addImports(f, o)
        return f
      }), '_hacks.d.ts']
  writeFileSync(join(o.tsOutputFolder, '_hacks.d.ts'), renderImportHacks())
  writeFileSync(join(o.tsOutputFolder, 'index.d.ts'), index)
  writeFileSync(join(o.tsOutputFolder, '_types.d.ts'), `
${files.map(f => `export * from './${withoutTypeScriptExtension(f)}'`).join('\n')}
  `.trim())
  fixMissingExtends(o)
  fixClasses(o)
  if (o.singleDeclaration) {
    // writeSingleDeclaration(o, [...files, '_types.d.ts'])
     const s = [...files, '_types.d.ts'].filter(notSame).map(f => `/* ${f} */\n\n${readFileSync(join(o.tsOutputFolder, f)).toString()}`).join('\n')
      writeFileSync(join(o.tsOutputFolder, '_single.d.ts'), s)
  }
  fixMissingImports(o)
}

const index = `
import * as _CV from './_types'
export type CV = typeof _CV
// declare global {
//   var cv: CV
// }
// export { cv }
export * from './_types'
export * from './_hacks'
`.trim()

// function writeSingleDeclaration(o: Doxygen2tsOptions, files: string[]) {
//   const s = files.map(f => `/* ${f} */\n\n${readFileSync(join(o.tsOutputFolder, f)).toString()}`).join('\n')
//   // writeFileSync(join(o.tsOutputFolder, '_single.d.ts'), s)
// }

function getExternalTypeReferences(content: string) {
  const p = new Project()
  const file = p.createSourceFile('f.d.ts', content)
  return getTypeReferencesByDefinitionOrigin({ node: file, origin: 'unknown' })
    .map(r => r.getText()).filter(notSameNotFalsy)
}

function addImports(f: string, o: Doxygen2tsOptions) {
  const content = readFileSync(join(o.tsOutputFolder, f)).toString()
  var s = `
import { ${getExternalTypeReferences(content).join(', ')} } from './_types'
${content}
`
  writeFileSync(join(o.tsOutputFolder, f), s)
}

export function fixMissingExtends(o: Doxygen2tsOptions) {
  const missingExtends = {
    'Mat': 'Mat_',
    'MatExpr': 'Mat',
    'CascadeClassifier': 'Mat'
  }
  Object.keys(missingExtends).forEach(k => {
    const s = readFileSync(join(o.tsOutputFolder, k + '.d.ts')).toString()
      .replace(`export declare class ${k}`, `export declare class ${k} extends ${missingExtends[k]}`)
    writeFileSync(join(o.tsOutputFolder, k + '.d.ts'), s)
  })
}

// export function fixMissingImportNames(o: Doxygen2tsOptions) {
//   const missingExtends = {
//     'CascadeClassifier': 'Mat'
//   }
//   Object.keys(missingExtends).forEach(k => {
//     const s = readFileSync(join(o.tsOutputFolder, k + '.d.ts')).toString()
//       .replace(`export declare class ${k}`, `export declare class ${k} extends ${missingExtends[k]}`)
//     writeFileSync(join(o.tsOutputFolder, k + '.d.ts'), s)
//   })
// }

export function fixClasses(o: Doxygen2tsOptions) {
  const removeMembers = {
    'MatExpr': 'size'
  }
  const p = new Project()
  Object.keys(removeMembers).forEach(k => {
    const f = p.createSourceFile(unique(k) + '.d.ts', readFileSync(join(o.tsOutputFolder, k + '.d.ts')).toString())
    const c = f.getClass(k)
    if (!c) {
      return console.error(`Expected to find class ${k}`);
    }
    const m = c.getMember(removeMembers[k])
    if (!m) {
      return console.error(`Expected to find member ${removeMembers[k]} in class ${k}`);
    }
    m.remove()
    writeFileSync(join(o.tsOutputFolder, k + '.d.ts'), f.getFullText())
  })
}

export function fixMissingImports(o: Doxygen2tsOptions) {
  const p = new Project();
  ls(o.tsOutputFolder + '/*.d.ts').filter(notSame)
    .filter(d => basename(d) !== '_single.d.ts')
    .map(f => {
      return p.createSourceFile(basename(f), readFileSync(f).toString());
    });
  let prefix = `Module '"./_types"' has no exported member '`
  const missing = p.getPreEmitDiagnostics()
    .filter(d => d.getSourceFile().getBaseName() !== '_single.d.ts')
    .map(d => d.getMessageText().toString())
    .filter(s => s.startsWith(prefix))
    .map(s => s.substring(prefix.length))
    .map(s => s.substring(0, s.indexOf('\'') !== -1 ? s.indexOf('\'') : s.length))
    .filter(notSame)
  writeFileSync(o.tsOutputFolder + '/_hacks.d.ts', `
${readFileSync(o.tsOutputFolder + '/_hacks.d.ts').toString()}\n\n
// Missing imports: 
${missing.map(t => `export type ${t} = any`).join('\n')}
`.trim()
  )
  // p.getSourceFiles().forEach(f => f.refreshFromFileSystemSync())
  // prefix = `Cannot find name '`
  // p.getPreEmitDiagnostics()
  //   .filter(d => d.getSourceFile().getBaseName() !== '_single.d.ts')
  //   .map(d => ({ message: d.getMessageText().toString(), file: d.getSourceFile().getBaseNameWithoutExtension() }))
  //   .filter(s => s.message.startsWith(prefix))
  //   .map(s => ({ ...s, message: s.message.substring(prefix.length) }))
  //   .map(s => ({ file: s.file, name: s.message.substring(0, s.message.indexOf('\'') !== -1 ? s.message.indexOf('\'') : s.message.length) }))
  //   .forEach(f => {
  //     const s = readFileSync(join(o.tsOutputFolder, f.file + '.d.ts')).toString()
  //       .replace(`} from './_types'`, `, ${f.name}} from './_types'`)
  //     writeFileSync(join(o.tsOutputFolder, f.file + '.d.ts'), s)
  //   })



  // dedup(missing2, (a, b) => a.file !== b.file && a.name !== a.name).forEach(f => {
  //   const s = readFileSync(join(o.tsOutputFolder, f.file + '.d.ts')).toString()
  //     .replace(`} from './_types'`, `, ${f.name}} from './_types'`)
  //     writeFileSync(join(o.tsOutputFolder, f.file + '.d.ts'), s)
  // })


  // .fore

}

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { notSame, notSameNotFalsy, unique, dedup, asArray } from 'misc-utils-of-mine-generic';
import { basename, join } from 'path';
import { ls } from 'shelljs';
import { getTypeReferencesByDefinitionOrigin, Project } from 'ts-simple-ast-extra';
import { Doxygen2tsOptions } from '../doxygen2ts';
import { renderImportHacks } from './exportsHacks';
import { withoutTypeScriptExtension } from '../opencv2ts';
import { TypeGuards, MethodDeclaration, PropertyDeclaration } from 'ts-morph';
import { cppPrimitiveToTsType } from './general';

export function writeIndexTs(o: Doxygen2tsOptions) {
  if (!o.onlyFix) {
    const files = [
      ...ls(o.tsOutputFolder)
        .filter(e => e.endsWith('.ts'))
        .map(f => {
          addImports(f, o)
          return f
        }), '_hacks.ts']
    writeFileSync(join(o.tsOutputFolder, '_hacks.ts'), renderImportHacks())
    writeFileSync(join(o.tsOutputFolder, 'index.ts'), index)
    writeFileSync(join(o.tsOutputFolder, '..', '_cv.ts'), `
import { CV } from './opencv'
declare global {
  var cv: CV 
}
`)
    writeFileSync(join(o.tsOutputFolder, '_types.ts'), `
${files.map(f => `export * from './${withoutTypeScriptExtension(f)}'`).join('\n')}\n`.trim())
    if (o.singleDeclaration) {
      const s = [...files, '_types.ts'].filter(notSame).map(f => `/* ${f} */\n\n${readFileSync(join(o.tsOutputFolder, f)).toString()}`).join('\n')
      writeFileSync(join(o.tsOutputFolder, '_single.ts'), s)
    }
  }
  fixMissingExtends(o)
  fixClasses(o)
  fixMissingImports(o)
  fixJsDocs(o)
}

const index = `
import * as _CV from './_types'
export type CV = typeof _CV
export * from './_types'
export * from './_hacks'
`.trim()

function getExternalTypeReferences(content: string) {
  const p = new Project()
  const file = p.createSourceFile('f.ts', content)
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

/**
 * renderCompoundClass (class.ts) now renders `extends` straight from doxygen's own <basecompoundref>
 * for every class that has a real C++ base - so this map only needs to cover the handful of classes
 * where the JS/embind runtime shape doesn't match the C++ hierarchy at all: Algorithm, Mat and MatExpr
 * have no C++ base class, but the generated .d.ts still wants them to extend a JS-only helper type.
 * If a class already got a real `extends` from doxygen data, it's left alone - these two sources should
 * never both apply to the same class.
 */
function fixMissingExtends(o: Doxygen2tsOptions) {
  const missingExtends = {
    'Mat': 'Mat_',
    'MatExpr': 'Mat',
    // 'CascadeClassifier': 'Mat',
    'Algorithm': 'EmscriptenEmbindInstance'
  }
  Object.keys(missingExtends).forEach(k => {
    const file = join(o.tsOutputFolder, k + '.ts')
    if (!existsSync(file)) {
      return
    }
    const s = readFileSync(file).toString()
    if (s.includes(`export declare class ${k} extends`)) {
      return // already has a real base class rendered from doxygen data, don't stack another one on top
    }
    writeFileSync(file, s.replace(`export declare class ${k}`, `export declare class ${k} extends ${missingExtends[k]}`))
  })
}

// function fixMissingImportNames(o: Doxygen2tsOptions) {
//   const missingExtends = {
//     'CascadeClassifier': 'Mat'
//   }
//   Object.keys(missingExtends).forEach(k => {
//     const s = readFileSync(join(o.tsOutputFolder, k + '.ts')).toString()
//       .replace(`export declare class ${k}`, `export declare class ${k} extends ${missingExtends[k]}`)
//     writeFileSync(join(o.tsOutputFolder, k + '.ts'), s)
//   })
// }

function fixClasses(o: Doxygen2tsOptions) {
  const removeMembers = {
    'MatExpr': 'size',
    'Mat': ['isSubmatrix', 'at', 'assignTo', 'setTo'],
  }
  const p = new Project()
  Object.keys(removeMembers).forEach(k => {
    const f = p.createSourceFile(unique(k) + '.ts', readFileSync(join(o.tsOutputFolder, k + '.ts')).toString())
    const c = f.getClass(k)
    if (!c) {
      return console.error(`Expected to find class ${k}`);
    }
    asArray(removeMembers[k])
      .forEach(name => {
        const members = c.getMembers()
          .filter(n => TypeGuards.isMethodDeclaration(n) || TypeGuards.isPropertyDeclaration(n))
          .filter((n: MethodDeclaration | PropertyDeclaration) => n.getName() === name)
        if (!members.length) {
          return console.error(`Expected to find member ${name} in class ${k}`);
        }
        members.forEach(m => {
          m.remove()
        })
      })
    writeFileSync(join(o.tsOutputFolder, k + '.ts'), f.getFullText())
  })
}

export function fixMissingImports(o: Doxygen2tsOptions) {
  const p = new Project();
  ls(o.tsOutputFolder + '/*.ts').filter(notSame)
    .filter(d => basename(d) !== '_single.ts')
    .map(f => {
      return p.createSourceFile(basename(f), readFileSync(f).toString());
    });
  let prefix = `Module '"./_types"' has no exported member '`
  const missing = p.getPreEmitDiagnostics()
    .filter(d => d.getSourceFile().getBaseName() !== '_single.ts')
    .map(d => d.getMessageText().toString())
    .filter(s => s.startsWith(prefix))
    .map(s => s.substring(prefix.length))
    .map(s => s.substring(0, s.indexOf('\'') !== -1 ? s.indexOf('\'') : s.length))
    .filter(notSame)
  writeFileSync(o.tsOutputFolder + '/_hacks.ts', `
${readFileSync(o.tsOutputFolder + '/_hacks.ts').toString()}\n\n
// Missing imports: 
${missing.map(t => `export type ${t} = ${missingImportType(t)}`).join('\n')}
`.trim()
  )
  const missingImports: any[] = [
    // { file: 'CascadeClassifier', name: 'Mat' }
  ]
  missingImports.forEach(f => {
    const s = readFileSync(join(o.tsOutputFolder, f.file + '.ts')).toString()
      .replace(`} from './_types'`, `, ${f.name}} from './_types'`)
    writeFileSync(join(o.tsOutputFolder, f.file + '.ts'), s)
  })
}

function fixJsDocs(o: Doxygen2tsOptions) {
  ls(o.tsOutputFolder + '/*.ts').filter(notSame)
    .forEach(k => {
      const s = readFileSync(k).toString()
        .replace(/\*\s+\@param/gm, `* @param`)
      writeFileSync(k, s)
    })
}

/**
 * Fallback for whatever is still unresolved after rendering: renderType (general.ts) already maps every
 * known C++ builtin (int, bool, uchar, size_t, ...) to its TS equivalent at render time via
 * cppPrimitiveToTsType, so a name reaching here is something genuinely unmodeled (a real missing type),
 * not a primitive the renderer failed to recognize - it's a last resort, not the primary mechanism.
 */
function missingImportType(t: string) {
  return cppPrimitiveToTsType[t] || 'any'
}
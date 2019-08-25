import { readFileSync, writeFileSync } from 'fs';
import { notSame, notSameNotFalsy, unique } from 'misc-utils-of-mine-generic';
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
  fixMissingImports(o)
}

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
    'MatExpr': 'Mat'
  }
  Object.keys(missingExtends).forEach(k => {
    const s = readFileSync(join(o.tsOutputFolder, k + '.d.ts')).toString()
      .replace(`export declare class ${k}`, `export declare class ${k} extends ${missingExtends[k]}`)
    writeFileSync(join(o.tsOutputFolder, k + '.d.ts'), s)
  })
}

export function fixClasses(o: Doxygen2tsOptions) {
  const removeMembers = {
    'MatExpr': 'size'
  }
  // const p = createProject(o); 
  const p = new Project()
  Object.keys(removeMembers).forEach(k => {
    const f = p.createSourceFile(unique(k)+'.d.ts', readFileSync(join(o.tsOutputFolder, k + '.d.ts')).toString())
    // const f = p.getSourceFiles().find(f => f.getBaseNameWithoutExtension() === k)!
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
  const p = createProject(o);
  const prefix = `Module '"./_types"' has no exported member '`
  const missing = p.getPreEmitDiagnostics()
    .map(d => d.getMessageText().toString())
    .filter(s => s.startsWith(prefix))
    .map(s => s.substring(prefix.length))
    .map(s => s.substring(0, s.indexOf('\'') !== -1 ? s.indexOf('\'') : s.length))
    .filter(notSame)
  const s = `
${readFileSync(o.tsOutputFolder + '/_hacks.d.ts').toString()}

// Missing imports: 
${missing.map(t => `export type ${t} = any`).join('\n')}
`.trim()
  writeFileSync(o.tsOutputFolder + '/_hacks.d.ts', s)
}

function createProject(o: Doxygen2tsOptions) {
  const p = new Project();
  ls(o.tsOutputFolder + '/*.d.ts').filter(notSame)
    .map(f => {
      return p.createSourceFile(basename(f), readFileSync(f).toString());
    });
  return p;
}

const index = `
import * as _CV from './_types'
export type CV = typeof _CV
export * from './_types'
export * from './_hacks'
`.trim()
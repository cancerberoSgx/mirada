import test from 'ava'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { removeWhites } from 'misc-utils-of-mine-generic'
import { buildDts, parseDoxygen, fixMissingImports } from '../src'
import { mkdir, exec, rm } from 'shelljs';

test('buildTs', async t => {
  var r = parseDoxygen({ xml: readFileSync('test/assets/mat.xml').toString() })
  var file = buildDts({
    defs: r,
    isOpenCv: true,
    debug: true,
    renderLocation: true,
    tsCodeFormatSettings: { indentSize: 2, convertTabsToSpaces: true },
    locationFilePrefix: 'https://github.com/opencv/opencv/tree/master/modules/core/include/',
  }).results[0]
  var s = removeWhites(file.content)
    ;[`\`\`\`cpp * M.at<double>(i,j) += 1.f;`, `of the [Mat](#d3/d63/classcv_1_1Mat}) class`, `declare class Mat {`]
      .map(s => removeWhites(s)).forEach(f => t.true(s.includes(f), f))
  writeFileSync('tmp.ts', file.content)
})

test('fixMissingImports', async t => {
  rm('-rf', 'tmpBuildTsTest')
  var a = `
import { Mat } from './_types'
export const A = 1
`.trim()
  var _types = `
export * from './a'
export * from './_hacks'
`.trim()
  var _hacks = `
export type B = any
export type Vec3 = any
`.trim()
  const tsconfig = `
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["esnext", "dom"], 
    "sourceMap": true,
    "outDir": "./dist", 
    "rootDir": ".",
    "declaration": true
  },
  "include": ["src"]
}
`.trim()
  mkdir('-p', 'tmpBuildTsTest/src')
  writeFileSync('tmpBuildTsTest/tsconfig.json', tsconfig)
  writeFileSync('tmpBuildTsTest/src/a.ts', a)
  writeFileSync('tmpBuildTsTest/src/_types.ts', _types)
  writeFileSync('tmpBuildTsTest/src/_hacks.ts', _hacks)
  const p = exec('npx tsc', { cwd: 'tmpBuildTsTest' })
  t.false(p.code === 0)
  t.true(p.stdout.includes('has no exported member'))
  fixMissingImports({
    opencvBuildFolder: '',
    tsOutputFolder: 'tmpBuildTsTest/src',
  })
  t.true(exec('npx tsc', { cwd: 'tmpBuildTsTest' }).code === 0)
})
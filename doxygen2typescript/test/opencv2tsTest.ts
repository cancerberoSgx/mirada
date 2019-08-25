import test from 'ava'
import { writeFileSync } from 'fs'
import { exec, ls, mkdir, rm } from 'shelljs'
import { opencv2ts } from '../src'

test('opencv2ts', async t => {
  rm('-rf', 'tmp')
  mkdir('-p', 'tmp')
  t.true(ls('tmp/src/opencv/**/*.ts').length === 0)
  opencv2ts({
    opencvBuildFolder: '../../opencv/build_js',
    tsOutputFolder: 'tmp/src/opencv',
    // jsonTypes: true,
    // xmlTypes: true,
    renderLocation: false,
    // locationFilePrefix: 'https://github.com/opencv/opencv/tree/master/modules/core/include/',
    tsCodeFormatSettings: {
      indentSize: 2,
      convertTabsToSpaces: true,
      emptyLinesMax: 1,
      trailingSemicolons: 'never',
      jsdocLineMaxLength: 100
    },
  })
  t.true(ls('tmp/src/opencv/**/*.ts').length > 0)
  t.true(ls('tmp/dist/**/*.js').length === 0)

  writeFileSync('tmp/tsconfig.json', configTsJson)
  writeFileSync('tmp/src/test.ts', testTs)
  const p = exec('npx tsc', { cwd: 'tmp' })
  t.deepEqual(p.code, 0)
  t.true(ls('tmp/dist/**/*.js').length > 0)

  writeFileSync('tmp/src/testError.ts', testErrorTs)
  const p2 = exec('npx tsc', { cwd: 'tmp' })
  t.false(p2.code === 0)
  t.true(p2.stdout.includes(`Property 'nonExistent' does not exist on type 'Mat'`))
})

const testTs = `
import {cv} from './opencv'
const m = new cv.Mat()
var a = m.rows+1
`.trim()

const testErrorTs = `
import {cv} from './opencv'
const m = new cv.Mat()
m.nonExistent()
`.trim()

const configTsJson = `
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

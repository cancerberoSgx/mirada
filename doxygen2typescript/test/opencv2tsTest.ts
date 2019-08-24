import test from 'ava'
import { ls, mkdir, rm, exec } from 'shelljs'
import { opencv2ts } from '../src'
import { writeFileSync } from 'fs';

test('opencv2ts', async t => {
  rm('-rf', 'tmp')
  mkdir('-p', 'tmp')
  t.true(ls('tmp/src/cv/**/*.ts').length === 0)
  opencv2ts({
    opencvBuildFolder: '/Users/sebastiangurin/git/opencv/build_js',
    tsOutputFolder: 'tmp/src/cv',
    jsonTypes: true,
    xmlTypes: true
  })
  t.true(ls('tmp/src/cv/**/*.ts').length > 0)
    t.true(ls('tmp/dist/**/*.js').length === 0)
    writeFileSync('tmp/src/tsconfig.json', configTsJson)
    writeFileSync('tmp/src/test.ts', testTs)
    const p = exec('npx tsc', {cwd: 'tmp'})
    t.deepEqual(p.code, 0)
    t.true(ls('tmp/dist/**/*.js').length > 0)

    writeFileSync('tmp/src/testError.ts', testErrorTs)
    const p2 = exec('npx tsc', {cwd: 'tmp'})
    t.false(p2.code===0)
    t.true(p2.stdout.includes(`Property 'nonExistent' does not exist on type 'Mat'`))
})


const testTs = `
import {cv} from './cv'
const m = new cv.Mat()
var a = m.rows+1`

const testErrorTs = `
import {cv} from './cv'
const m = new cv.Mat()
m.nonExistent()`

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
`
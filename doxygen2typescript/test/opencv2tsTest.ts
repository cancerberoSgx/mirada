import test from 'ava'
import { writeFileSync } from 'fs'
import { exec, ls, mkdir, rm } from 'shelljs'
import { opencv2ts, Doxygen2tsOptions } from '../src'

test('opencv2ts', async t => {
  const o : Doxygen2tsOptions= {
    opencvBuildFolder: '../../opencv/build_js',
    tsOutputFolder: 'tmp/src/opencv',
    // jsonTypes: true,
    // xmlTypes: true,
    refType: 'typedoc',
    // onlyFix: true,
    renderLocation: false,
    // singleDeclaration: true,
    // locationFilePrefix: 'https://github.com/opencv/opencv/tree/master/modules/core/include/',
    tsCodeFormatSettings: {
      indentSize: 2,
      convertTabsToSpaces: true,
      emptyLinesMax: 1,
      trailingSemicolons: 'never',
      jsdocLineMaxLength: 100
    },
  }
  if(!o.onlyFix){
    rm('-rf', 'tmp')
    mkdir('-p', 'tmp')
    t.true(ls('tmp/src/opencv/**/*.ts').length === 0)
  }
  opencv2ts(o)
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
import { deepEqual, ok } from 'assert';
import * as Jimp from 'jimp';
import { getGlobal } from 'misc-utils-of-mine-generic';
import { resolve } from 'path';
import { Mat, Point } from './opencv';
(async () => {
  getGlobal().Module = { onRuntimeInitialized }
  getGlobal().cv = require(resolve('../../mirada/static/opencv.js'))
  async function onRuntimeInitialized() {
    var jimpSrc = await Jimp.read('../../mirada/test/assets/shape.jpg')
    var source: Mat = cv.matFromImageData(jimpSrc.bitmap)
    const dest: Mat = new cv.Mat()
    let M: Mat = cv.Mat.ones(5, 5, cv.CV_8U)
    let anchor: Point = new cv.Point(-1, -1)
    cv.dilate(source, dest, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
    ok(cv.getBuildInformation().includes('General configuration for OpenCV'))
    var img = new Jimp({ width: dest.cols, height: dest.rows, data: Buffer.from(dest.data) })
    source.delete()
    dest.delete()
    M.delete()
    deepEqual(Jimp.distance(img, await Jimp.read('../../mirada/test/assets/shape2.jpg')), 0.015625)
  }
})()
`.trim()

const testErrorTs = `
import './opencv'
const m = new cv.Mat()
var testCv = cv
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

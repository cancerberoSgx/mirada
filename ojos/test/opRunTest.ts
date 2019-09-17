import test from 'ava'
import { compareL2, del, fromFile, toRgba } from 'mirada'
import { OperationNames, run } from '../src'
import { ScriptOperation } from '../src/opScript/types'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('1', async t => {
  const mat = await fromFile('test/assets/n.png')
  cv.cvtColor(mat, mat, cv.COLOR_RGBA2RGB, 0)// we go rgb not because op limitation but because not alpha ff will produce alpha==0
  const { images } = await run<[ScriptOperation<OperationNames.Bitwise>]>({
    src: { mat, name: 'n.png' },
    ops: [
      {
        name: OperationNames.Bitwise,
        type: 'not',
        src: 'n.png',
        dst: 'nNot.png'
      }
    ]
  })
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'nNot.png')!.mat), await fromFile('test/assets/nBitwiseNot.png'), true), 0)
  del(...images.map(i => i.mat))
})

test('2', async t => {
  const mat = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0)
  const { images } = await run<[ScriptOperation<OperationNames.AdaptiveThreshold>, ScriptOperation<OperationNames.GaussianBlur>]>({
    src: { mat, name: 'src' },
    ops: [
      {
        name: OperationNames.AdaptiveThreshold,
        maxval: 200,
        adaptiveMethod: cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        blockSize: 3,
        thresholdType: cv.THRESH_BINARY,
        C: 2,
        src: 'src',
        dst: 'aux1'
      },
      {
        name: OperationNames.GaussianBlur,
        ksize: { width: 5, height: 7 },
        sigmaX: 2,
        src: 'aux1',
        dst: 'out'
      }
    ]
  })
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'out')!.mat), await fromFile('test/assets/lennaOpRun2.png'), true), 0)
  del(...images.map(i => i.mat))
})

test('using same mat', async t => {
  const mat = await fromFile('test/assets/lenna.jpg')
  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0)
  const { images } = await run<[ScriptOperation<OperationNames.AdaptiveThreshold>, ScriptOperation<OperationNames.GaussianBlur>]>({
    src: { mat, name: 'src' },
    ops: [
      {
        name: OperationNames.AdaptiveThreshold,
        maxval: 200,
        adaptiveMethod: cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        blockSize: 3,
        thresholdType: cv.THRESH_BINARY,
        C: 2,
        src: 'src',
        dst: 'src'
      },
      {
        name: OperationNames.GaussianBlur,
        ksize: { width: 5, height: 7 },
        sigmaX: 2,
        src: 'src',
        dst: 'src'
      }
    ]
  })
  t.deepEqual(images.map(i => i.name), ['src'])
  t.true(images[0].mat === mat)
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'src')!.mat), await fromFile('test/assets/lennaOpRun2.png'), true), 0)
  del(...images.map(i => i.mat))
})

test('script statements', async t => {
  const mat = await fromFile('test/assets/h.jpg')
  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0)
  const { images } = await run({
    src: { mat, name: 'src' },
    ops: `
# comment 1
GaussianBlur src out1 ksize: 5, sigmaX: 2.2
# comment 2
# comment 3
Bitwise out1 out2 type: 'not'
# comment 4
    `
  })
  t.deepEqual(images.map(i => i.name), ['src', 'out1', 'out2'])
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'out2')!.mat), await fromFile('test/assets/hRunScript.png'), true), 0)
  del(...images.map(i => i.mat))
})

test('script statements template', async t => {
  const mat = await fromFile('test/assets/h.jpg')
  const { images } = await run({
    src: { mat, name: 'src' },
    ops: `
  # comment 0
  
  <% vars.a = 2; vars.name='out1' %>
  
    CvtColor src src code: <%= cv.COLOR_RGBA2GRAY %>, dstCn: 0
  
  # comment 1
      GaussianBlur src <%= vars.name %> ksize: <%= vars.a + 3 %>, sigmaX: <%= vars.a + 0.2 %>
  # comment 2
# comment 3
Bitwise <%= vars.name %> out2 type: 'not'

# comment 4
    `
  })
  t.deepEqual(images.map(i => i.name), ['src', 'out1', 'out2'])
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'out2')!.mat), await fromFile('test/assets/hRunScript.png'), true), 0)
  del(...images.map(i => i.mat))
})

test('json lang', async t => {
  const { images } = await run({
    src: { mat: await fromFile('test/assets/lenna.jpg'), name: 'src' },
    language: 'json',
    ops: `[
  {
    "name": "CvtColor",
    "src": "src",
    "dst": "src",
    "code": "<%= cv.COLOR_RGBA2GRAY %>"
  },
  {
    "name": "AdaptiveThreshold",
    "maxval": 200,
    "adaptiveMethod": 1,
    "blockSize": 3,
    "thresholdType": 0,
    "C": 2,
    "src": "src",
    "dst": "a"
  },
  {
    "name": "GaussianBlur",
    "ksize": {
      "width": 5,
      "height": 7
    },
    "sigmaX": 2,
    "src": "a",
    "dst": "b",
    "borderType": "<%= cv.BORDER_CONSTANT %>"
  }
]`
  })
  t.deepEqual(images.map(i => i.name), ['src', 'a', 'b'])
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'b')!.mat), await fromFile('test/assets/lennaOpRun2.png'), true), 0)
  del(...images.map(i => i.mat))
})

test('statement options with comma', async t => {
  const mat = await fromFile('test/assets/h.jpg')
  const { images } = await run({
    src: { mat, name: 'src' },
    ops: `
# cv.line(src, { x: 10, y: 5 }, { x: 100, y: 80 }, scalarColor('red'), 2, cv.LINE_8, 0)
Line src a pt1: { x: 10, y: 5 }, pt2: { x: 100, y: 80 }, color: <%= ojos.scalarColorString('red') %>, thickness: 2, lineType: <%= cv.LINE_8 %>, shift: 0

# cv.rectangle(src, { x: 101, y: 15 }, { x: 150, y: 80 }, scalarColor('#9922ee77'), 2, cv.LINE_8, 0)   
Rectangle a b pt1: { x: 101, y: 15 }, pt2: { x: 150, y: 80 }, color: <%= ojos.scalarColorString('#9922ee77') %>, thickness: 2, lineType: <%= cv.LINE_8 %>, shift: 0

# cv.rectangle(src, { x: 1, y: 115 }, { x: 150, y: 180 }, scalarColor('#99221177'), cv.FILLED)
Rectangle b c pt1: { x: 1, y: 115 }, pt2: { x: 150, y: 180 }, color: <%= ojos.scalarColorString('#99221177') %>, thickness: <%= cv.FILLED %>

# cv.circle(src, { x: 261, y: 122 }, 22, scalarColor('#9922eeee'), cv.FILLED)
Circle c d center: { x: 261, y: 122 }, radius: 22, color: <%= ojos.scalarColorString('#9922eeee') %>, thickness: <%= cv.FILLED %>

# cv.circle(src, { x: 200, y: 150 }, 44, scalarColor('#11ee1255'), 3, cv.LINE_AA, 1)
Circle d f center: { x: 200, y: 150 }, radius: 44, color: <%= ojos.scalarColorString('#11ee1255') %>, thickness: 3, lineType: <%= cv.LINE_AA %>, shift: 1

# new Ellipse().exec({ src, dst, center: { x: 7, y: 7 }, angle: 33, size: { width: 7, height: 5 }, color: scalarColor('#aa3366ee'), thickness: 1, lineType: cv.LINE_AA })
Ellipse f g center: { x: 127, y: 127 }, angle: 33, size: { width: 67, height: 115 }, color: <%= ojos.scalarColorString('#aa3366ee') %>, thickness: 1, lineType: <%= cv.LINE_AA %>
`
  })
  t.deepEqual(images.map(i => i.name), ['src', 'a', 'b', 'c', 'd', 'f', 'g'])
  // await serial(images.map((m,i)=>async ()=> await write(toRgba(m.mat), 'tmp'+i+'.png')))
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'g')!.mat), await fromFile('test/assets/hDrawing2.png'), true), 0)
  del(...images.map(i => i.mat))
})

test.todo('error handling')
test.todo('<% multi line support %>')
test.todo('statement multiline ending lines with \\ ')

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
    src: {
      mat,
      name: 'n.png'
    },
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
    src: {
      mat,
      name: 'src'
    },
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
    src: {
      mat,
      name: 'src'
    },
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
  const { images } = await run<[ScriptOperation<OperationNames.AdaptiveThreshold>, ScriptOperation<OperationNames.GaussianBlur>]>({
    src: {
      mat,
      name: 'src'
    },
    ops: `
# comment 1
GaussianBlur src out1 ksize: 5, sigmaX: 2.2
# comment 2
# comment 3
Bitwise out1 out2 type: not
# comment 4
    `
  })
  t.deepEqual(images.map(i => i.name), ['src', 'out1', 'out2'])
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'out2')!.mat), await fromFile('test/assets/hRunScript.png'), true), 0)
  del(...images.map(i => i.mat))
})


test('script statements template', async t => {
  const mat = await fromFile('test/assets/h.jpg')
  const { images } = await run<[ScriptOperation<OperationNames.AdaptiveThreshold>, ScriptOperation<OperationNames.GaussianBlur>]>({
    src: {
      mat,
      name: 'src'
    },
    ops: `
  # comment 0
  
  <% vars.a = 2; vars.name='out1' %>
  
      CvtColor src src code: <%= cv.COLOR_RGBA2GRAY %>
  
  # comment 1
      GaussianBlur src <%= vars.name%> ksize: <%= vars.a + 3 %>, sigmaX: <%= vars.a + .2 %>
  # comment 2
# comment 3
Bitwise <%= vars.name %> out2 type: not

# comment 4
    `
  })
  // await serial(images.map((m,i)=>async ()=> await write(toRgba(m.mat), 'tmp'+i+'.png')))
  t.deepEqual(images.map(i => i.name), ['src', 'out1', 'out2'])
  // t.true(images[0].mat === mat)
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'out2')!.mat), await fromFile('test/assets/hRunScript.png'), true), 0)
  del(...images.map(i => i.mat))
})

test.todo('error handling')
test.todo('<% multi line support %>')
test.todo('json input')

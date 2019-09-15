import test from 'ava'
import { compareL2, del, fromFile, toRgba } from 'mirada'
import { OperationNames, run, ScriptOperation,  } from '../src'
import { loadMirada, write } from './testUtil'
import { serial } from 'misc-utils-of-mine-generic'

test.before(loadMirada)

// test('parseScript', async t => {
//   const r = parseScript({
//     script: `
// # comment 1
// GaussianBlur lenna out1 ksize: 5, sigmaX: 2.2
// # comment 2
// # comment 3
// Bitwise out1 out2 type: not
// # comment 4
//     `
//   })
//   t.deepEqual(r, [
//   {    name: OperationNames.GaussianBlur,    src: 'lenna',    dst: 'out1',    ksize: '5',    sigmaX: '2.2'  },
//   { name:  OperationNames.Bitwise, src: 'out1', dst: 'out2', type: "not" }
// ])
// // let dd:ParsedResult=null as any
// // dd.
// })

test.only('run script', async t => {
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
  // await serial(images.map((m,i)=>async ()=> await write(toRgba(m.mat), 'tmp'+i+'.png')))
  t.deepEqual(images.map(i => i.name), ['src', 'out1', 'out2'])
  // t.true(images[0].mat === mat)
  t.deepEqual(compareL2(toRgba(images.find(i => i.name === 'out2')!.mat), await fromFile('test/assets/hRunScript.png'), true), 0)
  del(...images.map(i => i.mat))
})

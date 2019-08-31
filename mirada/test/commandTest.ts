import test from 'ava'
import { compareL2 } from '../src'
import { deleteResult, execute } from '../src/command/execute'
import { CommandName } from '../src/command/types'
import { File } from '../src/file'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('execute error missing mandatory property', async t => {
  const r = await execute({
    files: [await File.fromFile('test/assets/lenna.jpg', 'lenna.jpg')],
    commands: [
      { name: CommandName.roi, in: 'lenna.jpg', out: 'output.mat' } as any, // as any because missing expr gives compile error
      { name: CommandName.asRgba, in: 'output.mat', out: 'tmpOutput.jpg' },
    ]
  })
  t.deepEqual(r, {
    commands: [
      { error: 'expr is mandatory', out: [] },
      { error: 'Cannot find file output.mat', out: [] }
    ],
    out: [],
    error: 'In command 1: expr is mandatory'
  })
})
test('execute unExistent input file', async t => {
  const r = await execute({
    commands: [
      { name: CommandName.roi, in: 'unExistent.file', out: 'output.mat', expr: { x: 1, y: 2, width: 3, height: 6 } },
      { name: CommandName.asRgba, in: 'output.mat', out: 'tmpOutput.jpg' },
    ]
  })
  t.deepEqual(r, {
    commands: [
      { error: 'Cannot find file unExistent.file', out: [] },
      { error: 'Cannot find file output.mat', out: [] }
    ],
    out: [],
    error: 'In command 1: Cannot find file unExistent.file'
  })
})

test('execute ok 1', async t => {
  const r = await execute({
    files: [await File.fromFile('test/assets/lenna.jpg', 'lenna.jpg')],
    commands: [
      { name: CommandName.roi, in: 'lenna.jpg', out: 'output.mat', expr: { x: 100, y: 100, width: 100, height: 80 } },
      { name: CommandName.asRgba, in: 'output.mat', out: 'tmpOutput.jpg' },
    ]
  })
  t.deepEqual(r.error, undefined)
  t.deepEqual(r.out.map(f => f.name), ['output.mat', 'tmpOutput.jpg'])
  const f = r.out.find(f => f.name === 'tmpOutput.jpg')!
  let f2 = await File.fromFile('test/assets/mask1.jpg')
  t.deepEqual(compareL2(f, f2), 0)
  f2.delete()
  deleteResult(r)
})


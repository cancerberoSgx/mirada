import test from 'ava'
import { exec } from 'shelljs'


test('1', async t => {
  const p = exec(`echo '${JSON.stringify([{ name: 'help' }])}' | npx ts-node src/cliMain.ts --input`)
  const r = JSON.parse(p.stdout) as any
  t.true(r.result.includes('Usage:'))
})

test('2', async t => {
  let p = exec(`echo inv | npx ts-node src/cliMain.ts --input`)
  let r = JSON.parse(p.stdout) as any
  t.deepEqual(r.result, undefined)
  t.true(r.error.startsWith('Error: Non-whitespace before'))
})

test('3', async t => {
  const c = `echo '${JSON.stringify([{ name: 'help', command: 'nonext' }])}' | npx ts-node src/cliMain.ts --input`
  let p = exec(c)
  let r = JSON.parse(p.stdout) as any
  t.deepEqual(r.result, undefined)
  t.true(r.error.startsWith('Command not found:'))
})

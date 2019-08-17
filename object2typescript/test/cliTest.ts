import test from 'ava'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

test.before(async t => {
  t.notThrows(() => execSync('npm run build'))
})

test('literal objects defaults should print std if no --output given', async t => {
  let b: Buffer
  t.notThrows(() => { b = execSync('node bin/object2typescript --input test/assets/p.json') })
  t.deepEqual(b.toString(), readFileSync('test/assets/pLiteralDefaults_ts.txt').toString())
})

test('load urls', async t => {
  const url = 'https://raw.githubusercontent.com/cancerberoSgx/mirada/7d2761bea82e3e7718fc5c6885eb1aab1bd3eba1/object2typescript/package.json'
  let b: Buffer
  t.notThrows(() => { b = execSync(`node bin/object2typescript --input "${url}" --nodeName BolsoCampeon --quotePropertyNames --optionalProperties`) })
  writeFileSync('tmp.ts', b)
  t.deepEqual(b.toString(), readFileSync('test/assets/p2QuotedLiteralNamed_ts.txt').toString())
})

test('throws if not input is found', async t => {
  t.throws(() => { execSync('node bin/object2typescript --input not/existent.json') })
})


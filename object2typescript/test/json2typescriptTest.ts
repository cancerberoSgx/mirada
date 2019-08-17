import test from 'ava'
import { readFileSync } from 'fs'
import { json2typescript } from '../src/json2typescript'

test('simple', async t => {
  const s = json2typescript({
    node: {
      a: 1, b: ['ed']
    },
    nodeName: 'Bar'
  })
  t.deepEqual(s.trim(), `
export interface Bar {
    a: number
    b: string[]
}`.trim())
})

test('array deep', async t => {
  const s = json2typescript({
    node: {
      a: [1], b: [{ foo: [{ bar: [[1, 1, 2, 2]] }] }]
    },
    nodeName: 'Foo',
    codeFormatOptions: {
      indentSize: 2
    }
  })
  t.deepEqual(s.trim(), `
export interface Foo {
  a: number[]
  b: {
    foo: {
      bar: number[][]
    }[]
  }[]
}
  `.trim())
})

test('literal objects defaults', async t => {
  const s = json2typescript({
    node: JSON.parse(readFileSync('test/assets/p.json').toString()),
  })
  t.deepEqual(s, readFileSync('test/assets/pLiteralDefaults_ts.txt').toString())
})



//TODO : quotes. starts with number ,contains spaces or '-' or other chars should quote. 
//TODO: should throw if a function is found

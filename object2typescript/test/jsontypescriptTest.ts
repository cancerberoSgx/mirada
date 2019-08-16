import test from 'ava'
import { json2typescript } from '../src/json2typescript';
import { removeWhites } from 'misc-utils-of-mine-generic';

test('simple', async t => {
  const s = json2typescript({
    node: {
      a: 1, b: ['ed']
    },
    nodeName: 'Bar'
  })
  t.deepEqual(s.trim(),`
export interface bar {
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
    } []
  } []
}
  `.trim())
})


//TODO : quotes. starts with number ,contains spaces or '-' or other chars should quote. 
//TODO. should always quote if option.quotepropsertyanmes
//TODO: should throw if a function is found
// TODO: should indent
let o: { a: number[]; b: { foo: { bar: number[][] }[] }[] }
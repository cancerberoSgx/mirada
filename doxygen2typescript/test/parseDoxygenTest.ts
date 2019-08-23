import test from 'ava'
import { readFileSync, writeFileSync } from 'fs';
import { parseDoxygen, buildDts } from '../src';
import { visitJson, findJson } from '../src/misc';


test('parseDoxygen', async t => {
  var r = parseDoxygen({ xml: readFileSync('test/assets/mat.xml').toString() })
  var a = []
  // writeFileSync('tmp.json', JSON.stringify(r, null, 2))
  visitJson(r as any, (v, k) => { a.push(k); return false })
  const { value: param } = findJson(r as any, (v: any, k) => {
    return v && v.name === 'adjustROI' && v.kind === 'function' && v.params.find(p => p.name === 'dtop' && p.description === 'Shift of the top submatrix boundary upwards.')
  }) as any
  t.deepEqual(param.type.text, 'Mat &')

  // writeFileSync('tmp.ts', buildDts({defs: r}).files[0])

})


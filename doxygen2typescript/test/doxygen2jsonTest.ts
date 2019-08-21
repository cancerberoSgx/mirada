import test from 'ava'
import { readFileSync } from 'fs';
import { doxygen2json } from '../src';
import { visitJson, findJson } from '../src/misc';


test('doxygen2json', async t => {
  var r = doxygen2json({ xml: readFileSync('test/assets/mat.xml').toString() })
  var a = []
  visitJson(r as any, (v, k) => { a.push(k); return false })
  const { value: param } = findJson(r as any, (v: any, k) => {
    return v && v.name === 'adjustROI' && v.kind === 'function' && v.params.find(p => p.declname === 'dtop' && p.description === 'Shift of the top submatrix boundary upwards.')
  }) as any
  t.deepEqual(param.type.text, 'Mat &')
})


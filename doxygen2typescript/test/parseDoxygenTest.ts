import test from 'ava'
import { readFileSync } from 'fs'
import { parseDoxygen } from '../src'
import { findJson, visitJson } from '../src/misc'


test('parseDoxygen', async t => {
  var r = parseDoxygen({ xml: readFileSync('test/assets/mat.xml').toString() })
  var a = []
  visitJson(r as any, (v, k) => { a.push(k); return false })
  const { value: param } = findJson(r as any, (v: any, k) => {
    return v && v.name === 'adjustROI' && v.kind === 'function' && v.params.find(p => p.name === 'dtop' && p.description === 'Shift of the top submatrix boundary upwards.')
  }) as any
  t.deepEqual(param.type.text, 'Mat &')

})


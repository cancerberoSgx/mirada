import test from 'ava'
import { readFileSync } from 'fs'
import { buildDts, parseDoxygen } from '../src'

/**
 * renderCompoundClass used to always emit a bare `export declare class X {`, regardless of whatever
 * real base class doxygen's own <basecompoundref> says the C++ type has - inheritance was reconstructed
 * afterwards only for the 3 classes hand-listed in exportsHacks.ts#fixMissingExtends. This is a
 * regression test for reading that base straight from doxygen data at render time instead.
 */
test('renderCompoundClass renders extends from a real doxygen <basecompoundref>', async t => {
  var defs = parseDoxygen({ xml: readFileSync('test/assets/svm-with-base.xml').toString() })
  var file = buildDts({
    defs,
    isOpenCv: true,
    tsCodeFormatSettings: { indentSize: 2, convertTabsToSpaces: true },
  }).results[0]
  t.true(file.content.includes('export declare class SVM extends StatModel {'), file.content)
  t.true(file.content.includes('getType(): number'), file.content) // int -> number, mapped at render time
})

test('renderCompoundClass stays bare when doxygen has no <basecompoundref> (e.g. Mat)', async t => {
  var defs = parseDoxygen({ xml: readFileSync('test/assets/mat.xml').toString() })
  var file = buildDts({
    defs,
    isOpenCv: true,
    tsCodeFormatSettings: { indentSize: 2, convertTabsToSpaces: true },
  }).results[0]
  t.true(file.content.includes('export declare class Mat {'), file.content)
})

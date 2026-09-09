import test from 'ava'
import { mkdirSync, writeFileSync } from 'fs'
import { rm } from 'shelljs'
import { getBindingsCppCompoundRefs } from '../src/doxygen2json/parseBindingsCpp'

/**
 * getBindingsCppCompoundRefs matches every name registered in bindings.cpp against doxygen's index.xml
 * by exact text equality. A name that doesn't match anything - e.g. a namespaced class the bindings
 * generator exposes under a flattened name like "ml_SVM" - used to just vanish from every downstream
 * list with nothing recorded anywhere, silently shrinking the generated API surface. This is a
 * self-contained regression test for the `unmatched` field that now reports exactly that: it needs no
 * real opencv build, unlike the other parseBindingsCpp tests.
 */
test('getBindingsCppCompoundRefs reports bindings.cpp names with no matching doxygen node', async t => {
  const dir = 'tmpParseBindingsCppUnmatchedTest'
  rm('-rf', dir)
  mkdirSync(dir + '/modules/js_bindings_generator/gen', { recursive: true })
  mkdirSync(dir + '/doc/doxygen/xml', { recursive: true })

  writeFileSync(dir + '/modules/js_bindings_generator/gen/bindings.cpp', `
EMSCRIPTEN_BINDINGS(testBinding) {
  function("absdiff", &cv::absdiff);
  constant("CV_8U", CV_8U);
  emscripten::class_<cv::ml::SVM>("ml_SVM")
    ;
}
`.trim())

  // Only "absdiff" and "CV_8U" have a matching <name> node; "ml_SVM" intentionally has none, simulating
  // exactly the silent-drop case this test guards against.
  writeFileSync(dir + '/doc/doxygen/xml/index.xml', `
<doxygenindex>
  <compound refid="group__core" kind="group">
    <name>core</name>
    <member refid="group__core_1gaabsdiff" kind="function"><name>absdiff</name></member>
    <member refid="group__core_1gaCV__8U" kind="define"><name>CV_8U</name></member>
  </compound>
</doxygenindex>
`.trim())

  const r = getBindingsCppCompoundRefs({ opencvBuildFolder: dir })
  t.deepEqual(r.functions.map(f => f.name), ['absdiff'])
  t.deepEqual(r.constants.map(f => f.name), ['CV_8U'])
  t.deepEqual(r.classes, [])
  t.deepEqual(r.unmatched, { constants: [], classes: ['ml_SVM'], functions: [] })
})

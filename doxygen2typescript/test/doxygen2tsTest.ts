import test from 'ava'
import { readFileSync, writeFileSync } from 'fs'
import { removeWhites } from 'misc-utils-of-mine-generic'
import { buildDts, parseDoxygen, doxygen2ts } from '../src'


test('doxygen2ts', async t => {
  // var r = doxygen2ts({ doxygenXmlFolder: '../../opencv/build_js/doc/doxygen/xml/', tsOutputFolder: 'tmp'})
  t.true(true)
})


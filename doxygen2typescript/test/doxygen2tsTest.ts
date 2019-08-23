import test from 'ava'
import { doxygen2ts } from '../src'


test('doxygen2ts', async t => {
  // var r = doxygen2ts({ doxygenXmlFolder: '../../opencv/build_js/doc/doxygen/xml/', tsOutputFolder: 'tmp'})
  t.true(!!doxygen2ts)
})


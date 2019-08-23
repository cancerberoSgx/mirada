import test from 'ava'
import { readFileSync } from 'fs'
import { removeWhites } from 'misc-utils-of-mine-generic'
import { buildDts, parseDoxygen } from '../src'


test('buildTs', async t => {
  var r = parseDoxygen({ xml: readFileSync('test/assets/mat.xml').toString() })
  var s = removeWhites(buildDts({ defs: r }).files[0])
    ;[`\`\`\`cpp M.at<double>(i,j) += 1.f;`, `of the [Mat](#d3/d63/classcv_1_1Mat}) class`, `declare class Mat {`]
      .map(s => removeWhites(s)).forEach(f => t.true(s.includes(f), f))
})


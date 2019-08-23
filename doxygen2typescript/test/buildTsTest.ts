import test from 'ava'
import { readFileSync, writeFileSync } from 'fs'
import { removeWhites } from 'misc-utils-of-mine-generic'
import { buildDts, parseDoxygen } from '../src'


test('buildTs', async t => {
  var r = parseDoxygen({ xml: readFileSync('test/assets/mat.xml').toString() })
  var file = buildDts({ defs: r, isOpenCv: true, debug: true, renderLocation: true, tsCodeFormatSettings: {indentSize: 2, convertTabsToSpaces: true},
  locationFilePrefix: 'https://github.com/opencv/opencv/tree/ccecd3405a22cd4ed4446574f8465fc7024f7708/modules/core/include/'}).files[0]
  var s = removeWhites(file)
    ;[`\`\`\`cpp * M.at<double>(i,j) += 1.f;`, `of the [Mat](#d3/d63/classcv_1_1Mat}) class`, `declare class Mat {`]
      .map(s => removeWhites(s)).forEach(f => t.true(s.includes(f), f))
  writeFileSync('tmp.ts', file)
})


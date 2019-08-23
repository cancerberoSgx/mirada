import test from 'ava'
import { readFileSync, writeFileSync } from 'fs';
import { parseDoxygen, buildDts } from '../src';
import { visitJson, findJson } from '../src/misc';
import { removeWhites } from 'misc-utils-of-mine-generic';


test('buildTs', async t => {
  var r = parseDoxygen({ xml: readFileSync('test/assets/mat.xml').toString() })
  var s = removeWhites(buildDts({defs: r}).files[0])
  // writeFileSync('tmp.txt', s)
  ;[`\`\`\`cpp M.at<double>(i,j) += 1.f;`, `of the [Mat](#d3/d63/classcv_1_1Mat}) class`, `declare class Mat {`].map(s=>removeWhites(s)).forEach(f=>t.true(s.includes(f), f))
})


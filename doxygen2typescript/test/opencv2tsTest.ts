import test from 'ava'
import { opencv2ts } from '../src/doxygen2json/opencv2ts';


test('opencv2ts', async t => {
  opencv2ts({ opencvBuildFolder: '../../opencv/build_js/', tsOutputFolder: 'tmp'})
  t.true(!!opencv2ts)
})


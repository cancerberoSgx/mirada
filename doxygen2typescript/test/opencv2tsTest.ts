import test from 'ava'
import { opencv2ts } from '../src/doxygen2json/opencv2ts';
import { ls } from 'shelljs';

test('opencv2ts', async t => {
const opencvBuildFolder = '/Users/sebastiangurin/git/opencv/build_js'
  opencv2ts({ opencvBuildFolder, tsOutputFolder: 'tmp'})
  t.true(  ls('tmp/*.ts').length>0)
})


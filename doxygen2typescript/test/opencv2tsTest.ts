import test from 'ava'
import { ls } from 'shelljs'
import { opencv2ts } from '../src/doxygen2json/opencv2ts'

test.skip('opencv2ts', async t => {
  const opencvBuildFolder = '/Users/sebastiangurin/git/opencv/build_js'
  opencv2ts({ opencvBuildFolder, tsOutputFolder: 'tmp' })
  t.true(ls('tmp/*.ts').length > 0)
})


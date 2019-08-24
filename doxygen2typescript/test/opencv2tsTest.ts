import test from 'ava'
import { ls, mkdir, rm } from 'shelljs'
import { opencv2ts } from '../src'

test('opencv2ts', async t => {
  rm('-rf', 'tmp')
  mkdir('-p', 'tmp')
  // cp('-r', 'test/assets/opencv2tsTestProject/*', 'tmp/')
  t.true(ls('tmp/src/cv/*.ts').length === 0)
  opencv2ts({
    opencvBuildFolder: '/Users/sebastiangurin/git/opencv/build_js',
    tsOutputFolder: 'tmp/src/cv',
    jsonTypes: true,
    xmlTypes: true
  })
  t.true(ls('tmp/src/cv/*.ts').length > 0)
  // t.notThrows(()=>execSync('npx tsc '))
})


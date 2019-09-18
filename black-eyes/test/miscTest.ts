import test from 'ava'
import { fromNow } from 'hrtime-now'
import { OperationNames } from 'ojos'
import { loadLibraries } from '../src/loadLibraries'
import { ojosRun } from '../src/ojos'

test.before(async () => await fromNow(loadLibraries, t => console.log(`Lading libraries took ${t}`)))
test('run', async t => {
  const r = await ojosRun({
    src: [{ path: 'test/assets/lenna.jpg' }],
    ops: [
      { name: OperationNames.CvtColor, debug: true, src: [{ path: 'test/assets/lenna.jpg' }], dst: [{ path: 'o.png' }], code: cv.COLOR_RGBA2GRAY }
    ]
  })
  t.deepEqual(r.files.map(f => f.path), ['test/assets/lenna.jpg', 'o.png'])
})


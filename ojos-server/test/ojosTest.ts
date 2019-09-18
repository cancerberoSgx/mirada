import test, {ExecutionContext, CbExecutionContext} from 'ava'

import { OjosServer } from '../src/server';
import { connect } from 'net';
import {  decodeAsync, decode, encode   } from '@msgpack/msgpack'
import { promises, mkdirSync } from 'fs';
import {magickLoaded, File as MagicaFile, run } from 'magica'
import {loadOpencv} from 'mirada'
import {MagicaCodec, OperationNames} from 'ojos'
import {fromNow} from 'hrtime-now'
import { FsResult, FsOperation } from '../src/types';
import { ojosRun } from '../src/ojos';
import { loadLibraries } from '../src/loadLibraries';
const { readFile } = promises

test.before(async ()=>await fromNow( loadLibraries, t=>console.log(`Lading libraries took ${t}`)))
test('run', async t => { 

const r = await ojosRun({
  src: [{path: 'test/assets/lenna.jpg'}],
  ops: [
    {name: OperationNames.CvtColor, debug: true, src: [{path: 'test/assets/lenna.jpg'}], dst: [{path:'o.png'}], code: cv.COLOR_RGBA2GRAY}
  ]
})
t.deepEqual(r.files.map(f=>f.path), ['test/assets/lenna.jpg', 'o.png'])
})


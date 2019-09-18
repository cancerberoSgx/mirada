import { decode, encode } from '@msgpack/msgpack'
import test, { CbExecutionContext } from 'ava'
import { promises } from 'fs'
import { fromNow } from 'hrtime-now'
import { connect } from 'net'
import { loadLibraries } from '../src/loadLibraries'
import { OjosServer } from '../src/server'
import { FsOperation, FsResult } from '../src/types'

const { readFile } = promises

test.cb('ok1', t => {
  fromNow(loadLibraries, t => console.log(`Lading libraries took ${t}`)).then(() => {
    test2(t)
    const s = new OjosServer({ listen: { port: 9988, readableAll: true, writableAll: true } })
    s.start()
  })
})

function test2(t: CbExecutionContext) {
  setTimeout(async () => {
    const socket = connect({ port: 9988, readable: true, writable: true }, async () => {
      const d: FsOperation = {
        name: 'writeFile',
        file: {
          name: 'lenna.jpg',
          content: new Uint8ClampedArray(await readFile('test/assets/shape.jpg'))
        }
      }
      socket.on("data", async (data) => {
        const res = decode(data) as FsResult
        // console.log('response 1', res);
        t.true(res.file ? res.file.name === 'lenna.jpg' : true)
      })
      socket.write(encode(d))
    })
  }, 2000)
  setTimeout(() => {
    const socket = connect({ port: 9988, readable: true, writable: true }, () => {
      socket.on("data", async (data) => {
        const res = decode(data) as FsResult
        // console.log('response2', res);
        t.true(res.file ? res.file.name === 'lenna.jpg' : true)
        if (res.file && res.file.name === 'lenna.jpg') {
          t.end()
        }
      })
      const d: FsOperation = {
        name: 'readFile',
        fileName: 'lenna.jpg'
      }
      socket.write(encode(d))
    })
  }, 4000)
}

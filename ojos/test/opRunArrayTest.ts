import test from 'ava'
import { del, mat2data } from 'mirada'
import { CvtColor, Rectangle, scalarColor } from '../src'
import { loadMirada } from './testUtil'

test.before(loadMirada)

test('Rectangle.exec() options array', async t => {
  const src = cv.Mat.zeros(10, 10, cv.CV_8UC4)
  new Rectangle().exec({ src, dst: src, pt1: { x: 2, y: 3 }, pt2: { x: 9, y: 8 }, color: scalarColor('#ee11aa99'), thickness: cv.FILLED })
  t.deepEqual(mat2data(src), { "rows": 10, "cols": 10, "type": 24, "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcCEQ8vBCIeMQQkIDEEJCAxBCQgGQISEAAAAAAAAAAAAAAAABcCEQ/uEaqZ7hGqme4RqpnuEaqZ7hGqme4RqpnuEaqZ7hGqmQAAAAAvBCIe7hGqme4RqpnuEaqZ7hGqme4RqpnuEaqZ7hGqme4RqpkAAAAAMQQkIO4RqpnuEaqZ7hGqme4RqpnuEaqZ7hGqme4RqpnuEaqZAAAAADEEJCDuEaqZ7hGqme4RqpnuEaqZ7hGqme4RqpnuEaqZ7hGqmQAAAAAZAhIQ7hGqme4RqpnuEaqZ7hGqme4RqpnuEaqZ7hGqme4RqpkAAAAAAAAAAO4RqpnuEaqZ7hGqme4RqpnuEaqZ7hGqme4RqpnuEaqZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" })
  new CvtColor().exec(src, src, cv.COLOR_RGBA2GRAY)
  t.deepEqual(mat2data(src), { "rows": 10, "cols": 10, "type": 0, "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoUFRUVCwAAAAplZWVlZWVlZQAUZWVlZWVlZWUAFWVlZWVlZWVlABVlZWVlZWVlZQALZWVlZWVlZWUAAGVlZWVlZWVlAAAAAAAAAAAAAA==" })
  del(src)
})

test.todo('script stmt options array')

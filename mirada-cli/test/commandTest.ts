import test from 'ava'
import { existsSync } from 'fs'
import { exec, rm } from 'shelljs'

test('ok1', async t => {
  rm('tmp.png')
  t.deepEqual(existsSync('tmp.png'), false)
  const c = `ts-node src/cliMain.ts   "{name:'roi', in:'test/assets/lenna.jpg', expr:{x:100,y:90,width:79,height:80}, out:'tmp.png'}"`
  let p = exec(c)
  t.deepEqual(p.code, 0)
  // let r = JSON.parse(p.stdout) as any
  // t.deepEqual(r.commands.map((f:any)=>f.out.map((o:any)=>o.name)), [ [ 'tmp.png' ] ])
  // t.deepEqual(r.error, undefined)
  t.deepEqual(existsSync('tmp.png'), true)
})

// test('4', async t => {
//   const c = `echo '${JSON.stringify([{name: 'roi'}])}' | npx ts-node src/cliMain.ts --input`
//   console.log(c);

// let p = exec(c)
//   console.log(p.stdout);
//   let r = JSON.parse(p.stdout) as any
//   t.deepEqual(r.result, undefined)
//   t.true(r.error.startsWith('Command not found:'))
// }) 

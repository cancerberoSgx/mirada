import { rm, mkdir, exec, cp, mv, ShellString } from 'shelljs';
import { equal, ok } from 'assert';

const out = 'test-browser-outdir'
exec('npm run build')
rm('-rf', out)
mkdir('-p', out)
cp('dist/mirada.min.js', out)
cp('dist/src/opencv.js', out)

const tests:{file:string, assert:(s:ShellString)=>boolean}[] = [{
  file: 'miradaBundle.html',
  assert: s=>s.includes('General configuration for OpenCV')
}]

tests.forEach(t=>{
  rm('-rf', `${out}/index.html`)
  cp(`test-browser/${t.file}`, `${out}/index.html`)
  const cmd = 'npx ts-node test-browser/run.ts'
  const p = exec(cmd)
  equal(p.code, 0, `Expected "${cmd}" without errors`)
  ok(t.assert(p), 'Expected test assert OK')
})
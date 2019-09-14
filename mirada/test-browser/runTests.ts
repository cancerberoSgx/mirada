import { rm, mkdir, exec, cp, mv, ShellString, config } from 'shelljs';
import { equal, ok } from 'assert';
config.silent = true

const out = 'test-browser-outdir'
exec('npm run build')
rm('-rf', out)
mkdir('-p', out)
cp('dist/mirada.min.js', out)
cp('dist/src/opencv.js', out)
cp('-r', 'test/assets/*', out)

const tests: { file: string, assert: (s: ShellString) => boolean }[] = [
  {
    file: 'miradaBundle.html',
    assert: s => s.includes('General configuration for OpenCV')
  },
  {
    file: 'imageUtil.html',
    assert: s => !s.includes('TEST ERROR:')
  }
]

tests.forEach(t => {
  rm('-rf', `${out}/index.html`)
  cp(`test-browser/${t.file}`, `${out}/index.html`)
  const cmd = 'npx ts-node test-browser/run.ts'
  const p = exec(cmd)
  equal(p.code, 0, `Expected "${cmd}" exit with status 0`)
  ok(t.assert(p), 'Expected test assert OK - stdout was: \n'+p.stdout)
})
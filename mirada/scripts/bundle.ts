import { rm, exec } from 'shelljs';
import { readFileSync, writeFileSync } from 'fs';
import { equal } from 'assert';

rm('-rf', 'dist/mirada.min.js')
const p = JSON.parse(readFileSync('package.json').toString())
const browser = p.browser
delete p.browser
writeFileSync('package.json', JSON.stringify(p, null, 2))
let error: Error
try {
  equal(exec('npx browserify -o dist/mirada.min.js -s mirada -e dist/src/index.js').code, 0)
  equal(exec('npx terser dist/mirada.min.js -o dist/mirada.min.js').code, 0)
} catch (e) {
  error = e
}
p.browser = browser
writeFileSync('package.json', JSON.stringify(p, null, 2))
if (error) {
  console.error(error);
  process.exit(1)
}
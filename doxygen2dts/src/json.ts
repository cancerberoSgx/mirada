import { readFileSync, writeFileSync, existsSync } from 'fs';
export function parseJson() {
  var r = [];
  var i = 0;
  while (true) {
    var f = 'tmp/all-' + i + '.json';
    if (!existsSync(f)) {
      break;
    }
    var s = readFileSync(f).toString();
    var a = JSON.parse(s);
    r.push(...a);
    i += 50;
    break

  }
  // var o = JSON.parse(readFileSync('tmp/all.json').toString())
  return r;
}
export function stringify(result: any) {
  var arr = result.doxygen.$$.compounddef
  // var arr = [result.doxygen.compounddef.find(d=>{console.log(d.compoundname[0]._); return d.compoundname[0]._==='cv::Mat'})]

  for (let i = 0; i < arr.length; i += 50) {
    var a = arr.slice(i, Math.min(arr.length, i + 50));
    var s = JSON.stringify(a);
    writeFileSync('tmp/all-' + i + '.json', s);
    break
  }
  // var s = JSON.stringify(result);
  // writeFileSync('tmp/all.json', s);
}

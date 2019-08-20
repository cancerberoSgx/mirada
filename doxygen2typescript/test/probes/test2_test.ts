import { readFileSync } from 'fs'
import { DoxygenType } from './test2';

(async () => {
  var xml2js = require('xml2js')
  const config = {}
  // var parser = new xml2js.Parser(config)// (xml2js.defaults["0.2"]);
  // var parseString = require('xml2js').parseString;
  var xml = readFileSync('./test2.xml')
  await xml2js.parseString(xml, config, function(err, result: { doxygen: DoxygenType }) {
    if (err) { throw err }
    const r = new DoxygenType(result.doxygen)
    //   equal(JSON.stringify(r,null,2), '{\n' +
    // '  "compounddef": {\n' +
    // '    "id": "dd/d01/group__videoio__winrt",\n' +
    // '    "kind": "group",\n' +
    // '    "compoundname": "videoio_winrt",\n' +
    // '    "title": "WinRT glue for video I/O"\n' +
    // '  }\n' +
    // '}')

    console.log(JSON.stringify(r, null, 2))

  })
})
  ()

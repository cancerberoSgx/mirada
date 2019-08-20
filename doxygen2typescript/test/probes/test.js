// var util = require('util');
// var xml4js = require('xml4js');
var fs = require('fs');
// // Will automatically download and use any missing schemas
// // xml4js.parseString(fs.readFileSync('test.xml', {encoding: 'utf-8'}), {downloadSchemas: true}, function (err, result) {
//     // console.log(err, result);
// // });

// // // Most of xml2js options should still work
// var options = {};
// var parser = new xml4js.Parser(options);

// // // Default is to not download schemas automatically, so we should add it manually
// var schema = fs.readFileSync('compound.xsd').toString();
// parser.addSchema('http://www.w3.org/2001/XMLSchema-instance', schema, function (err, importsAndIncludes) {
//     // importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in schema.xsd
//     parser.parseString(fs.readFileSync('test.xml').toString(), function (err, result) {
//         console.log(util.inspect(result, false, null));
//     });
// });

(async ()=>{
  var xml2js = require('xml2js');
  const config = {}
// var parser = new xml2js.Parser(config)// (xml2js.defaults["0.2"]);

// var parseString = require('xml2js').parseString;
var xml = fs.readFileSync('./test2.xml')
const result = await xml2js.parseString(xml, config, function (err, result) {
  if(err){throw err}
    console.dir(JSON.stringify(result, null, 2));
    fs.writeFileSync('tmp.json', JSON.stringify(result, null, 2))
});

})()
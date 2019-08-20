

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { notSame, notUndefined } from 'misc-utils-of-mine-generic'
import { cp, exec, mkdir, ls } from 'shelljs'
import { Parser } from 'xml2js'
import { ClassTest } from '../test/probes/aClass'
import { Class } from './astTypes'
import { ParsedDef } from './xmlTypes'

async function parse() {
  if (!existsSync('tmp/all.xml')) {
    // rm('-rf', 'tmp')
    mkdir('-p', 'tmp')
    cp('assets/all.xml.gz', 'tmp')
    exec('gzip -d tmp/all.xml.gz')
  }
  // var parser = new Parser({
  //   explicitChildren: true,
  //   preserveChildrenOrder: true,
  //   charsAsChildren: true,
  //   // includeWhiteChars: true
  // })
  var parser = new Parser({
    mergeAttrs: true,
    explicitArray: true,
    charsAsChildren: true,
    preserveChildrenOrder: true,
    // mergeAttrs: true
  })

  
  return new Promise<any>((resolve, reject) => {
    var xml = readFileSync('tmp/all.xml').toString()

    parser.parseString(xml.replace(/\<sp\/\>/g, ' '), (err, result) => {
      if (err) {
        console.error(err, err.stack)
        reject(err)
      }
      mkdirSync('tmp/xml', { recursive: true })
      // console.log(result.doxygen.compounddef[9]);
      // var c = result.doxygen.compounddef
      // .filter(d=>d.$.kind==='function')
      console.log(result.doxygen.compounddef[0].compoundname[0]);

      const c = result.doxygen.compounddef.map(s => {
        var name = `tmp/xml/${s.compoundname[0].replace(/[^a-z0-9_]/gi, '_')}.json`
        writeFileSync(name, JSON.stringify(s))
        return name
      })

      //   // console.log(c.map(c=>c.name));

      //   // console.log('Ends parsing now JSON.stringify')                
      //   // stringify(result.doxygen.$$.compounddef);
      //   // writeFileSync('tmp/test.json', JSON.stringify(result.doxygen.$$.compounddef))
      //   // console.log(result.doxygen, result.doxygen.$$.compounddef);

      resolve(c)
    })
  })
}

async function main() {
  if (!ls('tmp/xml').length) {
    await parse()
  }
  // var t = setInterval(() => {
  //   console.log(JSON.stringify(process.memoryUsage()));
  // }, 10000);
  try {
    // await classTest()
    // clearInterval(t)  
    process.exit(0)
  } catch (error) {
    console.error(error, error.stack)
    // clearInterval(t)
    process.exit(1)
  }
}
main()

// async function classTest() {
//   // if (!test('-f', 'tmp/all-0.json')) {
//   //   await parse()
//   // }
//   // var compounddef = parseJson()
//   var compounddef = await parse()
//   // var compounddef = JSON.parse(readFileSync('tmp/all-100.json').toString())
//   // testParse1(compounddef)
//   // writeFileSync('tmp/aClass2.json', JSON.stringify(defs.find(d => d.data.$.kind === 'class' && d.name === 'cv::Mat'), null, 2))
//   getTypes(compounddef[0])
//   parseClass(compounddef.find(d => d.data.$.kind === 'class').data)
// }
// function parseClass(def: ClassTest['data']): Class {
//   var r = {
//     name: def.$$.compoundname[0],
//     description: buildDescription(def),
//     methods: [],
//     attributes: [],
//     id: ''
//   }
//   throw 'todo'
//   // return r
// }

// function buildDescription(def: ClassTest['data']) {
//   // var s = def.$$.detaileddescription[0].$$.para.
// }

// function testParse1(compounddef: any) {
//   var defs = compounddef.map(d => {
//     var r: ParsedDef = {
//       name: d.$$.compoundname[0],
//       kind: d.$.kind,
//       extends: { name: d.derivedcompoundref && d.derivedcompoundref[0] && d.derivedcompoundref[0]._, ref: d.derivedcompoundref && d.derivedcompoundref[0] && d.derivedcompoundref[0].$.refid },
//       public: d.$.prot === 'public',
//       data: d,
//     }
//     return r
//   })
//   defs = defs.filter(d => d.data.$.language === 'C++').filter(d => d.public)
//   console.log('Total: ' + defs.length +
//     '. Public: ' + defs.filter(d => d.public).length +
//     '. Classes: ' + defs.filter(d => d.kind === 'class').length +
//     '. Kinds: ' + defs.map(d => d.kind).filter(notSame) +
//     '. Languages: ' + defs.map(d => d.data.$.language).filter(notSame))
//   writeFileSync('tmp/aStruct.json', JSON.stringify(defs.find(d => d.data.$.kind === 'struct'), null, 2))
//   writeFileSync('tmp/aUnion.json', JSON.stringify(defs.find(d => d.data.$.kind === 'union'), null, 2))
//   writeFileSync('tmp/aClass.json', JSON.stringify(defs.find(d => d.data.$.kind === 'class'), null, 2))
//   return defs
// }

// function getTypes(def: any) {
//   // console.log(JSON.stringify(def, null, 2));
//   // def.data.sectiondef.filter(d => d.$.kind === 'public-type').map(s => {


//   // })
// }


// async function jsonPaths() {
//   if (!test('-f', 'tmp/all-0.json')) {
//     await generateJson()
//   }
//   var o = JSON.parse(readFileSync('tmp/all.json').toString())
//   var p = getObjectPropertyPaths(o, { ignoreArrayElements: true, leafsOnly: false })
//   writeFileSync('tmp/paths.json', JSON.stringify(p))
// }

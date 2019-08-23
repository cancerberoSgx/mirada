import { readFileSync, writeFileSync } from 'fs'
import { basename, dirname, withoutExtension } from 'misc-utils-of-mine-generic'
import { join, resolve } from 'path'
import { cp, exec, ls, mkdir, rm } from 'shelljs'
import { createXMLDom, parseDoxygen, Q } from '../../src'

test2()

function test2() {
  // prepareXml();
  mkdir('-p', 'tmp/json')

  ls('tmp/xml/*.xml').forEach(f => {
    if (!include(f)) {
      return
    }
    // console.log(f);
    const name = xmlToJsonPath(f)
    // process.exit(1)
    var xml = readFileSync(f).toString()
    // console.log('writing', name, 'XML Size: '+xml.length/1000);
    var a = parseDoxygen({ xml })
    var r = JSON.stringify(a, null, 2)
    writeFileSync(name, r)
    // console.log('written', name, f, 'JSON Size: '+(r.length/1000));


    // console.log(JSON.stringify(a, null, 2))
  })
}

function xmlToJsonPath(f: string) {
  // console.log(f,  withoutExtension(basename(f)) );

  return resolve(join(dirname(f), '..', 'json', withoutExtension(basename(f)) + '.json'))
}

function include(name: string) {
  return !(name.endsWith('hpp.xml') || name.endsWith('markdown.xml') || name.includes('-tutorial') || name.endsWith('_8h.xml') || name.includes('cpp'))
}
function prepareXml() {
  clean()
  createXMLDom(readFileSync('tmp/all.xml').toString())

  Q('compounddef').forEach(s => {
    const name = 'tmp/xml/' + s.getAttribute('id').replace(/\//g, '-') + '.xml'
    if (!include(name)) {
      return
    }
    console.log('writing', name, s.outerHTML.length / 1000)

    writeFileSync(name, `<doxygen xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="compound.xsd" version="1.8.13">\n` + s.outerHTML + '\n</doxygen>')  
})
}

function clean() {
  rm('-rf', 'tmp')
  mkdir('-p', 'tmp')
  cp('assets/all.xml.gz', 'tmp')
  exec('gzip -d tmp/all.xml.gz')
  mkdir('-p', 'tmp/xml')
}


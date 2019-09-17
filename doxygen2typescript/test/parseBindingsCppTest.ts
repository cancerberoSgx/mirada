import test from 'ava'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { getBindingsCppMemberdefs, parseBindingsCpp, getBindingsCppCompoundRefs, getBindingsCppCompoundFiles } from '../src/doxygen2json/parseBindingsCpp'

const buildFolder = '../../../build_js/build_js'
const expectedConstants = ['COLOR_RGB2RGBA']
const expectedFunctions = ['cvtColor']

test('getBindingsCppMemberdefs', async t => {
  const r = getBindingsCppMemberdefs({ opencvBuildFolder: buildFolder, debug: true })
  writeFileSync('tmp_getBindingsCppMemberdefs.json', JSON.stringify(r, null, 2))
  t.true(r.constants.length > 0)
  t.true(r.classes.length > 0)
  t.true(r.functions.length > 0)
  expectedConstants.forEach(c=>t.true(!!r.constants.find(d=>d.name===c), 'Expected memberdef for constant '+c ))
  expectedFunctions.forEach(c=>t.true(!!r.functions.find(d=>d.name===c), 'Expected memberdef for Function '+c ))
})

// test('parseBindingsCpp', async t => {
//   const r = parseBindingsCpp(readFileSync(buildFolder + '/modules/js/bindings.cpp').toString())
//   writeFileSync('tmp_parseBindingsCpp.json', JSON.stringify(r, null, 2))
//   t.true(r.constants.length > 0)
//   t.true(r.classes.length > 0)
//   t.true(r.functions.length > 0)
//   expectedConstants.forEach(c=>t.true(r.constants.includes(c)), 'Expected Constant '+expectedConstants)
//   expectedFunctions.forEach(c=>t.true(r.functions.includes(c)), 'Expected Function '+expectedConstants)
// })

// test('getBindingsCppCompoundRefs', async t => {
//   const r = getBindingsCppCompoundRefs({ opencvBuildFolder: buildFolder })
//   writeFileSync('tmp_getBindingsCppCompoundRefs.json', JSON.stringify(r, null, 2))
//   t.true(r.constants.length > 0)
//   t.true(r.classes.length > 0)
//   t.true(r.functions.length > 0)
//   expectedConstants.forEach(c=>t.true(r.constants.includes(c)), 'Expected Constant '+c)
//   expectedFunctions.forEach(c=>t.true(r.functions.includes(c)), 'Expected Function '+c)

// })

// test('getBindingsCppCompoundFiles', async t => {
//   const r = getBindingsCppCompoundFiles({ opencvBuildFolder: buildFolder, debug: true })
//   writeFileSync('tmp_getBindingsCppCompoundFiles.json', JSON.stringify(r, null, 2))
//   t.true(r.constants.length > 0)
//   t.true(r.classes.length > 0)
//   t.true(r.functions.length > 0)
//   expectedConstants.forEach(c=>t.true(existsSync(r.constants.find(d=>d.name===c)!.filePath), 'Expected file to exists for Constant '+c))
  // expectedFunctions.forEach(c=>t.true(existsSync(r.functions.find(d=>d.name===c)!.filePath), 'Expected file to exists for Function '+c))
// })


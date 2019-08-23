import test from 'ava'
import { readFileSync, writeFileSync } from 'fs'
import { parseBindingsCpp, getBindingsCppCompoundRefs, getBindingsCppCompoundFiles, getBindingsCppMemberdefs } from '../src/doxygen2json/opencvUtil';

const buildFolder = '/Users/sebastiangurin/git/opencv/build_js'

test.skip('parseBindingsCpp', async t => {
   const r = parseBindingsCpp (readFileSync(buildFolder+'/modules/js/bindings.cpp').toString());
 t.true(r.constants.length>0)
 t.true(r.classes.length>0)
 t.true(r.classes.length>0)
})

test.skip('getBindingsCppCompoundRefs', async t => {
   const r = getBindingsCppCompoundRefs({opencvBuildFolder: buildFolder})
 t.true(r.constants.length>0)
 t.true(r.classes.length>0)
 t.true(r.classes.length>0)
})

test.skip('getBindingsCppCompoundFiles', async t => {
   const r = getBindingsCppCompoundFiles({opencvBuildFolder: buildFolder})
 t.true(r.constants.length>0)
 t.true(r.classes.length>0)
 t.true(r.classes.length>0)
})

test('getBindingsCppMemberdefs', async t => {
   const r = getBindingsCppMemberdefs({opencvBuildFolder: buildFolder})
  writeFileSync('tmp.json', JSON.stringify(r, null,2));
 t.true(r.constants.length>0)
 t.true(r.classes.length>0)
 t.true(r.classes.length>0)
})

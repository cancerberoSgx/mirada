import { readFileSync } from 'fs'
import { dummyTreeView } from '../../src/dom/domDebug'
import { createXMLDom, doc } from "../../src/dom/jsdom";
import { extractCompoundDef } from '../../src/dom/extractCompoundDef'

function dummyTreeViewTest() {
  createXMLDom(readFileSync('/Users/sebastiangurin/git/opencv/build/doc/doxygen/xml/d3/d63/classcv_1_1Mat.xml').toString())
  const s = dummyTreeView(doc)
  process.stdout.write(s)
}

test2()

function test2() {
  var a = extractCompoundDef({xml: readFileSync('/Users/sebastiangurin/git/opencv/build/doc/doxygen/xml/d3/d63/classcv_1_1Mat.xml').toString()})
  console.log(JSON.stringify(a, null, 2))
}



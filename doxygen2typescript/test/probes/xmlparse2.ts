import { readFileSync } from 'fs'
import { createXMLDom, doxygen2json, dummyTreeView } from '../../src'

function dummyTreeViewTest() {
  const { doc } = createXMLDom(readFileSync('/Users/sebastiangurin/git/opencv/build/doc/doxygen/xml/d3/d63/classcv_1_1Mat.xml').toString())
  const s = dummyTreeView(doc)
  process.stdout.write(s)
}
dummyTreeViewTest()
test2()

function test2() {
  var a = doxygen2json({ xml: readFileSync('/Users/sebastiangurin/git/opencv/build/doc/doxygen/xml/d3/d63/classcv_1_1Mat.xml').toString() })
  console.log(JSON.stringify(a, null, 2))
}



import { readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { cp, mkdir, rm, test } from 'shelljs'
import { Doxygen2tsOptions } from './doxygen2ts'
import { getBindingsCppMemberdefs } from './parseBindingsCpp'
import { parseDoxygen } from './parseDoxygen'
import { getCompoundDefName } from './render'
import { writeIndexTs } from './render/exports'
import { buildDts } from './render/main'
import { canRenderFileNamed } from './render/tsExports/hacks'

export function opencv2ts(o: Doxygen2tsOptions) {
  rm('-rf', o.tsOutputFolder)
  mkdir('-p', o.tsOutputFolder)
  const defs = getBindingsCppMemberdefs(o)
    ;
  [...defs.classes, ...defs.functions, ...defs.constants].forEach(c => {
    const id = c.indexCompound.getAttribute('refid')
    //TODO: don't parse the file again, but query compound using memverdef and buildDts
    if (!id) {
      console.warn('WARNING id or refid null for ' + c.name)
      return
    }
    const xmlFile = join(o.opencvBuildFolder, 'doc/doxygen/xml', id + '.xml')
    var r = parseDoxygen({ xml: readFileSync(xmlFile).toString() })
    buildDts({
      defs: r,
      isOpenCv: true,
      renderLocation: true,
      locationFilePrefix: 'https://github.com/opencv/opencv/tree/master/modules/core/include/',
      ...o,
      tsCodeFormatSettings: {
        indentSize: 2,
        convertTabsToSpaces: true,
        jsdocLineMaxLength: 100,
        ...o.tsCodeFormatSettings
      },
    })
      .results
      .forEach(d => {
        const cName = getCompoundDefName(d.def)
        let fileName = join(o.tsOutputFolder, cName) + '.d.ts'
        if (test('-f', fileName) || !canRenderFileNamed(fileName)) {
          return
        }
        mkdir('-p', dirname(fileName))
        writeFileSync(fileName, d.content)
        if (o.jsonTypes && !existsSync(withoutTypeScriptExtension(fileName) + '.json')) {
          writeFileSync(withoutTypeScriptExtension(fileName) + '.json', JSON.stringify(r, null, 2))
        }
        if (o.xmlTypes && !existsSync(withoutTypeScriptExtension(fileName) + '.xml')) {
          cp(xmlFile, withoutTypeScriptExtension(fileName) + '.xml')
        }
      })
  })
  writeIndexTs(o)
}

export         const withoutTypeScriptExtension = (f:string)=>f.substring(0, f.length-'.d.ts'.length)
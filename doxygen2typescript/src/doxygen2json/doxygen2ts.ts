import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { dirname, join } from 'path'
import { rm } from 'shelljs'
import { FormatStringOptions } from 'ts-simple-ast-extra'
import { Q } from '../dom/domUtil'
import { loadXmlDom } from '../dom/jsdom'
import { buildDts } from './buildTs'
import { parseDoxygen } from './parseDoxygen'

export interface Doxygen2tsOptions extends Doxygen2tsOptionsBase {
    opencvBuildFolder: string
  tsOutputFolder: string
}

export interface Doxygen2tsOptionsBase {
  refType?: 'typedoc' | 'mdRefLink'
  tsCodeFormatSettings?: TsCodeFormatSettings
  debug?: boolean
  isOpenCv?: boolean
  renderLocation?: boolean
  locationFilePrefix?: string
}

export interface TsCodeFormatSettings extends RemoveProperties<FormatStringOptions, 'code'> {

}

export function doxygen2ts(options: Doxygen2tsOptions) {
  rm('-rf', options.tsOutputFolder)
  const index = join(options.opencvBuildFolder, 'doc/doxygen/xml/index.xml')
  mkdirSync(options.tsOutputFolder, { recursive: true })
  loadXmlDom(readFileSync(index).toString())
  Q('compound').forEach(compound => {
    var r = parseDoxygen({ 
      xml: readFileSync(join(options.opencvBuildFolder, 'doc/doxygen/xml', compound.getAttribute('refid') + '.xml')).toString() 
      })
 buildDts({
      defs: r, 
      isOpenCv: true, 
      debug: true, 
      renderLocation: true,
      locationFilePrefix: 'https://github.com/opencv/opencv/tree/ccecd3405a22cd4ed4446574f8465fc7024f7708/modules/core/include/',
      ...options,
      tsCodeFormatSettings: { indentSize: 2, convertTabsToSpaces: true, ...options.tsCodeFormatSettings },
    })
    .results
    .forEach(d => {
      const cName = d.def.compoundname.split('::').pop()
      const fileName = join(options.tsOutputFolder, cName) + '.ts'
      mkdirSync(dirname(fileName), { recursive: true })
      writeFileSync(fileName, d.content)
    })
  })
} 

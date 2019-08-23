import { FormatStringOptions } from 'ts-simple-ast-extra'
import { RemoveProperties } from 'misc-utils-of-mine-generic';
import { join, dirname } from 'path';
import { readFileSync, mkdirSync, writeFileSync, rmdirSync } from 'fs';
import { createXMLDom } from '../dom/jsdom';
import { Q, attrs, Q1, text } from '../dom/domUtil';
import { parseDoxygen } from './parseDoxygen';
import { buildDts } from './buildTs';
import { rm } from 'shelljs';

export interface Doxygen2tsOptions extends Doxygen2tsOptionsBase {
  doxygenXmlFolder: string
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
  const index = join(options.doxygenXmlFolder, 'index.xml')
  mkdirSync(options.tsOutputFolder, { recursive: true })
  createXMLDom(readFileSync(index).toString(), options.debug)
  Q('compound').forEach(compound => {
    var r = parseDoxygen({ xml: readFileSync(join(options.doxygenXmlFolder, compound.getAttribute('refid') + '.xml')).toString() })
    var files = buildDts({
      defs: r, isOpenCv: true, debug: true, renderLocation: true,
      tsCodeFormatSettings: { indentSize: 2, convertTabsToSpaces: true },
      locationFilePrefix: 'https://github.com/opencv/opencv/tree/ccecd3405a22cd4ed4446574f8465fc7024f7708/modules/core/include/'
    }).files
    if (!files.length) {
      return
    }

    files.forEach(d => {
      // const cName = text('name', compound).split('::').pop()
      const cName = d.def.compoundname.split('::').pop()
      const fileName = join(options.tsOutputFolder, cName) + '.ts'
      console.log(fileName);
      mkdirSync(dirname(fileName), { recursive: true })
      writeFileSync(fileName, d.file)
    })
  })
}

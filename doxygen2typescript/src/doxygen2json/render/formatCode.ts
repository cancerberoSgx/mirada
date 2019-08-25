import { formatString } from 'ts-simple-ast-extra'
import { TsCodeFormatSettings } from '../doxygen2ts'
import { Options } from './main'

export function formatCode(code: string, o: Options) {
  var output = code
  try {
    output = formatString({ ...defaultFormat, ...o.tsCodeFormatSettings || {}, code })
  }
  catch (error) {
    o.debug && console.log('Warning: failed to format code. Reason', error)
  }
  return output
}

const defaultFormat: TsCodeFormatSettings = {
  trailingSemicolons: 'always',
  indentSize: 2,
  convertTabsToSpaces: true,
  quotePreference: 'single',
  emptyLinesMax: 1,
  formatJsdocs: true,
  formatJsdocsFormatBefore: true,
  jsdocLineMaxLength: 100
}

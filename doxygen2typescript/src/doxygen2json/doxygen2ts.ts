import {FormatStringOptions} from 'ts-simple-ast-extra'
import { RemoveProperties } from 'misc-utils-of-mine-generic';

export interface Doxygen2tsOptions extends Doxygen2tsOptionsBase {
  doxygenXmlOutputFolder: string
  tsOutputFolder: string
}

export interface Doxygen2tsOptionsBase {
  refType?: 'typedoc' | 'mdRefLink'
  tsCodeFormatSettings?: TsCodeFormatSettings
  debug?:boolean
  isOpenCv?: boolean
  renderLocation?: boolean
  locationFilePrefix?: string
}

export interface TsCodeFormatSettings extends RemoveProperties<FormatStringOptions, 'code'> {

}

export function doxygen2ts(options: Doxygen2tsOptions) {

}

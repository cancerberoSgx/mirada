import { linkedTextType } from '../doxygenTypes'
import { isValidId } from './general'
import { Options } from './main'

export interface RenderRefOptions {
  refType?: Options['refType'];
  text?: string;
  refid?: string;
}

export function renderRef(options?: RenderRefOptions): string {
  if (!options || !options.text || !options.refid) {
    return ''
  }
  return options.refType === 'typedoc' ? `[${options.text}]` : `[${options.text}](${options.refid}})`
}

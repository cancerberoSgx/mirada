import { linkedTextType } from '../doxygenTypes'
import { isValidId } from './general'
import { Options } from './main'

export function renderType(type: linkedTextType, options: Options) {
  var ref = type.refs && type.refs.length && type.refs[0]
  var r = ''
  if (ref) {
    const text = type && (type.name || isValidId(type.text) ? type.text : ref && isValidId(ref.text) && ref.text) || 'any'
    r = renderRef({ ...options, ...ref, text })
  }
  if (!r) {
    return type && (type.name || isValidId(type.text) && type.text) || 'any'
  }
  return 'any'
}

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

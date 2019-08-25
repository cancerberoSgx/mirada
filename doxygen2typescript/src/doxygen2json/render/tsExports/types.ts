export function renderCTypesImports() {
  const anys = ['char', 'uint64', 'uint64_t', 'uint32', 'uint32_t', 'uint8', 'uint8_t', 'uchar', 'size_t', 'uint', 'short', 'ushort', 'unsigned', 'float16_t', 'float16', 'typename', '_Tp']
  return `
export type int = number
export type bool = boolean
export type float = number
export type double = number
export type String = string 
${anys.map(a => `export type ${a} = any`).join('\n')}
  `
}

export function renderCvExports() {
  return `
import * as _CV from './_types'
export type CV = typeof _CV // namespace type
export * from './_types'
export * from './_hacks'
`
}

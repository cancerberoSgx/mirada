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

  //   return `
  // export type int = number
  // export type bool = boolean
  // export type float = number
  // export type double = number
  // export type char = any
  // export type uint64 = any
  // export type uint64_t = any
  // export type uint32 = any
  // export type uint32_t = any
  // export type uint8 = any
  // export type uchar = any
  // export type size_t = any
  // export type uint = any
  // export type short = any
  // export type ushort = any
  // unsigned
  // float16_t
  // float16
  //  ErrorCallback, unsigned, float16_t, AsyncArray 

  // // unknown internal types: TODO:research
  // export type typename = any
  // export type _Tp = any

  // export type String = string 
  //   `.trim();
}

// const cTypeMap_ = {
//   'unsignedint': 'uint',
//   'unsigned': 'any',
//   'unsignedchar': 'uchar',
//   'unsignedshort': 'ushort',
//   'char*': 'any',
//   'int*': 'any',
//   'unsignedint*': 'any',
//   'unsigned*': 'any',
//   'unsignedchar*': 'any',
//   'unsignedshort*': 'any',
// };

// function cTypeMap(s: string) {
//   s = s.replace(/\s/g, '');
//   return cTypeMap_[s] || 'any';
// }

// import 

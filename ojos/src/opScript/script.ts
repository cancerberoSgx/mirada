// import {notUndefined} from 'misc-utils-of-mine-generic'

// export interface ParseOptions {
//   script:string
// }

// /**
//  * Transform `GaussianBlur lenna out1 ksize: 7, sigmaX: 2.2` to a ScriptOperation
//  */
// export function parseScript(o:ParseOptions) {
//   const r = /([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)/g
//   o.script.trim().split('\n').map(s=>s.trim()).map(s=>s.startsWith('#') ? undefined : s).filter(notUndefined).map(s=>{
//     const r = /([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)/g.exec(s)
//     if(!r){
//       throw new Error('Syntax error at line "'+s+'"')
//     }

// const name = r[1]
// const src = r[2]
// const dst = r[3]
// const rest = r[4]
// console.log(name, src, dst, rest);

// return {name, src, dst}
//   })
// }
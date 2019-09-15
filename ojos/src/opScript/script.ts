import { notUndefined, stringToObject, RemoveProperties, objectKeys } from 'misc-utils-of-mine-generic'
import { render } from 'ejs'
import { ScriptContext, ScriptOperation, ScriptOptions } from './run'
import { loadOpencv, FS } from 'mirada'
import * as mirada from 'mirada'
import { OperationNames, OperationOptions } from '../op/metadata'

export type ScriptLanguage = 'json' | 'statements'

export interface ParseOptions {
  script: string
  language?: ScriptLanguage
}

// /**
//  * Transform `GaussianBlur lenna out1 ksize: 7, sigmaX: 2.2` to a ScriptOperation
//  */
// export function parseScript(o: ParseOptions) {
//   if (!o.language || o.language === 'statements') {
//     return parseStatements(o)
//   } else {
//     return parseJson(o)
//   }
// }

export interface TemplateContext extends ScriptContext {
  cv: typeof cv
  mirada: typeof mirada
  FS: FS
}

async function getTemplateContext(o: ScriptContext): Promise<TemplateContext> {
  await loadOpencv()
  // if(typeof cv ==='undefined'){
  //   throw new Error('opencv must be loaded before running scripts')
  // }
  const c = {
    ...o,
    cv,
    FS: cv.FS,
    mirada
  }
  return c
}

export async function template(s: string, o: ScriptContext) {
  const context = await getTemplateContext(o)
  return await render(s, context, { escape: s => s, async: true })
}

/** UnionToIntersection<1|2|3>  will be 1 & 2 & 3 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type AllOptionNames = keyof UnionToIntersection<OperationOptions[keyof OperationOptions]>
// f.
// export type ParsedResult<N extends OperationNames>  = RemoveProperties< { [s in keyof OperationOptions[N]]: OperationOptions[N][s]}, 'src'|'dst'> & {
export type ParsedResult = RemoveProperties<Partial<{ [s in AllOptionNames]: any }>, 'src' | 'dst'> & {
  name: OperationNames
  src: string
  dst: string
}
// // let rr :ParsedResult 
// // rr.
// function parseStatements(o: ParseOptions): ParsedResult[] {
//   return parseStatementLines(o)
//     .map(s => {
//       return parseStatement(s)
//     })
// }

export function parseStatementLines(o: ParseOptions) {
  return o.script.trim().split('\n').map(s => s.trim())
    .map(s => s.startsWith('#') ? undefined : s)
    .filter(notUndefined);
}

export function parseStatement(s: string): ParsedResult {
  const r = /([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)/g.exec(s);
  if (!r) {
    throw new Error('Syntax error at line "' + s + '"');
  }
  const name = r[1] as OperationNames;
  const src = r[2];
  const dst = r[3];
  const rest = r[4];
  let restObj: { [s: string]: any }//any; // {[s in keyof OperationOptions[OperationNames]]:OperationOptions[OperationNames]}
  try {
    restObj = stringToObject(rest)
    objectKeys(restObj).forEach(k => {
      if (typeof restObj[k] === 'string') {
        const n = parseInt(restObj[k])
        if (typeof n === 'number' && !isNaN(n)) {
          restObj[k] = n
        }
      }
    })
  }
  catch (error) {
    throw new Error('Syntax error at rest expression of line "' + s + '" . Rest: "' + rest + '". Error: ' + error.message + ' \n ');
  }
  return { name, src, dst, ...restObj };
}

// function parseJson(o: ParseOptions) {
//   throw new Error('not impl')
//   throw 1
// }
// function resolveOps()
export class OpsGenerator {
  // protected parsed: ParsedResult[]
  protected current = 0
 protected lines?: string[]
  constructor(protected script: ParseOptions| ScriptOperation<OperationNames>[]) {
    // if(!Array.isArray(script)){
    this.lines = Array.isArray(script)?undefined:parseStatementLines(script)
    // }
  }
  async  next(o: ScriptContext) {
    if(!this.lines){
      const s = (this.script as ScriptOperation<OperationNames>[])[this.current++]
    return s ||undefined
    }else {
    const l = this.lines[this.current++]
    if(!l){
      return undefined
    }
    const line = await template(l, o)
    const s = parseStatement(line)
    // console.log(s);    
    return s as  ScriptOperation<OperationNames>
    }
  }
}

import { render } from 'ejs'
import * as mirada from 'mirada'
import { loadOpencv } from 'mirada'
import { asArray, notFalsy, objectKeys, stringToObject } from 'misc-utils-of-mine-generic'
import { OperationNames } from '../op/metadata'
import { ParsedResult, ParseOptions, ScriptContext, ScriptOperation, TemplateContext } from "./types"

// /**
//  * Transform `GaussianBlur lenna out1 ksize: 7, sigmaX: 2.2` to a ScriptOperation
//  */
// export function parseScript(o: ScriptContext) {
//   if (!o.options.language || o.options.language === 'statements') {
//     return parseStatements(o)
//   } else {
//     return parseJson(o)
//   }
// }

// function parseJson(o: ParseOptions) {
//   throw new Error('not impl')
// }

// function parseStatements(o: ParseOptions): ParsedResult[] {
//   return parseStatementLines(o)
//     .map(s => {
//       return parseStatement(s)
//     })
// }

async function getTemplateContext(o: ScriptContext): Promise<TemplateContext> {
  await loadOpencv()
  return {
    ...o,
    cv,
    FS: cv.FS,
    mirada
  }
}

export async function template(s: string, o: ScriptContext) {
  const context = await getTemplateContext(o)
  return await render(s, context, { escape: s => s, async: true, context: o })
}

function parseStatementLines(o: ParseOptions) {
  return o.script.trim().split('\n')
    .map(s => s.trim())
    .map(s => s.startsWith('#') ? undefined : s)
    .filter(notFalsy)
}

function parseJsonLines(o: ParseOptions) {
  try {
    const a = asArray(JSON.parse(o.script))
    return a.map(l => JSON.stringify(l))
  } catch (error) {
    throw new Error('JSON.parse syntax error in ' + o.script)
  }
}

function parseStatement(s: string): ParsedResult {
  const r = /([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)/g.exec(s)
  if (!r) {
    throw new Error('Syntax error at line "' + s + '"')
  }
  const name = r[1] as OperationNames
  const src = r[2]
  const dst = r[3]
  const rest = r[4]
  let restObj: { [s: string]: any }
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
    throw new Error('Syntax error at rest expression of line "' + s + '" . Rest: "' + rest + '". Error: ' + error.message + ' \n ')
  }
  return { name, src, dst, ...restObj }
}

export class OpsGenerator {
  protected current = 0
  protected lines?: string[]
  constructor(protected script: ParseOptions | ScriptOperation<OperationNames>[]) {
    this.lines = Array.isArray(script) ? undefined : !script.language || script.language === 'statements' ? parseStatementLines(script) : parseJsonLines(script)
  }
  async  next(o: ScriptContext) {
    if (!this.lines) {
      const s = (this.script as ScriptOperation<OperationNames>[])[this.current++]
      return s || undefined
    } else {
      if (this.lines.length <= this.current) {
        return undefined
      }
      let l: string, line: string | undefined
      // For lines with only 
      while ((l = this.lines[this.current++])) {
        line = await template(l, o)
        line = line.trim()
        if (line) {
          break
        }
      }
      // const l = this.lines[this.current++]
      // if (l) {
      //   return undefined
      // }
      return line ? parseStatement(line) as ScriptOperation<OperationNames> : undefined
    }
  }
}

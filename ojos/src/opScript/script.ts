import { render } from 'ejs'
import * as mirada from 'mirada'
import { loadOpencv } from 'mirada'
import { asArray, notFalsy, objectKeys, stringToObject } from 'misc-utils-of-mine-generic'
import { OperationNames } from '../op/metadata'
import { ParsedResult, ParseOptions, ScriptContext, ScriptOperation, TemplateContext } from "./types"
import * as ojos from '..'

async function getTemplateContext(o: ScriptContext): Promise<TemplateContext> {
  await loadOpencv()
  return {
    ...o,
    cv,
    FS: cv.FS,
    mirada, 
    ojos
  }
}

async function template(s: string, o: ScriptContext) {
  const context = await getTemplateContext(o)
  return await render(s, context, { escape: s => s, async: true, context: o })
}

function parseStatementMapLines(o: ParseOptions) {
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

function parseJson(s: string): ParsedResult {
  try {
    const restObj = JSON.parse(s)
    parseNumberOptions(restObj)
    return restObj
  }
  catch (error) {
    throw new Error('Syntax error in JSON operation "' + s + '". Error: ' + error.message + ' \n ')
  }
}

function parseNumberOptions(restObj: { [s: string]: any; }) {
  objectKeys(restObj).forEach(k => {
    if (typeof restObj[k] === 'string') {
      const n = parseInt(restObj[k])
      if (typeof n === 'number' && !isNaN(n)) {
        restObj[k] = n
      }
    }
  })
}

function parseStatementMap(s: string): ParsedResult {
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
    const toEval = `( { ${rest} } )`
    restObj = eval(toEval)
    parseNumberOptions(restObj)
  }
  catch (error) {
    throw new Error('Syntax error at rest expression of line "' + s + '" . Rest: "' + rest + '". Error: ' + error.message + ' \n ')
  }
  return { name, src, dst, ...restObj }
}

function parseStatementList(s: string): ParsedResult {
  try {
    const restObj = stringToObject(`[ ${s} ]`)
    parseNumberOptions(restObj)
  return {  ...restObj }
  }
  catch (error) {
    throw new Error('Syntax error at rest expression of line "' + s + '". Error: ' + error.message + ' \n ')
  }
}

export class OpsGenerator {
  protected current = 0
  protected lines?: string[]
  constructor(protected script: ParseOptions | ScriptOperation<OperationNames>[]) {
    this.lines = Array.isArray(script) ? undefined : !script.language || script.language === 'statement-map' ? parseStatementMapLines(script) : script.language === 'json' ? parseJsonLines(script) : script.language === 'statement-list' ? parseStatementMapLines(script) : undefined
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
      // stmt lines like <% vars.a = 1 %> will result on empty string, we evaluate them until we found a non empty result
      while ((l = this.lines[this.current++])) {
        line = await template(l, o)
        line = line.trim()
        if (line) {
          break
        }
      }
      return line ? !o.options.language || o.options.language === 'statement-map' ? parseStatementMap(line) : 
        o.options.language === 'statement-list' ? parseStatementList(line) :  
        o.options.language === 'json' ? parseJson(line) : 
        undefined : undefined
    }
  }
}

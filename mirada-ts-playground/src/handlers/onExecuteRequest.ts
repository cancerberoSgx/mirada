import * as Mirada_ from 'mirada'
import { getGlobal } from 'misc-utils-of-mine-generic'
import { Project, ScriptTarget } from 'ts-morph'
import { Result, State } from '../store/state'
import { getStore } from '../store/store'

export function onExecuteRequestInstall() {
  getGlobal().Mirada = Mirada_
  getStore().add(event => {
    handle(event)
  })
}
async function handle(event: { oldState: State; partial: Partial<State>; newState: State }) {
  const t0 = performance.now()
  if (event.newState.executeRequest) {
    const p = new Project({
      useVirtualFileSystem: true,
      compilerOptions: {
        target: ScriptTarget.ESNext
      }
    })
    const f = p.createSourceFile('test.ts', event.newState.code)
    f.getImportDeclarations().forEach(d => d.remove())
    let result: Result | undefined
    let toEval: string = ''
    try {
      toEval = `${p.emitToMemory().getFiles()[0].text}`
      const f = eval(toEval)
    } catch (ex) {
      console.error(ex)
      result = {
        time: performance.now() - t0,
        evalError: `ERROR: ${ex} 
${(ex.stack || '').split('\n').join('\n')}
Evaluated code: 
${toEval}`
      }
    }
    result = result || {
      time: performance.now() - t0
    }
    getStore().setState({
      result,
      executeRequest: false,
      working: false
    })
    return result
  }
}

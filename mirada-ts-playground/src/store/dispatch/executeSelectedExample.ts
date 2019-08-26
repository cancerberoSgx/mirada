import { dispatch } from '../..'
import { packedExamples } from '../../examples/packedExamples'
import { OUTPUT_ACTIONS } from '../output'
import { Output, State } from '../types'
import { Project, BinaryExpression, TypeGuards, ScriptTarget, ts } from 'ts-morph'

export function executeSelectedExample(state: State) {
  const stateExample = state.examples.find(e => !!e.selected)
  if (stateExample) {
    const ex = packedExamples.find(e => e.filePath === stateExample.filePath)
    if (ex) {
      const p = new Project(
        {useVirtualFileSystem: true,
        compilerOptions: {
        target: ScriptTarget.ESNext,
        }
        } 
      )
      const f = p.createSourceFile('test.ts', stateExample.content)
      f.getImportDeclarations().forEach(d=>d.remove())
      let result: Output={}
      let toEval: string = ''
      try {
        toEval = `${p.emitToMemory().getFiles()[0].text}`
        const f = eval(toEval)
      } catch (ex) {
        console.error(ex);        
        result = {
          text: `ERROR: ${ex} 
${(ex.stack || '').split('\n').join('\n')}
Evaluated code: 
${toEval}`
        }
      }
      dispatch({ type: OUTPUT_ACTIONS.SET, output: result })
    }
  }
}

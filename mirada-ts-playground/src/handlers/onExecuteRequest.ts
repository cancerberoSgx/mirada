import { State } from '../store/state';
import { getStore } from '../store/store';
import { Project, ScriptTarget, } from 'ts-morph'
import * as Mirada_ from 'mirada'
import { getGlobal } from 'misc-utils-of-mine-generic';

export function onExecuteRequestInstall() {
  getGlobal().Mirada = Mirada_
  getStore().add((event) => {
    handle(event);
  })
}
interface Result {
  error?: string
}
async function handle(event: { oldState: State; partial: Partial<State>; newState: State; }) {
  if (event.newState.executeRequest) {
    const p = new Project(
      {
        useVirtualFileSystem: true,
        compilerOptions: {
          target: ScriptTarget.ESNext,
        }
      }
    )
    const f = p.createSourceFile('test.ts', event.newState.code)
    f.getImportDeclarations().forEach(d => d.remove())
    let result: Result | undefined
    let toEval: string = ''
    try {
      toEval = `${p.emitToMemory().getFiles()[0].text}`
      const f = eval(toEval)
    } catch (ex) {
      console.error(ex);
      result = {
        error: `ERROR: ${ex} 
${(ex.stack || '').split('\n').join('\n')}
Evaluated code: 
${toEval}`
      }
    }
    getStore().setState({
      ...result,
      executeRequest: false,
      working: false,
    })
  }
}

// export function executeSelectedExample(state: State) {
//   const stateExample = state.examples.find(e => !!e.selected)
//   if (stateExample) {
//     const ex = packedExamples.find(e => e.filePath === stateExample.filePath)
//     if (ex) {
//       const p = new Project(
//         {useVirtualFileSystem: true,
//         compilerOptions: {
//         target: ScriptTarget.ESNext,
//         }
//         } 
//       )
//       const f = p.createSourceFile('test.ts', stateExample.content)
//       f.getImportDeclarations().forEach(d=>d.remove())
//       let result: Output={}
//       let toEval: string = ''
//       try {
//         toEval = `${p.emitToMemory().getFiles()[0].text}`
//         const f = eval(toEval)
//       } catch (ex) {
//         console.error(ex);        
//         result = {
//           text: `ERROR: ${ex} 
// ${(ex.stack || '').split('\n').join('\n')}
// Evaluated code: 
// ${toEval}`
//         }
//       }
//       dispatch({ type: OUTPUT_ACTIONS.SET, output: result })
//     }
//   }
// }

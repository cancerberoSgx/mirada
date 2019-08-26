import { dispatch } from '../..'
import { packedExamples } from '../../examples/packedExamples'
import { EXAMPLES_ACTIONS } from '../examples'
import { OUTPUT_ACTIONS } from '../output'
import { Output, State } from '../types'
import { Project, BinaryExpression, TypeGuards, ScriptTarget } from 'ts-morph'
import { ModuleKind, JsxEmit } from 'typescript'

export function executeSelectedExample(state: State) {
  const stateExample = state.examples.find(e => !!e.selected)
  if (stateExample) {
    const ex = packedExamples.find(e => e.filePath === stateExample.filePath)
    if (ex) {
      // HEADS UP : ugly hack : we emit the example content and then replace the execute method.
      // TODO: try to eval the whole emitted text, get the exported class,  instance it, and call execute on that
      const p = new Project({
        // HEADS UP : this should be the most similar to project tsconfig.json
        // compilerOptions: {
        // target: ScriptTarget.ES2018,
        // module: ModuleKind.CommonJS,
        // lib: ["lib.es2018", "lib.dom"],
        // jsx: JsxEmit.React,
        // esModuleInterop: true,
        // }
      })
      p.createSourceFile('test.ts', stateExample.content)
      let result: Output
      let toEval: string = ''
      try {
        const t = p.emitToMemory().getFiles()[0].text
        const fr = p.createSourceFile('test_emit.ts', t)
        const be = fr.getDescendants().find(
          d =>
            TypeGuards.isBinaryExpression(d) &&
            d
              .getLeft()
              .getText()
              .endsWith('prototype.execute')
        ) as BinaryExpression
        const executeMethodText = be.getRight().getText()
        toEval = `${prefix}(${executeMethodText})`
        const f = eval(toEval)
        ex.execute = f.bind(ex)
        result = ex.execute(state.files)
      } catch (ex) {
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

const prefix = `
var tsMorph = ts_morph_1; 
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

`

// import * as monaco from 'monaco-editor'
// import { getMonacoDefinitionAtPosition } from './tsWorker'

// let definitionProviderRegistered = false
// let lastProvidedDefinition: monaco.languages.Definition
// let lastProvidedDefinitionPosition: monaco.Position
/**
 * Dirty solution to navigate to other files on ctrl-click. Basically register a definition provide once
 * providing using language service based getMonacoDefinitionAtPosition and for each editor register a
 * onMouseUp listener that checks against the last provided definition in that position and set a new model to
 * the editor, revealing position and selecting the target Range.
 */
// export function install(
//   editor: monaco.editor.ICodeEditor,
//   fn: (editor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location) => void
// ) {
  // if (!definitionProviderRegistered) {
  //   monaco!.languages.registerDefinitionProvider('typescript', {
  //     provideDefinition(model, position, token) {
  //       lastProvidedDefinitionPosition = position
  //       return new Promise(resolve => {
  //         getMonacoDefinitionAtPosition(model, position).then(result => {
  //           lastProvidedDefinition = result
  //           resolve(result)
  //         })
  //       })
  //     }
  //   })
  //   definitionProviderRegistered = true
  // }
  // editor.onMouseUp(e => {
  //   if (e.target.position && e.event.ctrlKey && e.target.position.equals(lastProvidedDefinitionPosition)) {
  //     //TODO: support multiple locations and return {model, loc}[]
  //     const def: monaco.languages.Location = (Array.isArray(lastProvidedDefinition) && lastProvidedDefinition.length
  //       ? lastProvidedDefinition[0]
  //       : lastProvidedDefinition) as any
  //     if (def) {
  //       const model = monaco.editor.getModels().find(m => m.uri && def.uri && m.uri.toString() === def.uri.toString())
  //       if (model) {
  //         fn(editor, model, def)
  //       }
  //     }
  //   }
  // })
// }

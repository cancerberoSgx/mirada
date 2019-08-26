// import * as monaco from 'monaco-editor'
// import * as ts from 'typescript'
// import { buildModelUrl } from './monaco'
// import { notUndefined } from 'misc-utils-of-mine-generic'

// export interface ITypeScriptWorker {
//   getCompilationSettings(): ts.CompilerOptions
//   getScriptFileNames(): Promise<string[]>
//   getScriptVersion(fileName: string): string
//   getScriptSnapshot(fileName: string): ts.IScriptSnapshot
//   getScriptKind(fileName: string): ts.ScriptKind
//   getCurrentDirectory(): string
//   getDefaultLibFileName(options: ts.CompilerOptions): string
//   isDefaultLibFileName(fileName: string): boolean
//   getSyntacticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>
//   getSemanticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>
//   getCompilerOptionsDiagnostics(fileName: string): Promise<ts.Diagnostic[]>
//   getCompletionsAtPosition(fileName: string, position: number): Promise<ts.CompletionInfo>
//   getCompletionEntryDetails(fileName: string, position: number, entry: string): Promise<ts.CompletionEntryDetails>
//   getSignatureHelpItems(fileName: string, position: number): Promise<ts.SignatureHelpItems>
//   getQuickInfoAtPosition(fileName: string, position: number): Promise<ts.QuickInfo>
//   getOccurrencesAtPosition(fileName: string, position: number): Promise<ts.ReferenceEntry[]>
//   getDefinitionAtPosition(fileName: string, position: number): Promise<ts.DefinitionInfo[]>
//   getReferencesAtPosition(fileName: string, position: number): Promise<ts.ReferenceEntry[]>
//   getNavigationBarItems(fileName: string): Promise<ts.NavigationBarItem[]>
//   getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>
//   getFormattingEditsForRange(
//     fileName: string,
//     start: number,
//     end: number,
//     options: ts.FormatCodeOptions
//   ): Promise<ts.TextChange[]>
//   getFormattingEditsAfterKeystroke(
//     fileName: string,
//     postion: number,
//     ch: string,
//     options: ts.FormatCodeOptions
//   ): Promise<ts.TextChange[]>
//   getEmitOutput(fileName: string): Promise<ts.EmitOutput>
// }

// export function getTsWorker(uri: monaco.Uri): Promise<ITypeScriptWorker> {
//   return new Promise(resolve => {
//     monaco.languages.typescript.getTypeScriptWorker().then(_worker => {
//       _worker(uri).then(resolve)
//     })
//   })
// }

// export function getDefinitionAtPosition(fileName: monaco.Uri, position: number): Promise<ts.DefinitionInfo[]> {
//   return getTsWorker(fileName).then(worker => {
//     return worker.getDefinitionAtPosition(fileName.toString(), position)
//   })
// }
// export function getNavigationBarItems(fileName: monaco.Uri): Promise<ts.NavigationBarItem[]> {
//   return getTsWorker(fileName).then(worker => {
//     return worker.getNavigationBarItems(fileName.toString())
//   })
// }
// export function getSyntacticDiagnostics(fileName: monaco.Uri): Promise<ts.Diagnostic[]> {
//   return getTsWorker(fileName).then(worker => {
//     return worker.getSyntacticDiagnostics(fileName.toString())
//   })
// }
// export function getSemanticDiagnostics(fileName: monaco.Uri): Promise<ts.Diagnostic[]> {
//   return getTsWorker(fileName).then(worker => {
//     return worker.getSemanticDiagnostics(fileName.toString())
//   })
// }
// export function getCompilerOptionsDiagnostics(fileName: monaco.Uri): Promise<ts.Diagnostic[]> {
//   return getTsWorker(fileName).then(worker => {
//     return worker.getCompilerOptionsDiagnostics(fileName.toString())
//   })
// }
// export function getScriptFileNames(): Promise<string[]> {
//   return getTsWorker(monaco.editor.getModels().find(m => !m.isDisposed())!.uri).then(worker => {
//     return worker.getScriptFileNames()
//   })
// }

// export function getMonacoDefinitionAtPosition(
//   model: monaco.editor.IModel,
//   position: monaco.IPosition
// ): Promise<monaco.languages.Location[]> {
//   return new Promise((resolve, reject) => {
//     getDefinitionAtPosition(model.uri, model.getOffsetAt(position))
//       .then(defs => {
//         if (defs) {
//           const locations = defs
//             .map(def => {
//               const uri = buildModelUrl(def.fileName)
//               const targetModel = monaco.editor.getModel(uri)
//               if (!targetModel) {
//                 return undefined
//               }
//               const range = monaco.Range.fromPositions(
//                 targetModel.getPositionAt(def.textSpan.start),
//                 targetModel.getPositionAt(def.textSpan.start + def.textSpan.length)
//               )
//               return {
//                 uri,
//                 range
//               }
//             })
//             .filter(notUndefined)
//           resolve(locations)
//         }
//         resolve([])
//       })
//       .catch(reject)
//   })
// }

import * as monaco from 'monaco-editor'
import { examples } from '../store/examples';
import { getStore } from '../store/store';
import { objectKeys, throttle } from 'misc-utils-of-mine-generic';
import { mirada } from '../examples/mirada';
import { isDesktop } from '../util/style';
import { install as navigateExternalDefinitionsInstall } from './navigateExternalDefinitions';

function buildModelUrl(name: string) {
  // const s = typeof f === 'string' ? f : f.filePath
  return name.startsWith('file://') ? monaco.Uri.parse(name) : monaco.Uri.file(name)
}



function cursorSelectionChanged(e: monaco.editor.ICursorSelectionChangedEvent): void {
  // dispatch({
  //   type: SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION,
  //   selection: {
  //     endColumn: e.selection.endColumn,
  //     endLineNumber: e.selection.endLineNumber,
  //     startColumn: e.selection.startColumn,
  //     startLineNumber: e.selection.startLineNumber
  //   }
  // })
}

function modelChanged(e: monaco.editor.IModelContentChangedEvent) {
  //   const model = editorInstance!.getModel()!
  //   if (model.uri.path.includes('types/')) {
  //     return
  //   }
  //   if (packedExamples.find(e => e.filePath === model.uri.path)) {
  //     dispatch({
  //       type: EXAMPLES_ACTIONS.EDIT,
  //       content: model.getValue()
  //     })
  //   } else {
  //     dispatch({
  //       type: FILES_ACTIONS.EDIT,
  //       content: model.getValue()
  //     })
  //   }
}
function installListeners() {
  editorInstance!.getModel()!.onDidChangeContent(throttle(e => modelChanged(e), 1000, { trailing: true }))
  editorInstance!.onDidChangeCursorSelection(
    throttle(e => cursorSelectionChanged(e), 2000, { trailing: true })
  )
}

let editorInstance: monaco.editor.IStandaloneCodeEditor | undefined

function getEditorContainerEl() {
  return document.getElementById('editorContainer')
}

export function installEditor() {
  // if (editorInstance) {
  //   const models = monaco.editor.getModels().map(m => m.uri.path)
  //   examples()
  //     .filter(f => !models.includes(f.name))
  //     .forEach(f => {
  //       monaco.editor.createModel(f.code, 'typescript', buildModelUrl(f.name))
  //     })
  //   return
  // }
  const containerEl = getEditorContainerEl()
  if (!containerEl) {
    return
  }
  objectKeys(mirada)
    .forEach(f => {
      var name = 'file:///types/' + mirada[f].originalFileName.substring('node_modules/mirada/dist/src/'.length, mirada[f].originalFileName.length - '.d.ts'.length) + '.ts'
      monaco.editor.createModel(mirada[f].content, 'typescript', buildModelUrl(name))
    })
  // this.props.files.forEach(f => monaco.editor.createModel(f.content, 'typescript', buildModelUrl(f)))

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    libs: ['dom', 'esnext'],
    baseUrl: '.',
    paths: {
      opencv: ['file:///types/types/opencv/index.ts'],
      mirada: ['file:///types/index.ts']
    },
    jsx: monaco.languages.typescript.JsxEmit.React
  })

  editorInstance = monaco.editor.create(containerEl, {
    model: getModel(),
    language: 'typescript',
    wordWrap: 'on',
    lineNumbers: isDesktop() ? 'on' : 'off',
    glyphMargin: isDesktop(),
    folding: isDesktop(),
    minimap: isDesktop()
      ? undefined
      : {
        enabled: false
      }
  })
  navigateExternalDefinitionsInstall(editorInstance!, (editor, model, def) => {
    // editor.setModel(model)
    // editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
    // editor.setSelection(def.range)
  })
  installListeners()

  getStore().add((event) => {
    if (event.oldState.example !== event.newState.example) {
    setEditorFile(event.newState.example.name, event.newState.example.code)
      // setEditorFile(event.newState.example)
      // editorInstance!.setModel(getModel(event.newState.example))
    }
  })

}

function getModel(example = getStore().getState().example) {
  let m = monaco.editor.getModels().find(m => m.uri.path === example.name);
  if (!m) {
    debugger
    m = monaco.editor.createModel(example.code, 'typescript', buildModelUrl(example.name))
  }
  return m
}


  export function  setEditorFile(name:string, content:string) {
    // const model = monaco.editor.getModels().find(m => m.uri.path === buildModelUrl(name))
    const model =   getModel(getStore().getState().example)
    // getModel(model)
    editorInstance!.setModel(model!)
    // if (file.selection) {
      // monacoInstance!.setSelection(file.selection)
    // }
  }
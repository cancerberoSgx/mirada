import { objectKeys } from 'misc-utils-of-mine-generic'
import * as monaco from 'monaco-editor'
import { mirada } from '../examples/mirada'
import { getStore } from '../store/store'
import { isDesktop } from '../util/style'
// import { install as navigateExternalDefinitionsInstall } from './navigateExternalDefinitions'

export function getEditorText() {
  return editorInstance!.getModel()!.getValue()
}

function buildModelUrl(name: string) {
  return name.startsWith('file://') ? monaco.Uri.parse(name) : monaco.Uri.file(name)
}

// function installListeners() {
// editorInstance!.getModel()!.onDidChangeContent(throttle(e => modelChanged(e), 1000, { trailing: true }))
// editorInstance!.onDidChangeCursorSelection(throttle(e => cursorSelectionChanged(e), 2000, { trailing: true }))
// }

let editorInstance: monaco.editor.IStandaloneCodeEditor | undefined

const EDITOR_CONTAINER = 'editorContainer'
function getEditorContainerEl() {
  return document.getElementById(EDITOR_CONTAINER)
}

export function installEditor() {
  const containerEl = getEditorContainerEl()
  if (!containerEl) {
    console.error('ERROR: editor container element not found: ' + EDITOR_CONTAINER)
    return
  }
  if (editorInstance) {
    return
  }
  objectKeys(mirada).forEach(f => {
    var name =
      'file:///types/' +
      mirada[f].originalFileName.substring(
        'node_modules/mirada/dist/src/'.length,
        mirada[f].originalFileName.length - '.d.ts'.length
      ) +
      '.ts'
    monaco.editor.createModel(mirada[f].content, 'typescript', buildModelUrl(name))
  })
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
  // navigateExternalDefinitionsInstall(editorInstance!, (editor, model, def) => { })
  // installListeners()
}

function getModel(example = getStore().getState().example) {
  let m = monaco.editor.getModels().find(m => m.uri.path === example.name)
  if (!m) {
    m = monaco.editor.createModel(example.code, 'typescript', buildModelUrl(example.name))
  }
  return m
}

export function setEditorFile(name: string, content: string) {
  const model = getModel(getStore().getState().example)
  editorInstance!.setModel(model!)
}

export function initMonacoWorkers() {
  if (typeof (self as any).MonacoEnvironment === 'undefined') {
    ; (self as any).MonacoEnvironment = {
      getWorkerUrl(moduleId: any, label: any) {
        if (label === 'typescript' || label === 'javascript') {
          return './ts.worker.js'
        }
        return './editor.worker.js'
      }
    }
  }
}


// function cursorSelectionChanged(e: monaco.editor.ICursorSelectionChangedEvent): void {
  // dispatch({
  //   type: SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION,
  //   selection: {
  //     endColumn: e.selection.endColumn,
  //     endLineNumber: e.selection.endLineNumber,
  //     startColumn: e.selection.startColumn,
  //     startLineNumber: e.selection.startLineNumber
  //   }
  // })
// }

// function modelChanged(e: monaco.editor.IModelContentChangedEvent) {
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
// }

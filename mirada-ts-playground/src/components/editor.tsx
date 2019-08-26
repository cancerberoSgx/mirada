import * as React from 'react'
import * as monaco from 'monaco-editor'
import { File, State } from '../store/types'
import { connect } from 'react-redux'
import { isDesktop } from '../util/style'
import { EXAMPLES_ACTIONS } from '../store/examples'
import { dispatch } from '..'
import { FILES_ACTIONS } from '../store/files'
import { install } from '../monaco/navigateExternalDefinitions'
import { buildModelUrl } from '../monaco/monaco'
import { packedExamples } from '../examples/packedExamples'
import { Theme } from '../theme/theme'
import withStyles, { WithSheet } from 'react-jss'
import { throttle } from '../util/throttle'
import { SELECTED_FILE_ACTIONS } from '../store/selectedFile'
import { opencv } from '../examples/opencv';
import { objectKeys, basename } from 'misc-utils-of-mine-generic';

interface P extends WithSheet<typeof styles, Theme> {
  files: File[]
  selectedFile: File
}

export class MonacoEditor extends React.Component<P, {}> {
  static editor: monaco.editor.IStandaloneCodeEditor | undefined

  static setEditorFile(file: File) {
    const model = monaco.editor.getModels().find(m => m.uri.path === file.filePath)
    MonacoEditor.editor!.setModel(model!)
    if (file.selection) {
      MonacoEditor.editor!.setSelection(file.selection)
    }
  }

  private containerEl: React.RefObject<HTMLDivElement>

  constructor(p: P, s: {}) {
    super(p, s)
    this.containerEl = React.createRef<HTMLDivElement>()
  }

  componentDidUpdate() {
    this.installEditor()
  }

  componentDidMount() {
    this.installEditor()
    MonacoEditor.editor!.getModel()!.onDidChangeContent(throttle(e => this.modelChanged(e), 1000, { trailing: true }))
    MonacoEditor.editor!.onDidChangeCursorSelection(
      throttle(e => this.cursorSelectionChanged(e), 2000, { trailing: true })
    )
  }

  private cursorSelectionChanged(e: monaco.editor.ICursorSelectionChangedEvent): void {
    dispatch({
      type: SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION,
      selection: {
        endColumn: e.selection.endColumn,
        endLineNumber: e.selection.endLineNumber,
        startColumn: e.selection.startColumn,
        startLineNumber: e.selection.startLineNumber
      }
    })
  }

  render() {
    return <div className={this.props.classes.editor} ref={this.containerEl} />
  }

  private modelChanged(e: monaco.editor.IModelContentChangedEvent) {
    // const model = MonacoEditor.editor!.getModel()!
    // if (model.uri.path.includes('opencv/')) {
    //   return
    // }
    // if (packedExamples.find(e => e.filePath === model.uri.path)) {
    //   dispatch({
    //     type: EXAMPLES_ACTIONS.EDIT,
    //     content: model.getValue()
    //   })
    // } else {
    //   dispatch({
    //     type: FILES_ACTIONS.EDIT,
    //     content: model.getValue()
    //   })
    // }
  }

  protected installEditor() {
    if (MonacoEditor.editor) {
      const models = monaco.editor.getModels().map(m => m.uri.path)
      this.props.files
        .filter(f => !models.includes(f.filePath))
        .forEach(f => {
          monaco.editor.createModel(f.content, 'typescript', buildModelUrl(f))
        })
      return
    }
    const containerEl = this.containerEl.current
    if (!containerEl) {
      return
    }
    objectKeys(opencv)
    // .map(k=>k.substring('node_modules_mirada_dist_src_types_opencv_'.length).replace(/\_/g, '.'))
    .forEach(f=>{
        // node_modules_mirada_dist_src_types_opencv_imgproc_draw_d_ts
        var name = 'file:///opencv/'+opencv[f].filename.substring('node_modules_mirada_dist_src_types_opencv_'.length,opencv[f].filename.length-'.d.ts'.length )+'.ts'
        // .replace(/\_/g, '.')
        console.log(name)
    monaco.editor.createModel(opencv[f].content, 'typescript', buildModelUrl(name))
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(opencv[f].content, name)//.substring('file://'.length))

    })
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(`
//          monaco.editor.createModel(`
// import { CV } from './index'
// declare global {
//   var cv: CV
// }
// export = cv
//         `, `file:///opencv/_index.ts`)
    this.props.files.forEach(f => monaco.editor.createModel(f.content, 'typescript', buildModelUrl(f)))
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      libs: ['dom', 'esnext'],
      baseUrl: '.',
      paths: {
        opencv: ['file:///opencv/index.ts']
      },
      jsx: monaco.languages.typescript.JsxEmit.React
    })
    MonacoEditor.editor = monaco.editor.create(containerEl, {
      model: monaco.editor.getModels().find(m => m.uri.path === this.props.selectedFile.filePath),
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
    // install(MonacoEditor.editor!, (editor, model, def) => {
    //   editor.setModel(model)
    //   editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
    //   editor.setSelection(def.range)
    // })
  }
}

const styles = (theme: Theme) => ({
  editor: {
    width: '100%',
    height: '500px'
  }
})

export const Editor = withStyles(styles)(
  connect((state: State) => ({
    files: [...state.files, ...state.examples],
    selectedFile: state.selectedFile
  }))(MonacoEditor)
)

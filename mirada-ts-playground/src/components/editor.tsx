// import * as React from 'react'
// import * as monaco from 'monaco-editor'
// import { State } from '../store/state'
// import { connect } from 'react-redux'
// import { isDesktop } from '../util/style'
// // import { EXAMPLES_ACTIONS } from '../store/examples'
// // import { dispatch } from '..'
// // import { FILES_ACTIONS } from '../store/files'
// // import { install } from '../monaco/navigateExternalDefinitions'
// import { buildModelUrl } from '../monaco/monaco'
// // import { packedExamples } from '../examples/packedExamples'
// import { Theme } from '../theme/theme'
// import withStyles, { WithSheet } from 'react-jss'
// import { throttle } from '../util/throttle'
// // import { SELECTED_FILE_ACTIONS } from '../store/selectedFile'
// import { objectKeys, basename } from 'misc-utils-of-mine-generic';
// // import { magica } from '../examples/mirada';
// import { examples } from '../store/examples';
// import { getStore } from '../store/store';

// // interface P extends WithSheet<typeof styles, Theme> {
// //   files: File[]
// //   selectedFile: File
// // }

// // export class MonacoEditor extends React.Component<P, {}> {
//   // static editor: monaco.editor.IStandaloneCodeEditor | undefined

//   // export function  setEditorFile(name:string, content:string) {
//   //   const model = monaco.editor.getModels().find(m => m.uri.path === name)
//   //   MonacoEditor.editor!.setModel(model!)
//   //   if (file.selection) {
//   //     MonacoEditor.editor!.setSelection(file.selection)
//   //   }
//   // }

//   // private containerEl: React.RefObject<HTMLDivElement>

//   // constructor(p: P, s: {}) {
//   //   super(p, s)
//   //   this.containerEl = React.createRef<HTMLDivElement>()
//   // }

//   // componentDidUpdate() {
//   //   this.installEditor()
//   // }


//   // render() {
//   //   return <div className={this.props.classes.editor} ref={this.containerEl} />
//   // }

//   // componentDidMount() {
//   //   this.installEditor()
//   //   MonacoEditor.editor!.getModel()!.onDidChangeContent(throttle(e => this.modelChanged(e), 1000, { trailing: true }))
//   //   // MonacoEditor.editor!.onDidChangeCursorSelection(
//   //   //   throttle(e => this.cursorSelectionChanged(e), 2000, { trailing: true })
//   //   // )
//   // }


// // }

// // const styles = (theme: Theme) => ({
// //   editor: {
// //     width: '100%',
// //     height: '500px'<

// //   }
// // })

// // export const Editor = withStyles(styles)(
// //   connect((state: State) => ({
// //     files: [...state.files, ...state.examples],
// //     selectedFile: state.selectedFile
// //   }))(MonacoEditor)
// // )

// // export function getEditor(){

// // }

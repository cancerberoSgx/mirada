// import { Action, Reducer } from 'redux'
// import { all, select, takeEvery } from 'redux-saga/effects'
// import { dispatch } from '..'
// import { packedExamples } from '../examples/packedExamples'
// import { FILES_ACTIONS } from './files'
// import { File, Selection, State } from './types'

// export enum SELECTED_FILE_ACTIONS {
//   SELECT = 'SELECTED_FILE_SELECT',
//   CHANGE_CURSOR_SELECTION = 'SELECTED_FILE_CHANGE_CURSOR_SELECTION'
// }

// export const selectedFile: Reducer<File, SelectedFileActions> = (state = initialState, action) => {
//   switch (action.type) {
//     case SELECTED_FILE_ACTIONS.SELECT:
//       return action.file
//     case SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION:
//       return { ...state, selection: action.selection }
//     default:
//       return state
//   }
// }

// interface SelectedFileSelectAction extends Action<SELECTED_FILE_ACTIONS.SELECT> {
//   type: SELECTED_FILE_ACTIONS.SELECT
//   file: File
// }
// interface ChangeCursorSelectionAction extends Action<SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION> {
//   type: SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION
//   selection: Selection
// }

// export type SelectedFileActions = SelectedFileSelectAction | ChangeCursorSelectionAction

// function* watchChangeCursorSelection() {
//   yield takeEvery(SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION, function*(action: ChangeCursorSelectionAction) {
//     const state: State = yield select()
//     const selected = state.files.find(f => f.filePath === state.selectedFile.filePath)
//     if (selected) {
//       dispatch({ type: FILES_ACTIONS.EDIT, selection: action.selection })
//     }
//   })
// }

// export function* selectedFileSagas() {
//   yield all([watchChangeCursorSelection()])
// }

// const initialState = packedExamples.find(e => (e.selected = true)) || packedExamples[0]

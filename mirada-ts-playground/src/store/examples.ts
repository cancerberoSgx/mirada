import { Action, Reducer } from 'redux'
import { all, select, takeEvery } from 'redux-saga/effects'
import { dispatch } from '..'
import { MonacoEditor } from '../components/editor'
import { packedExamples } from '../examples/packedExamples'
import { executeSelectedExample } from './dispatch/executeSelectedExample'
import { SELECTED_FILE_ACTIONS } from './selectedFile'
import { Example, State } from './types'

export enum EXAMPLES_ACTIONS {
  SELECT = 'EXAMPLES_SELECT',
  EDIT = 'EXAMPLES_EDIT',
  RESET = 'EXAMPLES_ACTIONS_RESET'
}

export const examples: Reducer<Example[], ExamplesActions> = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLES_ACTIONS.SELECT:
      return [...state.map(e => ({ ...e, selected: e.filePath === action.example.filePath }))]
    case EXAMPLES_ACTIONS.EDIT:
      return [...state.map(f => ({ ...f, content: f.selected ? action.content : f.content }))]
    case EXAMPLES_ACTIONS.RESET:
      return [...action.examples]
    default:
      return state
  }
}

interface SelectExampleAction extends Action<EXAMPLES_ACTIONS.SELECT> {
  type: EXAMPLES_ACTIONS.SELECT
  example: Example
}

interface EditExampleAction extends Action<EXAMPLES_ACTIONS.EDIT> {
  type: EXAMPLES_ACTIONS.EDIT
  content: string
}

interface ResetExamplesAction extends Action<EXAMPLES_ACTIONS.RESET> {
  type: EXAMPLES_ACTIONS.RESET
  examples: Example[]
}

const initialState = packedExamples

export type ExamplesActions = SelectExampleAction | EditExampleAction | ResetExamplesAction

function* watchExampleSelected() {
  yield takeEvery(EXAMPLES_ACTIONS.SELECT, function*(action: SelectExampleAction) {
    dispatch({ type: SELECTED_FILE_ACTIONS.SELECT, file: action.example })
    MonacoEditor.setEditorFile(action.example)
    const state: State = yield select()
    executeSelectedExample(state)
  })
}

export function* examplesSagas() {
  yield all([watchExampleSelected()])
}

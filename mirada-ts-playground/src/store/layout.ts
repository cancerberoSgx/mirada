import * as monaco from 'monaco-editor'
import { Action, Reducer } from 'redux'
import { all, takeEvery, select } from 'redux-saga/effects'
import { darkTheme } from '../theme/darkTheme'
import { lightTheme } from '../theme/lightTheme'
import { Theme } from '../theme/theme'
import { Layout, State } from './types'

export enum LAYOUT_ACTIONS {
  CHANGE_THEME = 'LAYOUT_CHANGE_THEME',
  SET_STATE_URL_PARAM = 'LAYOUT_SET_STATE_URL_PARAM'
}

export const layout: Reducer<Layout, LayoutActions> = (state = initialState, action) => {
  switch (action.type) {
    case LAYOUT_ACTIONS.CHANGE_THEME:
      return { ...state, theme: action.theme }
    case LAYOUT_ACTIONS.SET_STATE_URL_PARAM:
      return { ...state, stateUrlParam: action.stateUrlParam }
    default:
      return state
  }
}

interface ChangeThemeAction extends Action<LAYOUT_ACTIONS.CHANGE_THEME> {
  type: LAYOUT_ACTIONS.CHANGE_THEME
  theme: Theme
}

interface SetStateUrlParamAction extends Action<LAYOUT_ACTIONS.SET_STATE_URL_PARAM> {
  type: LAYOUT_ACTIONS.SET_STATE_URL_PARAM
  stateUrlParam?: string
}

export type LayoutActions = ChangeThemeAction | SetStateUrlParamAction

const initialState: Layout = {
  theme: lightTheme,
  themes: [lightTheme, darkTheme]
}

function* watchThemeChange() {
  yield takeEvery(LAYOUT_ACTIONS.CHANGE_THEME, function*(action: ChangeThemeAction) {
    yield monaco.editor.setTheme(action.theme.name === 'dark' ? 'vs-dark' : 'vs')
  })
}

// function* watchRouterChange() {
//   // solves the problem of initial state url navigation
//   yield takeEvery(LOCATION_CHANGE, function*(action: LocationChangeAction) {
//     console.log(action)
//     debugger
//     // const state: State = yield select()
//     // if(action.payload.action==='PUSH'){
//     //   console.log(action);
//     // }
//     yield 1
//   })
// }

// function* watchRouterChange2() {
//   // solves the problem of initial state url navigation
//   yield takeEvery(CALL_HISTORY_METHOD, function*(action: LocationChangeAction) {
//     console.log(action)

//     debugger
//     // const state: State = yield select()
//     // if(action.payload.action==='PUSH'){
//     // console.log(action);
//     // }
//     yield 1
//   })
// }

export function* layoutSagas() {
  yield all([watchThemeChange()]) //, watchRouterChange(), watchRouterChange2()])
}

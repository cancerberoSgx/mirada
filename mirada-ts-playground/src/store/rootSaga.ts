import { all } from 'redux-saga/effects'
import { selectedFileSagas } from './selectedFile'
import { layoutSagas } from './layout'
import { examplesSagas } from './examples'
import { filesSagas } from './files'

export function* rootSaga() {
  yield all([selectedFileSagas(), layoutSagas(), examplesSagas(), filesSagas()])
}

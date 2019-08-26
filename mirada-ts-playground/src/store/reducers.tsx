import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { examples } from './examples'
import { files } from './files'
import { layout } from './layout'
import { output } from './output'
import { selectedFile } from './selectedFile'

export const reducers = (history: History) =>
  combineReducers({
    files,
    examples,
    output,
    selectedFile,
    layout,
    router: connectRouter(history)
  })

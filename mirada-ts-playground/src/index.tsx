import 'babel-polyfill'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { ThemedRoutedApp } from './components/themedRoutedApp'
import { initMonacoWorkers } from './monaco/initMonacoWorkers'
import { reducers } from './store/reducers'
import { rootSaga } from './store/rootSaga'
import { AllActions } from './store/types'
import '../node_modules/picnic/picnic.min.css'
import { createHashHistory } from 'history'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { getStateFromLocation } from './store/dispatch/getStateFromLocation'
import {loadOpencv, loadFormatProxies, installFormatProxy, CanvasCodec} from 'mirada'
import { sleep } from 'misc-utils-of-mine-generic';
initMonacoWorkers()

const sagaMiddleware = createSagaMiddleware()
export const history = createHashHistory()

const store = createStore(
  reducers(history),
  getStateFromLocation(history.location),
  compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemedRoutedApp />
    </ConnectedRouter>
  </Provider>,
  div
)

sagaMiddleware.run(rootSaga)

export function dispatch(a: AllActions) {
  store.dispatch(a)
}

async function load(){
  await sleep (10)
    await installFormatProxy(() => new CanvasCodec())
    await loadFormatProxies()
  await loadOpencv()
}
load()
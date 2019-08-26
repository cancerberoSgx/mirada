import 'babel-polyfill'
import * as React from 'react'
import * as ReactDom from 'react-dom'
// import { Provider } from 'react-redux'
// import { applyMiddleware, createStore, compose } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import { ThemedRoutedApp } from './components/themedRoutedApp'
import { initMonacoWorkers } from './monaco/initMonacoWorkers'
// import { reducers } from './store/reducers'
// import { rootSaga } from './store/rootSaga'
// import { AllActions } from './store/types'
import '../node_modules/picnic/picnic.min.css'
// import { createHashHistory } from 'history'
// import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
// import { getStateFromLocation } from './store/dispatch/getStateFromLocation'
import {loadOpencv, loadFormatProxies, installFormatProxy, CanvasCodec} from 'mirada'
import { sleep } from 'misc-utils-of-mine-generic';
import { getInitialState } from './store/state';
import { App } from './components/app';
import { _setStore, getStore } from './store/store';
import { installEditor } from './monaco/monaco';

async function start() {
await initMonacoWorkers()
  await sleep (10)

const s = await getInitialState()
_setStore(s)

const div = document.createElement('div')
document.body.appendChild(div)
ReactDom.render(  <App/>, div)

  await sleep (10)
await installEditor()
  await sleep (10)
getStore().setState(s)

  await sleep (10)
    await installFormatProxy(() => new CanvasCodec())
    await loadFormatProxies()
  await sleep (10)
  await loadOpencv()
}
start()
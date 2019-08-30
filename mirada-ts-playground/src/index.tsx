import 'babel-polyfill'
import { CanvasCodec, fromUrl, installFormatProxy, loadFormatProxies, loadOpencv } from 'mirada'
import { sleep } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import '../node_modules/picnic/picnic.min.css'
import { App } from './components/app'
import { onExampleSelectedInstall } from './handlers/onExampleSelect'
import { onExecuteRequestInstall } from './handlers/onExecuteRequest'
import { initMonacoWorkers, installEditor } from './monaco/monaco'
import { getInitialState } from './store/state'
import { getStore, _setStore } from './store/store'
import { createUrl, loadUrl } from './util/urlState'

async function start() {
  await initMonacoWorkers()
  // await sleep(10)

  const s = await getInitialState()
  _setStore(s)
  const div = document.createElement('div')
  document.body.appendChild(div)
  ReactDom.render(<App />, div)

  // await sleep(10)
  await installEditor()
  // await sleep(10)

  await onExecuteRequestInstall()
  await onExampleSelectedInstall()

  getStore().setState(s)

  await sleep(10)
  await installFormatProxy(() => new CanvasCodec())
  await loadFormatProxies()
  // await sleep(10)
  await loadOpencv()
  await sleep(10)

  await loadUrl()
  getStore().add(createUrl)
  await sleep(10)

  // at last, load an image and request execution of default example
  cv.imshow(document.getElementById('outputCanvas')!, await fromUrl('lenna.jpg'))
  getStore().setState({ executeRequest: true, working: true })
}
start()

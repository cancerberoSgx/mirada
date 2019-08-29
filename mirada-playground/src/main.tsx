import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.css'
import { setExample } from './app/dispatcher'
import { getInitialState } from './app/state'
import { getStore, _setStore } from './app/store'
import './styles.css'
import { App, test, start } from './ui/app'
import { createUrl, loadUrl, urlHasState } from './ui/common/urlState'
import {loadOpencv, File, renderInCanvas, installFormatProxy, CanvasCodec, loadFormatProxies} from 'mirada'
import { sleep } from 'misc-utils-of-mine-generic'

async function main() {
  var s = await getInitialState()
  _setStore(s)
  render(<App />, document.getElementById('main'))
  if (urlHasState()) {
    await loadUrl()
  }
  else {
    await setExample(s.example)
  }
  getStore().add(() => {
    createUrl()
  })
  await sleep(10)
    await installFormatProxy(() => new CanvasCodec())
    await loadFormatProxies()
  await loadOpencv()
  getStore().setState({
    working: false
  })
  await start()
}

main()


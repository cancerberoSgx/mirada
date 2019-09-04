import 'babel-polyfill'
import { CanvasCodec, installFormatProxy, loadFormatProxies, loadOpencv } from 'mirada'
import { sleep } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.css'
import { start } from "./app/start"
import { getInitialState } from './app/state'
import { _setStore, getStore } from './app/store'
import './styles.css'
import { App } from './ui/app'
import { loadUrl, urlHasState, createUrl } from './util/urlState';

async function main() {
  var s = await getInitialState()
  _setStore(s)
  render(<App />, document.getElementById('main'))
  // if (urlHasState()) {
  //   await loadUrl()
  // }
  // else {
  // // await setExample(s.example)
  // }
  // getStore().add(() => {
  //   createUrl()
  // })
  await sleep(10)
  await installFormatProxy(() => new CanvasCodec())
  await loadFormatProxies()
  await loadOpencv()
  await start()
}

main()


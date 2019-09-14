import { jsonParseWithMat, jsonStringifyWithMat } from 'mirada'
import { getState, setState } from './state'

let _Buffer = require('buffer/').Buffer as typeof Buffer

export function createUrl() {
  var s = getState()
  const b = _Buffer.from(jsonStringifyWithMat(s)).toString('base64')
  window.location.hash = '#state=' + b
}

export async function loadUrl(u = window.location.hash) {
  if (urlHasState(u)) {
    const d = u.split('state=')[1]
    const s = _Buffer.from(d, 'base64').toString()
    const state = jsonParseWithMat(s)
    const s2 = getState()
    Object.assign(s2, state)
    setState(s2)
    // handleNewState(state)
  } else {

  }
}

export function urlHasState(u = window.location.hash) {
  return u.includes('state=')
}


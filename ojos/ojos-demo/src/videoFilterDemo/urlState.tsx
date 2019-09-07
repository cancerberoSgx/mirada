import { getState, setState } from './state'
import {mat2data, isMatData, data2mat, jsonStringifyWithMat, jsonParseWithMat} from 'mirada'

export function createUrl() {
  var s = getState()
  const b = btoa(jsonStringifyWithMat(s))
  window.location.hash = '#state=' + b
}

export async function loadUrl() {
  if (urlHasState()) {
    const d = window.location.hash.split('state=')[1]
    const state = jsonParseWithMat(atob(d))  
    setState(state)
  } else {

  }
}

export function urlHasState() {
  return window.location.hash.includes('state=')
}


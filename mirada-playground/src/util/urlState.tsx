import { getStore, getState, setState } from '../app/store'

export function createUrl() {
  const s = getState()
  var state = {... s, editor: undefined, tools: s.tools.map(t=>t.name), activeTools: s.activeTools.map(t=>t.name)}
  const b = btoa(JSON.stringify(state))
  window.location.hash = '#state=' + b
}

export async function loadUrl() {
  if (urlHasState()) {
    const d = window.location.hash.split('state=')[1]
    const state = JSON.parse(atob(d))
     setState({
        ... getState() ,
        ...state
    })
  }
}

export function urlHasState() {
  return window.location.hash.includes('state=')
}


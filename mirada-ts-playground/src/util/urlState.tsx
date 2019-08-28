import { getStore } from '../store//store'

export function createUrl() {
  var state = getStore().getState()
  const s = {
    example: {
      ...state.example,
      code: state.code
    },
    code: state.code
  }
  const b = btoa(JSON.stringify(s))
  window.location.hash = '#state=' + b
}

export async function loadUrl() {
  if (window.location.hash.includes('state=')) {
    const d = window.location.hash.split('state=')[1]
    const state = JSON.parse(atob(d))
    const s = getStore().getState()
    const examples = getStore().setState({
      ...state.code,
      example: { ...s.example, ...state.example, code: state.code },
      examples: [...s.examples, ...(s.examples.find(e => e.name === state.example.name) ? [] : [state.example])]
    })
    return true
  }
  return false
}

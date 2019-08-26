import { Location } from 'history'
import { State } from '../types'
import { Base64 } from 'js-base64'

export function getStateFromLocation(location: Location): State | undefined {
  const s = location && location.pathname
  if (s.startsWith('/state/')) {
    let fragment: string | undefined
    try {
      fragment = s.substring('/state/'.length, s.length)
      return stringToState(fragment)
    } catch (error) {
      debugger
      console.error('Fail to parse state from url', error, error.stack, fragment)
    }
  }
}

export function stateToString(state: State) {
  const copy: State = {
    ...state,
    files: state.files,
    examples: [state.examples.find(e => !!e.selected) || state.examples[0]].map(e => {
      delete (e as any).execute
      return e
    }),
    selectedFile: [
      state.files.find(f => f.filePath === state.selectedFile.filePath) ||
        state.examples.find(e => e.filePath === state.selectedFile.filePath) ||
        state.selectedFile
    ].map(e => {
      delete (e as any).execute
      return e
    })[0],
    output: { text: '' }
  }
  return Base64.encodeURI(JSON.stringify(copy))
}

export function stringToState(s: string): State | undefined {
  let decoded: string | undefined
  try {
    decoded = Base64.decode(s)
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Fail to parse state from url', error, error.stack, decoded, s)
  }
}

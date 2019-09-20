import { readFileSync } from 'fs'

export interface State {
  working?: string
  image: string
  imageBuffer: ArrayBufferView
}

export function getInitialState(): State {
  return {
    working: 'si si ',
    image: 'test/assets/lenna.jpg',
    imageBuffer: readFileSync('test/assets/lenna.jpg')
  }
}

const state = getInitialState()
export function getState() {
  return state
}

export function setState(s: Partial<State>) {
  Object.assign(state, s || {})
}

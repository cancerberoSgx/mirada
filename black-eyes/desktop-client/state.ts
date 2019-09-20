import { Window } from 'gui';
import { readFileSync } from 'fs';

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

const state = getInitialState();
export function getState() {
  return state
}

/** to be override by subclasses to update UI. Must call super !*/
export function setState(s: Partial<State>) {
  Object.assign(state, s || {});
}
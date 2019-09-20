import { Window } from 'gui';

export interface State {
  working?: string
  // win: Window
  image: string

}

export function getInitialState() {
  return {
    working: 'si si ',
  image: 'test/assets/lenna.jpg'
    // win: null as any
    }
}

const state = getInitialState();
export function getState(){
  return state
}
import { Emitter } from 'misc-utils-of-mine-generic'
import { State } from './state'
import { handleStateChange } from './stateChangeExpert';

export interface StateChange{ oldState: State, partial: Partial<State>, newState: State }
class Store extends Emitter<StateChange> {

  constructor(protected state: State) {
    super()
    this.emit = this.emit.bind(this)
  }

  setState(state: Partial<State>) {
    const oldState = this.state
    this.state = { ...this.state, ...state }
    handleStateChange({ oldState, partial: state, newState: this.state, emit: this.emit })
  }

  getState() {
    return this.state
  }
}
let store: Store

export function getStore() {
  return store
}

export function getState() {
  return store.getState()
}
export function _setStore(s: State) {
  store = new Store(s)
}


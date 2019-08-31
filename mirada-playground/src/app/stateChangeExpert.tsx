import { Fn } from '../ui/common/util'
import { StateChange } from './store'


export type StateChangeType = 'selectionChanged'

interface StateChangeEvent<T extends StateChangeType> {
  type: T
  change: StateChange
}

export type StateChangeListener<T extends StateChangeType> = { type: T, fn: Fn<[StateChangeEvent<T>], void> }

const listeners: StateChangeListener<StateChangeType>[] = []

export function addStateChangeListener<T extends StateChangeType>(type: StateChangeType, l: StateChangeListener<T>) {
  listeners.push(l as any)
}

export type SelectionChangeEvent = StateChangeEvent<'selectionChanged'>

export type SelectionChangeListener = StateChangeListener<'selectionChanged'>

// this guy will be an knowledge expert about the model changes - anti-pattern!
// high level state change ewert emotion and prioritization for performance
export function handleStateChange(change: StateChange & {
  emit: Fn<StateChange[], void>;
}) {

  // for now we just emit everything but probably we will prevent some.
  change.emit(change)

  const e: SelectionChangeEvent = { change, type: 'selectionChanged' }
  if (JSON.stringify(change.oldState.selection.rectangles) !== JSON.stringify(change.newState.selection.rectangles)) {
    notify(e)
  }
}


function notify<T extends StateChangeType>(e: StateChangeEvent<T>) {
  listeners.filter(l => l.type === e.type).forEach(l => l.fn(e))
}

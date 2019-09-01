import { Fn } from '../util/util'
import { StateChange } from './store'


export type StateChangeType = 'selectionChanged' | 'imageSizeChanged'

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
  if (JSON.stringify(change.oldState.selection.rectangles) !== JSON.stringify(change.newState.selection.rectangles)) {
    notify({ change, type: 'selectionChanged' })
  }

  console.log(change.oldState.imageSize, change.newState.imageSize)

  if (JSON.stringify(change.oldState.imageSize) !== JSON.stringify(change.newState.imageSize)) {
    notify({ change, type: 'imageSizeChanged' })
  }
}


function notify<T extends StateChangeType>(e: StateChangeEvent<T>) {
  // console.log('StateChange notify', e.type);

  listeners.filter(l => l.type === e.type).forEach(l => l.fn(e))
}

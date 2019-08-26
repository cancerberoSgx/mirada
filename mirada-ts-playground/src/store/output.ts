import { Action, Reducer } from 'redux'
import { Output } from './types'

export enum OUTPUT_ACTIONS {
  SET = 'OUTPUT_SET'
}

export const output: Reducer<Output, OutputActions> = (state = initialState, action) => {
  switch (action.type) {
    case OUTPUT_ACTIONS.SET:
      return { ...state, ...action.output }
    default:
      return state
  }
}

interface SetOutputAction extends Action<OUTPUT_ACTIONS.SET> {
  type: OUTPUT_ACTIONS.SET
  output: Output
}

export type OutputActions = SetOutputAction

const initialState = {}

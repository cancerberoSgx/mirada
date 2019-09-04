import * as handlers from './abstractCommand'
import * as execute from './execute'
import * as types from './types'

export const command = { ...execute, ...handlers, ...types }
export { execute } from './execute'

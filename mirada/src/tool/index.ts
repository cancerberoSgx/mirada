import * as chain from './chain'
import * as grabCut from './grabCut'
import * as image from './grabCut'

export const tool = { ...grabCut, ...chain, ...image }

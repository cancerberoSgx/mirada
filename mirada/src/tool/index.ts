import * as canny from './canny'
import * as chain from './chain'
import * as floodFill from './floodFill'
import * as replaceColor from './replaceColor'
export * from './types'

export const tool = { ...chain, ...canny, ...replaceColor, ...floodFill }


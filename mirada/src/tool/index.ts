import * as chain from './chain'
import * as grabCut from '../util/grabCut'
import * as canny from './canny'
import * as replaceColor from './replaceColor'
import * as floodFill from './floodFill'
export * from './types'

export const tool = {   ...chain,  ...canny, ...replaceColor, ... floodFill }


// export * from './chain'
// export * from '../util/grabCut'
// export * from './canny'
// export * from './replaceColor'
// export * from './floodFill'
// export * from './types'
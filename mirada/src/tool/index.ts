import * as chain from './chain'
import * as grabCut from './grabCut'
import * as image from './grabCut'
import * as canny from './canny'
import * as replaceColor from './replaceColor'
import * as floodFill from './floodFill'
export * from './types'
export const tool = { ...grabCut, ...chain, ...image, ...canny, ...replaceColor, ... floodFill }

// export namespace Tool{
//   export type ReplaceColorOptions = replaceColor.ReplaceColorOptions
//   export type ImageToolBaseOptions = ImageToolBaseOptions
//   export type FloodFillOptions = floodFill.FloodFillOptions
//   export type CannyOptions = canny.CannyOptions
//   export type GrabCutOptions = image.GrabCutOptions
  
// }
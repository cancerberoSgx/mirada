import { Command_asRgbaImpl } from './impl/asRgba'
import { Command_floodFillImpl } from './impl/floodfill'
import { Command_grabCutImpl } from './impl/grabCut'
import { Command_roiImpl } from './impl/roi'
import { CommandName, HandlersByName } from './types'
let implementations
export const handlerImplementations: HandlersByName = {
  [CommandName.asRgba]: new Command_asRgbaImpl(),
  [CommandName.roi]: new Command_roiImpl(),
  [CommandName.grabCut]: new Command_grabCutImpl(),
  [CommandName.floodFill]: new Command_floodFillImpl()
}

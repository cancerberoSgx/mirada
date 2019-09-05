import { File } from '../../file'
import { FloodFillOptions } from '../../tool'
import { floodFill } from '../../tool/floodFill'
import { Point, Scalar } from '../../types/opencv'
import { del, toRgba } from '../../util'
import { AbstractCommandHandler, checkCommandInOut, resolveFile } from '../abstractCommand'
import { Command, CommandName, Options1 } from '../types'

/**
 *
 */
export interface Command_floodFill extends Command<CommandName.floodFill> {
  seed: Point
  newVal: Scalar
}

export class Command_floodFillImpl extends AbstractCommandHandler<CommandName.floodFill> {
  async validate(c: Partial<Command_floodFill>) {
    return checkCommandInOut(c)
  }
  async run(o: Options1<CommandName.floodFill>) {
    const f = await resolveFile(o.command.in, o)
    if (!f) {
      return {
        error: 'Cannot find file ' + o.command.in,
        out: []
      }
    }
    const src = f!.asMat()
    const dst = new cv.Mat()
    const o2: FloodFillOptions = {
      dst, src, seed: o.command.seed,
      preprocess: [
        { name: 'gaussianBlur', blur: 5, },
        { name: 'canny', L2gradient: true }
      ],
      newColorOrImage: [255, 0, 0, 222],
      connectivity: 4
    }
    floodFill(o2)
    const aux = new cv.Mat()
    const dst2 = !o.command.out ? File.fromMat(toRgba(dst, aux)) : File.fromMat(toRgba(dst, aux)).clone(o.command.out)
    del(dst, src, aux)
    return {
      out: [dst2]
    }
  }
}

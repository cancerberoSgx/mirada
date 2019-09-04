import { File } from '../../file'
import { Point, Scalar } from '../../types/opencv'
import { toRgba } from '../../util'
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
    const img = f!.asMat()//new cv.Mat()

    const dst = new cv.Mat()

    cv.medianBlur(img, dst, 5)//new cv.Mat()//img.clone()
    // const dst  = img.clone()
    cv.cvtColor(dst, dst, cv.CV_8UC1, 3)
    // await write(toRgba(dst), 'tmp3333123123123.png')
    //    const seed = new cv.Point(4, 4);
    // const img = cv.Mat.zeros(100, 100, cv.CV_8UC1);
    // cv.circle(img, seed, 20, new cv.Scalar(128), 3);
    const mask = cv.Mat.zeros(dst.rows + 2, dst.cols + 2, cv.CV_8UC1)
    cv.Canny(dst, mask, 20, 240)
    cv.copyMakeBorder(mask, mask, 1, 1, 1, 1, cv.BORDER_REPLICATE)
    // await write(toRgba(mask), 'tmp3333___.png')
    //Fill mask with value 128
    const fillValue = 128
    cv.floodFill(dst, mask, o.command.seed, o.command.newVal, 0, new cv.Scalar(255, 255, 255, 255), new cv.Scalar(255, 255, 255, 255), 4 | cv.FLOODFILL_FIXED_RANGE | (fillValue << 8))
    // t.deepEqual(compareL2(await File.fromFile('test/assets/floodfill.png'), File.fromMat(await toRgba(mask))), 0)
    // await write(mask, 'tmp212333__333.png')
    const dst2 = !o.command.out ? File.fromMat(toRgba(mask)) : File.fromMat(toRgba(mask)).clone(o.command.out)
    return {
      out: [dst2]
    }
  }
}

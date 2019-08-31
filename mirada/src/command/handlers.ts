import { File, Rect } from '..'
import { isFile } from '../util/fileUtil'
import { Command, CommandHandler, CommandName, CommandsByName, HandlersByName, Options1, Result1 } from './types'
import { toRgba, toImageData } from '../util';

/**
 * Convert the image to RGBA channel type which is often needed before rendering/encoding. 
 */
export interface Command_asRgba extends Command<CommandName.asRgba> {
}
/**
 * Region of interest - Bounding box selection.
 */
export interface Command_roi extends Command<CommandName.roi> {
  /**
   * The rectangle containing the region of interest. 
   */
  expr: Rect
}

export interface Command_grabCut extends Command<CommandName.grabCut> {
  /**
   * If given the region outside rect will be considered the background to remove (uses cv.GC_INIT_WITH_RECT).
   */
  rect?: Rect
  /**
   * If given (and rect is not) its the name of an image used as a mask where its elements may have one of the GrabCutClasses to declare background and foreground regions.
   */
  mask?: string
  /**
   * If given a rectangle of given color will be drawn (requires `rect`)
   */
  frameColor?: string
}

export abstract class AbstractCommandHandler<N extends CommandName> implements CommandHandler<N> {
  abstract run(c: Options1<N>): Promise<Result1>
  abstract validate(c: Partial<CommandsByName[N]>): Promise<undefined | string>
}

function checkCommandInOut(c: Partial<Command<CommandName>>) {
  if (!c.in) {
    return 'in (input file) file is mandatory'
  }
  if (!c.out) {
    return 'out (output file name) is mandatory'
  }
}

export class Command_asRgbaImpl extends AbstractCommandHandler<CommandName.asRgba> {
  async  validate(c: Partial<Command_asRgba>) {
    return checkCommandInOut(c)
  }
  async run(o: Options1<CommandName.asRgba>) {
    const src = await resolveFile(o.command.in, o)
    if (!src) {
      return {
        error: 'Cannot find file ' + o.command.in,
        out: []
      }
    }
    const dst = !o.command.out ? src.toRgba() : src.clone(o.command.out).toRgba()
    return {
      out: [dst]
    }
  }
}

export class Command_roiImpl extends AbstractCommandHandler<CommandName.roi> {
  async run(o: Options1<CommandName.roi>) {
    const src = await resolveFile(o.command.in, o)
    if (!src) {
      return {
        error: 'Cannot find file ' + o.command.in,
        out: []
      }
    }
    const outMat = src.asMat().roi(o.command.expr)

    const dst = o.command.out ? File.fromMat(outMat, o.command.out) : src.setMat(outMat)
    return {
      out: [dst]
    }
  }
  async  validate(c: Partial<Command_roi>) {
    return checkCommandInOut(c) || !c.expr ? 'expr is mandatory' : undefined
  }
}


export async function resolveFile(name: string, o: Options1<CommandName>): Promise<undefined | File> {
  if (!name) {
    return
  }
  const f = (o.files || []).find(f => f.name === name)
  if (f) {
    return f
  } else if (isFile(name)) {
    return await File.fromFile(name)
  }
  else {
    try {
      return await File.fromUrl(name)
    } catch (error) {

    }
  }
}


export class Command_grabCutImpl extends AbstractCommandHandler<CommandName.grabCut> {
  async run(o: Options1<CommandName.grabCut>) {
      if(!o.command.rect){
      return  {
        error: 'Only grabCut rect mode is supported (WIP)',
        out: []
      }
    }
    const f = await resolveFile(o.command.in, o)
    if (!f) {
      return {
        error: 'Cannot find file ' + o.command.in,
        out: []
      }
    }
  const dstFile = o.command.out ? f : f.clone(o.command.in)
  const dst = dstFile.asMat()
  cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB, 0)
  let mask = new cv.Mat()
  let bgdModel = new cv.Mat()
  let fgdModel = new cv.Mat()
  cv.grabCut(dst, mask, o.command.rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT)
  for (let i = 0; i < dst.rows; i++) {
    for (let j = 0; j < dst.cols; j++) {
      if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
        dst.ucharPtr(i, j)[0] = 0
        dst.ucharPtr(i, j)[1] = 0
        dst.ucharPtr(i, j)[2] = 0
      }
    }
  }
  if (o.command.frameColor) {
    let point1 = new cv.Point(o.command.rect.x, o.command.rect.y)
    let point2 = new cv.Point(o.command.rect.x + o.command.rect.width, o.command.rect.y + o.command.rect.height)
    cv.rectangle(dst, point1, point2, o.command.frameColor)
  }
  mask.delete()
  bgdModel.delete()
  fgdModel.delete()

    return {
      out: [dstFile]
    }
  }
  async  validate(c: Partial<Command_grabCut>) {
   
  return  checkCommandInOut(c) || !c.rect&&!c.mask ? 'rect is mandatory' : undefined
  }
}

export const handlerImplementations: HandlersByName = {
  [CommandName.asRgba]: new Command_asRgbaImpl(),
  [CommandName.roi]: new Command_roiImpl(),
  [CommandName.grabCut]: new Command_grabCutImpl()
}
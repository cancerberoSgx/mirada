import { File, Rect } from '..'
import { isFile } from '../util/fileUtil'
import { Command, CommandHandler, CommandName, CommandsByName, HandlersByName, Options1, Result1 } from './types'
let handlers
export interface Command_asRgba extends Command<CommandName.asRgba> {
}
export interface Command_roi extends Command<CommandName.roi> {
  expr: Rect
}
// export interface Context<N extends CommandName> extends Options1<N>{
//   mats: Mat[]
// }
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
    const dst = !o.command.out ? src.toRgba() : src.clone(o.command.out).toRgba()// File.fromMat(src.clone().toRgba().asMat(), o.command.out||o.command.in)
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
export const handlerImplementations: HandlersByName = {
  [CommandName.asRgba]: new Command_asRgbaImpl(),
  [CommandName.roi]: new Command_roiImpl()
}

// const 
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

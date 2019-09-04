import { AbstractCommandHandler, checkCommandInOut, resolveFile } from '../abstractCommand'
import { Command, CommandName, Options1 } from '../types'

/**
 * Convert the image to RGBA channel type which is often needed before rendering/encoding.
 */
export interface Command_asRgba extends Command<CommandName.asRgba> {
}

export class Command_asRgbaImpl extends AbstractCommandHandler<CommandName.asRgba> {
  async validate(c: Partial<Command_asRgba>) {
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

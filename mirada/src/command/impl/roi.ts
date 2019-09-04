import { File, Rect } from '../..';
import { AbstractCommandHandler, checkCommandInOut, resolveFile } from '../abstractCommand';
import { Command, CommandName, Options1 } from '../types';

/**
 * Region of interest - Bounding box selection.
 */
export interface Command_roi extends Command<CommandName.roi> {
  /**
   * The rectangle containing the region of interest.
   */
  expr: Rect;
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
  async validate(c: Partial<Command_roi>) {
    return checkCommandInOut(c) || !c.expr ? 'expr is mandatory' : undefined
  }
}

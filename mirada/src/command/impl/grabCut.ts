import { Rect } from '../../types/opencv';
import { Command, CommandName, Options1 } from '../types';
import { AbstractCommandHandler, resolveFile, checkCommandInOut } from '../abstractCommand';

export interface Command_grabCut extends Command<CommandName.grabCut> {
  /**
   * If given the region outside rect will be considered the background to remove (uses cv.GC_INIT_WITH_RECT).
   */
  rect?: Rect;
  /**
   * If given (and rect is not) its the name of an image used as a mask where its elements may have one of the GrabCutClasses to declare background and foreground regions.
   */
  mask?: string;
  /**
   * If given a rectangle of given color will be drawn (requires `rect`)
   */
  frameColor?: string;
}

export class Command_grabCutImpl extends AbstractCommandHandler<CommandName.grabCut> {
  async run(o: Options1<CommandName.grabCut>) {
    if (!o.command.rect) {
      return {
        error: 'Only grabCut rect mode is supported (WIP)',
        out: []
      };
    }
    const f = await resolveFile(o.command.in, o);
    if (!f) {
      return {
        error: 'Cannot find file ' + o.command.in,
        out: []
      };
    }
    const dstFile = o.command.out ? f : f.clone(o.command.in);
    const dst = dstFile.asMat();
    cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB, 0);
    let mask = new cv.Mat();
    let bgdModel = new cv.Mat();
    let fgdModel = new cv.Mat();
    cv.grabCut(dst, mask, o.command.rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT);
    for (let i = 0; i < dst.rows; i++) {
      for (let j = 0; j < dst.cols; j++) {
        if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
          dst.ucharPtr(i, j)[0] = 0;
          dst.ucharPtr(i, j)[1] = 0;
          dst.ucharPtr(i, j)[2] = 0;
        }
      }
    }
    if (o.command.frameColor) {
      let point1 = new cv.Point(o.command.rect.x, o.command.rect.y);
      let point2 = new cv.Point(o.command.rect.x + o.command.rect.width, o.command.rect.y + o.command.rect.height);
      cv.rectangle(dst, point1, point2, o.command.frameColor);
    }
    mask.delete();
    bgdModel.delete();
    fgdModel.delete();
    return {
      out: [dstFile]
    };
  }
  async validate(c: Partial<Command_grabCut>) {
    return checkCommandInOut(c) || !c.rect && !c.mask ? 'rect is mandatory' : undefined;
  }
}

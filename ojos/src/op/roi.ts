import { del, Rect } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export interface RoiOptions extends OperationExecBaseOptions, RoiConcreteOptions {

}

interface RoiConcreteOptions {
  expr: Rect
}

/**
 * Return an image which has a src sub region defined by in given rectangle expression
 */
export class Roi extends AbstractOperation<RoiOptions> {
  name = "Roi"
  description = `Return an image which has a src sub region defined by in given rectangle expression`
  optionsOrder = ['src', 'dst', 'expr'] as (keyof RoiOptions)[]
  protected _exec(o: RoiOptions) {
    const m = o.src.roi(o.expr)
    m.copyTo(o.dst!)
    del(m)
  }
}


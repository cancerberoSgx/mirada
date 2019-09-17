import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithSize } from './types'
import { Rect, del } from 'mirada'

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
  optionsOrder = ['src', 'dst'] as (keyof RoiOptions)[]
  protected _exec(o: RoiOptions) {
      const m = o.src.roi(  o.expr)
      m.copyTo(o.dst!)
      del(m)
  }
}


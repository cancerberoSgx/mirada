import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithCenter, WithColor, WithLineType, WithShift, WithThickness } from './types'

export interface CircleOptions extends OperationExecBaseOptions, CircleConcreteOptions {

}

export interface CircleConcreteOptions extends Partial<WithLineType>, WithColor, WithCenter, Partial<WithThickness>, Partial<WithShift> {
  /**
   *   Radius of the circle.
   */
  radius: number
}

/**
 * draws a simple or filled circle with a given center and radius.
 */
export class Circle extends AbstractOperation<CircleOptions> {
  name = "Circle"
  description = `Draws a simple or filled circle with a given center and radius.`
  noDst = true
  protected _exec(o: CircleOptions) {
    cv.circle(o.dst!, o.center, o.radius, o.color, o.thickness || 1, o.lineType || cv.LINE_AA, o.shift || 0)
  }
}


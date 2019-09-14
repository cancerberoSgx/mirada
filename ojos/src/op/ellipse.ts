import { Size } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithCenter, WithColor, WithLineType, WithThickness } from './types'

export interface EllipseOptions extends OperationExecBaseOptions, EllipseConcreteOptions {

}

export interface EllipseConcreteOptions extends Partial<WithLineType>, WithColor, WithCenter, Partial<WithThickness> {
  /**
   * Ellipse angle in degrees.
   */
  angle: number;
  /**
   * Ellipse width and height.
   */
  size: Size;
}

/**
 * Draws a simple or filled Ellipse with a given center size and rotation angle.
 */
export class Ellipse extends AbstractOperation<EllipseOptions> {
  name = "Ellipse"
  description = `Draws a simple or filled Ellipse with a given center size and rotation angle.`
  noDst = true
  protected _exec(o: EllipseOptions) {
    cv.ellipse1(o.dst!, new cv.RotatedRect(o.center, o.size, o.angle), o.color, o.thickness || 1, o.lineType || cv.LINE_AA)
  }
}


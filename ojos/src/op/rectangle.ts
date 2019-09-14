import { Point } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithColor, WithLineType, WithShift, WithThickness } from './types'

export interface RectangleOptions extends OperationExecBaseOptions, RectangleConcreteOptions {

}

export interface RectangleConcreteOptions extends Partial<WithLineType>, WithColor, Partial<WithThickness>, Partial<WithShift> {
  /**
   * Vertex of the rectangle.
   */
  pt1: Point
  /**
   *  Vertex of the rectangle opposite to [pt1].
   */
  pt2: Point
}

/**
 * draws a rectangle outline or a filled rectangle whose two opposite corners are [pt1] and [pt2].
 */
export class Rectangle extends AbstractOperation<RectangleOptions> {
  name = "Rectangle"
  description = `Draws the Rectangle segment between pt1 and pt2 points in the image.`
  noDst = true
  protected _exec(o: RectangleOptions) {
    cv.rectangle(o.dst!, o.pt1, o.pt2, o.color, o.thickness || 1, o.lineType || cv.LINE_AA, o.shift || 0)
  }
}


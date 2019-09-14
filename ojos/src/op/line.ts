import { Point } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithColor, WithLineType, WithShift, WithThickness } from './types'

export interface LineOptions extends OperationExecBaseOptions, LineConcreteOptions {

}

export interface LineConcreteOptions extends Partial<WithLineType>, WithColor, Partial<WithThickness>, Partial<WithShift> {
  /**
   * First point of the line segment.
   */
  pt1: Point
  /**
   * Second point of the line segment.
   */
  pt2: Point
}

/**
 * Draws the line segment between pt1 and pt2 points in the image. The line is clipped by
 * the image boundaries. For non-antialiased lines with integer coordinates, the 8-connected or 4-connected
 * Bresenham algorithm is used. Thick lines are drawn with rounding endings. Antialiased lines are drawn using
 * Gaussian filtering.
 */
export class Line extends AbstractOperation<LineOptions> {
  name = "Line"
  description = `Draws the line segment between pt1 and pt2 points in the image.`
  noDst = true
  protected _exec(o: LineOptions) {
    cv.line(o.dst!, o.pt1, o.pt2, o.color, o.thickness || 1, o.lineType || cv.LINE_AA, o.shift || 0)
  }
}


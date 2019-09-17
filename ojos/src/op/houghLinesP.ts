import { del, Scalar } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { LineSegment, OperationExecBaseOptions } from './types'

export interface HoughLinesPOptions extends OperationExecBaseOptions, HoughLinesPConcreteOptions {
}
export interface HoughLinesPConcreteOptions {
  /**
   * 	parsed line segment objects.
   */
  lines: LineSegment[]
  /**
   * distance resolution of the accumulator in pixels.
   */
  rho: number
  /**
   * angle resolution of the accumulator in radians.
   */
  theta: number
  /**
   * accumulator threshold parameter. Only those lines are returned that get enough votes
   */
  threshold: number
  /**
   * minimum line length. Line segments shorter than that are rejected.
   */
  minLineLength?: number
  /**
   * maximum allowed gap between points on the same line to link them.
   */
  maxLineGap?: number
  /**
   * if given, line segments will be drawn in [dst]
   */
  color?: Scalar
  edgeThreshold?: number
  edgeThreshold2?: number
  edgeApertureSize?: number
  edgeL2gradient?: boolean
}

/**
 * Finds line segments in a binary image using the probabilistic Hough transform. The function implements the probabilistic Hough transform algorithm for line detection. It returns parsed set of line segments in [line] option. If color is given it will draw lines in [dst]
 */
export class HoughLinesP extends AbstractOperation<HoughLinesPOptions> {
  name = "HoughLinesP"
  description = 'Finds line segments in a binary image using the probabilistic Hough transform. The function implements the probabilistic Hough transform algorithm for line detection. It returns parsed set of line segments in [line] option. If color is given it will draw lines in [dst]'
  optionsOrder = ['src', 'dst', 'lines', 'rho', 'theta', 'threshold', 'minLineLength', 'maxLineGap', 'color', 'edgeThreshold', 'edgeThreshold2', 'edgeApertureSize', 'edgeL2gradient'] as (keyof HoughLinesPOptions)[]
  protected _exec(o: HoughLinesPOptions) {
    const lines = new cv.Mat()
    const src2 = new cv.Mat(o.src.rows, o.src.cols, o.src.type())
    cv.cvtColor(o.src, src2, cv.COLOR_RGBA2GRAY, 0)
    cv.Canny(src2, src2, o.edgeThreshold || 50, o.edgeThreshold2 || 200, o.edgeApertureSize || 3, o.edgeL2gradient || false)
    cv.HoughLinesP(src2, lines, o.rho, o.theta, o.threshold, o.minLineLength || 0, o.maxLineGap || 0)
    o.color && o.dst!.create(o.src.rows, o.src.cols, o.src.type())
    for (let i = 0; i < lines.rows; ++i) {
      let pt1 = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1])
      let pt2 = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3])
      o.lines.push({ pt1, pt2 })
      o.color && cv.line(o.dst!, pt1, pt2, o.color)
    }
    del(lines, src2)
  }
}


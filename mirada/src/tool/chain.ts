import { File } from '../file';
import { BorderTypes, CVDataType, Mat, Point, Rect } from '../types/opencv';
import { toRgba } from '../util/imageUtil';

export class Chain {
  constructor(protected mat: Mat = new cv.Mat()) {

  }
  filter2D(kernel: Mat, depth?: CVDataType, anchor?: Point, delta?: number, border?: BorderTypes) {
    cv.filter2D(this.mat, this.mat, depth, kernel, anchor, delta, border)
    return this
  }
  toRgba() {
    this.mat = toRgba(this.mat, this.mat)
    return this
  }
  roi(expr: Rect) {
    const dst = this.mat.roi(expr)
    this.mat.delete()
    this.mat = dst
    return this
  }
  asFile(name?: string) {
    return File.fromMat(this.mat, name)
  }
}

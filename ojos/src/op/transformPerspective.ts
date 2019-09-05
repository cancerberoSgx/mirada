import { Mat } from 'mirada'
import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions } from './types'

export class PerspectiveTransform extends AbstractOperation {
  name: string = "PerspectiveTransform"
  exec(o: OperationExecBaseOptions): Mat {
    throw new Error('Method not implemented.')
  }

  // async  applyPerspectiveTransform(inputs: number[], outputs: number[]) {
  //   // const i = await getImageWidget()
  //   // const size = { width: i.imageSize.width, height: i.imageSize.height }
  //   const src = fromFile('test/assets/lenna.jpg')
  //   let dst = new cv.Mat()
  //   let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, inputs)
  //   let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, outputs)
  //   let M = cv.getPerspectiveTransform(srcTri, dstTri, cv.SOLVEPNP_AP3P)
  //   cv.warpPerspective(src, dst, M, size, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar())
  //   i.setBuffer(dst)
  //   i.render()
  //   src.delete(); M.delete(); srcTri.delete(); dstTri.delete()
  // }
}


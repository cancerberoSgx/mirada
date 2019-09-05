import { Mat } from 'mirada'
import { ImageOperation, OperationExecBaseOptions } from './types'

export abstract class AbstractOperation implements ImageOperation {
  abstract name: string;
  description: string = 'TODO'
  abstract exec(o: OperationExecBaseOptions): Promise<Mat>

  verifyDst(o: OperationExecBaseOptions, sameSizeAndType = false) {
    if (!o.dst) {
      if (sameSizeAndType) {
        o.dst = cv.Mat.zeros(o.src.rows, o.src.cols, o.src.type())
      } else {
        o.dst = new cv.Mat()
      }
    }
    return o.dst
  }
}

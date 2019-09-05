import { Mat } from 'mirada'
import { ImageOperation, OperationExecBaseOptions } from './types'

export abstract class AbstractOperation implements ImageOperation {
  abstract name: string;
  description: string = 'TODO'
  abstract exec(o: OperationExecBaseOptions): Promise<Mat>

  verifyDst(o: OperationExecBaseOptions) {
    if (!o.dst) {
      o.dst = new cv.Mat()
    }
    return o.dst
  }
}

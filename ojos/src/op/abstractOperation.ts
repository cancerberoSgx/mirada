import { Mat } from 'mirada'
import { ImageOperation, OperationExecBaseOptions } from './types'

export abstract class AbstractOperation implements ImageOperation {
  abstract name: string;
  description: string = 'TODO'
  abstract exec(o: OperationExecBaseOptions): Mat;
}

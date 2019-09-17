import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithSize } from './types'

export interface PyrOptions extends OperationExecBaseOptions, PyrConcreteOptions {

}

interface PyrConcreteOptions extends Partial<WithSize>, WithBorderType {
  /**
   * PyrUp or PyrDown.
   */
  type: 'up' | 'down'
}

/**
 * Performs pyramid up or down on an image. PyrUp up samples an image and then blurs it. PyrDown blurs an image and down samples it. By default, size of the output image is computed as `Size((src.cols+1)/2, (src.rows+1)/2)`, but in any case, the following conditions should be satisfied: `|𝚍𝚜𝚝𝚜𝚒𝚣𝚎.𝚠𝚒𝚍𝚝𝚑∗2−src.cols|≤2|𝚍𝚜𝚝𝚜𝚒𝚣𝚎.𝚑𝚎𝚒𝚐𝚑𝚝∗2−src.rows|≤2`
 */
export class Pyr extends AbstractOperation<PyrOptions> {
  name = "Pyr"
  description = ` Performs pyramid up or down on an image. PyrUp up samples an image and then blurs it. PyrDown blurs an image and down samples it. By default, size of the output image is computed as 'Size((src.cols+1)/2, (src.rows+1)/2)', but in any case, the following conditions should be satisfied: '|𝚍𝚜𝚝𝚜𝚒𝚣𝚎.𝚠𝚒𝚍𝚝𝚑∗2−src.cols|≤2|𝚍𝚜𝚝𝚜𝚒𝚣𝚎.𝚑𝚎𝚒𝚐𝚑𝚝∗2−src.rows|≤2'.`
  optionsOrder = ['src', 'dst', 'type', 'size', 'bordertype'] as (keyof PyrOptions)[]
  protected _exec(o: PyrOptions) {
    if (o.type === 'up') {
      cv.pyrUp(o.src, o.dst!, o.size || new cv.Size(0, 0), o.borderType || cv.BORDER_DEFAULT)
    } else {
      cv.pyrDown(o.src, o.dst!, o.size || new cv.Size(0, 0), o.borderType || cv.BORDER_DEFAULT)
    }
  }
}


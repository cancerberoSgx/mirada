import { AbstractOperation } from './abstractOperation'
import { OperationExecBaseOptions, WithBorderType, WithSize } from './types'
import { toRgba } from 'mirada'

export interface ToRgbaOptions extends OperationExecBaseOptions, ToRgbaConcreteOptions {

}

interface ToRgbaConcreteOptions {
 
}

/**
 * Changes image type to 4 channel RGBA. This is often necessary to render in HTML canvas.
 */
export class ToRgba extends AbstractOperation<ToRgbaOptions> {
  name = "ToRgba"
  description = `Changes image type to 4 channel RGBA. This is often necessary to render in HTML canvas.`
  optionsOrder = ['src', 'dst'] as (keyof ToRgbaOptions)[]
  protected _exec(o: ToRgbaOptions) {
      toRgba(o.src, o.dst)
  }
}


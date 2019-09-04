import * as React from 'react';
import { Input } from 'semantic-ui-react';
import { getImageWidget } from '../app/start';
import { AbstractComponent, AbstractProps } from '../ui/common/component';
import { AbstractTool, getTool } from '../ui/tool/tool';
import { State } from '../app/state';

export class AffineTransformView extends AbstractComponent<AbstractProps, State> {
  protected tool: AffineTransform;
  constructor(p: any, s: any) {
    super(p, s)
    this.onChange = this.onChange.bind(this)
    this.tool = new AffineTransform()
  }
  protected el: HTMLDivElement | null = null
  protected step = 0.05
  render() {
    return (
      <div>
        <table ref={c => this.el = c}>
          <tr>
            <td><Input type="number" min="-10" max="10" step={this.step} onChange={this.onChange} defaultValue="0" /></td>
            <td><Input type="number" min="-10" max="10" step={this.step} onChange={this.onChange} defaultValue="0" /></td>
          </tr>
          <tr>
            <td><Input type="number" min="-10" max="10" step={this.step} onChange={this.onChange} defaultValue="0" /></td>
            <td><Input type="number" min="-10" max="10" step={this.step} onChange={this.onChange} defaultValue="1" /></td>
          </tr>
          <tr>
            <td><Input type="number" min="-10" max="10" step={this.step} onChange={this.onChange} defaultValue="1" /></td>
            <td><Input type="number" min="-10" max="10" step={this.step} onChange={this.onChange} defaultValue="0" /></td>
          </tr>
        </table>
      </div>
    )
  }
  protected async onChange(e: any) {
    const inputs = Array.from(this.el!.querySelectorAll('input')).map(i => i.valueAsNumber || 0)
    await this.tool.applyAffineTransform(inputs)
  }
}

export class AffineTransform extends AbstractTool {
  static INSTANCE = new AffineTransform()
  static toolBarEntry = { tool: () => AffineTransform.INSTANCE, el: () => <AffineTransformView /> }
  name = 'Affine transform'
  description = 'Rotate, scale, skew, translate'
  shortDescription = 'Rotate, scale, skew, translate'
  async  applyAffineTransform(inputs: number[]) {
    const i = await getImageWidget()
    const size = { width: i.imageSize.width, height: i.imageSize.height }
    const src = i.get().clone().asMat()
    let dst = new cv.Mat();
    let srcTri = cv.matFromArray(3, 1, cv.CV_32FC2, [0, 0, 0, 1, 1, 0]);
    let dstTri = cv.matFromArray(3, 1, cv.CV_32FC2, inputs);
    let M = cv.getAffineTransform(srcTri, dstTri);
    cv.warpAffine(src, dst, M, size, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    i.setBuffer(dst)
    i.render()
    src.delete(); M.delete(); srcTri.delete(); dstTri.delete();
  }
}

import * as React from 'react'
import { Icon } from 'semantic-ui-react'
import { getImageWidget } from '../../app/start'
import { State } from '../../app/state'
import { AbstractComponent, AbstractProps } from '../common/component'
import { Point } from '../common/point'
import { AbstractTool } from './tool'

export class PerspectiveTransformView extends AbstractComponent<AbstractProps, State> {
  protected tool: PerspectiveTransform;
  protected srcEl: HTMLElement | null = null
  protected dstEl: HTMLElement | null = null
  protected step = 5
  protected max = 1500
  constructor(p: any, s: any) {
    super(p, s)
    this.onChange = this.onChange.bind(this)
    this.tool = PerspectiveTransform.INSTANCE
  }
  render() {
    return (
      <div>
        <table><tr>
          <td>
            <table ref={c => this.srcEl = c}>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} selectButton={true} onChange={this.onChange} defaultValue={{ x: 56, y: 65 }} /></td>
                <td><Icon name="arrow right" /></td>
              </tr>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} selectButton={true} onChange={this.onChange} defaultValue={{ x: 368, y: 52 }} /></td>
                <td><Icon name="arrow right" /></td>
              </tr>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} selectButton={true} onChange={this.onChange} defaultValue={{ x: 28, y: 387 }} /></td>
                <td><Icon name="arrow right" /></td>
              </tr>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} selectButton={true} onChange={this.onChange} defaultValue={{ x: 389, y: 390 }} /></td>
                <td><Icon name="arrow right" /></td>
              </tr>
            </table>
          </td>
          <td>
            <table ref={c => this.dstEl = c}>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} onChange={this.onChange} selectButton={true} defaultValue={{ x: 56, y: 65 }} /></td>
              </tr>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} onChange={this.onChange} selectButton={true} defaultValue={{ x: 368, y: 52 }} /></td>
              </tr>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} onChange={this.onChange} selectButton={true} defaultValue={{ x: 28, y: 387 }} /></td>
              </tr>
              <tr>
                <td><Point min={{ x: this.max * -1, y: this.max * -1 }} max={{ x: this.max, y: this.max }} step={{ x: this.step, y: this.step }} targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} onChange={this.onChange} selectButton={true} defaultValue={{ x: 389, y: 390 }} /></td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
      </div>
    )
  }
  protected async onChange(e: any) {
    const src = Array.from(this.srcEl!.querySelectorAll<HTMLInputElement>('input[type="number"]')).map(i => i.valueAsNumber || 0)
    const dst = Array.from(this.dstEl!.querySelectorAll<HTMLInputElement>('input[type="number"]')).map(i => i.valueAsNumber || 0)
    await this.tool.applyPerspectiveTransform(src, dst)
  }
}

export class PerspectiveTransform extends AbstractTool {
  static INSTANCE = new PerspectiveTransform()
  static toolBarEntry = { tool: () => PerspectiveTransform.INSTANCE, el: () => <PerspectiveTransformView /> }
  name = 'Perspective transform'
  description = "Define Point to point perspective transformation"
  shortDescription = "Define Point to point perspective transformation"
  protected constructor() {
    super()
  }
  async  applyPerspectiveTransform(inputs: number[], outputs: number[]) {
    const i = await getImageWidget()
    const size = { width: i.imageSize.width, height: i.imageSize.height }
    const src = i.get().clone().asMat()
    let dst = new cv.Mat()
    let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, inputs)
    let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, outputs)
    let M = cv.getPerspectiveTransform(srcTri, dstTri, cv.SOLVEPNP_AP3P)
    cv.warpPerspective(src, dst, M, size, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar())
    i.setBuffer(dst)
    i.render()
    src.delete(); M.delete(); srcTri.delete(); dstTri.delete()
  }
}

export enum SolveMethodEnum  {
SOLVEPNP_ITERATIVE='SOLVEPNP_ITERATIVE',
SOLVEPNP_EPNP='SOLVEPNP_EPNP',
SOLVEPNP_P3P='SOLVEPNP_P3P',
SOLVEPNP_DLS='SOLVEPNP_DLS',
SOLVEPNP_UPNP='SOLVEPNP_UPNP',
SOLVEPNP_AP3P='SOLVEPNP_AP3P',
SOLVEPNP_IPPE='SOLVEPNP_IPPE',
SOLVEPNP_IPPE_SQUARE='SOLVEPNP_IPPE_SQUARE'
ç
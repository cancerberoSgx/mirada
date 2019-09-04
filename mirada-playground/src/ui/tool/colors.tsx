import 'magica'
import * as React from 'react'
import { Input, Button, Popup, Icon } from 'semantic-ui-react'
import { getCanvasOverlay, getImageWidget, started, getHtmlCanvasSync } from '../../app/start'
import { State } from '../../app/state'
import { AbstractComponent, AbstractProps } from '../common/component'
import { Point } from '../common/point'
import { AbstractTool } from './tool'
import { ChromePicker, CirclePicker, Color as IColor } from 'react-color';
import { Color } from '../common/color';

export class ColorsView extends AbstractComponent<AbstractProps, State> {
  constructor(p: any, s: any) {
    super(p, s)
    this.onChange = this.onChange.bind(this)
  }
  protected canvasSizeEl: HTMLDivElement | null = null
  protected imageResizeEl: HTMLTableDataCellElement | null = null
  protected imageOffsetEl: HTMLDivElement | null = null
  protected step = 10

  render() {
    if (!getHtmlCanvasSync()) {
      return 'Loading...'
    }
    return (<>

        Foreground: <Color value={{ r: 221, g: 222, b: 223, a: .6 }} onChange={c => console.log(c)} selectButton 
        targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} />

      Background: <Color value={{ r: 0, g: 0, b: 0, a: 0.5 }} onChange={c => console.log(c)} selectButton 
      targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} />

      <Button.Group toggle size="medium">
        <Button onClick={e => { }}>
          <Popup position="bottom left" flowing={false}
            mountNode={document.body} size="small" hoverable style={{ left: '-10vw' }}
            content=" "
            trigger={
              <span><Icon name="paint brush" />Replace Color</span>} />
        </Button>
        <Button onClick={e => { }}>
          <Popup position="bottom left" flowing={false}
            mountNode={document.body} size="small" hoverable style={{ left: '-10vw' }}
            content=" "
            trigger={
              <span><Icon name="eye dropper" />Flood fill</span>} />
        </Button>
      </Button.Group>
      </>
    )
  }
  protected async onChange(e: any) {
    const canvasSize = Array.from(this.canvasSizeEl!.querySelectorAll('input')).map(i => i.valueAsNumber || 0)
    const imageOffset = Array.from(this.imageOffsetEl!.querySelectorAll('input')).map(i => i.valueAsNumber || 0)
    const imageResize = Array.from(this.imageResizeEl!.querySelectorAll('input')).map(i => i.valueAsNumber || 0)
    // await Colors.INSTANCE.applyColors(canvasSize, imageOffset, imageResize)
  }
}

export class Colors extends AbstractTool {
  static INSTANCE = new Colors()
  static toolBarEntry = { tool: () => Colors.INSTANCE, el: () => <ColorsView /> }
  name = 'Colors'
  description = 'Color related tools for replace, flood fill, channel filters, saturate, brightness, etc'
  shortDescription = 'Color related tools'
  // async  applyColors(canvasSize?: number[], imageOffset?: number[], imageResize?: number[]) {
  //   const i = await getImageWidget()
  //   if (imageResize && imageResize.length >= 2) {
  //     i.imageResize(imageResize[0], imageResize[1])
  //   }
  //   if (canvasSize && canvasSize.length >= 2) {
  //     i.resizeCanvas(canvasSize[0], canvasSize[1])
  //     const o = await getCanvasOverlay()
  //     o.updateSize({ width: canvasSize[0], height: canvasSize[1] })
  //   }
  //   if (imageOffset && imageOffset.length >= 2) {
  //     i.imageOffset(imageOffset[0], imageOffset[1])
  //   }
  // }
}

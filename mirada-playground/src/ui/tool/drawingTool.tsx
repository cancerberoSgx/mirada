import * as React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { getShapeDrawing } from '../../app/start'
import { ShapeTypes } from '../../app/state'
import { getState, setState } from '../../app/store'
import { AbstractComponent } from '../common/component'
import { AbstractTool } from './tool'

export class ShapeToolView extends AbstractComponent {
  render() {
    return (
      <Button.Group toggle size="medium" vertical fluid >
        <Button onClick={e => this.setShape('rectangle')}><Icon name="square outline" />Rectangle</Button>
        <Button onClick={e => this.setShape('brush')}><Icon name="paint brush" />Brush</Button>
        <Button onClick={e => this.setShape('ellipse')}><Icon name="ellipsis horizontal" />Ellipse</Button>
      </Button.Group>
    )
  }
  protected setShape(s: ShapeTypes) {
    setState({ shapesTool: { ...getState().shapesTool, activeShape: s } })
    ShapeTool.INSTANCE.setActive(true)
  }
}

export class ShapeTool extends AbstractTool {
  static INSTANCE = new ShapeTool()
  static toolBarEntry = { tool: () => ShapeTool.INSTANCE, el: () => <ShapeToolView /> }
  name = 'Shapes'
  description = 'Shape drawing tool'
  shortDescription = 'Shape drawing tool'
  async setActive(b: boolean) {
    const manager = await getShapeDrawing()
    manager.setEnabled(true)
    super.setActive(b)
  }
}



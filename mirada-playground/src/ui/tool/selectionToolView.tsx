import * as React from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { SelectionTool } from './selectionTool'
import { getTool } from './tool'

export class SelectionToolView extends AbstractComponent {
  render() {
    const tool = getTool(SelectionTool.NAME) as SelectionTool
    return (
      <Button.Group toggle size="medium" vertical fluid>
        <Button onClick={e => tool.onAction('select')}>
          <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable style={{ left: '-10vw' }} content="Select existing shapes with this  marquee tool to move resize or rotate or delete them. By dragging bigger rectangles you can select and apply transformation on several shapes. Also keyboard is supported like ctrl, shift, ect." trigger={
            <span><Icon name="mouse pointer" /> Select</span>} />
        </Button>
        <Button onClick={e => tool.onAction('delete')}>
          <Icon name="delete" />Delete Selection</Button>

        <Button onClick={e => tool.onAction('invertSelection')}>
          <Icon name="idea" />Invert Selection</Button>
        <Button onClick={e => tool.onAction('selectAll')}>
          <Icon name="hand rock" />Select All</Button>
      </Button.Group>
    )
  }
}




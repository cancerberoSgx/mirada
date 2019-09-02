import * as React from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { SelectionActions } from '../../app/state'
import { AbstractComponent } from '../common/component'

export class SelectionToolView extends AbstractComponent {
  render() {
    return (
      <Button.Group toggle size="medium" vertical fluid>

        <Button onClick={e => this.handleSelectionAction('select')}>
          <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable style={{ left: '-10vw' }} content="Select existing shapes with this markee tool to move resize or rotate or delete them. By dragging bigger rectangles you can select and apply transformation on several shapes. Also keyboard is supported like ctrl, shift, ect." trigger={
            <span><Icon name="mouse pointer" /> Select</span>} />
        </Button>

        <Button onClick={e => this.handleSelectionAction('delete')}><Icon name="delete" />Delete Selected</Button>

        <Button onClick={e => this.handleSelectionAction('invertSelection')}><Icon name="idea" />Invert Selection</Button>
        <Button onClick={e => this.handleSelectionAction('selectAll')}><Icon name="hand rock" />Select All</Button>

      </Button.Group>

    )
  }
  handleSelectionAction(s: SelectionActions) {
    throw 'TODO'
  }
}




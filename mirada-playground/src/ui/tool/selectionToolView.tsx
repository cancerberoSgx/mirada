import * as React from 'react'
import { Accordion, Button, Header, Icon, Menu, Popup } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { SelectionTool } from './selectionTool';

export class SelectionToolView extends AbstractComponent {
  
  render() {
    const t = this.state.tools.find(d => d.name === SelectionTool.NAME)! as SelectionTool
    if(!t){
      return <span>Loading</span>

    }
    return (
      <Menu.Item fluid content={SelectionTool.SHORT_DESCRIPTION}>
          <Header as="h6">Selection tools</Header>

        <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable 
        style={{ left: '-20vw' }} content={SelectionTool.DESCRIPTION} trigger={<Icon name="help circle" />} />

        <Accordion.Title active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)} 
        content={SelectionTool.NAME} index={t.toolGroupIndex} onClick={() => t.handleToolGroupVisibleToggle(t.toolGroupIndex)} />

        <Accordion.Content active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)} fluid>
          <Header as="h6">Selection Management tools</Header>
          
          <Button.Group toggle size="medium" vertical fluid>

            <Button onClick={e => t.handleSelectionAction('select')}>
              <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable style={{ left: '-10vw' }} content="Select existing shapes with this markee tool to move resize or rotate or delete them. By dragging bigger rectangles you can select and apply transformation on several shapes. Also keyboard is supported like ctrl, shift, ect." trigger={
                <span><Icon name="mouse pointer" /> Select</span>} />
            </Button>

            <Button onClick={e => t.handleSelectionAction('delete')}><Icon name="delete" />Delete Selected</Button>

            <Button onClick={e => t.handleSelectionAction('invertSelection')}><Icon name="idea" />Invert Selection</Button>
            <Button onClick={e => t.handleSelectionAction('selectAll')}><Icon name="hand rock" />Select All</Button>

          </Button.Group>
        </Accordion.Content>
      </Menu.Item>

    )
  }
}






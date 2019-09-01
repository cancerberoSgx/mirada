import * as React from 'react'
import { Accordion, Button, Icon, Menu, Popup } from 'semantic-ui-react'
import { ShapeTypes } from '../../app/state'
import { getState, setState } from '../../app/store'
import { AbstractToolView } from './AbstractToolView'
import { ShapeTool } from './shapeTool'

export class ShapeToolView extends AbstractToolView {
  toolName = ShapeTool.NAME
  render() {
    const t = this.getTool()
    if (!t) {
      return <h4>Loading</h4>
    }
    return (
      <Menu.Item fluid content={t.name}>

        <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable
          style={{ left: '-20vw' }} content={t.description} trigger={<Icon name="help circle" />} />

        <Accordion.Title active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)}
          content={t.name} index={t.toolGroupIndex} onClick={() => t.handleToolGroupVisibleToggle(t.toolGroupIndex)} />

        <Accordion.Content active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)} fluid>

          <Button.Group toggle size="medium" vertical fluid >
            <Button onClick={e => this.setShape('rectangle')}><Icon name="square outline" />Rectangle</Button>
            <Button onClick={e => this.setShape('rectangle')}><Icon name="paint brush" />Brush</Button>
            <Button onClick={e => this.setShape('rectangle')}><Icon name="ellipsis horizontal" />Ellipse</Button>
          </Button.Group>

        </Accordion.Content>
      </Menu.Item>
    )
  }

  protected setShape(s: ShapeTypes) {
    setState({ shapesTool: { ...getState().shapesTool, activeShape: s } })
    this.getTool()!.setActive(true)
  }

}






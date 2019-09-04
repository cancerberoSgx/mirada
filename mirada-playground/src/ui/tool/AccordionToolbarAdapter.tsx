import * as React from 'react'
import { Accordion, Header, Icon, Menu, Popup } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { Tool } from './tool'

export interface AP {
  toolGroupIndex: number;
  tool: Tool;
  children: string | React.ReactNode | React.ReactNode[]
}

export class AccordionToolbarAdapter extends AbstractComponent<AP> {
  render() {
    const t = this.props.tool
    return !t ? 'Loading...' : (
      <Menu.Item fluid content={t.shortDescription}>
        <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable style={{ left: '-20vw' }} content={t.description} trigger={<Icon name="help circle" />} />

        <Accordion.Title active={this.state.shapesTool.menuActiveIndex.includes(this.props.toolGroupIndex)} content={t.name} index={this.props.toolGroupIndex} onClick={() => t.handleToolGroupVisibleToggle(this.props.toolGroupIndex)} />

        <Accordion.Content active={this.state.shapesTool.menuActiveIndex.includes(this.props.toolGroupIndex)} fluid>
          <Header as="h6">{t.shortDescription}</Header>

          {this.props.children}

        </Accordion.Content>
      </Menu.Item>)
  }
}

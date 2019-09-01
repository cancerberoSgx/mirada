import * as React from 'react'
import { Accordion, Button, Checkbox, Icon, Menu, Popup, Header } from 'semantic-ui-react'
import { GrabCut } from './grabCut'
import { GrabCutRegions } from '../../app/state';
import { AbstractToolView } from './AbstractToolView';

export class GrabCutView extends AbstractToolView {

  toolName = GrabCut.NAME
  getTool(): GrabCut {
    return super.getTool() as GrabCut
  }
  render() {
    const t = this.getTool()
    if (!t) {
      return <h4>Loading</h4>
    }
    return (

      <Menu.Item fluid content={GrabCut.SHORT_DESCRIPTION}>
          <Header as="h6">GrabCut - the intelligent background tool</Header>

        <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable style={{ left: '-20vw' }} content={GrabCut.DESCRIPTION} trigger={<Icon name="help circle" />} />

        <Accordion.Title active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)} content={GrabCut.NAME} index={t.toolGroupIndex} onClick={() => t.handleToolGroupVisibleToggle(t.toolGroupIndex)} />

        <Accordion.Content active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)} fluid>
          
          <Checkbox toggle className="toolEnabledToggle"
            onChange={(e, props) => t.setActive(!!props.checked)}
            checked={this.state.activeTools.includes(t)} label={GrabCut.NAME} />

          <Button.Group toggle size="medium" vertical fluid >
            <Button onClick={e => this.handleRegionTypeChenge('interest')}><Icon name="smile outline" />Region of interest</Button>
            <Button onClick={e => () => this.handleRegionTypeChenge('background')}><Icon name="remove" />Background</Button>
          </Button.Group>

        </Accordion.Content>
      </Menu.Item>
    )
  }
  handleRegionTypeChenge(region:GrabCutRegions){
    this.setState({grabCut: {...this.state.grabCut, region}})
  }
}

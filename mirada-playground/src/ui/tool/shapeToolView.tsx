import * as React from 'react'
import { Accordion, Button, Header, Icon, Menu, Popup } from 'semantic-ui-react'
import { RegionDefinitionShapes } from '../../app/state'
import { getState, setState } from '../../app/store'
import { AbstractComponent } from '../common/component'
import { ShapeTool } from './shapeTool';

export class ShapeToolView extends AbstractComponent {

  render() {
    const t = this.state.tools.find(d => d.name === ShapeTool.NAME)!  as  ShapeTool
    // debugger
    if(!t){
      return <span>Loading</span>

    }
    // const t = this.state.tools.find(d => d.name === GrabCut.NAME)!

    return (

    // return (

      <Menu.Item fluid content={ShapeTool.SHORT_DESCRIPTION}>
          <Header as="h6">Shape editor, grouping and taggin</Header>>

        <Popup position="bottom left" flowing={false} mountNode={document.body} size="small" hoverable 
        style={{ left: '-20vw' }} content={ShapeTool.DESCRIPTION} trigger={<Icon name="help circle" />} />

        <Accordion.Title active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)} 
        content={ShapeTool.NAME} index={t.toolGroupIndex} onClick={() => t.handleToolGroupVisibleToggle(t.toolGroupIndex)} />

        <Accordion.Content active={this.state.shapesTool.menuActiveIndex.includes(t.toolGroupIndex)} fluid>
          
          {/* <Checkbox toggle className="toolEnabledToggle"
            onChange={(e, props) => t.setActive(!!props.checked)}
            checked={this.state.activeTools.includes(t)} label={ShapeTool.NAME} />


          <Button.Group toggle size="medium" vertical fluid >
            <Button onClick={e => this.handleRegionTypeChenge('interest')}><Icon name="smile outline" />Region of interest</Button>
            <Button onClick={e => () => this.handleRegionTypeChenge('background')}><Icon name="remove" />Background</Button>
          </Button.Group> */}

          <br />
          <Button.Group toggle size="medium" vertical fluid >
            <Button onClick={e => this.setShape('rectangle')}><Icon name="square outline" />Rectangle</Button>
            <Button onClick={e => this.setShape('rectangle')}><Icon name="paint brush" />Brush</Button>
            <Button onClick={e => this.setShape('rectangle')}><Icon name="ellipsis horizontal" />Ellipse</Button>
          </Button.Group>

        </Accordion.Content>
      </Menu.Item>
    )
    
  }

  public setShape(s: RegionDefinitionShapes) {
    setState({ shapesTool: { ...getState().shapesTool, activeShape: s } })
  }


// handleToolSelected(t:SelectionActions){
//   throw 'not impl'
//     // this.setState({ shapesTool: { ...this.state.shapesTool, activeShape: s } })
// }
}






import { setObjectProperty } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Accordion, AccordionTitleProps, Button, Icon, Menu } from 'semantic-ui-react'
import { RegionDefinitionShapes, State } from '../../app/state'
import { AbstractComponent, AbstractProps } from '../common/component'

export class RegionDefinitionTool extends AbstractComponent {
  constructor(p: AbstractProps, s: State) {
    super(p, s)
    this.handleClick = this.handleClick.bind(this)
  }
  protected handleClick(event: React.MouseEvent<HTMLDivElement>, titleProps: AccordionTitleProps) {
    const { index } = titleProps
    const newIndex = this.state.shapesTool.menuActiveIndex === index ? -1 : index
    setObjectProperty(this.state, 'shapesTool.menuActiveIndex', newIndex)
    this.setState({ ...this.state })
  }
  render() {

    const activeIndex = this.state.shapesTool.menuActiveIndex
    return (
      <Accordion as={Menu} vertical fluid>
        <Menu.Item fluid>
          <Accordion.Title
            active={activeIndex === 0}
            content='Size'
            index={0}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 0} fluid>
            <Button.Group toggle size="tiny" vertical fluid>

              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="mouse pointer" />Select</Button>
              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="remove" />Delete</Button>
              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="square outline" />Rectangle</Button>
              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="paint brush" />Brush</Button>
            </Button.Group>
          </Accordion.Content>
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content='Colors'
            index={1}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 1} fluid >
            <Button.Group toggle size="tiny" vertical>

              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="mouse pointer" />Select</Button>
              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="remove" />Delete</Button>
              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="square outline" />Rectangle</Button>
              <Button onClick={e => () => this.setShape('rectangle')}><Icon name="paint brush" />Brush</Button>
            </Button.Group>
          </Accordion.Content>
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content='ohrhrhrh'
            index={2}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 1}  >
            <p>jasla sjlks adkjk djsd</p>
          </Accordion.Content>
        </Menu.Item>

      </Accordion>

    )
  }
  setShape(s: RegionDefinitionShapes) {
    this.setState({ ...this.state, shapesTool: { ...this.state.shapesTool, activeShape: s } })
  }
}


{/* <Header as="h3">Selection</Header> */ }
{/* <Button.Group toggle size="tiny">
    <Button onClick={e=>()=>this.setShape('rectangle')}><Icon name="square outline"/>Rectangle</Button>
    <Button onClick={e=>()=>this.setShape('rectangle')}><Icon name="paint brush"/>Brush</Button>
  </Button.Group> */}

{/* <Button.Group toggle size="tiny">

    <Button onClick={e=>()=>this.setShape('rectangle')}><Icon name="mouse pointer"/>Select</Button>
    <Button onClick={e=>()=>this.setShape('rectangle')}><Icon name="remove"/>Delete</Button>
    <Button onClick={e=>()=>this.setShape('rectangle')}><Icon name="square outline"/>Rectangle</Button>
    <Button onClick={e=>()=>this.setShape('rectangle')}><Icon name="paint brush"/>Brush</Button>
  </Button.Group></div> */}

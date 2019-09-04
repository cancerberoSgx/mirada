import * as React from 'react'
import { Accordion, Button, Menu, Segment, Popup, Icon, Header } from 'semantic-ui-react'
import { getImageWidget } from '../app/start'
import { AbstractComponent } from './common/component'
import { AffineTransform } from './tool/affineTransform'
import { CanvasAndImage } from './tool/canvasAndImage'
import { ShapeTool } from './tool/drawingTool'
import { GrabCut } from './tool/grabCut'
import { PerspectiveTransform } from './tool/perspectiveTransform'
import { SelectionTool } from './tool/selectionTool'
import { SelectedShapes } from './tool/selectedShapes';
import { Tool } from './tool/tool';
import { Colors } from './tool/colors';

const tools = [
  SelectionTool.toolBarEntry,
  ShapeTool.toolBarEntry,
  Colors.toolBarEntry,
  GrabCut.toolBarEntry,
  AffineTransform.toolBarEntry,
  PerspectiveTransform.toolBarEntry,
  CanvasAndImage.toolBarEntry,
  SelectedShapes.toolBarEntry
]

export class ToolBar extends AbstractComponent {
  render() {
    if (this.state.toolBarCollapsed) {
      return ''
    }
    return (
      <Segment className="toolBar" basic>
        <Button primary onClick={async e => {
          const i = await getImageWidget()
          i.updateFromCanvas()
        }}>Apply</Button>
        <Accordion as={Menu} vertical fluid>
          {tools.map((t, i) => <AccordionToolbarAdapter tool={t.tool()} toolGroupIndex={i}>{t.el()}</AccordionToolbarAdapter>)}
        </Accordion>
      </Segment>
    )
  }
}

interface AccordionToolbarAdapterProps {
  toolGroupIndex: number;
  tool: Tool;
  children: string | React.ReactNode | React.ReactNode[]
}

class AccordionToolbarAdapter extends AbstractComponent<AccordionToolbarAdapterProps> {
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

import * as React from 'react'
import { Button, Checkbox, Icon } from 'semantic-ui-react'
import { GrabCutRegions } from '../../app/state'
import { AbstractComponent } from '../common/component'
import { GrabCut } from './grabCut'
import { getTool, setToolActive } from './tool'

export class GrabCutView extends AbstractComponent {
  render() {
    const t = getTool(GrabCut.NAME)
    return (<>
      <Checkbox toggle className="toolEnabledToggle"
        onChange={(e, props) => {
          setToolActive(t!, true)
          // t.setActive(!!props.checked)
        }}
        checked={this.state.activeTools.includes(t)} label={GrabCut.NAME} />

      <Button.Group toggle size="medium" vertical fluid >
        <Button onClick={e => this.handleRegionTypeChenge('interest')}><Icon name="smile outline" />Region of interest</Button>
        <Button onClick={e => () => this.handleRegionTypeChenge('background')}><Icon name="remove" />Background</Button>
      </Button.Group>
    </>
    )
  }
  handleRegionTypeChenge(region: GrabCutRegions) {
    this.setState({ grabCut: { ...this.state.grabCut, region } })
  }
}

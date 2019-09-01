import { unique } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import { ForkRibbon } from './common/forkRibbon'
import { Header } from './header'
import { ToolBar } from './tool/toolBAr'

export const App = () => {
  return <div>
    <Container fluid textAlign="left" id="mainContainer">
      <Header />
      <ForkRibbon />
      <Segment basic className="appBody" >
        <Grid>
          <Grid.Column floated='left' width={10}>
            <canvas id="inputCanvas" data-unique={unique('dont-destroy-me-react')} />
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <canvas id="outputCanvas" data-unique={unique('dont-destroy-me-react')} />
            <ToolBar />
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  </div>
}

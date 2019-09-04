import { unique } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import { ForkRibbon } from './common/forkRibbon'
import { Header } from './header'
import { ToolBar } from './tool/toolBar';

export const App = () => {
  return (<Container fluid textAlign="left" id="mainContainer">
      <Header />
      <ForkRibbon />
      <Segment basic className="appBody" >
        <canvas id="inputCanvas" data-unique={unique('dont-destroy-me-react')} />
        <ToolBar />
      </Segment>
    </Container>)
}

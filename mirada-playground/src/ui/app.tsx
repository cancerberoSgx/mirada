import { File, renderInCanvas } from 'mirada'
import { sleep } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import { getStore } from '../app/store'
import { ForkRibbon } from './common/forkRibbon'
import { Header } from './header'
import { GrabCut } from './tool/grabCut'
import { ImageWidget } from './tool/imageWidget'
import { SelectRectTool } from './tool/selectRectTool'
import { tools } from './tool/tool'
import { ToolBar } from './tool/toolBAr'

export const App = () => <div>
  <Container fluid textAlign="left" id="mainContainer">
    <Header />
    <ForkRibbon />
    <Segment basic className="appBody" >
      <br />
      <br />
      <br />
      <Grid>
        <Grid.Column floated='left' width={12}>
          <canvas id="inputCanvas"></canvas>
          {/* <Command /> */}
          {/* <Fields /> */}
          {/* <InputFiles /> */}
        </Grid.Column>
        <Grid.Column floated='right' width={6}>
          {/* <canvas id="outputCanvas"></canvas> */}
          {/* <ToolBar/> */}
          {/* <Output /> */}
        </Grid.Column>
      </Grid>
    </Segment>
    <ToolBar />
  </Container>
</div>

// let image: File
export async function start() {
  const mat = await File.fromUrl('lenna.jpg')
  const canvas = document.querySelector<HTMLCanvasElement>('#inputCanvas')!
  const image = new ImageWidget(canvas, mat)
  const tool = new SelectRectTool(image)
  tools.push(tool)
  tools.push(new GrabCut(image))
  tool.setActive(true)
  await renderInCanvas(mat.mat, { canvas })
  await sleep(100)
  getStore().setState({ tools, activeTools: [tool], image })
}


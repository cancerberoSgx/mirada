import { File, renderInCanvas, tool, Mat } from 'mirada';
import { sleep } from 'misc-utils-of-mine-generic';
import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { getStore } from '../app/store';
import { ForkRibbon } from './common/forkRibbon';
import { Header } from './header';
import { ImageWidget } from './tool/imageWidget';
import { SelectRectTool } from './tool/selectRectTool';

export const App = () => <div>
  <canvas id="inputCanvas"></canvas>
  <canvas id="outputCanvas"></canvas>
  <Container fluid textAlign="left" id="mainContainer">
    <Header />
    {/* <Body /> */}
    <ForkRibbon />
  </Container>
</div>

let image: File
export async function start() {
  image = await File.fromUrl('lenna.jpg')
  const canvas = document.querySelector<HTMLCanvasElement>('#inputCanvas')!
  const w = new ImageWidget(canvas, image)
  const tool = new SelectRectTool(w)
tool.setActive(true)

  await renderInCanvas(image.asMat(), {canvas})
}

interface Options {
  src: Mat,
  canvas: HTMLCanvasElement
}

export async function test() {
  getStore().setState({ working: true })
  await sleep(20)
  await grabCutExample({
    src: image.asMat(),
    canvas: document.querySelector<HTMLCanvasElement>('#outputCanvas')!
  })
  await sleep(20)
  getStore().setState({ working: false })
}

export async function grabCutExample(o: Options) {
  const result = await tool.grabCut({
    image: File.fromMat(o.src),
    x: 50, y: 50, width: 260, height: 280
  })
  const m = cv.matFromImageData(result.image)
  await renderInCanvas(m, o)
  m.delete()
}
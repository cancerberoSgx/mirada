import * as React from 'react'
import 'babel-polyfill';
import {loadOpencv, VideoReader, tool, Tool} from 'mirada'
import { msFrom, now } from '../../util/util';
import { RemoveProperties } from 'misc-utils-of-mine-generic';
// type {ReplaceColorOptions} = (typeof tool)['ReplaceColorOptions']
// import { ReplaceColorOptions } from 'mirada/dist/src/tool/replaceColor';
// const {ReplaceColorOptions} = tool

async function test() {
  const video = document.querySelector<HTMLVideoElement>('video')!
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
  try {
    const FPS = 30
    await loadOpencv()
    const c = new VideoReader(video, canvas)
    await c.canPlay()
    const src = c.mat // read only!
    const dst = new cv.Mat(src.rows, src.cols, cv.CV_8UC1)
    const process = () => {
      let t0 = now()
      c.read() // reads video frame on src
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
      cv.imshow(canvas, dst)
      let delay = 1000 / FPS - msFrom(t0)
      setTimeout(process, delay)
    }
    process()
  } catch (error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    console.trace(error)
  }
}
test()


interface State {
  replaceColor: RemoveProperties<Tool.ReplaceColorOptions, keyof Tool.ImageToolBaseOptions>
  grabCut:RemoveProperties<Tool.GrabCutOptions, keyof Tool.ImageToolBaseOptions>
  canny:RemoveProperties<Tool.CannyOptions, keyof Tool.ImageToolBaseOptions>
  floodFill: RemoveProperties<Tool.FloodFillOptions, keyof Tool.ImageToolBaseOptions>
}
const state:State = {
  replaceColor: {},
  grabCut: {},
  canny: {},
  floodFill: {}
}
class Controls extends React.Component {
  render(){
    return (
  <table>
    <tr>
      <th>Effect</th>
    </tr>
    <tr>
      <td><label><input type="checkbox" checked={}></input>replaceColor</label></td>
    </tr>
        <tr>
      <td>replaceColor</td>
    </tr>
  </table>)
  }
}
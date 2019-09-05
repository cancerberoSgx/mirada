// cp ../mirada/static/opencv.js dist/ && npx parcel src/ui/probes/camera-simpler.html 

import * as React from 'react'
import 'babel-polyfill';
import {loadOpencv, VideoReader,   ReplaceColorOptions, ImageToolBaseOptions, tool, CannyOptions, FloodFillOptions, Canny, Scalar} from 'mirada'
import { msFrom, now, scalarToRgbColor, rgbColorToScalar } from '../../util/util';
import { RemoveProperties, setObjectProperty, objectKeys } from 'misc-utils-of-mine-generic';
import { Color } from '../common/color';


enum Tools {
  'replaceColor'='replaceColor',
  'canny'='canny',
'floodFill'='floodFill'
}

type ToolProps<T extends ImageToolBaseOptions> = RemoveProperties<T, keyof ImageToolBaseOptions>&{name: Tools, active: boolean, description:string}

interface State {
  replaceColor: ToolProps<ReplaceColorOptions>
  canny: ToolProps<CannyOptions>
  floodFill: ToolProps<FloodFillOptions>
}
let _state:State
const getState:()=>State = ()=>{
  if(!_state){
    _state = {
  replaceColor: {
    name: Tools.replaceColor,
    description: 'Will replace pixels between lowColor and highColor with given newColorOrImage',
    active: false,
    lowColor: new cv.Scalar(0, 0, 0, 0), 
    highColor:  new cv.Scalar(150, 150, 150, 255),
    newColorOrImage: new cv.Scalar(255, 0, 0, 255)
  },
  canny: {
    active: false,
    description: 'TODO',
    name: Tools.canny,
    threshold1: 222, 
    threshold2: 38224,
     apertureSize: 7, 
     L2gradient: false
  },
  floodFill: { 
    description: 'TODO',
    active: false,
    name: Tools.floodFill,
    preprocess: [
      { name: 'gaussianBlur' }, 
      { name: 'canny' }
    ],
    seed: new cv.Point(5, 6),
    newColorOrImage: new cv.Scalar(222, 0, 0, 0),
    lowDiff: new cv.Scalar(19, 19, 91, 255),
    upDiff: new cv.Scalar(229, 255, 255, 255)
    }
}
  }
return _state
}

class Controls extends React.Component<{},State> {
  constructor(p:any,s:State){
    super(p,s)
    this.state = getState()
  }
  ss(s:{[s:string]:any}){
    objectKeys(s).forEach(p=>setObjectProperty(this.state, p,s[p]))
    this.setState(this.state)
  }
  render(){
    return (
  <table>
    <tr>
      <th>Effect</th>
       <th>Options</th>
        <th>Description</th>
    </tr>
    <tr>
       <td>
        <label><input type="checkbox" checked={this.state.replaceColor.active}
       onChange={e=>this.ss({'replaceColor.active': e.currentTarget.checked})} 
       ></input>       replaceColor</label>
       </td>
      <td>
               <label> <Color value={scalarToRgbColor(this.state.replaceColor.newColorOrImage as Scalar)} onChange={c=>this.ss({'replaceColor.newColorOrImage': rgbColorToScalar(c)})}/> 
       newColorOrImage</label>
        <label> <Color value={scalarToRgbColor(this.state.replaceColor.lowColor!)} onChange={c=>this.ss({'replaceColor.lowColor': rgbColorToScalar(c)})}/> 
       lowColor</label>
            <label> <Color value={scalarToRgbColor(this.state.replaceColor.highColor!)} onChange={c=>this.ss({'replaceColor.highColor': rgbColorToScalar(c)})}/> 
       highColor</label>
       </td>
      <td>{this.state.replaceColor.description}</td>
    </tr>
        <tr>
      <td><label><input type="checkbox" checked={this.state.floodFill.active}></input>floodFill</label></td>
      <td><label><input type="number"  ></input>foo</label></td>
      <td>{this.state.floodFill.description}</td>
    </tr>
    <tr>
      <td>
        <label><input type="checkbox" checked={this.state.canny.active}
       onChange={e=>this.ss({'canny.active': e.currentTarget.checked})} 
       ></input>       canny</label>
       </td>
      <td>
        <label>
        <input min="3" max="7" step="2"  type="number" value={this.state.canny.apertureSize} 
        onChange={e=>[3,5,7].includes( e.currentTarget.valueAsNumber) && this.ss({'canny.apertureSize': e.currentTarget.valueAsNumber})} ></input>
        apertureSize</label>
               <label>
        <input  min="1"    type="number" value={this.state.canny.threshold1} 
        onChange={e=> this.ss({'canny.threshold1': e.currentTarget.valueAsNumber})} ></input>
        threshold1</label>
               <label>
        <input min="1"   type="number" value={this.state.canny.threshold2} 
        onChange={e=> this.ss({'canny.threshold2': e.currentTarget.valueAsNumber})} ></input>
        threshold2</label>
             <label><input type="checkbox" checked={this.state.canny.L2gradient}
       onChange={e=>this.ss({'canny.L2gradient': e.currentTarget.checked})} 
       ></input>L2gradient</label>
        {/* Foreground: <Color value={{ r: 221, g: 222, b: 223, a: .6 }} onChange={c => console.log(c)} selectButton  */}
        {/* targetEl={async () => document.querySelector<HTMLCanvasElement>('.upper-canvas')!} /> */}
        
        </td>
      <td>{this.state.canny.description}
      </td>
    </tr>
  </table>)
  }
}


import * as rd from 'react-dom'

async function start(){
  await loadOpencv()
rd.render(<div>
  <video width="500" height="300" playsinline autoPlay/>
  <canvas width="500" height="300"/>  
  <Controls />
</div>, document.getElementById('main'))

const video = document.querySelector<HTMLVideoElement>('video')!
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
  try {
    const FPS = 30
    await loadOpencv()
    const c = new VideoReader(video, canvas)
    await c.canPlay()
    const src = c.mat  
    const dst = new cv.Mat(src.rows, src.cols, cv.CV_8UC1)
    const process = () => {
      let t0 = now()
      c.read() 
        src.copyTo(dst)
      // cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
      if(getState().replaceColor.active){
        tool.replaceColor({...getState().replaceColor,src:  dst, dst})
      }
      if(getState().canny.active){
        cv.blur(dst, dst, {width: 5, height: 5}, {x:-1, y: -1} , cv.BORDER_REFLECT)
        tool.canny({...getState().canny, src: dst, dst})
      }
      // else{
      // src.copyTo(dst)
      // }
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

start()
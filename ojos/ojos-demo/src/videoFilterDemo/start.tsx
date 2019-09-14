import { loadOpencv, Mat, VideoReader } from 'mirada'
import * as React from 'react'
import * as rd from 'react-dom'
import { Controls } from "./controls"
import { processFunction, resetFpsFramesCounter } from './processFunction'
import { getState, State } from "./state"
import { loadUrl } from './urlState'

export async function start() {
  renderRootLayout()
  await loadVCamAndStartProcessing()
  renderApp()
}

// export async function setFpsFramesInterval(tt:Fn, ms:number) {
//   renderRootLayout()
//   await loadVCamAndStartProcessing()
//   renderApp()
// }


export type Managers = {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  c: VideoReader;
  dst: Mat;
  state: State;
  processFunction: (this: Managers) => void;
}

let _managers: Managers = null as any

export function getManagers() {
  if (!_managers) {
    throw 'You must wait until app ends loading'
  }
  return _managers
}

// export async function handleNewState(s:Partial<State>) {
//   await getManagers().c.stop()
//   // await resetFpsFramesCounter(true)
//   await loadVCamAndStartProcessing()
//   await sleep(100)
//   // debugger
//   // const s = 
//   setState(s)
//   renderApp()
//   await sleep(100)
//   setState(s)
//   _App.render()

//   // _managers.state = s
//   // getApp().
// }



export async function loadVCamAndStartProcessing() {
  resetFpsFramesCounter(true)
  await loadOpencv()
  // reset
  const video = document.querySelector<HTMLVideoElement>('video')!
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
  const c = new VideoReader(video, canvas)
  await c.canPlay()
  const src = c.mat
  const dst = new cv.Mat(src.rows, src.cols, cv.CV_8UC1)
  _managers = { video, canvas, c, dst, processFunction: null as any, state: getState() }
  _managers.processFunction = processFunction.bind(_managers)
  try {
    _managers.processFunction()
  }
  catch (error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
    console.trace(error)
  }
}

function renderApp() {
  document.getElementById('loading')!.remove()
  rd.unmountComponentAtNode(document.getElementById('dynamic-app')!)
  loadUrl()
  rd.render(<Controls />, document.getElementById('dynamic-app'))
}

export function removeApp() { }

// let _App: Controls
// function getApp() {
//   if(!_App){
//     _App = new Controls(getState())
//   }
//   return _App;
// }

function renderRootLayout() {
  document.getElementById('main')!.innerHTML = `
    <div>
      <video width="500" height="300" playsInline autoPlay></video>
      <canvas width="500" height="300"></canvas>
    </div>
    <div id="dynamic-app">
    </div>
    <div id="loading">
      <div style="font-size: 80px">Loading...</div>
    </div>
  `
}


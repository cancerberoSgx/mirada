import { loadOpencv, Mat, VideoReader } from 'mirada'
import * as React from 'react'
import * as rd from 'react-dom'
import { Controls } from "./controls"
import { ForkRibbon } from './forkRibbon'
import { processFunction } from './processFunction'
import { getState, State } from "./state"
import { loadUrl } from './urlState'
import { examples } from './examples'
import {Examples} from './showExamples'

export async function start() {
  renderRootLayout()
  await loadVCamAndStartProcessing()
  renderApp()
}

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

export async function loadVCamAndStartProcessing() {
  await loadOpencv()
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
  loadUrl()
  document.getElementById('loading')!.remove()
  rd.render(App(), document.getElementById('dynamic-app'))
}

function App(): React.FunctionComponentElement<any> | React.FunctionComponentElement<any>[] {
  return <div>
    <ForkRibbon />
    <Controls />
    <Examples/>
  </div>;
}

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


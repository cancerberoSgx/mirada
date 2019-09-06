import { loadOpencv, Mat, VideoReader } from 'mirada'
import { canny, replaceColor } from 'ojos'
import * as React from 'react'
import * as rd from 'react-dom'
import { Controls } from "./controls"
import { now } from './miradaUi/util'
import { getState, State } from "./state"

export let fpsFramesCounter = 0
export function resetFpsFramesCounter() {
  fpsFramesCounter = 0
}

export async function start() {
  renderRootLayout()
  await loadVCamAndStartProcessing()
  renderApp()
}

type Managers = {
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

let processFunction = function(this: Managers) {
  let t0 = now()
  this.c.read()
  const src = this.c.mat
  const dst = this.dst
  src.copyTo(dst)
  if (getState().replaceColor.active) {
    replaceColor({ ...getState().replaceColor, src: dst, dst })
  }
  if (getState().canny.active) {
    cv.blur(dst, dst, { width: 5, height: 5 }, { x: -1, y: -1 }, cv.BORDER_REFLECT)
    canny({ ...getState().canny, src: dst, dst })
  }
  cv.imshow(this.canvas, dst)
  fpsFramesCounter++
  setTimeout(this.processFunction, 0)
}

async function loadVCamAndStartProcessing() {
  renderRootLayout()
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
  document.getElementById('loading')!.remove()
  rd.render(<div>
    <Controls />
  </div>, document.getElementById('dynamic-app'))
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


// import { loadOpencv, VideoReader, Mat } from 'mirada';
// import { replaceColor, canny } from 'ojos';
// import { now } from './miradaUi/util';
// import { State, getState, fpsFramesCounter, Controls } from './videoFilterDemo';
// type Managers = {
//   video: HTMLVideoElement;
//   canvas: HTMLCanvasElement;
//   c: VideoReader;
//   dst: Mat;
//   state: State;
//   processFunction: (this: Managers) => void;
// };
// let processFunction = function (this: Managers) {
//   let t0 = now();
//   this.c.read();
//   const src = this.c.mat;
//   const dst = this.dst;
//   src.copyTo(dst);
//   if (getState().replaceColor.active) {
//     replaceColor({ ...getState().replaceColor, src: dst, dst });
//   }
//   if (getState().canny.active) {
//     cv.blur(dst, dst, { width: 5, height: 5 }, { x: -1, y: -1 }, cv.BORDER_REFLECT);
//     canny({ ...getState().canny, src: dst, dst });
//   }
//   cv.imshow(this.canvas, dst);
//   fpsFramesCounter++;
//   setTimeout(this.processFunction, 0);
// };
// async function loadVCamAndStartProcessing() {
//   renderRootLayout();
//   await loadOpencv();
//   const video = document.querySelector<HTMLVideoElement>('video')!;
//   const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
//   const c = new VideoReader(video, canvas);
//   await c.canPlay();
//   const src = c.mat;
//   const dst = new cv.Mat(src.rows, src.cols, cv.CV_8UC1);
//   const managers = { video, canvas, c, dst, processFunction: null as any, state: getState() };
//   managers.processFunction = processFunction.bind(managers);
//   try {
//     managers.processFunction();
//   }
//   catch (error) {
//     console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
//     console.trace(error);
//   }
// }
// export async function start() {
//   renderRootLayout();
//   await loadVCamAndStartProcessing();
//   renderApp();
// }
// function renderApp() {
//   document.getElementById('loading')!.remove();
//   rd.render(<div>
//     <Controls />
//   </div>, document.getElementById('dynamic-app'));
// }
// function renderRootLayout() {
//   document.getElementById('main')!.innerHTML = `
//   <div>
//     <video width="500" height="300" playsInline autoPlay></video>
//     <canvas width="500" height="300"></canvas>
//   </div>

//   <div id="dynamic-app">
//   </div>

//   <div id="loading">
//     <div style="font-size: 80px">Loading...</div>
//   </div>
//   `;
// }

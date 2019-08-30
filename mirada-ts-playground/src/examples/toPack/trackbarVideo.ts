import * as Mirada from 'mirada'
declare var cv: Mirada.CV

(async () => {

  var url1 = 'https://cancerberosgx.github.io/demos/media/video1.mp4';
  var url2 = 'https://cancerberosgx.github.io/demos/media/video2.mp4';
let   processing = false;
  const FPS = 30;
  installControls();

  // const canvas1 = document.getElementById('customCanvas1')! as HTMLCanvasElement;
  // const canvas2 = document.getElementById('customCanvas2')! as HTMLCanvasElement;
  const outputCanvas = document.getElementById('outputCanvas')! as HTMLCanvasElement;
  const video1 = document.getElementById('customVideo1')! as HTMLVideoElement;
  const video2 = document.getElementById('customVideo2')! as HTMLVideoElement;
  let trackbar = document.getElementById('trackbar')! as HTMLInputElement

  //  main();
// 
//  let src1:cv.Mat = null as any
//  let src2:cv.Mat
//  let dst:cv.Mat
// let cap1: cv.VideoCapture
// let cap2: cv.VideoCapture
const height=Math.min(video1.height, video2.height)
const width=Math.min(video1.width, video2.width)

    const  src1 = new cv.Mat(height, width, cv.CV_8UC4);
   const   src2 = new cv.Mat(width,width, cv.CV_8UC4);
 const    dst = new cv.Mat(height, width, cv.CV_8UC1);
 const   cap1 = new cv.VideoCapture(video1);
 const   cap2 = new cv.VideoCapture(video2);
    video1.src = url1
    video2.src = url2
  processing = true
  // await video1.play()
await Promise.all([video1.play(), video2.play()]);
  setTimeout(uninstallControls, 15000)
processVideo()

// async function main() {

// }


  function processVideo  () {
      try {
        if (!processing) {
          src1.delete();
          src2.delete();
          dst.delete()
          return;
        }
        else {
          const begin = Date.now();          
cap1.read(src1)
          cap2.read(src2);
          // src2.resize()
//            var orange = await Mirada.fromUrl('orange.png')
//   // var apple = await Mirada.fromUrl('apple.png')
  // let dst = new cv.Mat()
//   // const listener = () => {
    let alpha = trackbar.valueAsNumber / parseInt(trackbar.max)
    let beta = 1.0 - alpha
    
    cv.addWeighted(src1, alpha, src2, beta, 0.0, dst, -1)
    cv.imshow(outputCanvas, dst)
          const delay = 1000 / FPS - (Date.now() - begin);
          setTimeout(processVideo, delay);
        }
      }
      catch (err) {
        console.error(err);
      }
    };


function  uninstallControls() {
  processing=false
if(document.querySelector('#outputContainer>.customWrapper')) {
  document.querySelector('#outputContainer>.customWrapper')!.remove()
  // alert('please reload the page')
  // return
}
}
function installControls() {
uninstallControls()
  const el = document.querySelector('#outputContainer>.wrapper')!
  el.insertAdjacentHTML('afterend', `
<div class="customWrapper" >
  <h5>Below are two input videos - use this slider to  morph between them</h5>
  <input type="range" id="trackbar" value="50" min="0" max="100" step="1" />
  <label  >input 1<br /><video crossOrigin="anonymous" id="customVideo1" 
    width="320" height="240" muted /></label>
  <label  >input 2<br /><video crossOrigin="anonymous" id="customVideo2" 
    width="320" height="240" muted /></label>
</div>
 `);
}
})()

  // const video = document.getElementById('videoInput')! as HTMLVideoElement
// const  [processVideo, processVideo2]  = 
// Promise.all([video1.play(), video2.play()]).then(()=>{
  // processing = true
// })
    // video1.src = url1
    // video2.src = url2

// debugger
// const  [processVideo1, processVideo2] = [ await setupVideo(video1, canvas1, url1) , await setupVideo(video2, canvas2, url2)  ]
// .then(()=>{
//   processing = true
// })

// const  [start1, start2] = await Promise.all([setupVideo(video1, canvas1, url1),await setupVideo(video2, canvas2, url2) ])



//  async  function setupVideo(video: HTMLVideoElement, canvas: HTMLCanvasElement, url: string) {
//    debugger
    
//     return  processVideo
//   }


  // // const canvas = document.getElementById('outputCanvas')!
  // // canvas.insertAdjacentHTML('afterend', `<input type="range" id="trackbar" value="50" min="0" max="100" step="1">`)
  // var orange = await Mirada.fromUrl('orange.png')
  // var apple = await Mirada.fromUrl('apple.png')
  // let dst = new cv.Mat()
  // let trackbar = document.getElementById('trackbar')! as HTMLInputElement
  // const listener = () => {
  //   let alpha = trackbar.valueAsNumber / parseInt(trackbar.max)
  //   let beta = (1.0 - alpha)
  //   cv.addWeighted(orange, alpha, apple, beta, 0.0, dst, -1)
  //   cv.imshow(canvas, dst)
  // }
  // trackbar.addEventListener('input', listener)

  // await sleep(600)
  // listener()
  // await sleep(12000)
  // trackbar.removeEventListener('input', listener)
  // document.getElementById('trackbar')!.remove()
  // async function sleep(ms = 1000) { await new Promise(resolve => setTimeout(resolve, 1000)) }




// }
  // let cap1 = new cv.VideoCapture(video1)
  // // take first frame of the video
  // let frame1 = new cv.Mat(height, video1.width, cv.CV_8UC4)
  // cap1.read(frame1)
  // let cap2 = new cv.VideoCapture(video2)
  // let frame2 = new cv.Mat(video2.height, video2.width, cv.CV_8UC4)
  // cap2.read(frame2)

// function f (){} 

//   let video = document.getElementById('videoInput')! as HTMLVideoElement
//   const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
//   let cap = new cv.VideoCapture(video)
//   // take first frame of the video
//   let frame1 = new cv.Mat(width, video.width, cv.CV_8UC4)
//   cap.read(frame1)

//   let prvs = new cv.Mat()
//   cv.cvtColor(frame1, prvs, cv.COLOR_RGBA2GRAY)
//   frame1.delete()
//   let hsv = new cv.Mat()
//   let hsv0 = new cv.Mat(width, video.width, cv.CV_8UC1)
//   let hsv1 = new cv.Mat(width, video.width, cv.CV_8UC1, new cv.Scalar(255))
//   let hsv2 = new cv.Mat(width, video.width, cv.CV_8UC1)
//   let hsvVec = new cv.MatVector()
//   hsvVec.push_back(hsv0); hsvVec.push_back(hsv1); hsvVec.push_back(hsv2)

//   let frame2 = new cv.Mat(width, video.width, cv.CV_8UC4)
//   let next = new cv.Mat(width, video.width, cv.CV_8UC1)
//   let flow = new cv.Mat(width, video.width, cv.CV_32FC2)
//   let flowVec = new cv.MatVector()
//   let mag = new cv.Mat(width, video.width, cv.CV_32FC1)
//   let ang = new cv.Mat(width, video.width, cv.CV_32FC1)
//   let rgb = new cv.Mat(width, video.width, cv.CV_8UC3)

//   const FPS = 30
//   const videoHelper = new Mirada.CameraHelper(video, canvas, processVideo)
//   function processVideo() {
//     try {
//       if (!videoHelper.streaming) {
//         // clean and stop.
//         prvs.delete(); hsv.delete(); hsv0.delete(); hsv1.delete(); hsv2.delete()
//         hsvVec.delete(); frame2.delete(); flow.delete(); flowVec.delete(); next.delete()
//         mag.delete(); ang.delete(); rgb.delete()
//         return
//       }
//       let begin = Date.now()
//       // processVideo processing.
//       cap.read(frame2)
//       cv.cvtColor(frame2, next, cv.COLOR_RGBA2GRAY)
//       cv.calcOpticalFlowFarneback(prvs, next, flow, 0.5, 3, 15, 3, 5, 1.2, 0)
//       cv.split(flow, flowVec)
//       let u = flowVec.get(0)
//       let v = flowVec.get(1)
//       cv.cartToPolar(u, v, mag, ang)
//       u.delete(); v.delete()
//       ang.convertTo(hsv0, cv.CV_8UC1, 180 / Math.PI / 2)
//       cv.normalize(mag, hsv2, 0, 255, cv.NORM_MINMAX, cv.CV_8UC1)
//       cv.merge(hsvVec, hsv)
//       cv.cvtColor(hsv, rgb, cv.COLOR_HSV2RGB)
//       cv.imshow('outputCanvas', rgb)
//       next.copyTo(prvs)
//       // schedule the next one.
//       let delay = 1000 / FPS - (Date.now() - begin)
//       setTimeout(processVideo, delay)
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   setTimeout(() => videoHelper.processVideo(), 0)
//   setTimeout(() => videoHelper.stop(), 10000)


import * as Mirada from 'mirada'
declare var cv: Mirada.CV

(async () => {
  var url1 = 'https://cancerberosgx.github.io/demos/media/video1.mp4';
  var url2 = 'https://cancerberosgx.github.io/demos/media/video2.mp4';
  const FPS = 30;
let   processing = false;

   main();

 async  function setupVideo(video: HTMLVideoElement, canvas: HTMLCanvasElement, url: string) {
   debugger
    const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    const cap = new cv.VideoCapture(video);
    const processVideo = () => {
      try {
        if (!processing) {
          src.delete();
          dst.delete();
          return;
        }
        else {
          
//            var orange = await Mirada.fromUrl('orange.png')
//   // var apple = await Mirada.fromUrl('apple.png')
//   // let dst = new cv.Mat()
//   // let trackbar = document.getElementById('trackbar')! as HTMLInputElement
//   // const listener = () => {
//     let alpha = 0.4//trackbar.valueAsNumber / parseInt(trackbar.max)
//     let beta = (1.0 - alpha)
//     cv.addWeighted(orange, alpha, apple, beta, 0.0, dst, -1)
//     cv.imshow(canvas, dst)

          const begin = Date.now();

// cap.read(src)

          cap.read(src);
          cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
          cv.imshow(canvas, dst);
          const delay = 1000 / FPS - (Date.now() - begin);
          setTimeout(processVideo, delay);
        }
      }
      catch (err) {
        console.error(err);
      }
    };
    video.src = url
    await video.play()
    return  processVideo
  }

async function main() {
  installControls();
  const canvas1 = document.getElementById('customCanvas1')! as HTMLCanvasElement;
  const canvas2 = document.getElementById('customCanvas2')! as HTMLCanvasElement;
  const video1 = document.getElementById('customVideo1')! as HTMLVideoElement;
  const video2 = document.getElementById('customVideo2')! as HTMLVideoElement;
  var [start1, start2] = await Promise.all([setupVideo(video1, canvas1, url1), await setupVideo(video2, canvas2, url2)]);
  processing = true
  start1(); start2()
  setTimeout(()=>{

  }, 15000)
}

function installControls() {
if(document.querySelector('#outputContainer>.customWrapper')) {
  document.querySelector('#outputContainer>.customWrapper')!.remove()
  alert('please reload the page')
  return
}
  const el = document.querySelector('#outputContainer>.wrapper')!;
  el.classList.add('hidden');
  el.insertAdjacentHTML('beforebegin', `
<table class="customWrapper" >
  <tr>
    <td>
     <p>Video1</p>
     <canvas id="customCanvas1" width="400" height="400" /><br/>
    <input type="range" id="trackbar1" value="50" min="0" max="100" step="1"/>
    </td>
    <td>
  <p>Video2</p>
    <canvas id="customCanvas2" width="400" height="400" /><br/>
    <input type="range" id="trackbar2" value="50" min="0" max="100" step="1"/>
    </td>
  </tr>
  <tr>
    <td><video crossOrigin="anonymous" id="customVideo1" width="320" height="240" muted /></td>
    <td><video crossOrigin="anonymous" id="customVideo2" width="320" height="240" muted /></td>
  </tr>
</table>
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
  // let frame1 = new cv.Mat(video1.height, video1.width, cv.CV_8UC4)
  // cap1.read(frame1)
  // let cap2 = new cv.VideoCapture(video2)
  // let frame2 = new cv.Mat(video2.height, video2.width, cv.CV_8UC4)
  // cap2.read(frame2)

// function f (){} 

//   let video = document.getElementById('videoInput')! as HTMLVideoElement
//   const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
//   let cap = new cv.VideoCapture(video)
//   // take first frame of the video
//   let frame1 = new cv.Mat(video.height, video.width, cv.CV_8UC4)
//   cap.read(frame1)

//   let prvs = new cv.Mat()
//   cv.cvtColor(frame1, prvs, cv.COLOR_RGBA2GRAY)
//   frame1.delete()
//   let hsv = new cv.Mat()
//   let hsv0 = new cv.Mat(video.height, video.width, cv.CV_8UC1)
//   let hsv1 = new cv.Mat(video.height, video.width, cv.CV_8UC1, new cv.Scalar(255))
//   let hsv2 = new cv.Mat(video.height, video.width, cv.CV_8UC1)
//   let hsvVec = new cv.MatVector()
//   hsvVec.push_back(hsv0); hsvVec.push_back(hsv1); hsvVec.push_back(hsv2)

//   let frame2 = new cv.Mat(video.height, video.width, cv.CV_8UC4)
//   let next = new cv.Mat(video.height, video.width, cv.CV_8UC1)
//   let flow = new cv.Mat(video.height, video.width, cv.CV_32FC2)
//   let flowVec = new cv.MatVector()
//   let mag = new cv.Mat(video.height, video.width, cv.CV_32FC1)
//   let ang = new cv.Mat(video.height, video.width, cv.CV_32FC1)
//   let rgb = new cv.Mat(video.height, video.width, cv.CV_8UC3)

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


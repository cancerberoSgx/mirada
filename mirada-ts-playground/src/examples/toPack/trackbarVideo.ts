import * as Mirada from 'mirada'
declare var cv: Mirada.CV

// this example loads two videos and uses cv.addWeighted() the same way as trackbar example mixing frames and
// showing the result in a canvas. Could take some seconds to load the videos. 
(async () => {
  var url1 = 'https://cancerberosgx.github.io/demos/media/video1.mp4'
  var url2 = 'https://cancerberosgx.github.io/demos/media/video2.mp4'
  let processing = false
  const FPS = 30
  installControls()
  const outputCanvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
  const video1 = document.getElementById('customVideo1')! as HTMLVideoElement
  const video2 = document.getElementById('customVideo2')! as HTMLVideoElement
  let trackbar = document.getElementById('trackbar')! as HTMLInputElement

  // build the Mat
  const src1 = new cv.Mat(video1.height, video1.width, cv.CV_8UC4)
  const src2 = new cv.Mat(video2.height, video2.width, cv.CV_8UC4)
  const dst = new cv.Mat(Math.min(video1.height, video2.height), Math.min(video1.width, video2.width), cv.CV_8UC1)
  const cap1 = new cv.VideoCapture(video1)
  const cap2 = new cv.VideoCapture(video2)
  // the the video sources (this won't play the yet)
  video1.src = url1
  video2.src = url2
  processing = true
  // after thw two videos start playing we call processVideo() which will repeatedly blend their frames.
  await Promise.all([video1.play(), video2.play()])
  setTimeout(uninstallControls, 15000)
  processVideo()
  function processVideo() {
    try {
      if (!processing) {
        src1.delete()
        src2.delete()
        dst.delete()
        return
      }
      else {
        const begin = Date.now()
        cap1.read(src1)
        cap2.read(src2)
        let alpha = trackbar.valueAsNumber / parseInt(trackbar.max)
        let beta = 1.0 - alpha
        cv.addWeighted(src1, alpha, src2, beta, 0.0, dst, -1)
        cv.imshow(outputCanvas, dst)
        const delay = 1000 / FPS - (Date.now() - begin)
        setTimeout(processVideo, delay)
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  // the rest is just HTML for the "UI"
  function uninstallControls() {
    processing = false
    if (document.querySelector('#outputContainer>.customWrapper')) {
      document.querySelector('#outputContainer>.customWrapper')!.remove()
    }
  }

  function installControls() {
    uninstallControls()
    const el = document.querySelector('#outputContainer>.wrapper')!
    el.insertAdjacentHTML('afterend', `
<div class="customWrapper" >
  <h5>Below are two input videos - use this slider to  morph between them</h5>
  <input type="range" id="trackbar" value="50" min="0" max="100" step="1" />
  <table>
  <tr>
  <td>
  <label  >input 1<br /><video crossOrigin="anonymous" id="customVideo1" 
    width="320" height="240" muted /></label>
    </td> 
  <td>
  <label  >input 2<br /><video crossOrigin="anonymous" id="customVideo2" 
    width="320" height="240" muted /></label>
    </td>
  </tr>  
</div>
 `)
  }
})()


// https://codepen.io/subhasishwebdev/pen/jyOeya
// http://fabricjs.com/freedrawing
import 'babel-polyfill'
import { fabric } from 'fabric'
import { sleep } from 'misc-utils-of-mine-generic'
import { ShapeFreeDrawing, ShapeKinds } from '../ui/imageEditor/shapeFreeDrawing';


(async () => {
  const shapeKinds = ['rectangle', 'ellipse']
  const root = document.querySelector('#main') || document.body!
  root.innerHTML = `
<div>
<div>
<label><input type="checkbox" id="enable"  checked="true">ENABLE</label>
<label>Shape kind: <select id="shapeKind">
${shapeKinds.map(s => `<option value="${s}">${s}</option>`).join()}
</select></label>
</div>
<canvas id="canvas" width="${screen.availWidth}" height="${screen.availHeight - 100}"/>
</div>
`
  await sleep(100)
  // const c_ = document.createElement('canvas')
  // document.body.append(c_)
  const el = document.querySelector<HTMLCanvasElement>('#canvas')!
  el.getContext('2d')!.fillStyle = 'ref'
  const canvas = new fabric.Canvas(el, {
    interactive: true,
    fill: 'red',

    // includeDefaultValues: false, isDrawingMode: false
    // fill: 'rgba(120, 201, 30, 0.5)',
    // fill: 
  })

  const r = new fabric.Rect({
    left: 10, top: 30,
    width: 120, height: 50,
  })
  canvas.add(r)
  r.setCoords()
  // canvas.set
  canvas.renderAll()

  const enabled = document.querySelector<HTMLInputElement>('#enable')!
  enabled.addEventListener('change', e => h.setEnabled(enabled.checked))
  const shapeKind = document.querySelector<HTMLSelectElement>('#shapeKind')!
  shapeKind.addEventListener('change', e => { h.shapeKind = shapeKind.value as ShapeKinds; enable() })

  const h = new ShapeFreeDrawing({ canvas, shapeKind: 'rectangle' })
  // h.afterShapeDrawn(() => enable(false))

  function enable(e = true) {
    if (e) {
      enabled.checked = true
      h.setEnabled(true)
    } else {
      h.setEnabled(false)
      enabled.checked = false
    }
  }
  enable()
})()


  // const images = [
  //   'https://i.imgur.com/eG1qCyC.jpg', 'https://i.imgur.com/scvKGDi.jpg', 'https://i.imgur.com/b02ydRl.jpg', 'https://i.imgur.com/9eXHJ2M.jpg'
  // ]

// function createSibling(el: HTMLElement, where: 'next' | 'prev', h: string) {
//   const f = document.createDocumentFragment()
//   where === 'prev' ? el.insertAdjacentHTML('afterend', h) : el.insertAdjacentHTML('beforebegin', h)
//   return where === 'prev' ? el.previousSibling : el.nextSibling
// }



// import * as cv from 'mirada'
// import * as Mirada from 'mirada';



// async function openCvCamTest() {
//   const video = document.getElementById('videoInput')! as HTMLVideoElement
//   const src = new cv.Mat(video.height, video.width, cv.CV_8UC4)
//   const dst = new cv.Mat(video.height, video.width, cv.CV_8UC1)
//   const FPS = 30
//   const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement
//   const cap = new cv.VideoCapture(video)
//   const processVideo = () => {
//     try {
//       if (!v.streaming) {
//         src.delete()
//         dst.delete()
//         return
//       } else {
//         const begin = Date.now()
//         cap.read(src)
//         cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
//         cv.imshow(canvas, dst)
//         const delay = 1000 / FPS - (Date.now() - begin)
//         setTimeout(processVideo, delay)
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   const v = new Mirada.CameraHelper(video, canvas, processVideo)
//   setTimeout(v.start, 0)
//   setTimeout(v.stop, 10060)
// }

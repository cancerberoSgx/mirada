/* 
dev: 
rm -rf docs && mkdir -p docs && cp node_modules/mirada/dist/src/opencv.js docs && npx parcel -d docs probes/anim.html 

build: 
rm -rf docs && mkdir -p docs && npx parcel build -d docs --no-content-hash --detailed-report --no-source-maps --public-url './' probes/anim.html && rm -rf ../../demos/docs/ojos-demo/anim* && cp docs/* ../../demos/docs/ojos-demo
*/
import 'babel-polyfill'
import { loadOpencv } from 'mirada'
import { animate, Easing, easingNames, Ellipse, scalarColor } from 'ojos'

async function filesTest() {
  await loadOpencv()
  const d = document.createElement('div')
  document.body.append(d)
  d.innerHTML = `
<button>Anim!</button><br/>
<label>Easing: <select>${easingNames.map(e => `<option value="${e}">${e}</option>`)}</select></label><br/>
<label>Duration: <input type="number" value="1500"/></label><br/>
<canvas width="200" height="200"></canvas><br/>
`
  const canvas = d.querySelector<HTMLCanvasElement>('canvas')
  const button = d.querySelector<HTMLButtonElement>('button')
  const select = d.querySelector<HTMLSelectElement>('select')
  const input = d.querySelector<HTMLInputElement>('input')

  button.addEventListener('click', anim)
  const src = cv.Mat.zeros(200, 200, cv.CV_8UC4)
  const dst = cv.Mat.zeros(200, 200, cv.CV_8UC4)
  const size = { width: 180, height: 120 }

  async function anim() {
    const easing = select.value as Easing
    const duration = input.valueAsNumber
    await animate({
      duration,
      easing,
      draw(p) {
        if (p < 0) {
          return
        }
        size.width = 180 * p
        size.height = 120 * p
        new Ellipse().exec({ center: { x: 100, y: 100 }, angle: 33, size, color: scalarColor('#aa559999'), src, dst })
        cv.imshow(canvas, dst)
      }
    })
  }
}
filesTest()
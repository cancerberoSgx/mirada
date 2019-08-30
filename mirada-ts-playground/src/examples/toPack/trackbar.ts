import * as Mirada from 'mirada'
declare var cv: Mirada.CV

(async () => {
  const canvas = document.getElementById('outputCanvas')!
  canvas.insertAdjacentHTML('afterend', `<input type="range" id="trackbar" value="50" min="0" max="100" step="1">`)
  var orange = await Mirada.fromUrl('orange.png')
  var apple = await Mirada.fromUrl('apple.png')
  let dst = new cv.Mat()
  let trackbar = document.getElementById('trackbar')! as HTMLInputElement
  const listener = () => {
    let alpha = trackbar.valueAsNumber / parseInt(trackbar.max)
    let beta = (1.0 - alpha)
    cv.addWeighted(orange, alpha, apple, beta, 0.0, dst, -1)
    cv.imshow(canvas, dst)
  }
  trackbar.addEventListener('input', listener)

  await sleep(600)
  listener()
  await sleep(12000)
  trackbar.removeEventListener('input', listener)
  document.getElementById('trackbar')!.remove()
  async function sleep(ms = 1000) { await new Promise(resolve => setTimeout(resolve, ms)) }
})()

import { imageData, Mat } from '.'

export function getImageData(url: string) {
  return new Promise<ImageData>((resolve, reject) => {
    var img = new Image()
    img.onload = e => {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      resolve(imgData)
    }
    img.onerror = reject
    img.src = url
  })
}

export function renderInCanvas(mat: Mat, canvas?: HTMLCanvasElement, appendToBody = true): HTMLCanvasElement {
  if (!canvas) {
    canvas = document.createElement('canvas')
    appendToBody && document.body.append(canvas)
  }
  var img = new cv.Mat()
  var depth = mat.type() % 8
  var scale = depth <= cv.CV_8S ? 1.0 : (depth <= cv.CV_32S ? 1.0 / 256.0 : 255.0)
  var shift = (depth === cv.CV_8S || depth === cv.CV_16S) ? 128.0 : 0.0
  mat.convertTo(img, cv.CV_8U, scale, shift)
  switch (img.type()) {
    case cv.CV_8UC1:
      cv.cvtColor(img, img, cv.COLOR_GRAY2RGBA)
      break
    case cv.CV_8UC3:
      cv.cvtColor(img, img, cv.COLOR_RGB2RGBA)
      break
    case cv.CV_8UC4:
      break
    default:
      throw new Error('Bad number of channels (Source image must have 1, 3 or 4 channels)')
  }
  var imgData = imageData(img)
  var ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = imgData.width
  canvas.height = imgData.height
  ctx.putImageData(imgData, 0, 0)
  img.delete()
  return canvas
}


export async function createFileFromUrl(path: string, url: string, callback?: (error?: Error) => void) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.onload = (ev) => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let data = new Uint8Array(request.response)
          cv.FS_createDataFile('/', path, data, true, false, false)
          callback && callback()
          resolve()
        } else {
          var e = new Error('Failed to load ' + url + ' status: ' + request.status)
          console.error(e)
          callback && callback(e)
          reject(e)
        }
      }
    }
    request.send()
  })
}

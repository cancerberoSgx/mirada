import { Size } from 'mirada'

export function cloneCanvas(oldCanvas: HTMLCanvasElement) {
  var newCanvas = document.createElement('canvas')
  var context = newCanvas.getContext('2d')!
  newCanvas.width = oldCanvas.width
  newCanvas.height = oldCanvas.height
  context.drawImage(oldCanvas, 0, 0)
  return newCanvas
}
export function cloneCanvasSize(c: HTMLCanvasElement) {
  var d = document.createElement('canvas')
  d.width = c.width
  d.height = c.height
  return d
}

export function copyBounds(a: HTMLElement, b: HTMLElement, onlyBounds = false) {
  Object.assign(b.style, {
    ...onlyBounds ? {} : {
      position: 'absolute',
      display: 'block',
      zIndex: 100
    },

    top: a.offsetTop + 'px',
    left: a.offsetLeft + 'px',
  })
  setSize({ width: a.offsetWidth, height: a.offsetHeight }, b)
}

export function setSize(s: Size, b: HTMLElement) {
  Object.assign(b.style, {
    width: s.width + 'px',
    height: s.height + 'px',
  })
}


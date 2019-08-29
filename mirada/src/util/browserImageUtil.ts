import { toImageData } from '..'
import { File } from '../file'
import { Mat } from '../types/opencv'
import { arrayBufferToUrl } from './base64'
import { toRgba } from './imageUtil'

export async function fromInputFileElement(a: HTMLInputElement) {
  const files = await File.fromHtmlFileInputElement(a)
  return files.map(f => f.asMat())
}

export function fetchImageData(url: string) {
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

/**
 * A sub optimal method to load a image array buffer (encoded in jpg, png) whiteouts knowing its format or size. 
  * 1) creates a blob and a url object 
  * * loads the url in a HTML Image (to know its dimensions )
  * * draw the image in a canvas ().
  * 
  * This method is useful as a decoder for the browser without libraries
 */
export function renderArrayBufferInCanvas(a: ArrayBuffer, mime: string, name?: string, canvas?: HTMLCanvasElement, appendToBody = false): Promise<{ canvas: HTMLCanvasElement, width: number, height: number }> {
  const url = arrayBufferToUrl(a, mime, name)
  var img = new Image()
  return new Promise(resolve => {
    img.onload = () => {
      if (!canvas) {
        canvas = document.createElement('canvas')
        appendToBody && document.body.append(canvas)
      }
      canvas!.setAttribute('width', img.naturalWidth + '')
      canvas!.setAttribute('height', img.naturalHeight + '')
      canvas!.getContext('2d')!.drawImage(img, 0, 0)
      resolve({ canvas, width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = (e) => {
      console.log('ERROR', e)
    }
    img.src = url
  })
}

export function renderInCanvas(mat: Mat, canvas?: HTMLCanvasElement, appendToBody = false, rgba = true): HTMLCanvasElement {
  if (!canvas) {
    canvas = document.createElement('canvas')
    appendToBody && document.body.append(canvas)
  }
  var img = rgba ? toRgba(mat) : mat
  var imgData = getHtmlImageData(img)
  var ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = imgData.width
  canvas.height = imgData.height
  ctx.putImageData(imgData, 0, 0)
  rgba && img.delete()
  return canvas
}

export function getHtmlImageData(img: Mat) {
  var imgData = toImageData(img)
  const htmlImageData = new ImageData(imgData.data, imgData.width, imgData.height)
  return htmlImageData
}

export class CameraHelper {
  streaming = false
  protected stream: MediaStream | undefined
  protected onCameraStartedCallback: ((stream?: MediaStream, videoInput?: HTMLVideoElement) => any) | undefined
  constructor(public videoInput: HTMLVideoElement, public outputCanvas: HTMLCanvasElement, public callback: () => void) {
    this.onVideoCanPlay = this.onVideoCanPlay.bind(this)
    this.onVideoStarted = this.onVideoStarted.bind(this)
    this.onVideoStopped = this.onVideoStopped.bind(this)
  }
  start() {
    if (!this.streaming) {
      this.startCamera('qvga', this.onVideoStarted, this.videoInput)
    }
  }
  stop() {
    if (this.streaming) {
      this.stopCamera()
      this.onVideoStopped()
    }
  }
  startCamera(resolution: 'qvga' | 'vga', callback: (...args: any[]) => any, video: HTMLVideoElement) {
    const constraints: any = {
      qvga: { width: { exact: 320 }, height: { exact: 240 } },
      vga: { width: { exact: 640 }, height: { exact: 480 } }
    }
    let videoConstraint = constraints[resolution]
    if (!videoConstraint) {
      videoConstraint = true
    }
    navigator.mediaDevices
      .getUserMedia({ video, audio: false })
      .then(s => {
        video.srcObject = s
        video.play()
        this.videoInput = video
        this.stream = s
        this.onCameraStartedCallback = callback
        video.addEventListener('canplay', this.onVideoCanPlay, false)
      })
      .catch(function(err) {
        console.error(err)
      })
  }
  stopCamera() {
    if (this.videoInput) {
      this.videoInput.pause()
      this.videoInput.srcObject = null
      this.videoInput.removeEventListener('canplay', this.onVideoCanPlay)
    }
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop()
    }
  }
  protected onVideoStarted() {
    this.streaming = true
    this.outputCanvas.width = this.videoInput.videoWidth
    this.outputCanvas.height = this.videoInput.videoHeight
    this.callback()
  }
  protected onVideoStopped() {
    this.streaming = false
    this.outputCanvas.getContext('2d')!.clearRect(0, 0, this.outputCanvas.width, this.outputCanvas.height)
    this.stopCamera()
  }
  protected onVideoCanPlay() {
    if (this.onCameraStartedCallback) {
      this.onCameraStartedCallback(this.stream, this.videoInput)
    }
  }
}

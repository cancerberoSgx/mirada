import {opencvReady} from './opencvReady'
import {getGlobal} from 'misc-utils-of-mine-generic'

/**
 * Ported from doc/js_tutorials/js_assets/utils.js
 */
export class OpenCvBrowserUtils {
public opencvLoaded=false
  protected errorOutput: HTMLElement | undefined
  protected OPENCV_URL: string
  protected video?: HTMLVideoElement
  protected stream?: MediaStream
  protected onCameraStartedCallback?: Fn

  public constructor(o: Options = {}) {
    this.errorOutput = o.errorOutputId ? document.getElementById(o.errorOutputId) || undefined : undefined
    this.OPENCV_URL = o.OPENCV_URL || 'opencv.js'
  }
  
  public loadOpenCv(onloadCallback?: (...args: any[]) => void) {
    if(this.opencvLoaded){
      onloadCallback&&onloadCallback()
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      // Module = {
      //   preRun: function() {
      //     debugger
      //     if (isNode) {
      //       FS.mount(NODEFS, { root: nodeFsLocalRoot }, emscriptenNodeFsRoot);
      //     }
      //   },
      //   // onRuntimeInitialized: function(){
      //   //   opencvReady.resolve(cv)
      //   // }
      // }
      let script = document.createElement('script')!
      script.setAttribute('async', '')
      script.setAttribute('type', 'text/javascript')
      script.addEventListener('load', async () => {
        // const cv = await opencvReady
        const g = getGlobal()
        
        if (typeof g.cv!=='undefined'&&typeof g.cv.getBuildInformation !== 'undefined') {
          this.opencvLoaded = true
          opencvReady.resolve( )
          console.log(g.cv .getBuildInformation())
          onloadCallback && onloadCallback()
          resolve(g.cv)
        }
        else { // WASM
          // debugger
          g.cv = typeof g.cv==='undefined' ? {} : g.cv
          g.cv.onRuntimeInitialized = () => {
          // debugger  
          this.opencvLoaded = true
          opencvReady.resolve()
            console.log(g.cv.getBuildInformation())
            onloadCallback && onloadCallback()
            resolve()
          }
        }
      })
      script.addEventListener('error', () => {
        var msg = 'Failed to load ' + this.OPENCV_URL
        this.printError(msg)
        reject('Failed to load ' + this.OPENCV_URL)
      })
      script.src = this.OPENCV_URL
      let node = document.getElementsByTagName('script')[0]
      node.parentNode!.insertBefore(script, node)
    })
  }

  public clearError() {
    if (this.errorOutput) {
      this.errorOutput.innerHTML = ''
    }
  }

  public printError(err?: string | number | Error) {
    if (typeof err === 'undefined') {
      err = ''
    } else if (typeof err === 'number') {
      if (!isNaN(err)) {
        if (typeof cv !== 'undefined') {
          err = 'Exception: ' + cv.exceptionFromPtr(err).msg
        }
      }
    } else if (typeof err === 'string') {
      let ptr = Number(err.split(' ')[0])
      if (!isNaN(ptr)) {
        if (typeof cv !== 'undefined') {
          err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg
        }
      }
    } else if (err instanceof Error) {
      err = (err.stack || '').replace(/\n/g, '<br>')
    }
    if (this.errorOutput) {
      this.errorOutput.innerHTML = err + ''
    }
    else {
      console.error(err)
    }
  }

  public loadImageToCanvas(url: string, canvasId: string) {
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) {
      throw new Error('Canvas element not found: ' + canvasId)
    }
    let ctx = canvas.getContext('2d')!
    let img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = function () {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
    }
    img.src = url
  }

  public executeCode(textAreaId: string) {
    try {
      this.clearError()
      let code = (document.getElementById(textAreaId) as HTMLTextAreaElement).value
      eval(code)
    } catch (err) {
      this.printError(err)
    }
  }

  public loadCode(scriptId: string, textAreaId: string) {
    let scriptNode = document.getElementById(scriptId)! as HTMLScriptElement
    let textArea = document.getElementById(textAreaId)! as HTMLTextAreaElement
    if (scriptNode.type !== 'text/code-snippet') {
      throw Error('Unknown code snippet type')
    }
    textArea.value = scriptNode.text.replace(/^\n/, '')
  }

  public addFileInputHandler(fileInputId: string, canvasId: string) {
    let inputElement = document.getElementById(fileInputId)! as HTMLInputElement
    inputElement.addEventListener('change', (e) => {
      let files = (e.target as HTMLInputElement)!.files || []
      if (files.length > 0) {
        let imgUrl = URL.createObjectURL(files[0])
        this.loadImageToCanvas(imgUrl, canvasId)
      }
    }, false)
  }

  protected onVideoCanPlay() {
    if (this.onCameraStartedCallback) {
      this.onCameraStartedCallback(this.stream, this.video)
    }
  }

  public startCamera(resolution: 'qvga' | 'vga', callback: Fn, videoId: string) {
    const constraints = {
      'qvga': { width: { exact: 320 }, height: { exact: 240 } },
      'vga': { width: { exact: 640 }, height: { exact: 480 } }
    }
    let video: HTMLVideoElement = document.getElementById(videoId)! as HTMLVideoElement
    if (!video) {
      video = document.createElement('video')!
    }
    let videoConstraint: any = constraints[resolution]
    if (!videoConstraint) {
      videoConstraint = true
    }
    navigator.mediaDevices.getUserMedia({ video: videoConstraint, audio: false })
      .then((stream) => {
        video.srcObject = stream
        video.play()
        this.video = video
        this.stream = stream
        this.onCameraStartedCallback = callback
        video.addEventListener('canplay', this.onVideoCanPlay.bind(this), false)
      })
      .catch((err) => {
        this.printError('Camera Error: ' + err.name + ' ' + err.message)
      })
  }

  public stopCamera() {
    if (this.video) {
      this.video.pause()
      this.video.srcObject = null
      this.video.removeEventListener('canplay', this.onVideoCanPlay.bind(this))
    }
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop()
    }
  }
}

interface Options {
  errorOutputId?: string
  OPENCV_URL?: string
}

type Fn = (...args: any[]) => any
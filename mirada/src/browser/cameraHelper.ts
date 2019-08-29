export class CameraHelper {
  streaming = false;
  protected stream: MediaStream | undefined;
  protected onCameraStartedCallback: ((stream?: MediaStream, videoInput?: HTMLVideoElement) => any) | undefined;
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

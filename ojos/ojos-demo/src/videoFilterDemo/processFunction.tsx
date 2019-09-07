import { del } from 'mirada'
import { canny, ConvertTo, GaussianBlur, MorphologyEx, replaceColor, Threshold } from 'ojos'
import { getManagers, Managers } from './start'
import { getState, ToolNames } from "./state"

export let fpsFramesCounter = 0
export function resetFpsFramesCounter() {
  fpsFramesCounter = 0
}

export async function stop() {
  if (getManagers()) {
    await getManagers().c.stop()
    resetFpsFramesCounter()
  }
}

const gaussianBlur = new GaussianBlur()
const convertTo = new ConvertTo()
const threshold = new Threshold()
const morphologyEx = new MorphologyEx()

export let processFunction = function(this: Managers) {
  if (!this.c.streaming) {
    del(this.dst)
    return
  }
  this.c.read()
  const src = this.c.mat
  const dst = this.dst
  src.copyTo(dst)
  const state = getState()
  state.order.forEach(name => {
    if (name === ToolNames.replaceColor && state.replaceColor.active) {
      replaceColor({ ...state.replaceColor, src: dst, dst })
    }
    else if (name === ToolNames.canny && state.canny.active) {
      canny({ ...state.canny, src: dst, dst })
    }
    else if (name === ToolNames.convertTo && state.convertTo.active) {
      convertTo.exec({ ...state.convertTo, src: dst, dst })
    }
    else if (name === ToolNames.gaussianBlur && state.gaussianBlur.active) {
      gaussianBlur.exec({ ...state.gaussianBlur, src: dst, dst })
    }
    else if (name === ToolNames.threshold && state.threshold.active) {
      threshold.exec({ ...state.threshold, src: dst, dst })
    }
    else if (name === ToolNames.morphologyEx && state.morphologyEx.active) {
      morphologyEx.exec({ ...state.morphologyEx, src: dst, dst })
    }
  })
  cv.imshow(this.canvas, dst)
  fpsFramesCounter++
  // requestAnimationFrame(this.processFunction)
  setTimeout(this.processFunction, 0)
}

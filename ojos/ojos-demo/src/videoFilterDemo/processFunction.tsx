import { del, Mat, noArray, toRgba } from 'mirada'
import { array, Fn } from 'misc-utils-of-mine-generic'
import { Bitwise, Canny, ConvertTo, Edge, GaussianBlur, HistEqualization, Math as Math_, MorphologyEx, randomScalarColor, ReplaceColor, Threshold, WarpPerspective } from 'ojos'
import { getManagers, Managers } from './start'
import { getState, ToolNames } from "./state"

export let fpsFramesCounter = 0
export let fpsFramesTimer: NodeJS.Timeout = null as any
export function resetFpsFramesCounter(clear = false) {
  clear && fpsFramesTimer && clearInterval(fpsFramesTimer)
  fpsFramesCounter = 0
}
export function setFpsFramesInterval(f: Fn, t: number) {
  //  fpsFramesTimer&& setInterval(f, t)
  fpsFramesCounter = 0
  fpsFramesTimer = setInterval(f, t)
}
export function stop() {
  if (getManagers()) {
    getManagers().c.stop()
    resetFpsFramesCounter(true)
    // delete getManagers().c
  }
}

const gaussianBlur = new GaussianBlur()
const convertTo = new ConvertTo()
const threshold = new Threshold()
const morphologyEx = new MorphologyEx()
const histEqualization = new HistEqualization()
const warpPerspective = new WarpPerspective()
const bitwise = new Bitwise()
const edge = new Edge()
const replaceColor = new ReplaceColor()
const canny = new Canny()
const math = new Math_()
const colors = array(10).map(randomScalarColor)

let prev: Mat = null as any
export let processFunction = function(this: Managers) {
  if (!this.c.streaming) {
    del(this.dst)
    prev && del(prev)
    del(this.c.mat)
    return
  }
  this.c.read()
  const src = this.c.mat
  let dst = this.dst
  src.copyTo(dst)
  const cp = dst.clone()
  if (!prev || prev.isDeleted()) {
    prev = src.clone()
  }

  const state = getState()

  state.order.forEach(name => {
    if (name === ToolNames.replaceColor && state.replaceColor.active) {
      dst.copyTo(cp, noArray())
      replaceColor.exec({ ...state.replaceColor, src: cp, dst: cp })
      toRgba(cp, dst)
    }
    else if (name === ToolNames.canny && state.canny.active) {
      dst.copyTo(cp, noArray())
      canny.exec({ ...state.canny, src: cp, dst: cp })
      toRgba(cp, dst)
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
    else if (name === ToolNames.histEqualization && state.histEqualization.active) {
      histEqualization.exec({ ...state.histEqualization, src: dst, dst })
    }
    else if (name === ToolNames.warpPerspective && state.warpPerspective.active) {
      dst.copyTo(cp, noArray())
      warpPerspective.exec({ ...state.warpPerspective, size: dst.size(), src: cp, dst: cp, ...state.warpPerspective.drawPoints ? { drawPoints: colors } : {} })
      toRgba(cp, dst)
    }
    else if (name === ToolNames.edge && state.edge.active) {
      dst.copyTo(cp, noArray())
      edge.exec({ ...state.edge, src: dst, dst: cp })
      toRgba(cp, dst)
    }
    else if (name === ToolNames.bitwise && state.bitwise.active) {
      dst.copyTo(cp, noArray())
      cv.cvtColor(cp, cp, cv.COLOR_RGBA2RGB, 0)
      bitwise.exec({ ...state.bitwise, src: cp, dst: cp })
      cv.cvtColor(cp, dst, cv.COLOR_RGB2RGBA, 0)
    }
    else if (name === ToolNames.addWeighted && state.addWeighted.active) {
      dst.copyTo(cp, noArray())
      math.exec({ ...state.addWeighted, type: 'addWeighted', src: cp, dst: cp, src2: prev })
      cv.cvtColor(cp, dst, cv.COLOR_RGB2RGBA, 0)
    }
  })
  cv.imshow(this.canvas, dst)
  fpsFramesCounter++
  dst.copyTo(prev, noArray())
  cp.delete()
  requestAnimationFrame(this.processFunction)
  // setTimeout(this.processFunction, 0)
}

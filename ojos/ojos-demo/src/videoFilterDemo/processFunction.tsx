import { del, Mat, noArray } from 'mirada'
import { ConvertTo, GaussianBlur, MorphologyEx, Threshold, HistEqualization, WarpPerspective, Edge, Bitwise, ReplaceColor, Canny, Math as Math_ } from 'ojos'
import { getManagers, Managers } from './start'
import { getState, ToolNames } from "./state"
import { array, serial, sleep } from 'misc-utils-of-mine-generic'
import { randomScalarColor } from '../../../dist/src'
import { async } from 'q'

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
const histEqualization = new HistEqualization()
const warpPerspective = new WarpPerspective()
const bitwise = new Bitwise()
const edge = new Edge()
const replaceColor = new ReplaceColor()
const canny = new Canny()
const math = new Math_()
const colors = array(10).map(randomScalarColor)

let prev: Mat = null as any
export let processFunction = async function (this: Managers) {
  if (!this.c.streaming) {
    del(this.dst)
    prev && del(prev)
    return
  }
  this.c.read()
  const src = this.c.mat
  let dst = this.dst
  src.copyTo(dst)
  const cp = dst.clone()

  if (!prev) {
    prev = src.clone()
  }

  const state = getState()
  await serial(state.order.map(name => async () => {

    if (name === ToolNames.replaceColor && state.replaceColor.active) {
      await replaceColor.exec({ ...state.replaceColor, src: dst, dst })
    }
    else if (name === ToolNames.canny && state.canny.active) {
      dst.copyTo(cp, noArray())
      await canny.exec({ ...state.canny, src: cp, dst })
    }
    else if (name === ToolNames.convertTo && state.convertTo.active) {
      await convertTo.exec({ ...state.convertTo, src: dst, dst })
    }
    else if (name === ToolNames.gaussianBlur && state.gaussianBlur.active) {
      await gaussianBlur.exec({ ...state.gaussianBlur, src: dst, dst })
    }
    else if (name === ToolNames.threshold && state.threshold.active) {
      await threshold.exec({ ...state.threshold, src: dst, dst })
    }
    else if (name === ToolNames.morphologyEx && state.morphologyEx.active) {
      await morphologyEx.exec({ ...state.morphologyEx, src: dst, dst })
    }
    else if (name === ToolNames.histEqualization && state.histEqualization.active) {
      await histEqualization.exec({ ...state.histEqualization, src: dst, dst })
    }
    else if (name === ToolNames.warpPerspective && state.warpPerspective.active) {
      dst.copyTo(cp, noArray())
      await warpPerspective.exec({ ...state.warpPerspective, size: dst.size(), src: cp, dst, ...state.warpPerspective.drawPoints ? { drawPoints: colors } : {} })
    }
    else if (name === ToolNames.edge && state.edge.active) {
      await edge.exec({ ...state.edge, src: dst, dst })
    }
    else if (name === ToolNames.bitwise && state.bitwise.active) {
      dst.copyTo(cp, noArray())
      cv.cvtColor(cp, cp, cv.COLOR_RGBA2RGB, 0)
      await bitwise.exec({ ...state.bitwise, src: cp, dst: cp })
      cv.cvtColor(cp, dst, cv.COLOR_RGB2RGBA, 0)
    }
    else if (name === ToolNames.addWeighted && state.addWeighted.active) {
      dst.copyTo(cp, noArray())
      await math.exec({ ...state.addWeighted, type: 'addWeighted', src: cp, dst: cp, src2: prev })
          cv.cvtColor(cp, dst, cv.COLOR_RGB2RGBA, 0)
      // cp.convertTo(dst, dst.type())
    }
    await sleep(1)

  }))

  cv.imshow(this.canvas, dst)
  fpsFramesCounter++
  // prev.delete()
  // prev = dst.clone()
   dst.copyTo(prev, noArray())
  cp.delete()
    await sleep(10)
    this.processFunction()
  // requestAnimationFrame(this.processFunction)
  // setTimeout(this.processFunction, 0)
}

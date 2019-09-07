import { del } from 'mirada'
import {  ConvertTo, GaussianBlur, MorphologyEx, Threshold, HistEqualization, WarpPerspective, Edge, Bitwise, ReplaceColor, Canny } from 'ojos'
import { getManagers, Managers } from './start'
import { getState, ToolNames } from "./state"
import { array } from 'misc-utils-of-mine-generic'
import { randomScalarColor } from '../../../dist/src'

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

const colors = array(10).map(randomScalarColor)

export let processFunction = function(this: Managers) {
  if (!this.c.streaming) {
    del(this.dst)
    return
  }
  this.c.read()
  const src = this.c.mat
  const dst = this.dst
  src.copyTo(dst)
  // // console.log(dst.channels(), dst.type(), src.channels(), src.type(), );
  
  const state = getState()
  state.order.forEach(name => {
    if (name === ToolNames.replaceColor && state.replaceColor.active) {
      replaceColor.exec({ ...state.replaceColor, src: dst, dst })
    }
    else if (name === ToolNames.canny && state.canny.active) {
      // debugger
      //  const cp = new cv.Mat()
      //  dst.convertTo(cp, cv.COLOR_RGB2GRAY)
  // cv.cvtColor(dst, dst, cv.COLOR_RGB2GRAY, 0)
   // cv.cvtColor(dst, dst, cv.COLOR_RGB2GRAY, 0)
      const cp = dst.clone() //TODO: warpPerspective inPlace issue !
  // cv.cvtColor(cp, cp, cv.COLOR_RGBA2RGB, 0)
      canny.exec({ ...state.canny, src: cp, dst })
      cp.delete()
// canny.exec({
//    src: dst, dst: dst, threshold1: 11, threshold2: 224, apertureSize: 3, L2gradient: true
// })

      // cp.delete()
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
      // warpPerspective.exec({ ...state.warpPerspective, size: dst.size(), src: dst, dst }) 
      const cp = dst.clone() //TODO: warpPerspective inPlace issue !
      warpPerspective.exec({ ...state.warpPerspective, size: dst.size(), src: cp, dst, ...state.warpPerspective.drawPoints ? {drawPoints: colors}:{} }) 
      cp.delete()
    } 
    else if (name === ToolNames.edge && state.edge.active) {
  // cv.cvtColor(dst, dst, cv.COLOR_RGB2GRAY, 0)
      edge.exec({ ...state.edge, src: dst, dst})
    }  
    else if (name === ToolNames.bitwise && state.bitwise.active) {
  // cv.cvtColor(dst, dst, cv.COLOR_RGB2GRAY, 0)
      const cp = dst.clone() //TODO: warpPerspective inPlace issue !
  cv.cvtColor(cp, cp, cv.COLOR_RGBA2RGB, 0)
      bitwise.exec({ ...state.bitwise, src: cp, dst})
      cp.delete()
    }
  })
  cv.imshow(this.canvas, dst)
  fpsFramesCounter++
  // requestAnimationFrame(this.processFunction)
  setTimeout(this.processFunction, 0)
}

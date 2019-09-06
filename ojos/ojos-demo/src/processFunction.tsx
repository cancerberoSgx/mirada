import { del } from 'mirada'
import { canny, replaceColor, ConvertTo, GaussianBlur } from 'ojos'
import { getState, ToolNames } from "./state"
import { Managers, getManagers } from './start'

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

export let processFunction = function (this: Managers) {
  if (!this.c.streaming) {
    del(this.dst);
    return;
  }
  this.c.read();
  const src = this.c.mat;
  const dst = this.dst;
  src.copyTo(dst);
  const state = getState();
  state.order.forEach(name => {
    if (name === ToolNames.replaceColor && state.replaceColor.active) {
      replaceColor({ ...state.replaceColor, src: dst, dst });
    }
    else if (name === ToolNames.canny &&  state.canny.active) {
      canny({ ...state.canny, src: dst, dst });
    }
    else if (name === ToolNames.convertTo && state.convertTo.active) {
      convertTo.exec({ ...state.convertTo, src: dst, dst });
    }
    else if (name === ToolNames.gaussianBlur && state.gaussianBlur.active) {
      gaussianBlur.exec({ ...state.gaussianBlur, src: dst, dst });
    }
  })
  cv.imshow(this.canvas, dst);
  fpsFramesCounter++;
  // requestAnimationFrame(this.processFunction)
  setTimeout(this.processFunction, 0);
}

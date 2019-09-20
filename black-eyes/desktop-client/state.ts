import { readFileSync, appendFileSync } from 'fs'
import { mainSync, File } from 'magica'
import { basename } from 'path'
import { Image } from 'gui'

export interface State {
  working?: string
  image: string
  imageSize: { width: number, height: number }
  currentBuffer: ArrayBufferView
  imageBuffer: ArrayBufferView
  magicaBuffer: ArrayBufferView
  time: number
}

export function getInitialState(): State {
  return {
    ...buildBuffers('test/assets/lenna.jpg'),
    time: 0
  }
}

let state: State = null as any
export function getState() {
  return state
}
export function _setState(s: State) {
  state = s
}
export function setState(s: Partial<State>) {
  Object.assign(state, s || {})
}

export function buildBuffers(image: string) {
  try {
    const s = {
      image,
      currentBuffer: new Uint8ClampedArray(readFileSync(image)),
      imageBuffer: new Uint8ClampedArray(readFileSync(image))
    }
    const result = mainSync({
      command: ['convert', basename(image), 'output.miff'],
      inputFiles: [new File(basename(image), s.imageBuffer)]
    });
    return {
       ...s, 
    magicaBuffer: result.outputFiles[0].content, 
    imageSize: Image.createFromPath(image).getSize() || {width: 400, height: 400}
     }
  } catch (error) {
    console.error(error);
    return state
  }
}

export function log(s: string) {
  appendFileSync('tmp.txt', s)
}
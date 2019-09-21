import { readFileSync } from 'fs'
import { Image } from 'gui'
import { File, mainSync } from 'magica'
import { basename } from 'path'
import { Command, commands } from './commands'

export interface State {
  working?: string
  image: string
  imageSize: { width: number, height: number }
  currentBuffer: ArrayBufferView
  imageBuffer: ArrayBufferView
  magicaBuffer: ArrayBufferView
  options: Options
  time: number
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'integer' | 'float'
}

interface Options {
  onMouseMove: boolean
  commands: Command[]
  command: string
  fields: Field[]
}

export function getInitialState(): State {
  return {
    ...buildBuffers('test/assets/lenna.jpg'),
    time: 0,
    working: 'Processing...',
    options: {
      command: commands[0].name,
      onMouseMove: false,
      fields: [],
      commands: commands
    }
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
  const s = {
    image,
    currentBuffer: new Uint8ClampedArray(readFileSync(image)),
    imageBuffer: new Uint8ClampedArray(readFileSync(image))
  }
  const result = mainSync({
    command: ['convert', basename(image), 'output.miff'],
    inputFiles: [new File(basename(image), s.imageBuffer)]
  })
  return {
    ...s,
    magicaBuffer: result.outputFiles[0].content,
    working: undefined,
    imageSize: Image.createFromPath(image).getSize() || { width: 400, height: 400 }
  }
}

// // export function log(s: string) {
// //   appendFileSync('tmp.txt', s)
// }

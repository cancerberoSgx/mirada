
import { File } from 'mirada'
import { checkThrow, sleep } from 'misc-utils-of-mine-generic'
import { loadMiradaFileFromInputElement } from '../magica'
import { CanvasOverlay } from '../ui/imageEditor/canvasOverlay'
import { ImageWidget } from '../ui/imageEditor/imageWidget'
import { GrabCut } from '../ui/tool/grabCut'
import { tools } from '../ui/tool/tool'
import { Example } from "./examples"
import { addStateChangeListener } from './stateChangeExpert'
import { getState, getStore } from './store'
import { SelectionTool } from '../ui/tool/selectionTool';
import { ShapeTool } from '../ui/tool/shapeTool';

export async function setExample(example?: Example) {
  alert('Not implemented yet')
  var state = getStore().getState()
  getStore().setState({
    working: true,
  })
}

// export async function handleImageSizeChange() {

// }

export async function loadFileFromInputElement(e: HTMLInputElement, magica = true) {
  getStore().setState({
    working: true,
  })
  async function miradaImplementation() {
    const files = await File.fromHtmlFileInputElement(e)
    checkThrow(getState().image, 'expected ImageWidget to be installed')
    return files[0]
  }
  async function magicaImplementation() {
    return await loadMiradaFileFromInputElement(e, getState().image!.canvas)
  }

  // const f = await miradaImplementation() 
  const f = magica ? await magicaImplementation() : await miradaImplementation()
  getState().image!.load(f)
  getStore().setState({
    working: false,
    imageSize: getState().image!.imageSize
  })
}

let overlay: CanvasOverlay

export async function start() {
  const canvas = document.querySelector<HTMLCanvasElement>('#inputCanvas')!
  const image = new ImageWidget(canvas, await File.fromUrl('lenna.jpg'))
  // await sleep(10)
  overlay = CanvasOverlay.setup(canvas)
  image.render()

  overlay.setEnabled(true)
    tools.push(new SelectionTool(image))
  tools.push(new GrabCut(image))
  tools.push(new ShapeTool(image, {canvas :overlay.canvas!}))


  // I'm not afraid of bad practices when I want to see something working :
Object.assign(  getStore().getState(), { tools, activeTools: [tools[0]], image, working: false, overlay })


  addStateChangeListener('imageSizeChanged', {
    fn(c) {
      // checkThrow(getState().image, 'expected ImageWidget to be installed')
      overlay.updateSize(c.change.newState.imageSize)
    },
    type: 'imageSizeChanged'
  })
  getStore().setState({...getStore().getState()})
}

// export const uiHome: {
//   canvas: HTMLCanvasElement, 
//   canvasOverlay: CanvasOverlay
// } = {
//   // image: null as any,
//   canvas: null as any, canvasOverlay: null as any
// }


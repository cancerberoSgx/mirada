import { File } from 'mirada'
import { Deferred, sleep } from 'misc-utils-of-mine-generic'
import { CanvasOverlay } from '../imageEditor/canvasOverlay'
import { ImageWidget } from '../imageEditor/imageWidget'
import { ShapeFreeDrawing } from '../imageEditor/shapeDrawer'
import { ShapeTool } from '../ui/tool/drawingTool'
import { GrabCut } from '../ui/tool/grabCut'
import { SelectionTool } from '../ui/tool/selectionTool'
import { tools } from '../ui/tool/tool'
import { addStateChangeListener } from './stateChangeExpert'
import { getStore } from './store'

const started = new Deferred()

export async function start() {
  if (started.status === 'resolved') {
    return
  }
  htmlCanvas = document.querySelector<HTMLCanvasElement>('#inputCanvas')!
  image = new ImageWidget(htmlCanvas, await File.fromUrl('lenna.jpg'))
  await sleep(10)
  overlay = await CanvasOverlay.setup(htmlCanvas)
  fabricCanvas = await overlay.setEnabled(true)
  shapeDrawing = new ShapeFreeDrawing({ canvas: fabricCanvas })
  image.render()
  tools.push(new SelectionTool(image))
  tools.push(new GrabCut(image))
  tools.push(new ShapeTool())
  // I'm not afraid of bad practices when I want to see something working :
  Object.assign(getStore().getState(), { tools, activeTools: [tools[0]], working: false } as any)
  addStateChangeListener('imageSizeChanged', {
    fn(c) {
      overlay.updateSize(c.change.newState.imageSize)
    },
    type: 'imageSizeChanged'
  })
  getStore().setState({ ...getStore().getState() })
  started.resolve(null)
}

let image: ImageWidget
let overlay: CanvasOverlay
let htmlCanvas: HTMLCanvasElement
let fabricDrawing: ShapeFreeDrawing
let fabricCanvas: fabric.Canvas
let shapeDrawing: ShapeFreeDrawing

export async function getManagers() {
  if (managers) {
    return managers
  }
  await started
  managers = {
    async getCanvasOveraly() {
      return overlay
    },
    async getImageWidget() {
      return image
    },
    async getFabricCanvas() {
      return fabricCanvas && fabricCanvas
    },
    async getDrawingTool() {
      return fabricDrawing
    },
    async getShapeDrawing() {
      return shapeDrawing
    }
  }
  return managers
}

export async function getImageWidget() {
  const m = await getManagers()
  return await m.getImageWidget()
}
export async function getFabricCanvas() {
  const m = await getManagers()
  return await m.getFabricCanvas()
}
export async function getShapeDrawing() {
  const m = await getManagers()
  return await m.getShapeDrawing()
}

let managers: {
  getCanvasOveraly(): Promise<CanvasOverlay>
  getImageWidget(): Promise<ImageWidget>
  getFabricCanvas(): Promise<fabric.Canvas>
  getDrawingTool(): Promise<ShapeFreeDrawing>
  getShapeDrawing(): Promise<ShapeFreeDrawing>
} 

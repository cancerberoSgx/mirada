import { File } from 'mirada'
import { CanvasOverlay } from '../ui/imageEditor/canvasOverlay'
import { ImageWidget } from '../ui/imageEditor/imageWidget'
import { ShapeFreeDrawing } from '../ui/imageEditor/rectangleFreeDrawing'
import { GrabCut } from '../ui/tool/grabCut'
import { SelectionTool } from '../ui/tool/selectionTool'
import { ShapeTool } from '../ui/tool/shapeTool'
import { tools } from '../ui/tool/tool'
import { addStateChangeListener } from './stateChangeExpert'
import { getStore } from './store'
import { Deferred } from 'misc-utils-of-mine-generic';

const started = new Deferred()

export async function start() {
  if(started.status==='resolved'){
    return
  }
  htmlCanvas = document.querySelector<HTMLCanvasElement>('#inputCanvas')!
  image = new ImageWidget(htmlCanvas, await File.fromUrl('lenna.jpg'))
  // await sleep(10)
  overlay = CanvasOverlay.setup(htmlCanvas)
  shapeDrawing= new ShapeFreeDrawing({ canvas: overlay.canvas! })
  image.render()
  fabricCanvas = overlay.setEnabled(true)
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
  if(managers){
    return managers
  }
  await started
  managers = {
  get overlay() {
    return overlay
  },
  get image() {
    return image
  },
  get fabricCanvas() {
    return fabricCanvas && fabricCanvas
  },
  get drawingTool() {
    return fabricDrawing
  },
  get shapeDrawing() {
    return shapeDrawing
  }  
}
return managers
}

export async function getImageWidget() {
const m = await getManagers()
return m.image
}
let managers: {
   readonly overlay: CanvasOverlay;
    readonly image: ImageWidget;
    readonly fabricCanvas: fabric.Canvas;
    readonly drawingTool: ShapeFreeDrawing;
    readonly shapeDrawing: ShapeFreeDrawing;
} 

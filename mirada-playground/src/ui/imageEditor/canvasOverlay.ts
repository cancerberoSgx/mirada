import { fabric } from 'fabric'
import { Size } from 'mirada'
import { checkThrow, unique } from 'misc-utils-of-mine-generic'
import { cloneCanvasSize, copyBounds, setSize } from '../../util/dom'

interface Options {
  canvas: HTMLCanvasElement
}

export class CanvasOverlay {

  enabled: boolean = false
  target: HTMLCanvasElement;
  canvas: fabric.Canvas | undefined
  container: HTMLDivElement | undefined
  
  constructor(options: Options) {
    this.target = options.canvas
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (this.enabled) {
      if (!this.canvas) {
        const { canvas, container } = createCanvasOverlay(this.target)
        this.canvas = canvas
        this.container = container
        var r = new fabric.Rect({
          top: 10, left: 90, width: 100, height: 111,
          fill: '#77e46666',
          stroke: 'red',
          strokeWidth: 3,
        })
        this.canvas.add(r)
        this.canvas.renderAll()
      }
    } else {
      throw 'TODO'
    }
  }

  updateSize(size: Size) {
    checkThrow(this.container && this.canvas, 'Expected fabric canvas and  container')
    this.canvas!.setWidth(size.width)
    this.canvas!.setHeight(size.height)
    debugger
    setSize(size, this.container!)
  }

  private static instances: { [id: string]: CanvasOverlay } = {}

  static setup(canvas: HTMLCanvasElement, id: string = canvas.id || unique('CanvasOverlayTarget')) {
    if (!CanvasOverlay.instances[id]) {
      CanvasOverlay.instances[id] = new CanvasOverlay({ canvas })
    }
    return CanvasOverlay.instances[id]
  }

  static get(elOrIr: string | HTMLCanvasElement | undefined) {
    if (!elOrIr) {
      var values = Object.values(CanvasOverlay.instances)
      checkThrow(values.length, 'Expected to find an instance but none was installed - call setup() first')
      return values[0]
    } else if (elOrIr instanceof HTMLCanvasElement) {
      return CanvasOverlay.setup(elOrIr)
    } else {
      checkThrow(CanvasOverlay.instances[elOrIr], 'Expected to find an instance with id ' + elOrIr)
      return CanvasOverlay.instances[elOrIr]
    }
  }

}

export function createCanvasOverlay(target: HTMLCanvasElement) {
  const virtual = cloneCanvasSize(target)
  document.body.append(virtual)
  if (!virtual.id) {
    virtual.id = unique('CanvasOverlayVirtual')
  }
  copyBounds(target, virtual)
  const canvas = new fabric.Canvas(virtual, {
    backgroundColor: '',
    interactive: true,
    hoverCursor: 'pointer',
    selection: true,
    controlsAboveOverlay: true,
    selectionBorderColor: 'green',
    containerClass: `${virtual.id}Container`
  })
  const container = document.querySelector(`.${virtual.id}Container`)! as HTMLDivElement
  copyBounds(target, container)
  return { canvas, container }
}



// interface FMatOptions extends fabric.IObjectOptions {
//   mat: Mat
// }



// var FMat = fabric.util.createClass(fabric.Image, {
//   initialize: function(o: FMatOptions) {
//     this.callSuper('initialize', o);
//     this.mat = o.mat
//   },
// })


// new Image().src


// class FMat extends fabric.Object {
//   initialize(o: FMatOptions) {
//     this.callSuper('initialize', o);
//     this.color = color || '#000';
//   },
//   toString: function() {
//     return this.callSuper('toString') + ' (color: ' + this.color + ')';
//   }
// }

import { File, tool } from 'mirada'
import { serial } from 'misc-utils-of-mine-generic'
import { addStateChangeListener, SelectionChangeEvent } from '../../app/stateChangeExpert'
import { GrabCutView } from './grabCutView'
import { ImageWidget } from './imageWidget'
import { AbstractTool } from './tool'

interface Options {

}


export class GrabCut extends AbstractTool<GrabCutView> {
  protected canvasOffset = { x: 0, y: 0 }
  // activeExclusive=true
  static NAME = 'Grab Cut'
  static DESCRIPTION = `Intelligent way of removing the background. It doesn't need to be a solid color!. Use the selection tools to define the important regions`

  constructor(protected image: ImageWidget, options?: Options) {
    super(image, options)
    this.name = GrabCut.NAME
    this.description = GrabCut.DESCRIPTION
    this.viewClass = GrabCutView
    this.selectionChangeListener = this.selectionChangeListener.bind(this)
    addStateChangeListener('selectionChanged', {
      type: 'selectionChanged',
      fn: this.selectionChangeListener
    })
  }

  // setActive(a: boolean){
  // if(!a){
  //   this.image.load('grabCut')
  // } else {
  //   this.image.save('grabCut')
  // }
  // super.setActive(a)
  // }
  async selectionChangeListener(e: SelectionChangeEvent) {
    // const image = await File.fromFile('test/assets/lenna.jpg')
    const rect = e.change.partial.selection && e.change.partial.selection.rectangles || []
    if (rect.length) {
      let f = this.image.get()
      await serial(rect.map(r => async () => {
        const result = await tool.grabCut({
          image: f,
          ...r
        })
        f = File.fromData(result.image, 'grabCut.png')
      }))
      this.image.load(f)
      // const f = File.fromData(result.image,  'grabCut.png')
      // rect.forEach(async r=> {
      //   const result = await tool.grabCut({
      //     image: this.image.get(),  
      //     ...r
      //   })
      //   }
      // rect.length && 
      //   debugger
      // const mat = f.asMat()
      // this.image.load(File.fromMat(mat, 'grabCut.png'))
      // let M = cv.Mat.ones(5, 5, cv.CV_8U)  
      // let anchor = new cv.Point(-1, -1)
      // cv.dilate(mat, mat, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
      //  this.image.render()
      // result.image
      // })
      // const f = File.fromData(result.image, 'result.png')
      // t.deepEqual(f.size(), { width: 400, height: 400 })
      // t.deepEqual(fileType(await f.asArrayBuffer()), { ext: 'png', mime: 'image/png' })
      // t.deepEqual(distance(await create(await f.asArrayBuffer() as any), await read('test/assets/lennaGrabCut.png')), 0)
      // image.delete()
      // f.delete()
    }

  }
}



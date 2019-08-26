import * as Mirada_ from 'mirada'
(window as any).Mirada = Mirada_
var Mirada: typeof Mirada_

export class DilateExample implements PackedExample {
  filePath = '/src/examples/test.ts'
  name = 'Print AST'
  description = 'Prints a textual AST representation of selected file or all files of none selected'
  content =  `
import { CV} from 'opencv'
import * as Mirada_ from 'mirada'
declare var Mirada: typeof Mirada_
declare var cv: CV
 
(async ()=>{
  var img = await Mirada.File.fromUrl('lenna.jpg')
  let dst = new cv.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(img.asMat(), dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  const canvas = document.getElementById('outputCanvas')
  cv.imshow(canvas, dst)
})()
`
}

import { PackedExample } from '../packedExamples'


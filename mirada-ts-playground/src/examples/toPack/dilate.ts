import { CV} from 'mirada'
import * as Mirada_ from 'mirada'
declare var Mirada: typeof Mirada_
declare var cv: CV&{FS:Mirada_.FS}
 
(async ()=>{
  var img = await Mirada.File.fromUrl('lenna.jpg')
  let dst = new cv.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(img.asMat(), dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  cv.imshow(document.getElementById('outputCanvas')!, dst)
})()
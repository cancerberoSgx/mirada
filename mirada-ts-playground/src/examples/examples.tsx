import { State } from '../store/types';

export interface Example {
  name: string
  code: string
  description: string
  tags: ExampleTag[];
}

export enum ExampleTag {
  'simple' = 'simple',
  grabCut = "grabCut"
}

export function examples(): Example[] {
  return [
    {
  name :'Dilate',
  tags: [ExampleTag.simple],
  description:'Simple example that creates an image from url, dilate it and show it in a HTML canvas element',
  code: `
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
  cv.imshow(document.getElementById('outputCanvas'), dst)
  dest.delete(); img.delete();
})()
`
    },
  ]
}



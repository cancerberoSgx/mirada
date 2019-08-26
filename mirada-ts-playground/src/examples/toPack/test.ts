export default class implements PackedExample {
  execute(files: File[]) {
    return { }
  }

  filePath = '/src/examples/test.ts'
  name = 'Print AST'
  description = 'Prints a textual AST representation of selected file or all files of none selected'
  content =  `
import {Mat, CV} from 'opencv'
declare var cv: CV

const src = new cv.Mat()
let dst = new cv.Mat()
let gray = new cv.Mat()
let opening = new cv.Mat()
let coinsBg = new cv.Mat()
let coinsFg = new cv.Mat()
let distTrans = new cv.Mat()
let unknown = new cv.Mat()
let markers = new cv.Mat()
// gray and threshold image
cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0)
cv.threshold(gray, gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
// get background
let M = cv.Mat.ones(3, 3, cv.CV_8U)
cv.erode(gray, gray, M)
cv.dilate(gray, opening, M)
cv.dilate(opening, coinsBg, M, new cv.Point(-1, -1), 3)
// distance transform
cv.distanceTransform(opening, distTrans, cv.DIST_L2, 5)
cv.normalize(distTrans, distTrans, 1, 0, cv.NORM_INF)
// get foreground
cv.threshold(distTrans, coinsFg, 0.7 * 1, 255, cv.THRESH_BINARY)
coinsFg.convertTo(coinsFg, cv.CV_8U, 1, 0)
cv.subtract(coinsBg, coinsFg, unknown)
// get connected components markers
cv.connectedComponents(coinsFg, markers)
for (let i = 0; i < markers.rows; i++) {
  for (let j = 0; j < markers.cols; j++) {
    markers.intPtr(i, j)[0] = markers.ucharPtr(i, j)[0] + 1
    if (unknown.ucharPtr(i, j)[0] == 255) {
      markers.intPtr(i, j)[0] = 0
    }
  }
}
cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0)
cv.watershed(src, markers)
// draw barriers
for (let i = 0; i < markers.rows; i++) {
  for (let j = 0; j < markers.cols; j++) {
    if (markers.intPtr(i, j)[0] == -1) {
      src.ucharPtr(i, j)[0] = 255 // R
      src.ucharPtr(i, j)[1] = 0 // G
      src.ucharPtr(i, j)[2] = 0 // B
    }
  }
}
`
}

interface File {
  filePath: string
  content: string
  selected?: boolean
  selection?: {
    endColumn: number
    endLineNumber: number
    startColumn: number
    startLineNumber: number
  }
}

import { PackedExample } from '../packedExamples'

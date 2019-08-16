// generic utilities for Mat (Images) that canbe used in browser and node
import { Mat } from './types/opencvTypes'

export function imageData(img: Mat) {
  return {
    data: new Uint8ClampedArray(img.data), 
    width: img.cols, 
    height: img.rows
  }
}
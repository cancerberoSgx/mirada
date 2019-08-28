import test from 'ava';
import { ColorConversionCodes, ImageData,  SortFlags, VideoCapture, InputArray, Rect, Point, THRESH_TRUNC, ThresholdTypes, Mat } from '../src';
import { loadMirada } from './testUtil';
import * as cv2 from '../src'

test.before(loadMirada)

test('just values', async t => {
  var m =  new cv.Mat()
  m.delete()
  t.truthy(cv.Mat)
})

test('can reference types directly and use global cv to reference types', async t => {
  let src:  Mat, a: InputArray, r: Rect, p: Point, f: ThresholdTypes
  function test1(m: Mat, c: ColorConversionCodes, i: ImageData, g: VideoCapture): SortFlags{
  var m =  new cv.Mat()
  m.delete()
  }
  var m = t.notThrows(()=>test1(src, cv.COLOR_BGR2BGR555, null as any as ImageData,  null as any))
})


test('can use import * to create a cv namespace both to reference types and values', async t => {
  let src: cv2.Mat, a: cv2.InputArray, r: cv2.Rect, p: cv2.Point, f: cv2.ThresholdTypes
  function test1(m: cv2.Mat, c: cv2.ColorConversionCodes, i: cv2.ImageData, g: cv2.VideoCapture): cv2.SortFlags{
  var m =  new cv.Mat()
  m.delete()
  }
  t.notThrows(()=>test1(src, cv.COLOR_BGR2BGR555, null as any as cv2.ImageData, null as any))
})


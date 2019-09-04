import test from 'ava';
import * as opencv from '../src';
import { ColorConversionCodes, ImageData, InputArray, Mat, Point, Rect, SortFlags, ThresholdTypes, VideoCapture } from '../src';
import { loadMirada } from './testUtil';

test.before(loadMirada)

test('just values', async t => {
  var m = new cv.Mat()
  m.delete()
  t.truthy(cv.Mat)
})

test('can reference types directly but use global cv to reference values', async t => {
  let src: Mat, a: InputArray, r: Rect, p: Point, f: ThresholdTypes
  function test1(m: Mat, c: ColorConversionCodes, i: ImageData, g: VideoCapture): SortFlags {
    var m = new cv.Mat()
    m.delete()
  }
  t.notThrows(() => test1(src, cv.COLOR_BGR2BGR555, null as any as ImageData, null as any))
})

test('can use import * as opencv from "mirada" and assign global cv to reference both types and values from opencv', async t => {
  Object.assign(opencv, cv)
  let src: opencv.Mat, a: opencv.InputArray, r: opencv.Rect, p: opencv.Point, f: opencv.ThresholdTypes, g: opencv.VideoCapture, i: opencv.ImageData
  t.truthy(typeof opencv.VideoCapture === 'function')
  function test1(m: opencv.Mat, c: opencv.ColorConversionCodes, i: opencv.ImageData, g: opencv.VideoCapture): opencv.SortFlags {
    var m = new opencv.Mat()
    var r = new opencv.Rect()
    t.truthy(r)
    m.delete()
  }
  t.truthy(opencv.COLOR_BGR2BGR555)
  t.notThrows(() => test1(src, opencv.COLOR_BGR2BGR555, i, g))
})


import { contourFunctionsShape_ts } from '../examples/packed/contourFunctionsShape_ts';
import { denseOpticalFlow_ts } from '../examples/packed/denseOpticalFlow_ts';
import { dilate_ts } from '../examples/packed/dilate_ts';
import { dnnHighLevelGeneration_ts } from '../examples/packed/dnnHighLevelGeneration_ts';
import { faceDetectionCamera_ts } from '../examples/packed/faceDetectionCamera_ts';
import { faceDetection_ts } from '../examples/packed/faceDetection_ts';
import { faceRecognOtherModelsTest_ts } from '../examples/packed/faceRecognOtherModelsTest_ts';
import { featuresEllipse_ts } from '../examples/packed/featuresEllipse_ts';
import { fft_ts } from '../examples/packed/fft_ts';
import { grabCutMirada_ts } from '../examples/packed/grabCutMirada_ts';
import { lucasKanadeOpticalFlow_ts } from '../examples/packed/lucasKanadeOpticalFlow_ts';
import { trackbar_ts } from '../examples/packed/trackbar_ts';
import { videoDisplay_ts } from '../examples/packed/videoDisplay_ts';
import { watershed_ts } from '../examples/packed/watershed_ts';
import { trackbarVideo_ts } from '../examples/packed/trackbarVideo_ts';

export interface Example {
  name: string
  code: string
  tags: ExampleTag[]
  description: string
}

export enum ExampleTag {
  simple = 'simple',
  fft = 'fft',
  ia = 'ia',
  fs = 'fs',
  grabCut = 'grabCut',
  feature = 'feature',
  video = 'video',
  controls = "controls",
  opticalFlow = "opticalFlow",
  dnn = "dnn"
}

export function examples(): Example[] {
  return [
    {
      name: '/faceDetection.ts',
      tags: [ExampleTag.ia, ExampleTag.fs],
      code: faceDetection_ts,
      description: 'Ported directly from opencv.js tutorials.'
    },
    {
      name: '/dilate.ts',
      tags: [ExampleTag.simple],
      code: dilate_ts,
      description: 'My fist working code porting from openvc tutorials. '
    },
    {
      name: '/grabCutMirada.ts',
      tags: [ExampleTag.grabCut],
      code: grabCutMirada_ts,
      description: 'GrabCut example but instead using plain opencv API it uses a little layer I made on top of it to simplify and understand better understand it that I probably should delete.'
    },
    {
      name: '/featuresEllipse.ts',
      tags: [ExampleTag.feature],
      code: featuresEllipse_ts,
      description: 'Feature detection example, ported from tutorials that loads always the same hardcoded image from url.'
    },
    {
      name: '/contourFunctionsShape.ts',
      tags: [ExampleTag.feature],
      code: contourFunctionsShape_ts,
      description: ``
    },
    {
      name: '/lucasKanadeOpticalFlow.ts',
      tags: [ExampleTag.video, ExampleTag.opticalFlow],
      code: lucasKanadeOpticalFlow_ts,
      description: 'TODO'
    },

    {
      name: '/denseOpticalFlow.ts',
      tags: [ExampleTag.video, ExampleTag.opticalFlow],
      code: denseOpticalFlow_ts,
      description: 'TODO'
    },
    {
      name: '/faceRecognOtherModelsTest.ts',
      tags: [ExampleTag.video, ExampleTag.opticalFlow],
      code: faceRecognOtherModelsTest_ts,
      description: 'TODO'
    },


    {
      name: '/fft.ts',
      tags: [ExampleTag.fft],
      code: fft_ts,
      description: 'TODO'
    },
    {
      name: '/trackbar.ts',
      tags: [ExampleTag.controls],
      code: trackbar_ts,
      description: 'TODO'
    },
    {
      name: '/trackbarVideo.ts',
      tags: [ExampleTag.video, ExampleTag.controls],
      code: trackbarVideo_ts,
      description: 'TODO'
    },
    {
      name: '/faceDetectionCamera.ts',
      tags: [ExampleTag.video],
      code: faceDetectionCamera_ts,
      description: 'TODO'
    },
    {
      name: '/videoDisplay.ts',
      tags: [ExampleTag.video],
      code: videoDisplay_ts,
      description: 'TODO'
    },
    {
      name: '/watershed.ts',
      tags: [ExampleTag.feature],
      code: watershed_ts,
      description: 'TODO'
    },
    {
      name: '/dnnHighLevelGeneration.ts',
      tags: [ExampleTag.dnn],
      code: dnnHighLevelGeneration_ts,
      description: 'TODO'
    },
  ]
}

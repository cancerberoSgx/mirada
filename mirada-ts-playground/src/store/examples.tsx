import { dilate_ts } from '../examples/packed/dilate_ts'
import { faceDetection_ts } from '../examples/packed/faceDetection_ts'
import { fft_ts } from '../examples/packed/fft_ts'
import { grabCutMirada_ts } from '../examples/packed/grabCutMirada_ts'
import { watershed_ts } from '../examples/packed/watershed_ts'
import { featuresEllipse_ts } from '../examples/packed/featuresEllipse_ts'
import { contourFunctionsShape_ts } from '../examples/packed/contourFunctionsShape_ts';
import { lucasKanadeOpticalFlow_ts } from '../examples/packed/lucasKanadeOpticalFlow_ts';

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
  video = "video"
}

export function examples(): Example[] {
  return [
    {
      name: '/faceDetection.ts',
      tags: [ExampleTag.ia, ExampleTag.fs],
      code: faceDetection_ts,
      description: 'TODO'
    },
    {
      name: '/dilate.ts',
      tags: [ExampleTag.simple],
      code: dilate_ts,
      description: 'TODO'
    },
    {
      name: '/grabCutMirada.ts',
      tags: [ExampleTag.grabCut],
      code: grabCutMirada_ts,
      description: 'TODO'
    },
    {
      name: '/featuresEllipse.ts',
      tags: [ExampleTag.feature],
      code: featuresEllipse_ts,
      description: 'TODO'
    },
    {
      name: '/contourFunctionsShape.ts',
      tags: [ExampleTag.feature],
      code: contourFunctionsShape_ts,
      description: 'TODO'
    },    
        {
      name: '/lucasKanadeOpticalFlow.ts',
      tags: [ExampleTag.video],
      code: lucasKanadeOpticalFlow_ts,
      description: 'TODO'
    },
    
    {
      name: '/fft.ts',
      tags: [ExampleTag.fft],
      code: fft_ts,
      description: 'TODO'
    },
    {
      name: '/watershed.ts',
      tags: [ExampleTag.feature],
      code: watershed_ts,
      description: 'TODO'
    }
  ]
}

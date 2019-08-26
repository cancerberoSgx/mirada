import { dilate_ts } from '../examples/packed/dilate_ts'
import { faceDetection_ts } from '../examples/packed/faceDetection_ts'
import { fft_ts } from '../examples/packed/fft_ts'

export interface Example {
  name: string
  code: string
  tags: ExampleTag[]
  description: string
}
export enum ExampleTag {
  simple = 'simple',
  fft = "fft"
}

export function examples(): Example[] {
  return [
       {
      name: '/faceDetection.ts',
      tags: [ExampleTag.simple],
      code: faceDetection_ts,
      description: 'TODO'
    }  ,
    {
      name: '/dilate.ts',
      tags: [ExampleTag.simple],
      code: dilate_ts,
      description: 'TODO'
    },
 
      {
      name: '/fft.ts',
      tags: [ExampleTag.fft],
      code: fft_ts,
      description: 'TODO'
    }
  ]
}
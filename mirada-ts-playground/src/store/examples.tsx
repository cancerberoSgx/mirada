import { dilate_ts } from '../examples/packed/dilate_ts';
import { faceDetection_ts } from '../examples/packed/faceDetection_ts';

export function examples(): Example[] {
  return [
    {
       name: '/dilate.ts', 
    tags: [ExampleTag.simple] ,
    code: dilate_ts,
    description: 'TODO'
    },
    {
       name: '/faceDetection.ts', 
       tags: [ExampleTag.simple] ,
        code: faceDetection_ts,
    description: 'TODO'
       }
  ]
}
export interface Example {
  name: string
  code: string
  tags: ExampleTag[];
  description: string
}
export enum ExampleTag {
simple="simple"
}

export function examples(): Example[] {
  return [
    {
      name: 'test',
      tags: [ExampleTag.test],
      code: `TODO`
    },
    {
      name: 'grabCut',
      tags: [ExampleTag.grabCut],
      code: `TODO`
    }
  ]
}
export interface Example {
  name: string
  code: string
  tags: ExampleTag[];
}
export enum ExampleTag {
  'test' = 'test',
  grabCut = "grabCut"
}

import { Example, examples } from './examples'

export interface State {
  example: Example
  examples: Example[]
  code: string
  working: boolean
  executeRequest?: boolean
  result?: Result
}

export interface Result {
  time: number
  evalError?: string
  runtimeError?: string
}

export async function getInitialState(): Promise<State> {
  var example = examples()[0]
  return {
    example,
    examples: [...examples()],
    code: example.code,
    working: true
  }
}

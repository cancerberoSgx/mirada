import { ImageWidget } from '../ui/tool/imageWidget'
import { Tool, tools } from '../ui/tool/tool'
import { Example, examples } from './examples'

export interface State {
  example: Example
  inputFiles: File[]
  examples: Example[];
  code: string
  working: boolean
  // tool: Tool,
  tools: Tool[]
  activeTools: Tool[]
  image: ImageWidget
  // fields: ExampleField[]
}

export async function getInitialState(): Promise<State> {
  var example = examples()[0]
  return {
    example,
    inputFiles: [],
    examples: [...examples()],
    code: '',
    working: true,
    activeTools: [tools[0]],
    tools,
    image: null as any
    // fields: []
  }
}

export interface Field {
  id: string
  value: string
}

// export interface ParserError {
//   line: number
//   column: number
//   msg: string
//   e: any
// }

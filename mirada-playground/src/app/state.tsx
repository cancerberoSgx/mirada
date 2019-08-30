import { ImageWidget } from '../ui/tool/imageWidget'
import { Tool, tools } from '../ui/tool/tool'
import { Example, examples } from './examples'
import { ToolView } from '../ui/tool/toolView';
import { SelectRectTool } from '../ui/tool/selectRectTool';

export interface State {
  example: Example
  inputFiles: File[]
  examples: Example[];
  code: string
  working: boolean
  tools: Tool<ToolView>[]
  activeTools: Tool<ToolView>[]
  image: ImageWidget
  selection: Selection
   showToolInitialTip: boolean
   
  grabCutTool: {

  }
    selectRectTool: SelectRectToolState
}

interface Selection {
  rectangles: Rectangle[]
    selectionModel: 'exclusive'|'union',
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
    showToolInitialTip: true,
    tools,
    selection: { rectangles: [], 
    selectionModel: 'exclusive', },
    image: null as any,
      selectRectTool: {
      },
       grabCutTool: {firstTime: true}
  }
}

interface SelectRectToolState {

}

export interface Field {
  id: string
  value: string
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

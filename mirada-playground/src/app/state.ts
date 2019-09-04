import { Object } from 'fabric/fabric-impl'
import { Size } from 'mirada'
import { Tool, tools } from '../ui/tool/tool'

export interface State {
  inputFiles: File[]
  code: string
  working: boolean
  tools: Tool[]
  activeTools: Tool[]
  selection: Selection
  editor: EditorState
  showToolInitialTip: boolean
  imageSize: Size,
  shapesTool: {
    menuActiveIndex: number[]
    activeShape: ShapeTypes
  }
  grabCut: {
    region: GrabCutRegions
  }
  toolBarCollapsed: boolean
}

interface EditorState {
  objects: Object[]
  selection: EditorObject[]
}

type EditorObject = fabric.Object

export type ShapeTypes = 'rectangle' | 'brush' | 'ellipse'

export type SelectionActions = 'select' | 'delete' | 'invertSelection' | 'selectAll'

export type GrabCutRegions = 'interest' | 'background'

interface Selection {
  rectangles: Rectangle[]
  mode: 'exclusive' | 'union',
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

export async function getInitialState(): Promise<State> {
  return {
    inputFiles: [],
    code: '',
    working: true,
    activeTools: [tools[0]],
    showToolInitialTip: true,
    tools,
    editor: {
      objects: [],
      selection: []
    },
    selection: {
      rectangles: [],
      mode: 'exclusive',
    },
    imageSize: { width: 0, height: 0 },
    toolBarCollapsed: false,
    shapesTool: { menuActiveIndex: [0], activeShape: 'rectangle' },
    grabCut: {
      region: 'interest'
    }
  }
}

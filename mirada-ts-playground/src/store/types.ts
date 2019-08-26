import { filesActions } from './files'
import { ExamplesActions } from './examples'
import { OutputActions } from './output'
import { SelectedFileActions } from './selectedFile'
import { Theme } from '../theme/theme'
import { LayoutActions } from './layout'
import { RouterState, RouterAction, LocationChangeAction } from 'connected-react-router'

export interface State {
  files: File[]
  examples: Example[]
  selectedFile: File
  output: Output
  layout: Layout
  router: RouterState
}

export interface Layout {
  theme: Theme
  themes: Theme[]
  stateUrlParam?: string
}

// export interface File {
//   filePath: string
//   content: string
//   selected?: boolean
//   selection?: Selection
// }

export interface Selection {
  endColumn: number
  endLineNumber: number
  startColumn: number
  startLineNumber: number
}

export interface Output {
  text?: string
}

export interface Example {
  name: string
  description: string
}

export type AllActions =
  | filesActions
  | ExamplesActions
  | OutputActions
  | SelectedFileActions
  | LayoutActions
  | LocationChangeAction
  | RouterAction

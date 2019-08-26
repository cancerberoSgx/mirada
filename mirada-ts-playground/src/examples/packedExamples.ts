import { Example, State, Output } from '../store/types'
import printAst from './toPack/test'

export interface PackedExample extends Example {
  execute<
    T extends {
      filePath: string
      content: string
      selected?: boolean
      selection?: {
        endColumn: number
        endLineNumber: number
        startColumn: number
        startLineNumber: number
      }
    }
  >(
    files: T[]
  ): Output
}

export const packedExamples: PackedExample[] = [new printAst()]

packedExamples[0].selected = true

declare module test {
  class C {}
}

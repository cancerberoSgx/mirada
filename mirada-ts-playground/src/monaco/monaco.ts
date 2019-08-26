import { File } from '../store/types'
import * as monaco from 'monaco-editor'

export function buildModelUrl(f: File | string) {
  const s = typeof f === 'string' ? f : f.filePath
  return s.startsWith('file://') ? monaco.Uri.parse(s) : monaco.Uri.file(s)
}

export * from './canvasCodec'
export * from './format'
export * from './jimpCodec'
import * as canvasCodec from './canvasCodec'
import * as f from './format'
import * as jimpCodec from './jimpCodec'
export const format = { ...canvasCodec, ...f, ...jimpCodec }

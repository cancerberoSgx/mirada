import { ImageData } from './opencv'

export interface FormatProxy {
  decode(buffer: ArrayBuffer, format?: string): Promise<ImageData>
  encode(data: ImageData, format: string): Promise<ArrayBuffer>
}

import { ImageData } from './opencv'

/**
 * User provided image formats encode/decode implementation.
 * 
 * IMPORTANT: formats are lowercase and in general the common extension of files
 */
export interface FormatProxy {
  /**
   * Given an array buffer that contains the content of an encoded image it will return a 
   * decoded ImageData object. The format parameter could be needed by some poor decoders 
   * that don't support file type sniffing. For example, magica or jimp libraries don't need this.
   */
  decode(buffer: ArrayBuffer, format?: string): Promise<ImageData>
  /**
   * given an image data representing an unencoded raw image it will return an array buffer containing the enconcoded image content in given format.
   */
  encode(data: ImageData, format: string): Promise<ArrayBuffer>
  /**
   * if provided an error will be thrown in case users request to decode to a format not included in this list.
   */
  getSupportedDecodeFormats?(): string[]
  /**
   * if provided an error will be thrown in case users request to encode to a format not included in this list.
   */
  getSupportedEncodeFormats?(): string[]
}

import * as cameraHelper from './cameraHelper'
import * as canvasRender from './canvasRender'
import * as imageCreation from './imageCreation'

export { CameraHelper } from './cameraHelper'
export { renderArrayBufferInCanvas, renderInCanvas } from './canvasRender'
export { fetchImageData, fromInputFileElement, asHtmlImageData as getHtmlImageData } from './imageCreation'

export const browser = { ...canvasRender, ...cameraHelper, ...imageCreation }
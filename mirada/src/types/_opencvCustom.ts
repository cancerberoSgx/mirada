
import {FS as _FS} from './emscripten'
import {CV} from './opencv'
declare global {
  var cv: CV & {FS:_FS}
}
// export declare namespace cv {
// export var cv: CV & {FS:_FS}
// }
// export * from './opencv'
export = cv
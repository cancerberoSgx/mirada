
import { opencv2ts } from '../src'
// const opencvBuildFolder = 'modules/js_bindings_generator/gen/bindings.cpp'
const opencvBuildFolder = '/home/sg/git/opencv/build_js'
const opencvDocBuildFolder = '/home/sg/git/opencv/build'

// build_js/modules/js_bindings_generator/gen/bindings.cpp


opencv2ts({
  opencvBuildFolder,
  opencvDocBuildFolder,
  tsOutputFolder: 'tmp'
})

import { InputArray, double, bool, int, Mat, OutputArray, InputArrayOfArrays, Size, Backend, OutputArrayOfArrays, Net, size_t } from './_types'
/*
 * # dnn
 *
 * TODO  
 */

/**
 * if `crop` is true, input image is resized so one side after resize is equal to corresponding dimension in `size` and another one is equal or larger. Then, crop from the center is performed. If `crop` is false, direct resize without cropping and preserving aspect ratio is performed. 
 * 
 * 4-dimensional [Mat](#d3/d63/classcv_1_1Mat}) with NCHW dimensions order.
 * 
 * @param image input image (with 1-, 3- or 4-channels).
 * @param scalefactor multiplier for image values.
 * @param size spatial size for output image
 * @param mean scalar with mean values which are subtracted from channels. Values are intended to be in (mean-R, mean-G, mean-B) order if image has BGR ordering and swapRB is true.
 * @param swapRB flag which indicates that swap first and last channels in 3-channel image is necessary.
 * @param crop flag which indicates whether image will be cropped after resize or not
 * @param ddepth Depth of output blob. Choose CV_32F or CV_8U.
 */
export declare function blobFromImage(image: InputArray, scalefactor: double, size: any, mean: any, swapRB: bool, crop: bool, ddepth: int): Mat

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param image 
 * @param blob 
 * @param scalefactor 
 * @param size 
 * @param mean 
 * @param swapRB 
 * @param crop 
 * @param ddepth 
 */
export declare function blobFromImage(image: InputArray, blob: OutputArray, scalefactor: double, size: any, mean: any, swapRB: bool, crop: bool, ddepth: int): void

/**
 * if `crop` is true, input image is resized so one side after resize is equal to corresponding dimension in `size` and another one is equal or larger. Then, crop from the center is performed. If `crop` is false, direct resize without cropping and preserving aspect ratio is performed. 
 * 
 * 4-dimensional [Mat](#d3/d63/classcv_1_1Mat}) with NCHW dimensions order.
 * 
 * @param images input images (all with 1-, 3- or 4-channels).
 * @param scalefactor multiplier for images values.
 * @param size spatial size for output image
 * @param mean scalar with mean values which are subtracted from channels. Values are intended to be in (mean-R, mean-G, mean-B) order if image has BGR ordering and swapRB is true.
 * @param swapRB flag which indicates that swap first and last channels in 3-channel image is necessary.
 * @param crop flag which indicates whether image will be cropped after resize or not
 * @param ddepth Depth of output blob. Choose CV_32F or CV_8U.
 */
export declare function blobFromImages(images: InputArrayOfArrays, scalefactor: double, size: Size, mean: any, swapRB: bool, crop: bool, ddepth: int): Mat

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param images 
 * @param blob 
 * @param scalefactor 
 * @param size 
 * @param mean 
 * @param swapRB 
 * @param crop 
 * @param ddepth 
 */
export declare function blobFromImages(images: InputArrayOfArrays, blob: OutputArray, scalefactor: double, size: Size, mean: any, swapRB: bool, crop: bool, ddepth: int): void

/**
 * 
 */
export declare function getAvailableBackends(): any

/**
 * 
 * @param be 
 */
export declare function getAvailableTargets(be: Backend): any

/**
 * 
 * @param blob_ 4 dimensional array (images, channels, height, width) in floating point precision (CV_32F) from which you would like to extract the images.
 * @param images_ array of 2D Mat containing the images extracted from the blob in floating point precision (CV_32F). They are non normalized neither mean added. The number of returned images equals the first dimension of the blob (batch size). Every image has a number of channels equals to the second dimension of the blob (depth).
 */
export declare function imagesFromBlob(blob_: any, images_: OutputArrayOfArrays): any

/**
 * 
 * @param bboxes a set of bounding boxes to apply NMS.
 * @param scores a set of corresponding confidences.
 * @param score_threshold a threshold used to filter boxes by score.
 * @param nms_threshold a threshold used in non maximum suppression.
 * @param indices the kept indices of bboxes after NMS.
 * @param eta a coefficient in adaptive threshold formula: $nms\_threshold_{i+1}=eta\cdot nms\_threshold_i$.
 * @param top_k if >0, keep at most top_k picked indices.
 */
export declare function NMSBoxes(bboxes: any, scores: any, score_threshold: any, nms_threshold: any, indices: any, eta: any, top_k: any): void

/**
 * 
 * @param bboxes 
 * @param scores 
 * @param score_threshold 
 * @param nms_threshold 
 * @param indices 
 * @param eta 
 * @param top_k 
 */
export declare function NMSBoxes(bboxes: any, scores: any, score_threshold: any, nms_threshold: any, indices: any, eta: any, top_k: any): void

/**
 * 
 * @param bboxes 
 * @param scores 
 * @param score_threshold 
 * @param nms_threshold 
 * @param indices 
 * @param eta 
 * @param top_k 
 */
export declare function NMSBoxes(bboxes: any, scores: any, score_threshold: any, nms_threshold: any, indices: any, eta: any, top_k: any): void

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * This function automatically detects an origin framework of trained model and calls an appropriate function such [readNetFromCaffe](#d6/d0f/group__dnn_1ga29d0ea5e52b1d1a6c2681e3f7d68473a}), [readNetFromTensorflow](#d6/d0f/group__dnn_1gad820b280978d06773234ba6841e77e8d}), [readNetFromTorch](#d6/d0f/group__dnn_1ga65a1da76cb7d6852bdf7abbd96f19084}) or [readNetFromDarknet](#d6/d0f/group__dnn_1gafde362956af949cce087f3f25c6aff0d}). An order of `model` and `config` arguments does not matter.
 * 
 * @param model Binary file contains trained weights. The following file extensions are expected for models from different frameworks:
 * .caffemodel (Caffe, http://caffe.berkeleyvision.org/)*.pb (TensorFlow, https://www.tensorflow.org/)*.t7 | *.net (Torch, http://torch.ch/)*.weights (Darknet, https://pjreddie.com/darknet/)*.bin (DLDT, https://software.intel.com/openvino-toolkit)*.onnx (ONNX, https://onnx.ai/)
 * @param config Text file contains network configuration. It could be a file with the following extensions:
 * .prototxt (Caffe, http://caffe.berkeleyvision.org/)*.pbtxt (TensorFlow, https://www.tensorflow.org/)*.cfg (Darknet, https://pjreddie.com/darknet/)*.xml (DLDT, https://software.intel.com/openvino-toolkit)
 * @param framework Explicit framework name tag to determine a format.
 */
export declare function readNet(model: any, config: any, framework: any): Net

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts. 
 * 
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param framework Name of origin framework.
 * @param bufferModel A buffer with a content of binary file with weights
 * @param bufferConfig A buffer with a content of text file contains network configuration.
 */
export declare function readNet(framework: any, bufferModel: any, bufferConfig: any): any

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param prototxt path to the .prototxt file with text description of the network architecture.
 * @param caffeModel path to the .caffemodel file with learned network.
 */
export declare function readNetFromCaffe(prototxt: any, caffeModel: any): Net

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param bufferProto buffer containing the content of the .prototxt file
 * @param bufferModel buffer containing the content of the .caffemodel file
 */
export declare function readNetFromCaffe(bufferProto: any, bufferModel: any): any

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts. 
 * 
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param bufferProto buffer containing the content of the .prototxt file
 * @param lenProto length of bufferProto
 * @param bufferModel buffer containing the content of the .caffemodel file
 * @param lenModel length of bufferModel
 */
export declare function readNetFromCaffe(bufferProto: any, lenProto: size_t, bufferModel: any, lenModel: size_t): Net

/**
 * Network object that ready to do forward, throw an exception in failure cases. 
 * 
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param cfgFile path to the .cfg file with text description of the network architecture.
 * @param darknetModel path to the .weights file with learned network.
 */
export declare function readNetFromDarknet(cfgFile: any, darknetModel: any): Net

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param bufferCfg A buffer contains a content of .cfg file with text description of the network architecture.
 * @param bufferModel A buffer contains a content of .weights file with learned network.
 */
export declare function readNetFromDarknet(bufferCfg: any, bufferModel: any): any

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param bufferCfg A buffer contains a content of .cfg file with text description of the network architecture.
 * @param lenCfg Number of bytes to read from bufferCfg
 * @param bufferModel A buffer contains a content of .weights file with learned network.
 * @param lenModel Number of bytes to read from bufferModel
 */
export declare function readNetFromDarknet(bufferCfg: any, lenCfg: size_t, bufferModel: any, lenModel: size_t): Net

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object. Networks imported from Intel's [Model](#d3/df0/classcv_1_1dnn_1_1Model}) Optimizer are launched in Intel's Inference Engine backend.
 * 
 * @param xml XML configuration file with network's topology.
 * @param bin Binary file with trained weights.
 */
export declare function readNetFromModelOptimizer(xml: any, bin: any): Net

/**
 * Network object that ready to do forward, throw an exception in failure cases.
 * 
 * @param onnxFile path to the .onnx file with text description of the network architecture.
 */
export declare function readNetFromONNX(onnxFile: any): Net

/**
 * Network object that ready to do forward, throw an exception in failure cases.
 * 
 * @param buffer memory address of the first byte of the buffer.
 * @param sizeBuffer size of the buffer.
 */
export declare function readNetFromONNX(buffer: any, sizeBuffer: size_t): Net

/**
 * Network object that ready to do forward, throw an exception in failure cases.
 * 
 * @param buffer in-memory buffer that stores the ONNX model bytes.
 */
export declare function readNetFromONNX(buffer: any): any

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param model path to the .pb file with binary protobuf description of the network architecture
 * @param config path to the .pbtxt file that contains text graph definition in protobuf format. Resulting Net object is built by text graph using weights from a binary one that let us make it more flexible.
 */
export declare function readNetFromTensorflow(model: any, config: any): Net

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * @param bufferModel buffer containing the content of the pb file
 * @param bufferConfig buffer containing the content of the pbtxt file
 */
export declare function readNetFromTensorflow(bufferModel: any, bufferConfig: any): any

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param bufferModel buffer containing the content of the pb file
 * @param lenModel length of bufferModel
 * @param bufferConfig buffer containing the content of the pbtxt file
 * @param lenConfig length of bufferConfig
 */
export declare function readNetFromTensorflow(bufferModel: any, lenModel: size_t, bufferConfig: any, lenConfig: size_t): Net

/**
 * [Net](#db/d30/classcv_1_1dnn_1_1Net}) object.
 * 
 * Ascii mode of Torch serializer is more preferable, because binary mode extensively use `long` type of C language, which has various bit-length on different systems.
 * The loading file must contain serialized  object with importing network. Try to eliminate a custom objects from serialazing data to avoid importing errors.
 * 
 * List of supported layers (i.e. object instances derived from Torch nn.Module class):
 * 
 * nn.Sequential
 * nn.Parallel
 * nn.Concat
 * nn.Linear
 * nn.SpatialConvolution
 * nn.SpatialMaxPooling, nn.SpatialAveragePooling
 * nn.ReLU, nn.TanH, nn.Sigmoid
 * nn.Reshape
 * nn.SoftMax, nn.LogSoftMax
 * 
 * Also some equivalents of these classes from cunn, cudnn, and fbcunn may be successfully imported.
 * 
 * @param model path to the file, dumped from Torch by using torch.save() function.
 * @param isBinary specifies whether the network was serialized in ascii mode or binary.
 * @param evaluate specifies testing phase of network. If true, it's similar to evaluate() method in Torch.
 */
export declare function readNetFromTorch(model: any, isBinary: bool, evaluate: bool): Net

/**
 * [Mat](#d3/d63/classcv_1_1Mat}).
 * 
 * @param path to the .pb file with input tensor.
 */
export declare function readTensorFromONNX(path: any): Mat

/**
 * This function has the same limitations as [readNetFromTorch()](#d6/d0f/group__dnn_1ga65a1da76cb7d6852bdf7abbd96f19084}).
 * 
 * @param filename 
 * @param isBinary 
 */
export declare function readTorchBlob(filename: any, isBinary: bool): Mat

/**
 * Shrinked model has no origin float32 weights so it can't be used in origin Caffe framework anymore. However the structure of data is taken from NVidia's Caffe fork: . So the resulting model may be used there.
 * 
 * @param src Path to origin model from Caffe framework contains single precision floating point weights (usually has .caffemodel extension).
 * @param dst Path to destination model with updated weights.
 * @param layersTypes Set of layers types which parameters will be converted. By default, converts only Convolutional and Fully-Connected layers' weights.
 */
export declare function shrinkCaffeModel(src: any, dst: any, layersTypes: any): void

/**
 * To reduce output file size, trained weights are not included.
 * 
 * @param model A path to binary network.
 * @param output A path to output text file to be created.
 */
export declare function writeTextGraph(model: any, output: any): void


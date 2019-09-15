
import { AdaptiveThreshold, AdaptiveThresholdOptions, BilateralFilter, BilateralFilterOptions, Bitwise, BitwiseOptions, BoxFilter, BoxFilterOptions, Canny, CannyOptions, Circle, CircleOptions, ConvertTo, ConvertToOptions, Edge, EdgeOptions, Ellipse, EllipseOptions, FloodFill, FloodFillOptions, GaussianBlur, GaussianBlurOptions, HistEqualization, HistEqualizationOptions, InRange, InRangeOptions, Line, LineOptions, Math, MathOptions, MedianBlur, MedianBlurOptions, MorphologyEx, MorphologyExOptions, Rectangle, RectangleOptions, ReplaceColor, ReplaceColorOptions, Threshold, ThresholdOptions, WarpAffine, WarpAffineOptions, WarpPerspective, WarpPerspectiveOptions } from '.' 

interface Base {
  name: string
  description: string
}

export interface OperationMetadata extends Base {
  noInPlace: boolean
  sameSizeAndType: boolean
  validChannels: number[]
  options: Option[]
}

export interface Option extends Base {
  type: string
  signature: string
  typeUnion: string[]
  optional: boolean
}

export const operationClasses = {
  AdaptiveThreshold: AdaptiveThreshold,
  BilateralFilter: BilateralFilter,
  Bitwise: Bitwise,
  BoxFilter: BoxFilter,
  Canny: Canny,
  Circle: Circle,
  ConvertTo: ConvertTo,
  Edge: Edge,
  Ellipse: Ellipse,
  FloodFill: FloodFill,
  GaussianBlur: GaussianBlur,
  HistEqualization: HistEqualization,
  InRange: InRange,
  Line: Line,
  Math: Math,
  MedianBlur: MedianBlur,
  MorphologyEx: MorphologyEx,
  Rectangle: Rectangle,
  ReplaceColor: ReplaceColor,
  Threshold: Threshold,
  WarpAffine: WarpAffine,
  WarpPerspective: WarpPerspective
}

export interface OperationOptions {
  AdaptiveThreshold: AdaptiveThresholdOptions,
  BilateralFilter: BilateralFilterOptions,
  Bitwise: BitwiseOptions,
  BoxFilter: BoxFilterOptions,
  Canny: CannyOptions,
  Circle: CircleOptions,
  ConvertTo: ConvertToOptions,
  Edge: EdgeOptions,
  Ellipse: EllipseOptions,
  FloodFill: FloodFillOptions,
  GaussianBlur: GaussianBlurOptions,
  HistEqualization: HistEqualizationOptions,
  InRange: InRangeOptions,
  Line: LineOptions,
  Math: MathOptions,
  MedianBlur: MedianBlurOptions,
  MorphologyEx: MorphologyExOptions,
  Rectangle: RectangleOptions,
  ReplaceColor: ReplaceColorOptions,
  Threshold: ThresholdOptions,
  WarpAffine: WarpAffineOptions,
  WarpPerspective: WarpPerspectiveOptions
}

export enum OperationNames {
  AdaptiveThreshold = 'AdaptiveThreshold',
  BilateralFilter = 'BilateralFilter',
  Bitwise = 'Bitwise',
  BoxFilter = 'BoxFilter',
  Canny = 'Canny',
  Circle = 'Circle',
  ConvertTo = 'ConvertTo',
  Edge = 'Edge',
  Ellipse = 'Ellipse',
  FloodFill = 'FloodFill',
  GaussianBlur = 'GaussianBlur',
  HistEqualization = 'HistEqualization',
  InRange = 'InRange',
  Line = 'Line',
  Math = 'Math',
  MedianBlur = 'MedianBlur',
  MorphologyEx = 'MorphologyEx',
  Rectangle = 'Rectangle',
  ReplaceColor = 'ReplaceColor',
  Threshold = 'Threshold',
  WarpAffine = 'WarpAffine',
  WarpPerspective = 'WarpPerspective'
}

let metadata: OperationMetadata[] = null as any

export function getOperationMetadata() {
  if(!metadata) {
    metadata = [
      {
        name: "AdaptiveThreshold",
        description: "transforms a grayscale image to a binary image",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [1],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "maxval",
            signature: "maxval: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "thresholdType",
            signature: "thresholdType: ThresholdTypes",
            type: "ThresholdTypes",
            typeUnion: ["THRESH_BINARY","THRESH_BINARY_INV","THRESH_TRUNC","THRESH_TOZERO","THRESH_TOZERO_INV","THRESH_MASK","THRESH_OTSU","THRESH_TRIANGLE"],
            description: "",
            optional: false
          }, 
          {
            name: "adaptiveMethod",
            signature: "adaptiveMethod: AdaptiveThresholdTypes",
            type: "AdaptiveThresholdTypes",
            typeUnion: ["ADAPTIVE_THRESH_GAUSSIAN_C","ADAPTIVE_THRESH_MEAN_C"],
            description: "",
            optional: false
          }, 
          {
            name: "blockSize",
            signature: "blockSize: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "C",
            signature: "C: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }
        ]
      },
      
      {
        name: "BilateralFilter",
        description: "The function applies bilateral filtering to the input image, as described in bilateralFilter can reduce unwanted noise very well while keeping edges fairly sharp. However, it is very slow compared to most filters. \n  \n  Sigma values*: For simplicity, you can set the 2 sigma values to be the same. If they are small (< 10), the filter will not have much effect, whereas if they are large (> 150), they will have a very strong effect, making the image look \"cartoonish\".\n  \n  Filter size*: Large filters (d > 5) are very slow, so it is recommended to use d=5 for real-time applications, and perhaps d=9 for offline applications that need heavy noise filtering.",
        noInPlace: true,
        sameSizeAndType: true,
        validChannels: [1,3],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "d",
            signature: "d?: number",
            type: "number",
            typeUnion: [],
            description: "Diameter of each pixel neighborhood that is used during filtering. If it is non-positive, it is computed from sigmaSpace.",
            optional: true
          }, 
          {
            name: "sigmaColor",
            signature: "sigmaColor: number",
            type: "number",
            typeUnion: [],
            description: "Filter sigma in the color space. A larger value of the parameter means that farther colors within the pixel neighborhood (see sigmaSpace) will be mixed together, resulting in larger areas of semi-equal color.",
            optional: false
          }, 
          {
            name: "sigmaSpace",
            signature: "sigmaSpace: number",
            type: "number",
            typeUnion: [],
            description: "Filter sigma in the coordinate space. A larger value of the parameter means that farther pixels will influence each other as long as their colors are close enough (see sigmaColor ). When d>0, it specifies the neighborhood size regardless of sigmaSpace. Otherwise, d is proportional to sigmaSpace.",
            optional: false
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }
        ]
      },
      
      {
        name: "Bitwise",
        description: "TODO",
        noInPlace: true,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "type",
            signature: "type: 'and' | 'or' | 'not' | 'xor'",
            type: "'and' | 'or' | 'not' | 'xor'",
            typeUnion: ["and","or","not","xor"],
            description: "",
            optional: false
          }, 
          {
            name: "src2",
            signature: "src2?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "mask",
            signature: "mask?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "",
            optional: true
          }
        ]
      },
      
      {
        name: "BoxFilter",
        description: "smooths an image. Unnormalized box filter is useful for computing various integral characteristics over each pixel neighborhood, such as covariance matrices of image derivatives (used in dense optical flow algorithms, and so on). ",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "ddepth",
            signature: "ddepth?: number",
            type: "number",
            typeUnion: [],
            description: "the output image dept. (-1 to use src.depth()).",
            optional: true
          }, 
          {
            name: "anchor",
            signature: "anchor?: Point",
            type: "Point",
            typeUnion: [],
            description: "anchor point; default value Point(-1,-1) means that the anchor is at the kernel center",
            optional: true
          }, 
          {
            name: "normalize",
            signature: "normalize?: boolean",
            type: "boolean",
            typeUnion: [],
            description: "\tflag, specifying whether the kernel is normalized by its area or not.",
            optional: true
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }, 
          {
            name: "ksize",
            signature: "ksize: SizeRepresentation",
            type: "SizeRepresentation",
            typeUnion: [],
            description: "blurring kernel size. In general only odd numbers greater than 2 are accepted ",
            optional: false
          }
        ]
      },
      
      {
        name: "Canny",
        description: "finds edges in the input image and marks them in the output map edges using the Canny algorithm. The smallest value between threshold1 and threshold2 is used for edge linking. The largest value is used to find initial segments of strong edges",
        noInPlace: true,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "threshold1",
            signature: "threshold1?: number;",
            type: "number",
            typeUnion: [],
            description: "first threshold for the hysteresis procedure.",
            optional: true
          }, 
          {
            name: "threshold2",
            signature: "threshold2?: number;",
            type: "number",
            typeUnion: [],
            description: "Observation: When this has low values flood pass through edges of color similar to the low channel",
            optional: true
          }, 
          {
            name: "apertureSize",
            signature: "apertureSize?: number;",
            type: "number",
            typeUnion: [],
            description: "aperture size for the Sobel operator.",
            optional: true
          }, 
          {
            name: "L2gradient",
            signature: "L2gradient?: boolean;",
            type: "boolean",
            typeUnion: [],
            description: "if true a more accurate L2 norm will be used to calculate the image gradient magnitude",
            optional: true
          }, 
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "channels",
            signature: "channels?: true | number[]",
            type: "true | number[]",
            typeUnion: ["true","number[]"],
            description: "If true then all channels will be processed independently and then joined to build the result. The only\nexception is when there are 4 channels and in this case, if channels===true, the last 4th channel will be\nomitted (alpha). If an array of numbers is given then those channels will be processed only. If not given\nthen the operation will behave normally, processing as single channel image.",
            optional: true
          }
        ]
      },
      
      {
        name: "Circle",
        description: "Draws a simple or filled circle with a given center and radius.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "radius",
            signature: "radius: number",
            type: "number",
            typeUnion: [],
            description: "  Radius of the circle.",
            optional: false
          }, 
          {
            name: "color",
            signature: "color: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "center",
            signature: "center: Point",
            type: "Point",
            typeUnion: [],
            description: "Shape's center coordinates",
            optional: false
          }
        ]
      },
      
      {
        name: "ConvertTo",
        description: "converts source pixel values to the target data type.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "alpha",
            signature: "alpha?: number",
            type: "number",
            typeUnion: [],
            description: " Color scale factor.",
            optional: true
          }, 
          {
            name: "beta",
            signature: "beta?: number",
            type: "number",
            typeUnion: [],
            description: "Delta added to the scaled values.",
            optional: true
          }, 
          {
            name: "dtype",
            signature: "dtype?: number",
            type: "number",
            typeUnion: [],
            description: "Output image depth, for example, cv.CV_8U",
            optional: true
          }
        ]
      },
      
      {
        name: "Edge",
        description: "facade around cv.Sobel, cv.Laplacian and cv.Scharr",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "type",
            signature: "type: 'sobel' | 'scharr' | 'laplacian'",
            type: "'sobel' | 'scharr' | 'laplacian'",
            typeUnion: ["sobel","scharr","laplacian"],
            description: "",
            optional: false
          }, 
          {
            name: "ddepth",
            signature: "ddepth?: number",
            type: "number",
            typeUnion: [],
            description: "Desired depth of the destination image. Combinations:\n  ```\n  input           output\n  CV_8U\t          -1/CV_16S/CV_32F/CV_64F\n  CV_16U/CV_16S\t  -1/CV_32F/CV_64F\n  CV_32F\t        -1/CV_32F/CV_64F\n  CV_64F\t        -1/CV_64F",
            optional: true
          }, 
          {
            name: "dx",
            signature: "dx?: number",
            type: "number",
            typeUnion: [],
            description: "Applies only for Scharr and Sobel (and are mandatory in that case). Also must less than 3",
            optional: true
          }, 
          {
            name: "dy",
            signature: "dy?: number",
            type: "number",
            typeUnion: [],
            description: "Applies only for Scharr and Sobel (and are mandatory in that case)",
            optional: true
          }, 
          {
            name: "ksize",
            signature: "ksize?: number",
            type: "number",
            typeUnion: [],
            description: "Aperture size used to compute the second-derivative filters. See getDerivKernels for details. The size must be positive and odd. applies only for Sobel and Laplacian",
            optional: true
          }, 
          {
            name: "delta",
            signature: "delta?: number",
            type: "number",
            typeUnion: [],
            description: "Optional delta value that is added to the results prior to storing them in dst .",
            optional: true
          }, 
          {
            name: "scale",
            signature: "scale?: number",
            type: "number",
            typeUnion: [],
            description: "Optional scale factor for the computed Laplacian values. By default, no scaling is applied. See getDerivKernels for details.",
            optional: true
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }, 
          {
            name: "channels",
            signature: "channels?: true | number[]",
            type: "true | number[]",
            typeUnion: ["true","number[]"],
            description: "If true then all channels will be processed independently and then joined to build the result. The only\nexception is when there are 4 channels and in this case, if channels===true, the last 4th channel will be\nomitted (alpha). If an array of numbers is given then those channels will be processed only. If not given\nthen the operation will behave normally, processing as single channel image.",
            optional: true
          }
        ]
      },
      
      {
        name: "Ellipse",
        description: "Draws a simple or filled Ellipse with a given center size and rotation angle.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "angle",
            signature: "angle: number;",
            type: "number",
            typeUnion: [],
            description: "Ellipse angle in degrees.",
            optional: false
          }, 
          {
            name: "size",
            signature: "size: Size;",
            type: "Size",
            typeUnion: [],
            description: "Ellipse width and height.",
            optional: false
          }, 
          {
            name: "color",
            signature: "color: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "center",
            signature: "center: Point",
            type: "Point",
            typeUnion: [],
            description: "Shape's center coordinates",
            optional: false
          }
        ]
      },
      
      {
        name: "FloodFill",
        description: "This is a high level API for flood fill given color or image starting from given [seed] coords and involves several opencv operations. ",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "seed",
            signature: "seed: Point;",
            type: "Point",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "preprocess",
            signature: "preprocess?: FloodFillPreprocess[]",
            type: "FloodFillPreprocess[]",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "newColorOrImage",
            signature: "newColorOrImage?: Scalar | number[] | Mat;",
            type: "Scalar | number[] | Mat",
            typeUnion: ["Scalar","number[]","Mat"],
            description: "",
            optional: true
          }, 
          {
            name: "connectivity",
            signature: "connectivity?: 4 | 8;",
            type: "4 | 8",
            typeUnion: ["4","8"],
            description: "",
            optional: true
          }, 
          {
            name: "lowDiff",
            signature: "lowDiff?: Scalar | number[]",
            type: "Scalar | number[]",
            typeUnion: ["Scalar","number[]"],
            description: "",
            optional: true
          }, 
          {
            name: "upDiff",
            signature: "upDiff?: Scalar | number[]",
            type: "Scalar | number[]",
            typeUnion: ["Scalar","number[]"],
            description: "",
            optional: true
          }, 
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }
        ]
      },
      
      {
        name: "GaussianBlur",
        description: "convolves the source image with the specified Gaussian kernel. In-place filtering is supported.",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "sigmaX",
            signature: "sigmaX: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "sigmaY",
            signature: "sigmaY?: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }, 
          {
            name: "ksize",
            signature: "ksize: SizeRepresentation",
            type: "SizeRepresentation",
            typeUnion: [],
            description: "blurring kernel size. In general only odd numbers greater than 2 are accepted ",
            optional: false
          }
        ]
      },
      
      {
        name: "HistEqualization",
        description: "Applies histogram equalization using cv.equalizeHist or cv.CLAHE. In case src image has multiple channels, equalization is applied on each of them independently and then the result is merged",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "mode",
            signature: "mode: 'equalizeHist' | 'CLAHE'",
            type: "'equalizeHist' | 'CLAHE'",
            typeUnion: ["equalizeHist","CLAHE"],
            description: "",
            optional: false
          }, 
          {
            name: "clipLimit",
            signature: "clipLimit?: number",
            type: "number",
            typeUnion: [],
            description: "Applies only when [mode] is 'CLAHE'",
            optional: true
          }, 
          {
            name: "tileGridSize",
            signature: "tileGridSize?: Size",
            type: "Size",
            typeUnion: [],
            description: "Applies only when [mode] is 'CLAHE'",
            optional: true
          }, 
          {
            name: "channels",
            signature: "channels?: true | number[]",
            type: "true | number[]",
            typeUnion: ["true","number[]"],
            description: "If true then all channels will be processed independently and then joined to build the result. The only\nexception is when there are 4 channels and in this case, if channels===true, the last 4th channel will be\nomitted (alpha). If an array of numbers is given then those channels will be processed only. If not given\nthen the operation will behave normally, processing as single channel image.",
            optional: true
          }
        ]
      },
      
      {
        name: "InRange",
        description: "[dst] is set to 255 (all 1 -bits) if [src] is within the specified 1D, 2D, 3D, ... box and 0 otherwise.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "lowerb",
            signature: "lowerb: Mat | Scalar",
            type: "Mat | Scalar",
            typeUnion: ["Mat","Scalar"],
            description: "inclusive lower boundary array or a scalar.",
            optional: false
          }, 
          {
            name: "upperb",
            signature: "upperb: Mat | Scalar",
            type: "Mat | Scalar",
            typeUnion: ["Mat","Scalar"],
            description: "inclusive upper boundary array or a scalar.",
            optional: false
          }
        ]
      },
      
      {
        name: "Line",
        description: "Draws the line segment between pt1 and pt2 points in the image.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "pt1",
            signature: "pt1: Point",
            type: "Point",
            typeUnion: [],
            description: "First point of the line segment.",
            optional: false
          }, 
          {
            name: "pt2",
            signature: "pt2: Point",
            type: "Point",
            typeUnion: [],
            description: "Second point of the line segment.",
            optional: false
          }, 
          {
            name: "color",
            signature: "color: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "",
            optional: false
          }
        ]
      },
      
      {
        name: "Math",
        description: "performs math operations per pixel on images, like add, subtract, divide, addWeighted and multiply",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "type",
            signature: "type: 'add' | 'subtract' | 'divide' | 'multiply' | 'addWeighted'",
            type: "'add' | 'subtract' | 'divide' | 'multiply' | 'addWeighted'",
            typeUnion: ["add","subtract","divide","multiply","addWeighted"],
            description: "",
            optional: false
          }, 
          {
            name: "mask",
            signature: "mask?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "only applies to 'add' and 'subtract'",
            optional: true
          }, 
          {
            name: "scale",
            signature: "scale?: number",
            type: "number",
            typeUnion: [],
            description: "only applies to 'multiply' and 'divide'",
            optional: true
          }, 
          {
            name: "src2",
            signature: "src2: Mat",
            type: "Mat",
            typeUnion: [],
            description: "\tsecond input array of the same size and the same type as src",
            optional: false
          }, 
          {
            name: "dtype",
            signature: "dtype?: CVDataType",
            type: "CVDataType",
            typeUnion: [],
            description: "optional depth of the output array",
            optional: true
          }
        ]
      },
      
      {
        name: "MedianBlur",
        description: "smoothes an image using the median filter with the ksize x ksize aperture.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "ksize",
            signature: "ksize: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }
        ]
      },
      
      {
        name: "MorphologyEx",
        description: "perform advanced morphological transformations using an erosion and dilation as basic operations.",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "op",
            signature: "op: MorphTypes",
            type: "MorphTypes",
            typeUnion: ["MORPH_ERODE","MORPH_DILATE","MORPH_OPEN","MORPH_CLOSE","MORPH_GRADIENT","MORPH_TOPHAT","MORPH_BLACKHAT"],
            description: "",
            optional: false
          }, 
          {
            name: "kernel",
            signature: "kernel: Mat",
            type: "Mat",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "anchor",
            signature: "anchor?: Point",
            type: "Point",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "iterations",
            signature: "iterations?: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }, 
          {
            name: "borderValue",
            signature: "borderValue?: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "",
            optional: true
          }
        ]
      },
      
      {
        name: "Rectangle",
        description: "Draws the Rectangle segment between pt1 and pt2 points in the image.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "pt1",
            signature: "pt1: Point",
            type: "Point",
            typeUnion: [],
            description: "Vertex of the rectangle.",
            optional: false
          }, 
          {
            name: "pt2",
            signature: "pt2: Point",
            type: "Point",
            typeUnion: [],
            description: " Vertex of the rectangle opposite to [pt1].",
            optional: false
          }, 
          {
            name: "color",
            signature: "color: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "",
            optional: false
          }
        ]
      },
      
      {
        name: "ReplaceColor",
        description: "Will replace pixels within given boundaries with given color or image's pixels",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "lowColor",
            signature: "lowColor: Scalar | number[],",
            type: "Scalar | number[]",
            typeUnion: ["Scalar","number[]"],
            description: "inclusive lower boundary array or a scalar.",
            optional: false
          }, 
          {
            name: "highColor",
            signature: "highColor: Scalar | number[],",
            type: "Scalar | number[]",
            typeUnion: ["Scalar","number[]"],
            description: "Inclusive upper boundary array or a scalar.",
            optional: false
          }, 
          {
            name: "newColorOrImage",
            signature: "newColorOrImage: Scalar | number[] | Mat,",
            type: "Scalar | number[] | Mat",
            typeUnion: ["Scalar","number[]","Mat"],
            description: "The color or image to write in those pixels within given boundaries.",
            optional: false
          }, 
          {
            name: "removeRest",
            signature: "removeRest?: boolean",
            type: "boolean",
            typeUnion: [],
            description: "if true the output will only contain the replaced color and the rest (that didn't matched) will be 0,0,0,0",
            optional: true
          }, 
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }
        ]
      },
      
      {
        name: "Threshold",
        description: "Applies fixed-level thresholding to a multiple-channel array. The function is typically used to get a bi-level (binary) image out of a grayscale image or for removing a noise, that is, filtering out pixels with too small or too large values. There are several types of thresholding supported by the function. They are determined by type parameter.",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: [],
        options: [
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "thresh",
            signature: "thresh: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "maxval",
            signature: "maxval: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "type",
            signature: "type: ThresholdTypes",
            type: "ThresholdTypes",
            typeUnion: ["THRESH_BINARY","THRESH_BINARY_INV","THRESH_TRUNC","THRESH_TOZERO","THRESH_TOZERO_INV","THRESH_MASK","THRESH_OTSU","THRESH_TRIANGLE"],
            description: "",
            optional: false
          }
        ]
      },
      
      {
        name: "WarpAffine",
        description: "Will use [estimateAffine2D] to calculate affine matrix from given [inputs] and [outputs] and then [warpAffine] to transform.",
        noInPlace: true,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "inputs",
            signature: "inputs: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "Coordinates of quadrangle vertices in the source image.",
            optional: false
          }, 
          {
            name: "outputs",
            signature: "outputs: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "Coordinates of the corresponding quadrangle vertices in the destination image.",
            optional: false
          }, 
          {
            name: "flags",
            signature: "flags?: number",
            type: "number",
            typeUnion: [],
            description: "Combination of interpolation methods (INTER_LINEAR or INTER_NEAREST) and the optional flag WARP_INVERSE_MAP, \nthat sets M as the inverse transformation ",
            optional: true
          }, 
          {
            name: "size",
            signature: "size?: Size,",
            type: "Size",
            typeUnion: [],
            description: "Size of the output image.",
            optional: true
          }, 
          {
            name: "solveMethod",
            signature: "solveMethod?: DecompTypes",
            type: "DecompTypes",
            typeUnion: ["DECOMP_LU","DECOMP_SVD","DECOMP_EIG","DECOMP_CHOLESKY","DECOMP_QR","DECOMP_NORMAL"],
            description: "Method passed to cv::solve (DecompTypes)",
            optional: true
          }, 
          {
            name: "drawPoints",
            signature: "drawPoints?: Scalar[] | true",
            type: "Scalar[] | true",
            typeUnion: ["Scalar[]","true"],
            description: "If given input and output points will be drawn as circles. if true will randomly pick colors,\nor an array of colors can be passed otherwise.",
            optional: true
          }, 
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }, 
          {
            name: "borderValue",
            signature: "borderValue?: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "",
            optional: true
          }
        ]
      },
      
      {
        name: "WarpPerspective",
        description: "Input should be float type and 1, 3or 4 channels. In doubt use toRgba().",
        noInPlace: true,
        sameSizeAndType: false,
        validChannels: [],
        options: [
          {
            name: "inputs",
            signature: "inputs: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: " Coordinates of quadrangle vertices in the source image.",
            optional: false
          }, 
          {
            name: "outputs",
            signature: "outputs: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "Coordinates of the corresponding quadrangle vertices in the destination image.",
            optional: false
          }, 
          {
            name: "flags",
            signature: "flags?: number",
            type: "number",
            typeUnion: [],
            description: "Combination of interpolation methods (INTER_LINEAR or INTER_NEAREST) and the optional flag WARP_INVERSE_MAP, that sets M as the inverse transformation ",
            optional: true
          }, 
          {
            name: "size",
            signature: "size?: Size,",
            type: "Size",
            typeUnion: [],
            description: "Size of the output image.",
            optional: true
          }, 
          {
            name: "solveMethod",
            signature: "solveMethod?: DecompTypes",
            type: "DecompTypes",
            typeUnion: ["DECOMP_LU","DECOMP_SVD","DECOMP_EIG","DECOMP_CHOLESKY","DECOMP_QR","DECOMP_NORMAL"],
            description: "Method passed to cv::solve (DecompTypes)",
            optional: true
          }, 
          {
            name: "drawPoints",
            signature: "drawPoints?: Scalar[] | true",
            type: "Scalar[] | true",
            typeUnion: ["Scalar[]","true"],
            description: "If given input and output points will be drawn as circles. if true will randomly pick colors, or an array of colors can be passed otherwise.",
            optional: true
          }, 
          {
            name: "src",
            signature: "src: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Input image.",
            optional: false
          }, 
          {
            name: "dst",
            signature: "dst?: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Output image. If not given it will be created. Note that you can give [src] as output image in which case the input image will be written.",
            optional: true
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes]",
            optional: true
          }, 
          {
            name: "borderValue",
            signature: "borderValue?: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "",
            optional: true
          }
        ]
      }
    ]
  }
  return metadata
}

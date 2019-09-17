
import { AdaptiveThreshold, AdaptiveThresholdOptions, BilateralFilter, BilateralFilterOptions, Bitwise, BitwiseOptions, BoxFilter, BoxFilterOptions, Canny, CannyOptions, Circle, CircleOptions, ConvertTo, ConvertToOptions, Edge, EdgeOptions, Ellipse, EllipseOptions, FloodFill, FloodFillOptions, GaussianBlur, GaussianBlurOptions, HistEqualization, HistEqualizationOptions, InRange, InRangeOptions, Line, LineOptions, Math, MathOptions, MedianBlur, MedianBlurOptions, MorphologyEx, MorphologyExOptions, Rectangle, RectangleOptions, ReplaceColor, ReplaceColorOptions, Threshold, ThresholdOptions, WarpAffine, WarpAffineOptions, WarpPerspective, WarpPerspectiveOptions, CvtColor, CvtColorOptions, Pyr, PyrOptions, ToRgba, ToRgbaOptions, Roi, RoiOptions, Cartoonize, CartoonizeOptions, Wave, WaveOptions, HoughLinesP, HoughLinesPOptions } from '.' 

interface Base {
  name: string
  description: string
}

export interface OperationMetadata extends Base {
  noInPlace: boolean
  sameSizeAndType: boolean
  validChannels?: number[]
  optionsOrder?: string[]
  options: Option[]
}

export interface Option extends Base {
  type: string
  signature: string
  typeUnion: string[]
  optional: boolean
}

export const operationClasses = () => ({
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
  WarpPerspective: WarpPerspective,
  CvtColor: CvtColor,
  Pyr: Pyr,
  ToRgba: ToRgba,
  Roi: Roi,
  Cartoonize: Cartoonize,
  Wave: Wave,
  HoughLinesP: HoughLinesP
})

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
  WarpPerspective: WarpPerspectiveOptions,
  CvtColor: CvtColorOptions,
  Pyr: PyrOptions,
  ToRgba: ToRgbaOptions,
  Roi: RoiOptions,
  Cartoonize: CartoonizeOptions,
  Wave: WaveOptions,
  HoughLinesP: HoughLinesPOptions
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
  WarpPerspective = 'WarpPerspective',
  CvtColor = 'CvtColor',
  Pyr = 'Pyr',
  ToRgba = 'ToRgba',
  Roi = 'Roi',
  Cartoonize = 'Cartoonize',
  Wave = 'Wave',
  HoughLinesP = 'HoughLinesP'
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
        optionsOrder: undefined,        
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
        optionsOrder: undefined,        
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
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
            optional: true
          }
        ]
      },
      
      {
        name: "Bitwise",
        description: "",
        noInPlace: true,
        sameSizeAndType: true,
        validChannels: undefined,
        optionsOrder: undefined,        
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
            optional: true
          }, 
          {
            name: "ksize",
            signature: "ksize: SizeRepresentation",
            type: "SizeRepresentation",
            typeUnion: [],
            description: "Transformation (blurring) kernel size. In general only odd numbers greater than 2 are accepted.",
            optional: false
          }
        ]
      },
      
      {
        name: "Canny",
        description: "finds edges in the input image and marks them in the output map edges using the Canny algorithm. The smallest value between threshold1 and threshold2 is used for edge linking. The largest value is used to find initial segments of strong edges",
        noInPlace: true,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: undefined,        
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
        validChannels: undefined,
        optionsOrder: ["src","dst","center","radius","color","thickness","lineType","shift"],        
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
            description: "Shape's center coordinates.",
            optional: false
          }
        ]
      },
      
      {
        name: "ConvertTo",
        description: "converts source pixel values to the target data type.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: ["src","dst","dtype","alpha","beta"],        
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
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
        validChannels: undefined,
        optionsOrder: ["src","dst","center","size","angle","color","thickness","lineType"],        
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
            description: "Shape's center coordinates.",
            optional: false
          }, 
          {
            name: "size",
            signature: "size: Size",
            type: "Size",
            typeUnion: [],
            description: "Output image or shape size.",
            optional: false
          }
        ]
      },
      
      {
        name: "FloodFill",
        description: "This is a high level API for flood fill given color or image starting from given [seed] coords and involves several opencv operations. ",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: undefined,
        optionsOrder: undefined,        
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
            optional: true
          }, 
          {
            name: "ksize",
            signature: "ksize: SizeRepresentation",
            type: "SizeRepresentation",
            typeUnion: [],
            description: "Transformation (blurring) kernel size. In general only odd numbers greater than 2 are accepted.",
            optional: false
          }
        ]
      },
      
      {
        name: "HistEqualization",
        description: "Applies histogram equalization using cv.equalizeHist or cv.CLAHE. In case src image has multiple channels, equalization is applied on each of them independently and then the result is merged",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: undefined,
        optionsOrder: undefined,        
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
            signature: "type: 'equalizeHist' | 'CLAHE'",
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
            description: "Applies only when [mode] is `CLAHE`",
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
        validChannels: undefined,
        optionsOrder: ["src","dst","pt1","pt2","color","thickness","lineType","shift"],        
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
            optional: true
          }
        ]
      },
      
      {
        name: "MorphologyEx",
        description: "perform advanced morphological transformations using an erosion and dilation as basic operations. In case of multi-channel images, each channel is processed independently.",
        noInPlace: false,
        sameSizeAndType: true,
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "Type of a morphological operation.",
            optional: false
          }, 
          {
            name: "kernel",
            signature: "kernel: Mat",
            type: "Mat",
            typeUnion: [],
            description: "Structuring element. It can be created using getStructuringElement.",
            optional: false
          }, 
          {
            name: "anchor",
            signature: "anchor?: Point",
            type: "Point",
            typeUnion: [],
            description: "Anchor position with the kernel. Negative values mean that the anchor is at the kernel center",
            optional: true
          }, 
          {
            name: "iterations",
            signature: "iterations?: number",
            type: "number",
            typeUnion: [],
            description: "The number of iterations is the number of times erosion or dilatation operation will be applied. For instance, an opening operation ([MORPH_OPEN]) with two iterations is equivalent to apply successively: erode -> erode -> dilate -> dilate (and not erode -> dilate -> erode -> dilate). By default 1.",
            optional: true
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
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
        validChannels: undefined,
        optionsOrder: ["src","dst","pt1","pt2","color","thickness","lineType","shift"],        
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "threshold value",
            optional: false
          }, 
          {
            name: "maxval",
            signature: "maxval: number",
            type: "number",
            typeUnion: [],
            description: " maximum value to use with the THRESH_BINARY and THRESH_BINARY_INV thresholding types.",
            optional: false
          }, 
          {
            name: "type",
            signature: "type: ThresholdTypes",
            type: "ThresholdTypes",
            typeUnion: ["THRESH_BINARY","THRESH_BINARY_INV","THRESH_TRUNC","THRESH_TOZERO","THRESH_TOZERO_INV","THRESH_MASK","THRESH_OTSU","THRESH_TRIANGLE"],
            description: "thresholding type (see ThresholdTypes).",
            optional: false
          }
        ]
      },
      
      {
        name: "WarpAffine",
        description: "Will use [estimateAffine2D] to calculate affine matrix from given [inputs] and [outputs] and then [warpAffine] to transform.",
        noInPlace: true,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
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
        validChannels: undefined,
        optionsOrder: undefined,        
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
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
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
        name: "CvtColor",
        description: "converts an input image from one color space to another. In case of a transformation to-from RGB color space, the order of the channels should be specified explicitly (RGB or BGR). Note that the default color format in OpenCV is often referred to as RGB but it is actually BGR (the bytes are reversed). So the first byte in a standard (24-bit) color image will be an 8-bit Blue component, the second byte will be Green, and the third byte will be Red. The fourth, fifth, and sixth bytes would then be the second pixel (Blue, then Green, then Red), and so on.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: ["src","dst","code","dstCn"],        
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
            name: "code",
            signature: "code: ColorConversionCodes",
            type: "ColorConversionCodes",
            typeUnion: ["COLOR_BGR2BGRA","COLOR_RGB2RGBA","COLOR_BGRA2BGR","COLOR_RGBA2RGB","COLOR_BGR2RGBA","COLOR_RGB2BGRA","COLOR_RGBA2BGR","COLOR_BGRA2RGB","COLOR_BGR2RGB","COLOR_RGB2BGR","COLOR_BGRA2RGBA","COLOR_RGBA2BGRA","COLOR_BGR2GRAY","COLOR_RGB2GRAY","COLOR_GRAY2BGR","COLOR_GRAY2RGB","COLOR_GRAY2BGRA","COLOR_GRAY2RGBA","COLOR_BGRA2GRAY","COLOR_RGBA2GRAY","COLOR_BGR2BGR565","COLOR_RGB2BGR565","COLOR_BGR5652BGR","COLOR_BGR5652RGB","COLOR_BGRA2BGR565","COLOR_RGBA2BGR565","COLOR_BGR5652BGRA","COLOR_BGR5652RGBA","COLOR_GRAY2BGR565","COLOR_BGR5652GRAY","COLOR_BGR2BGR555","COLOR_RGB2BGR555","COLOR_BGR5552BGR","COLOR_BGR5552RGB","COLOR_BGRA2BGR555","COLOR_RGBA2BGR555","COLOR_BGR5552BGRA","COLOR_BGR5552RGBA","COLOR_GRAY2BGR555","COLOR_BGR5552GRAY","COLOR_BGR2XYZ","COLOR_RGB2XYZ","COLOR_XYZ2BGR","COLOR_XYZ2RGB","COLOR_BGR2YCrCb","COLOR_RGB2YCrCb","COLOR_YCrCb2BGR","COLOR_YCrCb2RGB","COLOR_BGR2HSV","COLOR_RGB2HSV","COLOR_BGR2Lab","COLOR_RGB2Lab","COLOR_BGR2Luv","COLOR_RGB2Luv","COLOR_BGR2HLS","COLOR_RGB2HLS","COLOR_HSV2BGR","COLOR_HSV2RGB","COLOR_Lab2BGR","COLOR_Lab2RGB","COLOR_Luv2BGR","COLOR_Luv2RGB","COLOR_HLS2BGR","COLOR_HLS2RGB","COLOR_BGR2HSV_FULL","COLOR_RGB2HSV_FULL","COLOR_BGR2HLS_FULL","COLOR_RGB2HLS_FULL","COLOR_HSV2BGR_FULL","COLOR_HSV2RGB_FULL","COLOR_HLS2BGR_FULL","COLOR_HLS2RGB_FULL","COLOR_LBGR2Lab","COLOR_LRGB2Lab","COLOR_LBGR2Luv","COLOR_LRGB2Luv","COLOR_Lab2LBGR","COLOR_Lab2LRGB","COLOR_Luv2LBGR","COLOR_Luv2LRGB","COLOR_BGR2YUV","COLOR_RGB2YUV","COLOR_YUV2BGR","COLOR_YUV2RGB","COLOR_YUV2RGB_NV12","COLOR_YUV2BGR_NV12","COLOR_YUV2RGB_NV21","COLOR_YUV2BGR_NV21","COLOR_YUV420sp2RGB","COLOR_YUV420sp2BGR","COLOR_YUV2RGBA_NV12","COLOR_YUV2BGRA_NV12","COLOR_YUV2RGBA_NV21","COLOR_YUV2BGRA_NV21","COLOR_YUV420sp2RGBA","COLOR_YUV420sp2BGRA","COLOR_YUV2RGB_YV12","COLOR_YUV2BGR_YV12","COLOR_YUV2RGB_IYUV","COLOR_YUV2BGR_IYUV","COLOR_YUV2RGB_I420","COLOR_YUV2BGR_I420","COLOR_YUV420p2RGB","COLOR_YUV420p2BGR","COLOR_YUV2RGBA_YV12","COLOR_YUV2BGRA_YV12","COLOR_YUV2RGBA_IYUV","COLOR_YUV2BGRA_IYUV","COLOR_YUV2RGBA_I420","COLOR_YUV2BGRA_I420","COLOR_YUV420p2RGBA","COLOR_YUV420p2BGRA","COLOR_YUV2GRAY_420","COLOR_YUV2GRAY_NV21","COLOR_YUV2GRAY_NV12","COLOR_YUV2GRAY_YV12","COLOR_YUV2GRAY_IYUV","COLOR_YUV2GRAY_I420","COLOR_YUV420sp2GRAY","COLOR_YUV420p2GRAY","COLOR_YUV2RGB_UYVY","COLOR_YUV2BGR_UYVY","COLOR_YUV2RGB_Y422","COLOR_YUV2BGR_Y422","COLOR_YUV2RGB_UYNV","COLOR_YUV2BGR_UYNV","COLOR_YUV2RGBA_UYVY","COLOR_YUV2BGRA_UYVY","COLOR_YUV2RGBA_Y422","COLOR_YUV2BGRA_Y422","COLOR_YUV2RGBA_UYNV","COLOR_YUV2BGRA_UYNV","COLOR_YUV2RGB_YUY2","COLOR_YUV2BGR_YUY2","COLOR_YUV2RGB_YVYU","COLOR_YUV2BGR_YVYU","COLOR_YUV2RGB_YUYV","COLOR_YUV2BGR_YUYV","COLOR_YUV2RGB_YUNV","COLOR_YUV2BGR_YUNV","COLOR_YUV2RGBA_YUY2","COLOR_YUV2BGRA_YUY2","COLOR_YUV2RGBA_YVYU","COLOR_YUV2BGRA_YVYU","COLOR_YUV2RGBA_YUYV","COLOR_YUV2BGRA_YUYV","COLOR_YUV2RGBA_YUNV","COLOR_YUV2BGRA_YUNV","COLOR_YUV2GRAY_UYVY","COLOR_YUV2GRAY_YUY2","COLOR_YUV2GRAY_Y422","COLOR_YUV2GRAY_UYNV","COLOR_YUV2GRAY_YVYU","COLOR_YUV2GRAY_YUYV","COLOR_YUV2GRAY_YUNV","COLOR_RGBA2mRGBA","COLOR_mRGBA2RGBA","COLOR_RGB2YUV_I420","COLOR_BGR2YUV_I420","COLOR_RGB2YUV_IYUV","COLOR_BGR2YUV_IYUV","COLOR_RGBA2YUV_I420","COLOR_BGRA2YUV_I420","COLOR_RGBA2YUV_IYUV","COLOR_BGRA2YUV_IYUV","COLOR_RGB2YUV_YV12","COLOR_BGR2YUV_YV12","COLOR_RGBA2YUV_YV12","COLOR_BGRA2YUV_YV12","COLOR_BayerBG2BGR","COLOR_BayerGB2BGR","COLOR_BayerRG2BGR","COLOR_BayerGR2BGR","COLOR_BayerBG2RGB","COLOR_BayerGB2RGB","COLOR_BayerRG2RGB","COLOR_BayerGR2RGB","COLOR_BayerBG2GRAY","COLOR_BayerGB2GRAY","COLOR_BayerRG2GRAY","COLOR_BayerGR2GRAY","COLOR_BayerBG2BGR_VNG","COLOR_BayerGB2BGR_VNG","COLOR_BayerRG2BGR_VNG","COLOR_BayerGR2BGR_VNG","COLOR_BayerBG2RGB_VNG","COLOR_BayerGB2RGB_VNG","COLOR_BayerRG2RGB_VNG","COLOR_BayerGR2RGB_VNG","COLOR_BayerBG2BGR_EA","COLOR_BayerGB2BGR_EA","COLOR_BayerRG2BGR_EA","COLOR_BayerGR2BGR_EA","COLOR_BayerBG2RGB_EA","COLOR_BayerGB2RGB_EA","COLOR_BayerRG2RGB_EA","COLOR_BayerGR2RGB_EA","COLOR_BayerBG2BGRA","COLOR_BayerGB2BGRA","COLOR_BayerRG2BGRA","COLOR_BayerGR2BGRA","COLOR_BayerBG2RGBA","COLOR_BayerGB2RGBA","COLOR_BayerRG2RGBA","COLOR_BayerGR2RGBA","COLOR_COLORCVT_MAX"],
            description: "color space conversion code (see ColorConversionCodes).",
            optional: false
          }, 
          {
            name: "dstCn",
            signature: "dstCn?: number",
            type: "number",
            typeUnion: [],
            description: "number of channels in the destination image; if the parameter is 0, the number of the channels is derived automatically from src and code.",
            optional: true
          }
        ]
      },
      
      {
        name: "Pyr",
        description: " Performs pyramid up or down on an image. PyrUp up samples an image and then blurs it. PyrDown blurs an image and down samples it. By default, size of the output image is computed as 'Size((src.cols+1)/2, (src.rows+1)/2)', but in any case, the following conditions should be satisfied: '|𝚍𝚜𝚝𝚜𝚒𝚣𝚎.𝚠𝚒𝚍𝚝𝚑∗2−src.cols|≤2|𝚍𝚜𝚝𝚜𝚒𝚣𝚎.𝚑𝚎𝚒𝚐𝚑𝚝∗2−src.rows|≤2'.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: ["src","dst","type","size","bordertype"],        
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
            signature: "type: 'up' | 'down'",
            type: "'up' | 'down'",
            typeUnion: ["up","down"],
            description: "PyrUp or PyrDown.",
            optional: false
          }, 
          {
            name: "borderType",
            signature: "borderType?: BorderTypes",
            type: "BorderTypes",
            typeUnion: ["BORDER_CONSTANT","BORDER_REPLICATE","BORDER_REFLECT","BORDER_WRAP","BORDER_REFLECT_101","BORDER_TRANSPARENT","BORDER_REFLECT101","BORDER_DEFAULT","BORDER_ISOLATED"],
            description: "border mode used to extrapolate pixels outside of the image, see [BorderTypes].",
            optional: true
          }
        ]
      },
      
      {
        name: "ToRgba",
        description: "Changes image type to 4 channel RGBA. This is often necessary to render in HTML canvas.",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: ["src","dst"],        
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
          }
        ]
      },
      
      {
        name: "Roi",
        description: "Return an image which has a src sub region defined by in given rectangle expression",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: ["src","dst"],        
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
            name: "expr",
            signature: "expr: Rect",
            type: "Rect",
            typeUnion: [],
            description: "",
            optional: false
          }
        ]
      },
      
      {
        name: "Cartoonize",
        description: "convert an image into a cartoon-like image",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: ["src","dst","downSampleCount","filterIterations","filterDiameter","filterColor","filterSpace","blurSize"],        
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
            name: "downSampleCount",
            signature: "downSampleCount?: number",
            type: "number",
            typeUnion: [],
            description: "times the original image is shrink and enlarged (internally using pyrDown and pyrUp) . Default: 2",
            optional: true
          }, 
          {
            name: "filterIterations",
            signature: "filterIterations?: number",
            type: "number",
            typeUnion: [],
            description: "number of times bilateralFilter is applied. Default: 20",
            optional: true
          }, 
          {
            name: "filterDiameter",
            signature: "filterDiameter?: number",
            type: "number",
            typeUnion: [],
            description: "bilateralFilter filterDiameter option. Default: 9",
            optional: true
          }, 
          {
            name: "filterColor",
            signature: "filterColor?: number",
            type: "number",
            typeUnion: [],
            description: "bilateralFilter filterColor option. Default: 9",
            optional: true
          }, 
          {
            name: "filterSpace",
            signature: "filterSpace?: number",
            type: "number",
            typeUnion: [],
            description: "bilateralFilter filterSpace option. Default: 7",
            optional: true
          }, 
          {
            name: "blurSize",
            signature: "blurSize?: number",
            type: "number",
            typeUnion: [],
            description: "kernel size of blur filter. Default 3.",
            optional: true
          }, 
          {
            name: "dirt",
            signature: "dirt?: number",
            type: "number",
            typeUnion: [],
            description: "black \"dirt\" spots - the lower the dirty - default: 2",
            optional: true
          }
        ]
      },
      
      {
        name: "Wave",
        description: "Waving like image warp",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: undefined,        
        options: [
          {
            name: "type",
            signature: "type: 'vertical'",
            type: "'vertical'",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "amplitude",
            signature: "amplitude: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
          }, 
          {
            name: "frequency",
            signature: "frequency: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: false
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
        name: "HoughLinesP",
        description: "Finds line segments in a binary image using the probabilistic Hough transform. The function implements the probabilistic Hough transform algorithm for line detection. It returns parsed set of line segments in [line] option. If color is given it will draw lines in [dst]",
        noInPlace: false,
        sameSizeAndType: false,
        validChannels: undefined,
        optionsOrder: ["src","dst","lines","rho","theta","threshold","minLineLength","maxLineGap","color","edgeThreshold","edgeThreshold2","edgeApertureSize","edgeL2gradient"],        
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
            name: "lines",
            signature: "lines: LineSegment[]",
            type: "LineSegment[]",
            typeUnion: [],
            description: "\tparsed line segment objects.",
            optional: false
          }, 
          {
            name: "rho",
            signature: "rho: number",
            type: "number",
            typeUnion: [],
            description: "distance resolution of the accumulator in pixels.",
            optional: false
          }, 
          {
            name: "theta",
            signature: "theta: number",
            type: "number",
            typeUnion: [],
            description: "angle resolution of the accumulator in radians.",
            optional: false
          }, 
          {
            name: "threshold",
            signature: "threshold: number",
            type: "number",
            typeUnion: [],
            description: "accumulator threshold parameter. Only those lines are returned that get enough votes",
            optional: false
          }, 
          {
            name: "minLineLength",
            signature: "minLineLength?: number",
            type: "number",
            typeUnion: [],
            description: "minimum line length. Line segments shorter than that are rejected.",
            optional: true
          }, 
          {
            name: "maxLineGap",
            signature: "maxLineGap?: number",
            type: "number",
            typeUnion: [],
            description: "maximum allowed gap between points on the same line to link them.",
            optional: true
          }, 
          {
            name: "color",
            signature: "color?: Scalar",
            type: "Scalar",
            typeUnion: [],
            description: "if given, line segments will be drawn in [dst]",
            optional: true
          }, 
          {
            name: "edgeThreshold",
            signature: "edgeThreshold?: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "edgeThreshold2",
            signature: "edgeThreshold2?: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "edgeApertureSize",
            signature: "edgeApertureSize?: number",
            type: "number",
            typeUnion: [],
            description: "",
            optional: true
          }, 
          {
            name: "edgeL2gradient",
            signature: "edgeL2gradient?: number",
            type: "number",
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

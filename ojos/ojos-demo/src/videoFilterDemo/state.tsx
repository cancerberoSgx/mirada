import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { AddWeightOptions, Bitwise, BitwiseOptions, CannyOptions, ConvertTo, ConvertToOptions, Edge, EdgeOptions, FloodFillOptions, GaussianBlur, GaussianBlurOptions, HistEqualization, HistEqualizationOptions, MorphologyEx, MorphologyExOptions, OperationExecBaseOptions, ReplaceColorOptions, Threshold, ThresholdOptions, WarpPerspective, WarpPerspectiveOptions, Cartoonize, CartoonizeOptions, HoughLinesPOptions, HoughLinesP, scalarColor } from 'ojos'


export enum ToolNames {
  replaceColor = 'replaceColor',
  canny = 'canny',
  convertTo = 'convertTo',
  floodFill = 'floodFill',
  gaussianBlur = 'gaussianBlur',
  threshold = 'threshold',
  morphologyEx = 'morphologyEx',
  histEqualization = 'histEqualization',
  warpPerspective = 'warpPerspective',
  edge = 'edge',
  bitwise = 'bitwise',
  addWeighted = 'addWeighted',
  cartoonize = 'cartoonize',
  houghLinesP = 'houghLinesP',
}

type ToolProps<T extends OperationExecBaseOptions> = RemoveProperties<T, keyof OperationExecBaseOptions> & {
  name: ToolNames;
  active?: boolean;
  description: string;
}

export interface State extends StateTools {
  mem: string,
  fps: number;
  order: ToolNames[]
}

export interface StateTools {
  replaceColor: ToolProps<ReplaceColorOptions>;
  canny: ToolProps<CannyOptions>;
  floodFill: ToolProps<FloodFillOptions>;
  convertTo: ToolProps<ConvertToOptions>;
  gaussianBlur: ToolProps<GaussianBlurOptions>;
  threshold: ToolProps<ThresholdOptions>;
  morphologyEx: ToolProps<MorphologyExOptions>;
  histEqualization: ToolProps<HistEqualizationOptions>;
  warpPerspective: ToolProps<WarpPerspectiveOptions>;
  edge: ToolProps<EdgeOptions>;
  bitwise: ToolProps<BitwiseOptions>;
  addWeighted: ToolProps<AddWeightOptions>;
  cartoonize: ToolProps<CartoonizeOptions>;
  houghLinesP: ToolProps<HoughLinesPOptions>;
}

let _state: State
export const getState: () => State = () => {
  if (!_state) {
    const tools: StateTools = {
      replaceColor: {
        name: ToolNames.replaceColor,
        description: 'Will replace pixels between lowColor and highColor with given newColorOrImage',
        lowColor: new cv.Scalar(0, 0, 0, 255),
        highColor: new cv.Scalar(150, 150, 150, 255),
        newColorOrImage: new cv.Scalar(255, 0, 0, 255)
      },
      convertTo: {
        description: new ConvertTo().description,
        name: ToolNames.convertTo,
        alpha: 1.5,
        beta: 12
      },
      edge: {
        description: new Edge().description,
        name: ToolNames.edge,
        dx: 2,
        dy: 1,
        ddepth: cv.CV_8U,
        delta: 0,
        ksize: 3,
        scale: 1,
        // channels: false,
        type: 'laplacian'
      },
      threshold: {
        description: new Threshold().description,
        name: ToolNames.threshold,
        maxval: 128,
        thresh: 128,
        type: cv.THRESH_BINARY
      },
      bitwise: {
        description: new Bitwise().description,
        name: ToolNames.bitwise,
        type: 'not'
      },
      gaussianBlur: {
        description: new GaussianBlur().description,
        name: ToolNames.gaussianBlur,
        ksize: { width: 5, height: 5 },
        sigmaX: 1.2,
        sigmaY: 1.2,
        borderType: cv.BORDER_DEFAULT
      },
      warpPerspective: {
        description: new WarpPerspective().description,
        name: ToolNames.warpPerspective,
        inputs: [6, 4, 100, 8, 9, 110, 100, 90],
        outputs: [31, 41, 88, 40, 29, 88, 88, 80],
        drawPoints: true,
        flags: cv.INTER_LINEAR,
        borderType: cv.BORDER_CONSTANT,
        solveMethod: cv.DECOMP_NORMAL,

      },
      histEqualization: {
        description: new HistEqualization().description,
        name: ToolNames.histEqualization,
        type: 'CLAHE',
        clipLimit: 1,
        size: new cv.Size(40, 40),
        channels: true
      },
      cartoonize: {
        description: new Cartoonize().description,
        name: ToolNames.cartoonize,
      },    
      houghLinesP: {
        description: new HoughLinesP().description,
        name: ToolNames.houghLinesP,
        lines: [], 
        rho: 1, 
        theta: 3.14 / 180, 
        threshold:1,
        color: scalarColor('red')
      },
      morphologyEx: {
        description: new MorphologyEx().description,
        name: ToolNames.morphologyEx,
        op: cv.MORPH_DILATE,
        kernel: cv.getStructuringElement(cv.MORPH_CROSS, { width: 5, height: 7 }),
        iterations: 1,
        // borderType: cv.BORDER_CONSTANT
        //borderValue
      },
      floodFill: {
        description: 'TODO',
        name: ToolNames.floodFill,
        seed: new cv.Point(5, 6),
        newColorOrImage: new cv.Scalar(222, 0, 0, 0),
        lowDiff: new cv.Scalar(19, 19, 91, 255),
        upDiff: new cv.Scalar(229, 255, 255, 255)
      },
      canny: {
        description: 'TODO',
        name: ToolNames.canny,
        threshold1: 1,
        threshold2: 222,
        apertureSize: 3,
        L2gradient: false,
        // channels: false
      },
      addWeighted: {
        description: `Renders each frame as a sum of it and the previous one. Heads up! since this is a "time-aware" filter it doesn't behave well when preceeding others so I recommend to use it at last`,
        name: ToolNames.addWeighted,
        alpha: .5,
        beta: .5,
        gamma: 0,
        src2: null as any
      },
    }
    _state = {
      fps: 0,
      mem: '',
      ...tools,
      order: Object.values(tools).map(v => v.name)
    }
  }
  return _state
}

export function setState(s: Partial<State>) {
  Object.assign(_state || getState(), s)
}


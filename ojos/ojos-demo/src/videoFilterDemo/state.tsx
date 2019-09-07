import { RemoveProperties, mergeRecursive, merge } from 'misc-utils-of-mine-generic'
import { CannyOptions, ConvertTo, ConvertToOptions, FloodFillOptions, GaussianBlur, GaussianBlurOptions, MorphologyEx, MorphologyExOptions, OperationExecBaseOptions, ReplaceColorOptions, Threshold, ThresholdOptions, HistEqualizationOptions, Edge, EdgeOptions, HistEqualization, WarpPerspectiveOptions, WarpPerspective, SolveMethodEnum, BitwiseOptions, Bitwise } from 'ojos'
 

export enum ToolNames {
  'replaceColor' = 'replaceColor',
  'canny' = 'canny',
  'convertTo' = 'convertTo',
  'floodFill' = 'floodFill',
  'gaussianBlur' = 'gaussianBlur',
  'threshold' = 'threshold',
  'morphologyEx' = 'morphologyEx',
  'histEqualization' = 'histEqualization',
  'warpPerspective' = 'warpPerspective',
  'edge' = 'edge',
  'bitwise' = 'bitwise',
}

type ToolProps<T extends OperationExecBaseOptions> = RemoveProperties<T, keyof OperationExecBaseOptions> & {
  name: ToolNames;
  active?: boolean;
  description: string;
}

export interface State extends StateTools {
  mem:string,
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
        outputs: [31, 41, 88, 40, 29, 88, 88, 80]    ,
        drawPoints: true,
        flags: cv.INTER_LINEAR  ,
        borderType: cv.BORDER_CONSTANT,
        solveMethod: cv.DECOMP_NORMAL  ,

      },
        histEqualization: {
        description: new HistEqualization().description,
        name: ToolNames.histEqualization,
        mode: 'CLAHE',
        clipLimit: 1,
        tileGridSize: new cv.Size(40,40)
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
        L2gradient: false
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
  const ss = getState()
  // merge(false, true, ss, s)
  Object.assign(ss, s)
}
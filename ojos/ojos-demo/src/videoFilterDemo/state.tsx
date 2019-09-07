import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { CannyOptions, ConvertTo, ConvertToOptions, FloodFillOptions, GaussianBlur, GaussianBlurOptions, MorphologyEx, MorphologyExOptions, OperationExecBaseOptions, ReplaceColorOptions, Threshold, ThresholdOptions } from 'ojos'

export enum ToolNames {
  'replaceColor' = 'replaceColor',
  'canny' = 'canny',
  'convertTo' = 'convertTo',
  'floodFill' = 'floodFill',
  'gaussianBlur' = 'gaussianBlur',
  'threshold' = 'threshold',
  'morphologyEx' = 'morphologyEx',
}

type ToolProps<T extends OperationExecBaseOptions> = RemoveProperties<T, keyof OperationExecBaseOptions> & {
  name: ToolNames;
  active?: boolean;
  description: string;
}

export interface State extends StateTools {
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
      threshold: {
        description: new Threshold().description,
        name: ToolNames.threshold,
        maxval: 128,
        thresh: 128,
        type: cv.THRESH_BINARY
      },
      morphologyEx: {
        description: new MorphologyEx().description,
        name: ToolNames.morphologyEx,
        op: cv.MORPH_DILATE,
        kernel: cv.getStructuringElement(cv.MORPH_RECT, { width: 5, height: 7 }),
        iterations: 1,
        // borderType: cv.BORDER_CONSTANT
        //borderValue
      },
      gaussianBlur: {
        description: new GaussianBlur().description,
        name: ToolNames.gaussianBlur,
        ksize: { width: 5, height: 5 },
        sigmaX: 1.2,
        sigmaY: 1.2,
        borderType: cv.BORDER_DEFAULT
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
      ...tools,
      order: Object.values(tools).map(v => v.name)
    }
  }
  return _state
}

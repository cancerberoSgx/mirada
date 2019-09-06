import { RemoveProperties, objectKeys } from 'misc-utils-of-mine-generic'
import { CannyOptions, FloodFillOptions, OperationExecBaseOptions, ReplaceColorOptions, ConvertToOptions, ConvertTo, GaussianBlur, GaussianBlurOptions } from 'ojos'
import {  BorderTypes } from 'mirada'

export enum ToolNames {
  'replaceColor' = 'replaceColor',
  'canny' = 'canny',
  'convertTo' = 'convertTo',
  'floodFill' = 'floodFill',
  'gaussianBlur' = 'gaussianBlur',
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
}

let _state: State
export const getState: () => State = () => {
  if (!_state) {

const tools:StateTools = {
  replaceColor: {
        name: ToolNames.replaceColor,
        description: 'Will replace pixels between lowColor and highColor with given newColorOrImage',
        lowColor: new cv.Scalar(0, 0, 0, 255),
        highColor: new cv.Scalar(150, 150, 150, 255),
        newColorOrImage: new cv.Scalar(255, 0, 0, 255)
      },
      canny: {
        description: 'TODO',
        name: ToolNames.canny,
        threshold1: 1,
        threshold2: 222,
        apertureSize: 3,
        L2gradient: false
      },
      convertTo: {
        description: new ConvertTo().description,
        name: ToolNames.convertTo,
        alpha: 1.5,
        beta: 12
      },
      gaussianBlur: {
        description: new GaussianBlur().description,
        name: ToolNames.gaussianBlur,
        ksize: {width: 5 ,height: 5},
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
      }
}

    _state = {
      fps: 0,
      ...tools,
      order: Object.values(tools).map(v=>v.name)
    }
  }
  return _state
}

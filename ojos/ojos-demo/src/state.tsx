import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { CannyOptions, FloodFillOptions, OperationExecBaseOptions, ReplaceColorOptions } from 'ojos'

enum Tools {
  'replaceColor' = 'replaceColor',
  'canny' = 'canny',
  'floodFill' = 'floodFill'
}

type ToolProps<T extends OperationExecBaseOptions> = RemoveProperties<T, keyof OperationExecBaseOptions> & {
  name: Tools;
  active: boolean;
  description: string;
}

export interface State {
  fps: number;
  replaceColor: ToolProps<ReplaceColorOptions>;
  canny: ToolProps<CannyOptions>;
  floodFill: ToolProps<FloodFillOptions>;
}

let _state: State
export const getState: () => State = () => {
  if (!_state) {
    _state = {
      fps: 0,
      replaceColor: {
        name: Tools.replaceColor,
        description: 'Will replace pixels between lowColor and highColor with given newColorOrImage',
        active: false,
        lowColor: new cv.Scalar(0, 0, 0, 255),
        highColor: new cv.Scalar(150, 150, 150, 255),
        newColorOrImage: new cv.Scalar(255, 0, 0, 255)
      },
      canny: {
        active: false,
        description: 'TODO',
        name: Tools.canny,
        threshold1: 222,
        threshold2: 38224,
        apertureSize: 7,
        L2gradient: false
      },
      floodFill: {
        description: 'TODO',
        active: false,
        name: Tools.floodFill,
        seed: new cv.Point(5, 6),
        newColorOrImage: new cv.Scalar(222, 0, 0, 0),
        lowDiff: new cv.Scalar(19, 19, 91, 255),
        upDiff: new cv.Scalar(229, 255, 255, 255)
      }
    }
  }
  return _state
}

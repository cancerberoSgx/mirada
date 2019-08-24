import { CVImgProcColor } from './imgProcColor'
import { CVImgProcGrabCut } from './imgProcGrabCut'

export interface CVImgProc extends CVImgProcGrabCut, CVImgProcColor, CVImgProcLine {

}

export interface CVImgProcLine {
  FILLED: number
  LINE_4: number
  LINE_8: number
  LINE_AA: number
}
export type LineTypes = CVImgProc['FILLED'] | CVImgProc['LINE_4'] | CVImgProc['LINE_8'] | CVImgProc['LINE_AA']



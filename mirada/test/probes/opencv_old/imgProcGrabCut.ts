// import { TODO } from 'misc-utils-of-mine-generic'
// import { Mat } from './opencv'
// import { Rect } from "./scalars";

// export interface CVImgProcGrabCut {
//   /**
//    * The function initializes the state and the mask using the provided rectangle. After that it runs iterCount iterations of the algorithm.
//    */
//   GC_INIT_WITH_RECT: number
//   /**
//    * The function initializes the state using the provided mask. Note that GC_INIT_WITH_RECT and GC_INIT_WITH_MASK can be combined. Then, all the pixels outside of the ROI are automatically initialized with GC_BGD
//    */
//   GC_INIT_WITH_MASK: number
//   /**
//    * The value means that the algorithm should just resume.
//    */
//   GC_EVAL: number
//   /**
//    * The value means that the algorithm should just run the grabCut algorithm (a single iteration) with the fixed model
//    */
//   GC_EVAL_FREEZE_MODEL: number
//   /**
//    * an obvious background pixels
//    */
//   GC_BGD: number
//   /**
//    * an obvious foreground (object) pixel
//    */
//   GC_FGD: number
//   /**
//    * a possible background pixel
//    */
//   GC_PR_BGD: number
//   /**
//    * a possible foreground pixel
//    */
//   GC_PR_FGD: number

//   grabCut(src: Mat, mask: Mat, rect: Rect, bgdModel: Mat, fgdModel: Mat, iterCount: number, mode: GrabCutModes): TODO
// }

// export type GrabCutModes = CVImgProcGrabCut['GC_INIT_WITH_RECT'] | CVImgProcGrabCut['GC_INIT_WITH_MASK'] | CVImgProcGrabCut['GC_EVAL'] | CVImgProcGrabCut['GC_EVAL_FREEZE_MODEL']
// /**
//  * class of the pixel in GrabCut algorithm
//  */

// export type GrabCutClasses = CVImgProcGrabCut['GC_BGD'] | CVImgProcGrabCut['GC_FGD'] | CVImgProcGrabCut['GC_PR_BGD'] | CVImgProcGrabCut['GC_PR_FGD']

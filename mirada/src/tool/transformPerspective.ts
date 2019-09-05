// import { checkThrow } from 'misc-utils-of-mine-generic'
// import { del } from '../util'
// import { CannyOptions, ImageOperation } from './types';

// export function canny(o: CannyOptions) {
//   checkThrow(!o.apertureSize || o.apertureSize < 3 || o.apertureSize % 2 !== 0, 'Aperture size must be odd and greater than 2')
//   const dst = o.dst = o.dst || new cv.Mat()
//   o.src.copyTo(dst)
//   cv.cvtColor(dst, dst, cv.CV_8UC1, 3)
//   const c = dst.clone()
//   cv.Canny(c, dst, typeof o.threshold1 === 'undefined' ? 0 : o.threshold1,
//     typeof o.threshold2 === 'undefined' ? 255 : o.threshold2,
//     typeof o.apertureSize === 'undefined' ? 3 : o.apertureSize, o.L2gradient || false) // heads up ! dst needs to be bigger!
//   del(c)
//   return o.dst
// }

// export abstract class AbstractOperation implements ImageOperation {
//   abstract name: string;  
//  abstract description: string;
//  abstract  execute(o:  ): .Mat {
//     throw new Error('Method not implemented.');
//   }


// }

// export class PerspectiveTransform extends AbstractOperation{

// }
//   async  applyPerspectiveTransform(inputs: number[], outputs: number[]) {
//     const i = await getImageWidget()
//     const size = { width: i.imageSize.width, height: i.imageSize.height }
//     const src = i.get().clone().asMat()
//     let dst = new cv.Mat()
//     let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, inputs)
//     let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, outputs)
//     let M = cv.getPerspectiveTransform(srcTri, dstTri, cv.SOLVEPNP_AP3P)
//     cv.warpPerspective(src, dst, M, size, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar())
//     i.setBuffer(dst)
//     i.render()
//     src.delete(); M.delete(); srcTri.delete(); dstTri.delete()
//   }
// }

// export enum SolveMethodEnum  {
// SOLVEPNP_ITERATIVE='SOLVEPNP_ITERATIVE',
// SOLVEPNP_EPNP='SOLVEPNP_EPNP',
// SOLVEPNP_P3P='SOLVEPNP_P3P',
// SOLVEPNP_DLS='SOLVEPNP_DLS',
// SOLVEPNP_UPNP='SOLVEPNP_UPNP',
// SOLVEPNP_AP3P='SOLVEPNP_AP3P',
// SOLVEPNP_IPPE='SOLVEPNP_IPPE',
// SOLVEPNP_IPPE_SQUARE='SOLVEPNP_IPPE_SQUARE'
// ç
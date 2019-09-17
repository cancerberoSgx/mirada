import { AbstractOperation } from '.'
import { OperationExecBaseOptions, WithBorderType, WithSize, WithKSize } from './types'
import { Rect, del, InterpolationFlags, toRgba } from 'mirada'
import { Edge } from './edge'
import { MedianBlur } from './medianBlur'
import { Threshold } from './threshold'
import { BilateralFilter } from './bilateralFilter'
import { scalarColor } from '../color'
import { Bitwise } from './bitwise'
import { write } from '../../test/testUtil'

export interface CartoonizeOptions extends OperationExecBaseOptions, CartoonizeConcreteOptions {

}

interface CartoonizeConcreteOptions extends Partial<WithKSize>{
  numDownSamples?: number
  numBilateralFilters?: number
}

/**
 * convert an image into a cartoon-like image
 */
export class Cartoonize extends AbstractOperation<CartoonizeOptions> {
  name = "Cartoonize"
  description = `convert an image into a cartoon-like image`
  optionsOrder = ['src', 'dst'] as (keyof CartoonizeOptions)[]
  protected _exec(o: CartoonizeOptions) {
    // img_rgb = cv2.imread(img_rgb)
    const rgb = new cv.Mat(o.src.rows, o.src.cols, o.src.type())
    
  toRgba(o.src, rgb)
        cv.cvtColor(rgb, rgb, cv.COLOR_RGBA2RGB)
        // cv2.resize(o.src, rgb, {width: 1366,768))
      //  const  o.numDownSamples||2 = 2       // # number of downscaling steps
        // const numBilateralFilters = 50  // # number of bilateral filtering steps

// console.log(1);

        // # -- STEP 1 --
        // # downsample image using Gaussian pyramid
        const img_color = rgb.clone()
        for (let i = 0; i < (o.numDownSamples||2); i++) {
          cv.pyrDown(img_color, img_color)
    }
// console.log(2);


        // for _ in xrange(o.numDownSamples||2):
            // img_color = cv2.pyrDown(img_color)
            //  cv.pyrDown(img_color, img_color)

        // #cv2.imshow("downcolor",img_color
        // #cv2.waitKey(0)
        // # repeatedly apply small bilateral filter instead of applying
        // # one large filter
          for (let i = 0; i < (o.numBilateralFilters||20); i++) {
            const c = img_color.clone()
                  cv.bilateralFilter(c,img_color, 9, 9, 7)
                  del(c)

    }
// console.log(3);

        // for _ in xrange(numBilateralFilters):
            // img_color = cv2.bilateralFilter(img_color, 9, 9, 7)
        // #cv2.imshow("bilateral filter",img_color)
        // #cv2.waitKey(0)
        // # upsample image to original size
        // for _ in xrange(o.numDownSamples||2):
        //     img_color = cv2.pyrUp(img_color)
         for (let i = 0; i < (o.numDownSamples||2); i++) {
          cv.pyrUp(img_color, img_color)
    }
        // write(img_color, 'tmp_img_color.png')
// console.log(4);

        // #cv2.imshow("upscaling",img_color)
        // #cv2.waitKey(0)
        // # -- STEPS 2 and 3 --
        // # convert to grayscale and apply median blur
    const img_gray = new cv.Mat(rgb.rows, rgb.cols, rgb.type())

     cv.cvtColor(rgb, img_gray, cv.COLOR_RGB2GRAY)
        // write(img_gray, 'tmpimg_img_gray.png')
    const img_blur = new cv.Mat(img_gray.rows, img_gray.cols, img_gray.type())
    // const img_blur = img_gray.clone()
    cv.medianBlur(img_gray, img_blur, 3)
        // write(img_blur, 'tmpimg_blur.png')

        // img_blur = cv2.medianBlur(img_gray, 3)
        // #cv2.imshow("grayscale+median blur",img_color)
        // #cv2.waitKey(0)
        // # -- STEP 4 --
        // # detect and enhance edges
    const img_edge = new cv.Mat(img_blur.rows, img_blur.cols, img_blur.type())

        cv.adaptiveThreshold(img_blur, img_edge, 255,
                                         cv.ADAPTIVE_THRESH_MEAN_C,
                                         cv.THRESH_BINARY, 9, 2)
        // write(img_edge, 'tmp_img_edge.png')

        // #cv2.imshow("edge",img_edge)
        // #cv2.waitKey(0)

        // # -- STEP 5 --
        // # convert back to color so that it can be bit-ANDed with color image
        // (x,y,z) = img_color.shape
         cv.resize(img_edge,img_edge, {width: img_color.rows, height:img_color.cols}) 
        cv.cvtColor(img_edge,img_edge, cv.COLOR_GRAY2RGB)
        // cv2.imwrite("tmpedge.png",img_edge)
        // #cv2.imshow("step 5", img_edge)
        // #cv2.waitKey(0)
        // #img_edge = cv2.resize(img_edge,(i for i in img_color.shape[:2]))
        // #print img_edge.shape, img_color.shape
        cv.bitwise_and(img_color, img_edge, o.dst!)
        del(rgb, img_gray, img_color, img_edge, img_blur)
  }

//   protected _exec(o: CartoonizeOptions) {
//       const img_gray = new cv.Mat()
//       toRgba(o.src, o.dst)
//       cv.cvtColor(o.dst!,img_gray!, cv.COLOR_RGBA2GRAY)
// // console.log('1');

//     // #apply median filter
// //  cv.medianBlur(o.dst!, o.dst!,  7)
// new MedianBlur().exec({src: img_gray!, dst: img_gray!, ksize: 7})

//     // #detect edges and threshold the imag
//       const edges = new cv.Mat()
// // console.log('2');

//   new Edge().exec({src: img_gray, dst: edges,type:'laplacian' ,ddepth:cv.CV_8U, ksize: o.ksize||5 })
//     //  cv.Laplacian(o.dst!, edges, cv.CV_8U, o.ksize||5)
// // console.log('3');
//      const mask = new cv.Mat()
//     // cv.threshold(o.dst!, mask, 100, 255, cv.THRESH_BINARY_INV)
//     new Threshold().exec({src: edges, dst: mask, thresh: 155,maxval: 222, type: cv.THRESH_BINARY_INV})
// // console.log('5');
    
//     // #mask is the sketch of the image
//     if(o.sketch){
//         cv.cvtColor(mask, o.dst!, cv.COLOR_GRAY2RGBA)
//    del( img_gray, mask, edges)
//         return
//     }
// // console.log('6');

//     const img_small = new cv.Mat()
//     cv.resize(o.src, img_small, new cv.Size(0,0), 1.0/o.dsFactor,  1.0/o.dsFactor, o.interpolation||cv.INTER_AREA)
// // console.log('7');
//         cv.cvtColor(img_small, img_small, cv.COLOR_RGBA2RGB)

//     const num_repetitions = 10 
//    const sigmaColor = 5
//    const sigmaSpace = 7
//    const d = 5
    
//     // #apply bilateral filter multiple times
//     for (let i = 0; i < num_repetitions; i++) {
//       new BilateralFilter().exec({src: img_small, dst: img_small, sigmaColor, sigmaSpace, d})
//       //  cv.bilateralFilter(img_small, img_small, size, sigma_color, sigma_space)
//     }

//   cv.resize(img_small, o.dst!, new cv.Size(0,0), o.dsFactor, o.dsFactor, o.interpolation||cv.INTER_LINEAR)
//     // dst = np.zeros(img_gray.shape)

//         cv.cvtColor(o.dst!, o.dst!, cv.COLOR_RGBA2RGB)
// write(mask, 'tmp_mask.png')
//     new Bitwise().exec({src: o.dst!, src2: o.dst!, mask, type: 'and'})
//   //  cv.bitwise_and(o.dst!, o.dst!, o.dst!, img_gray)
//   del(img_gray, mask, edges, img_small)
//   }
}


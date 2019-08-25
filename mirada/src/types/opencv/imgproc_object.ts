
import { InputArray, OutputArray, int } from './_types'
/*
 * # imgproc_object
 *
 * TODO  
 */

/**
 * The function slides through image , compares the overlapped patches of size `$w \\times h$` against
 * templ using the specified method and stores the comparison results in result . Here are the formulae
 * for the available comparison methods ( `$I$` denotes image, `$T$` template, `$R$` result ). The
 * summation is done over template and/or the image patch: `$x' = 0...w-1, y' = 0...h-1$`
 * 
 * After the function finishes the comparison, the best matches can be found as global minimums (when
 * [TM_SQDIFF](#df/dfb/group__imgproc__object_1gga3a7850640f1fe1f58fe91a2d7583695dab65c042ed62c9e9e095a1e7e41fe2773})
 * was used) or maximums (when
 * [TM_CCORR](#df/dfb/group__imgproc__object_1gga3a7850640f1fe1f58fe91a2d7583695da5be00b45a4d99b5e42625b4400bfde65})
 * or
 * [TM_CCOEFF](#df/dfb/group__imgproc__object_1gga3a7850640f1fe1f58fe91a2d7583695dac5babb7dfda59544e3e31ea928f8cb16})
 * was used) using the [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707})
 * function. In case of a color image, template summation in the numerator and each sum in the
 * denominator is done over all of the channels and separate mean values are used for each channel.
 * That is, the function can take a color template and a color image. The result will still be a
 * single-channel image, which is easier to analyze.
 * 
 * @param image Image where the search is running. It must be 8-bit or 32-bit floating-point.
 * @param templ Searched template. It must be not greater than the source image and have the same data
 * type.
 * @param result Map of comparison results. It must be single-channel 32-bit floating-point. If image
 * is $W \times H$ and templ is $w \times h$ , then result is $(W-w+1) \times (H-h+1)$ .
 * @param method Parameter specifying the comparison method, see TemplateMatchModes
 * @param mask Mask of searched template. It must have the same datatype and size with templ. It is not
 * set by default. Currently, only the TM_SQDIFF and TM_CCORR_NORMED methods are supported.
 */
export declare function matchTemplate(image: InputArray, templ: InputArray, result: OutputArray, method: int, mask?: InputArray): void

/**
 * 
 */
export declare const TM_SQDIFF: TemplateMatchModes // initializer: = 0

/**
 * 
 */
export declare const TM_SQDIFF_NORMED: TemplateMatchModes // initializer: = 1

/**
 * 
 */
export declare const TM_CCORR: TemplateMatchModes // initializer: = 2

/**
 * 
 */
export declare const TM_CCORR_NORMED: TemplateMatchModes // initializer: = 3

/**
 * `\\[R(x,y)= \\sum _{x',y'} (T'(x',y') \\cdot I'(x+x',y+y'))\\]` where `\\[\\begin{array}{l}
 * T'(x',y')=T(x',y') - 1/(w \\cdot h) \\cdot \\sum _{x'',y''} T(x'',y'') \\\\
 * I'(x+x',y+y')=I(x+x',y+y') - 1/(w \\cdot h) \\cdot \\sum _{x'',y''} I(x+x'',y+y'') \\end{array}\\]`
 * 
 */
export declare const TM_CCOEFF: TemplateMatchModes // initializer: = 4

/**
 * 
 */
export declare const TM_CCOEFF_NORMED: TemplateMatchModes // initializer: = 5

/**
 * 
 */
export type TemplateMatchModes = any


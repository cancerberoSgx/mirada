
import { size_t, int } from './_types'
/*
 * # core_hal_interface
 *
 * TODO  
 */

/**
 * 
 * @param context pointer to context storing all necessary data
 * @param src_data source image data and step
 * @param src_step 
 * @param dst_data destination image data and step
 * @param dst_step 
 */
export declare function hal_ni_dct2D(context: any, src_data: any, src_step: size_t, dst_data: any, dst_step: size_t): any

/**
 * 
 * @param context pointer to context storing all necessary data
 */
export declare function hal_ni_dctFree2D(context: any): any

/**
 * 
 * @param context double pointer to context storing all necessary data
 * @param width image dimensions
 * @param height 
 * @param depth image type (CV_32F or CV64F)
 * @param flags algorithm options (combination of CV_HAL_DFT_INVERSE, ...)
 */
export declare function hal_ni_dctInit2D(context: any, width: int, height: int, depth: int, flags: int): any

/**
 * 
 * @param context pointer to context storing all necessary data
 * @param src source data
 * @param dst destination data
 */
export declare function hal_ni_dft1D(context: any, src: any, dst: any): any

/**
 * 
 * @param context pointer to context storing all necessary data
 * @param src_data source image data and step
 * @param src_step 
 * @param dst_data destination image data and step
 * @param dst_step 
 */
export declare function hal_ni_dft2D(context: any, src_data: any, src_step: size_t, dst_data: any, dst_step: size_t): any

/**
 * 
 * @param context pointer to context storing all necessary data
 */
export declare function hal_ni_dftFree1D(context: any): any

/**
 * 
 * @param context pointer to context storing all necessary data
 */
export declare function hal_ni_dftFree2D(context: any): any

/**
 * 
 * @param context double pointer to context storing all necessary data
 * @param len transformed array length
 * @param count estimated transformation count
 * @param depth array type (CV_32F or CV_64F)
 * @param flags algorithm options (combination of CV_HAL_DFT_INVERSE, CV_HAL_DFT_SCALE, ...)
 * @param needBuffer pointer to boolean variable, if valid pointer provided, then variable value should be set to true to signal that additional memory buffer is needed for operations
 */
export declare function hal_ni_dftInit1D(context: any, len: int, count: int, depth: int, flags: int, needBuffer: any): any

/**
 * 
 * @param context double pointer to context storing all necessary data
 * @param width image dimensions
 * @param height 
 * @param depth image type (CV_32F or CV64F)
 * @param src_channels number of channels in input image
 * @param dst_channels number of channels in output image
 * @param flags algorithm options (combination of CV_HAL_DFT_INVERSE, ...)
 * @param nonzero_rows number of nonzero rows in image, can be used for optimization
 */
export declare function hal_ni_dftInit2D(context: any, width: int, height: int, depth: int, src_channels: int, dst_channels: int, flags: int, nonzero_rows: int): any

/**
 * 
 * @param src_data Source image
 * @param src_step 
 * @param width Source image dimensions
 * @param height 
 * @param depth Depth of source image
 * @param minVal Pointer to the returned global minimum and maximum in an array.
 * @param maxVal 
 * @param minIdx Pointer to the returned minimum and maximum location.
 * @param maxIdx 
 * @param mask Specified array region.
 */
export declare function hal_ni_minMaxIdx(src_data: any, src_step: size_t, width: int, height: int, depth: int, minVal: any, maxVal: any, minIdx: any, maxIdx: any, mask: any): any


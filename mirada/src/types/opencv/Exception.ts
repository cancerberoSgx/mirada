
import { int } from './_types'

/**
 * This class encapsulates all or almost all necessary information about the error happened in the program. The exception is usually constructed and thrown implicitly via CV_Error and CV_Error_ macros. 
 * 
 * [error](#db/de0/group__core__utils_1gacbd081fdb20423a63cf731569ba70b2b})
 * 
 * Source: [opencv2/core.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core.hpp#L135).
 * 
 */
export declare class Exception {

  /**
   *   CVStatus
   *   
   */
  public code: int

  /**
   *   
   */
  public err: any

  /**
   *   
   */
  public file: any

  /**
   *   
   */
  public func: any

  /**
   *   
   */
  public line: int

  /**
   *   
   */
  public msg: any

  /**
   *   Default constructor
   *   
   */
  public constructor()

  /**
   *   Full constructor. Normally the constructor is not called explicitly. Instead, the macros [CV_Error()](#db/de0/group__core__utils_1ga5b48c333c777666e076bd7052799f891}), [CV_Error_()](#db/de0/group__core__utils_1ga1c0cd6e5bd9a5f915c6cab9c0632f969}) and [CV_Assert()](#db/de0/group__core__utils_1gaf62bcd90f70e275191ab95136d85906b}) are used.
   *   
   *   @param _code 
   *   @param _err 
   *   @param _func 
   *   @param _file 
   *   @param _line 
   */
  public constructor(_code: int, _err: any, _func: any, _file: any, _line: int)

  /**
   *   
   */
  public formatMessage(): void

  /**
   *   the error description and the context as a text string.
   *   
   */
  public what(): any
}


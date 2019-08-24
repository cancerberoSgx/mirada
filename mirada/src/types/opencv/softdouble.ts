
import { int, bool } from './_types'

/**
 * 
 * Source: [opencv2/core/softfloat.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/softfloat.hpp#L362).
 * 
 */
export declare class softdouble {

  /**
   *   
   */
  public v: any

  /**
   *   
   */
  public constructor()

  /**
   *   
   *   @param c 
   */
  public constructor(c: any)

  /**
   *   
   *   @param arg159 
   */
  public constructor(arg159: any)

  /**
   *   
   *   @param arg160 
   */
  public constructor(arg160: any)

  /**
   *   
   *   @param arg161 
   */
  public constructor(arg161: any)

  /**
   *   
   *   @param arg162 
   */
  public constructor(arg162: any)

  /**
   *   
   *   @param a 
   */
  public constructor(a: any)

  /**
   *   
   */
  public getExp(): int

  /**
   *   Returns a number 1 <= x < 2 with the same significand
   *   
   */
  public getFrac(): any

  /**
   *   
   */
  public getSign(): bool

  /**
   *   
   */
  public isInf(): bool

  /**
   *   
   */
  public isNaN(): bool

  /**
   *   
   */
  public isSubnormal(): bool

  /**
   *   
   *   @param e 
   */
  public setExp(e: int): any

  /**
   *   Constructs a copy of a number with significand taken from parameter
   *   
   *   @param s 
   */
  public setFrac(s: any): any

  /**
   *   
   *   @param sign 
   */
  public setSign(sign: bool): any

  /**
   *   
   */
  public static eps(): any

  /**
   *   Builds new value from raw binary representation
   *   
   *   @param a 
   */
  public static fromRaw(a: any): any

  /**
   *   
   */
  public static inf(): any

  /**
   *   
   */
  public static max(): any

  /**
   *   
   */
  public static min(): any

  /**
   *   
   */
  public static nan(): any

  /**
   *   
   */
  public static one(): any

  /**
   *   
   */
  public static pi(): any

  /**
   *   
   */
  public static zero(): any
}


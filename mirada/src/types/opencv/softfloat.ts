
import { int, bool } from './_types'

/**
 * 
 * Source:
 * [opencv2/core/softfloat.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/openc
 * v2/core/softfloat.hpp#L220).
 * 
 */
export declare class softfloat {

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
   *   @param arg174 
   */
  public constructor(arg174: any)

  /**
   *   
   *   @param arg175 
   */
  public constructor(arg175: any)

  /**
   *   
   *   @param arg176 
   */
  public constructor(arg176: any)

  /**
   *   
   *   @param arg177 
   */
  public constructor(arg177: any)

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


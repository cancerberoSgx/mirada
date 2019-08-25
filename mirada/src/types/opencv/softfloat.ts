
import { uint32_t, uint64_t, int32_t, int64_t, int, bool } from './_types'

/**
 * 
 * Source:
 * [opencv2/core/softfloat.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/softfloat.hpp#L220).
 * 
 */
export declare class softfloat {

  /**
   *   
   */
  public v: uint32_t

  /**
   *   
   */
  public constructor()

  /**
   *   
   *   @param c 
   */
  public constructor(c: softfloat)

  /**
   *   
   *   @param arg174 
   */
  public constructor(arg174: uint32_t)

  /**
   *   
   *   @param arg175 
   */
  public constructor(arg175: uint64_t)

  /**
   *   
   *   @param arg176 
   */
  public constructor(arg176: int32_t)

  /**
   *   
   *   @param arg177 
   */
  public constructor(arg177: int64_t)

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
  public getFrac(): softfloat

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
  public setExp(e: int): softfloat

  /**
   *   Constructs a copy of a number with significand taken from parameter
   *   
   *   @param s 
   */
  public setFrac(s: softfloat): softfloat

  /**
   *   
   *   @param sign 
   */
  public setSign(sign: bool): softfloat

  /**
   *   
   */
  public static eps(): softfloat

  /**
   *   Builds new value from raw binary representation
   *   
   *   @param a 
   */
  public static fromRaw(a: uint32_t): softfloat

  /**
   *   
   */
  public static inf(): softfloat

  /**
   *   
   */
  public static max(): softfloat

  /**
   *   
   */
  public static min(): softfloat

  /**
   *   
   */
  public static nan(): softfloat

  /**
   *   
   */
  public static one(): softfloat

  /**
   *   
   */
  public static pi(): softfloat

  /**
   *   
   */
  public static zero(): softfloat
}


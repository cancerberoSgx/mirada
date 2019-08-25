
import { uint64_t, uint32_t, int32_t, int64_t, int, bool } from './_types'

/**
 * 
 * Source:
 * [opencv2/core/softfloat.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/softfloat.hpp#L362).
 * 
 */
export declare class softdouble {

  /**
   *   
   */
  public v: uint64_t

  /**
   *   
   */
  public constructor()

  /**
   *   
   *   @param c 
   */
  public constructor(c: softdouble)

  /**
   *   
   *   @param arg159 
   */
  public constructor(arg159: uint32_t)

  /**
   *   
   *   @param arg160 
   */
  public constructor(arg160: uint64_t)

  /**
   *   
   *   @param arg161 
   */
  public constructor(arg161: int32_t)

  /**
   *   
   *   @param arg162 
   */
  public constructor(arg162: int64_t)

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
  public getFrac(): softdouble

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
  public setExp(e: int): softdouble

  /**
   *   Constructs a copy of a number with significand taken from parameter
   *   
   *   @param s 
   */
  public setFrac(s: softdouble): softdouble

  /**
   *   
   *   @param sign 
   */
  public setSign(sign: bool): softdouble

  /**
   *   
   */
  public static eps(): softdouble

  /**
   *   Builds new value from raw binary representation
   *   
   *   @param a 
   */
  public static fromRaw(a: uint64_t): softdouble

  /**
   *   
   */
  public static inf(): softdouble

  /**
   *   
   */
  public static max(): softdouble

  /**
   *   
   */
  public static min(): softdouble

  /**
   *   
   */
  public static nan(): softdouble

  /**
   *   
   */
  public static one(): softdouble

  /**
   *   
   */
  public static pi(): softdouble

  /**
   *   
   */
  public static zero(): softdouble
}


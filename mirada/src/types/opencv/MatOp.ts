
import { int, double } from './_types'

/**
 * 
 * Source: [opencv2/core/mat.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/mat.hpp#L3432).
 * 
 */
export declare class MatOp {

  /**
   *   
   */
  public constructor()

  /**
   *   
   *   @param expr 
   *   @param res 
   */
  public abs(expr: any, res: any): any

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   */
  public add(expr1: any, expr2: any, res: any): any

  /**
   *   
   *   @param expr1 
   *   @param s 
   *   @param res 
   */
  public add(expr1: any, s: any, res: any): any

  /**
   *   
   *   @param expr 
   *   @param m 
   *   @param type 
   */
  public assign(expr: any, m: any, type?: int): any

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignAdd(expr: any, m: any): any

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignAnd(expr: any, m: any): any

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignDivide(expr: any, m: any): any

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignMultiply(expr: any, m: any): any

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignOr(expr: any, m: any): any

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignSubtract(expr: any, m: any): any

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignXor(expr: any, m: any): any

  /**
   *   
   *   @param expr 
   *   @param d 
   *   @param res 
   */
  public diag(expr: any, d: int, res: any): any

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   *   @param scale 
   */
  public divide(expr1: any, expr2: any, res: any, scale?: double): any

  /**
   *   
   *   @param s 
   *   @param expr 
   *   @param res 
   */
  public divide(s: double, expr: any, res: any): any

  /**
   *   
   *   @param expr 
   */
  public elementWise(expr: any): any

  /**
   *   
   *   @param expr 
   *   @param method 
   *   @param res 
   */
  public invert(expr: any, method: int, res: any): any

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   */
  public matmul(expr1: any, expr2: any, res: any): any

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   *   @param scale 
   */
  public multiply(expr1: any, expr2: any, res: any, scale?: double): any

  /**
   *   
   *   @param expr1 
   *   @param s 
   *   @param res 
   */
  public multiply(expr1: any, s: double, res: any): any

  /**
   *   
   *   @param expr 
   *   @param rowRange 
   *   @param colRange 
   *   @param res 
   */
  public roi(expr: any, rowRange: any, colRange: any, res: any): any

  /**
   *   
   *   @param expr 
   */
  public size(expr: any): any

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   */
  public subtract(expr1: any, expr2: any, res: any): any

  /**
   *   
   *   @param s 
   *   @param expr 
   *   @param res 
   */
  public subtract(s: any, expr: any, res: any): any

  /**
   *   
   *   @param expr 
   *   @param res 
   */
  public transpose(expr: any, res: any): any

  /**
   *   
   *   @param expr 
   */
  public type(expr: any): any
}



import { MatExpr, Scalar, Mat, int, double, Size } from './_types'

/**
 * 
 * Source:
 * [opencv2/core/mat.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/mat.hpp#L3432).
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
  public abs(expr: MatExpr, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   */
  public add(expr1: MatExpr, expr2: MatExpr, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr1 
   *   @param s 
   *   @param res 
   */
  public add(expr1: MatExpr, s: Scalar, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   *   @param type 
   */
  public assign(expr: MatExpr, m: Mat, type?: int): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignAdd(expr: MatExpr, m: Mat): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignAnd(expr: MatExpr, m: Mat): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignDivide(expr: MatExpr, m: Mat): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignMultiply(expr: MatExpr, m: Mat): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignOr(expr: MatExpr, m: Mat): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignSubtract(expr: MatExpr, m: Mat): MatExpr

  /**
   *   
   *   @param expr 
   *   @param m 
   */
  public augAssignXor(expr: MatExpr, m: Mat): MatExpr

  /**
   *   
   *   @param expr 
   *   @param d 
   *   @param res 
   */
  public diag(expr: MatExpr, d: int, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   *   @param scale 
   */
  public divide(expr1: MatExpr, expr2: MatExpr, res: MatExpr, scale?: double): MatExpr

  /**
   *   
   *   @param s 
   *   @param expr 
   *   @param res 
   */
  public divide(s: double, expr: MatExpr, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr 
   */
  public elementWise(expr: MatExpr): MatExpr

  /**
   *   
   *   @param expr 
   *   @param method 
   *   @param res 
   */
  public invert(expr: MatExpr, method: int, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   */
  public matmul(expr1: MatExpr, expr2: MatExpr, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   *   @param scale 
   */
  public multiply(expr1: MatExpr, expr2: MatExpr, res: MatExpr, scale?: double): MatExpr

  /**
   *   
   *   @param expr1 
   *   @param s 
   *   @param res 
   */
  public multiply(expr1: MatExpr, s: double, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr 
   *   @param rowRange 
   *   @param colRange 
   *   @param res 
   */
  public roi(expr: MatExpr, rowRange: Range, colRange: Range, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr 
   */
  public size(expr: MatExpr): Size

  /**
   *   
   *   @param expr1 
   *   @param expr2 
   *   @param res 
   */
  public subtract(expr1: MatExpr, expr2: MatExpr, res: MatExpr): MatExpr

  /**
   *   
   *   @param s 
   *   @param expr 
   *   @param res 
   */
  public subtract(s: Scalar, expr: MatExpr, res: MatExpr): Scalar

  /**
   *   
   *   @param expr 
   *   @param res 
   */
  public transpose(expr: MatExpr, res: MatExpr): MatExpr

  /**
   *   
   *   @param expr 
   */
  public type(expr: MatExpr): MatExpr
}


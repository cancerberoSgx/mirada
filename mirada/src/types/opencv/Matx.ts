
import { _Tp, Matx_AddOp, Matx_SubOp, _T2, Matx_ScaleOp, Matx_MulOp, Matx_DivOp, int, Matx_MatMulOp, Matx_TOp, diag_type, Vec } from './_types'

/**
 * If you need a more flexible type, use [Mat](#d3/d63/classcv_1_1Mat}) . The elements of the matrix M
 * are accessible using the M(i,j) notation. Most of the common matrix operations (see also
 * [MatrixExpressions](#d1/d10/classcv_1_1MatExpr_1MatrixExpressions}) ) are available. To do an
 * operation on [Matx](#de/de1/classcv_1_1Matx}) that is not implemented, you can easily convert the
 * matrix to [Mat](#d3/d63/classcv_1_1Mat}) and backwards: 
 * 
 * ```cpp
 * Matx33f m(1, 2, 3,
 *           4, 5, 6,
 *           7, 8, 9);
 * cout << sum(Mat(m*m.t())) << endl;
 * ```
 * 
 *  Except of the plain constructor which takes a list of elements, [Matx](#de/de1/classcv_1_1Matx})
 * can be initialized from a C-array: 
 * 
 * ```cpp
 * float values[] = { 1, 2, 3};
 * Matx31f m(values);
 * ```
 * 
 *  In case if C++11 features are available, std::initializer_list can be also used to initialize
 * [Matx](#de/de1/classcv_1_1Matx}): 
 * 
 * ```cpp
 * Matx31f m = { 1, 2, 3};
 * ```
 * 
 * Source:
 * [opencv2/core/matx.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/matx.hpp#L1185).
 * 
 */
export declare class Matx {

  /**
   *   
   */
  public val: _Tp

  /**
   *   
   */
  public constructor()

  /**
   *   
   *   @param v0 
   */
  public constructor(v0: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   */
  public constructor(v0: _Tp, v1: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   *   @param v6 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp, v6: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   *   @param v6 
   *   @param v7 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp, v6: _Tp, v7: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   *   @param v6 
   *   @param v7 
   *   @param v8 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp, v6: _Tp, v7: _Tp, v8: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   *   @param v6 
   *   @param v7 
   *   @param v8 
   *   @param v9 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp, v6: _Tp, v7: _Tp, v8: _Tp, v9: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   *   @param v6 
   *   @param v7 
   *   @param v8 
   *   @param v9 
   *   @param v10 
   *   @param v11 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp, v6: _Tp, v7: _Tp, v8: _Tp, v9: _Tp, v10: _Tp, v11: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   *   @param v6 
   *   @param v7 
   *   @param v8 
   *   @param v9 
   *   @param v10 
   *   @param v11 
   *   @param v12 
   *   @param v13 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp, v6: _Tp, v7: _Tp, v8: _Tp, v9: _Tp, v10: _Tp, v11: _Tp, v12: _Tp, v13: _Tp)

  /**
   *   
   *   @param v0 
   *   @param v1 
   *   @param v2 
   *   @param v3 
   *   @param v4 
   *   @param v5 
   *   @param v6 
   *   @param v7 
   *   @param v8 
   *   @param v9 
   *   @param v10 
   *   @param v11 
   *   @param v12 
   *   @param v13 
   *   @param v14 
   *   @param v15 
   */
  public constructor(v0: _Tp, v1: _Tp, v2: _Tp, v3: _Tp, v4: _Tp, v5: _Tp, v6: _Tp, v7: _Tp, v8: _Tp, v9: _Tp, v10: _Tp, v11: _Tp, v12: _Tp, v13: _Tp, v14: _Tp, v15: _Tp)

  /**
   *   
   *   @param vals 
   */
  public constructor(vals: any)

  /**
   *   
   *   @param arg334 
   */
  public constructor(arg334: any)

  /**
   *   
   *   @param a 
   *   @param b 
   *   @param arg335 
   */
  public constructor(a: Matx, b: Matx, arg335: Matx_AddOp)

  /**
   *   
   *   @param a 
   *   @param b 
   *   @param arg336 
   */
  public constructor(a: Matx, b: Matx, arg336: Matx_SubOp)

  /**
   *   
   *   @param arg337 
   *   @param a 
   *   @param alpha 
   *   @param arg338 
   */
  public constructor(arg337: any, a: Matx, alpha: _T2, arg338: Matx_ScaleOp)

  /**
   *   
   *   @param a 
   *   @param b 
   *   @param arg339 
   */
  public constructor(a: Matx, b: Matx, arg339: Matx_MulOp)

  /**
   *   
   *   @param a 
   *   @param b 
   *   @param arg340 
   */
  public constructor(a: Matx, b: Matx, arg340: Matx_DivOp)

  /**
   *   
   *   @param l 
   *   @param a 
   *   @param b 
   *   @param arg341 
   */
  public constructor(l: int, a: Matx, b: Matx, arg341: Matx_MatMulOp)

  /**
   *   
   *   @param a 
   *   @param arg342 
   */
  public constructor(a: Matx, arg342: Matx_TOp)

  /**
   *   
   *   @param i 
   */
  public col(i: int): Matx

  /**
   *   
   *   @param v 
   */
  public ddot(v: Matx): Matx

  /**
   *   
   */
  public diag(): diag_type

  /**
   *   
   *   @param a 
   */
  public div(a: Matx): Matx

  /**
   *   
   *   @param v 
   */
  public dot(v: Matx): Matx

  /**
   *   
   *   @param m1 
   *   @param n1 
   *   @param base_row 
   *   @param base_col 
   */
  public get_minor(m1: int, n1: int, base_row: int, base_col: int): Matx

  /**
   *   
   *   @param method 
   *   @param p_is_ok 
   */
  public inv(method?: int, p_is_ok?: any): Matx

  /**
   *   
   *   @param a 
   */
  public mul(a: Matx): Matx

  /**
   *   
   *   @param m1 
   *   @param n1 
   */
  public reshape(m1: int, n1: int): Matx

  /**
   *   
   *   @param i 
   */
  public row(i: int): Matx

  /**
   *   
   *   @param l 
   *   @param rhs 
   *   @param flags 
   */
  public solve(l: int, rhs: Matx, flags?: int): Matx

  /**
   *   
   *   @param rhs 
   *   @param method 
   */
  public solve(rhs: Vec, method: int): Vec

  /**
   *   
   */
  public t(): Matx

  /**
   *   
   *   @param alpha 
   */
  public static all(alpha: _Tp): Matx

  /**
   *   
   *   @param d 
   */
  public static diag(d: diag_type): Matx

  /**
   *   
   */
  public static eye(): Matx

  /**
   *   
   */
  public static ones(): Matx

  /**
   *   
   *   @param a 
   *   @param b 
   */
  public static randn(a: _Tp, b: _Tp): Matx

  /**
   *   
   *   @param a 
   *   @param b 
   */
  public static randu(a: _Tp, b: _Tp): Matx

  /**
   *   
   */
  public static zeros(): Matx
}

/**
 * 
 */
export declare const rows: any // initializer: = m

/**
 * 
 */
export declare const cols: any // initializer: = n

/**
 * 
 */
export declare const channels: any // initializer: = rows*cols

/**
 * 
 */
export declare const shortdim: any // initializer: = (m < n ? m : n)


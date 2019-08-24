
import { double, int } from './_types'

/**
 * <a name="d1/d10/classcv_1_1MatExpr_1MatrixExpressions"></a>This is a list of implemented matrix operations that can be combined in arbitrary complex expressions (here A, B stand for matrices ( [Mat](#d3/d63/classcv_1_1Mat}) ), s for a scalar ( Scalar ), alpha for a real-valued scalar ( double )):
 * 
 * Addition, subtraction, negation: `A+B`, `A-B`, `A+s`, `A-s`, `s+A`, `s-A`, `-A`
 * Scaling: `A*alpha`
 * Per-element multiplication and division: `A.mul(B)`, `A/B`, `alpha/A`
 * Matrix multiplication: `A*B`
 * Transposition: `A.t()` (means A)
 * Matrix inversion and pseudo-inversion, solving linear systems and least-squares problems: `A.inv([method]) (~ A<sup>-1</sup>)`, `A.inv([method])*B (~ X: AX=B)`
 * Comparison: `A cmpop B`, `A cmpop alpha`, `alpha cmpop A`, where *cmpop* is one of `>`, `>=`, `==`, `!=`, `<=`, `<`. The result of comparison is an 8-bit single channel mask whose elements are set to 255 (if the particular element or pair of elements satisfy the condition) or 0.
 * Bitwise logical operations: `A logicop B`, `A logicop s`, `s logicop A`, `~A`, where *logicop* is one of `&`, `|`, `^`.
 * Element-wise minimum and maximum: `min(A, B)`, `min(A, alpha)`, `max(A, B)`, `max(A, alpha)`
 * Element-wise absolute value: `abs(A)`
 * Cross-product, dot-product: `A.cross(B)`, `A.dot(B)`
 * Any function of matrix or matrices and scalars that returns a matrix or a scalar, such as norm, mean, sum, countNonZero, trace, determinant, repeat, and others.
 * Matrix initializers ( [Mat::eye()](#d3/d63/classcv_1_1Mat_1a2cf9b9acde7a9852542bbc20ef851ed2}), [Mat::zeros()](#d3/d63/classcv_1_1Mat_1a0b57b6a326c8876d944d188a46e0f556}), [Mat::ones()](#d3/d63/classcv_1_1Mat_1a69ae0402d116fc9c71908d8508dc2f09}) ), matrix comma-separated initializers, matrix constructors and operators that extract sub-matrices (see [Mat](#d3/d63/classcv_1_1Mat}) description).
 * Mat_<destination_type>() constructors to cast the result to the proper type. 
 * 
 * Comma-separated initializers and probably some other operations may require additional explicit Mat() or Mat_<T>() constructor calls to resolve a possible ambiguity.
 * Here are examples of matrix expressions: 
 * 
 * ```cpp
 * // compute pseudo-inverse of A, equivalent to A.inv(DECOMP_SVD)
 * SVD svd(A);
 * Mat pinvA = svd.vt.t()*Mat::diag(1./svd.w)*svd.u.t();
 * 
 * // compute the new vector of parameters in the Levenberg-Marquardt algorithm
 * x -= (A.t()*A + lambda*Mat::eye(A.cols,A.cols,A.type())).inv(DECOMP_CHOLESKY)*(A.t()*err);
 * 
 * // sharpen image using "unsharp mask" algorithm
 * Mat blurred; double sigma = 1, threshold = 5, amount = 1;
 * GaussianBlur(img, blurred, Size(), sigma, sigma);
 * Mat lowContrastMask = abs(img - blurred) < threshold;
 * Mat sharpened = img*(1+amount) + blurred*(-amount);
 * img.copyTo(sharpened, lowContrastMask);
 * ```
 * 
 * Source: [opencv2/core/mat.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/mat.hpp#L3557).
 * 
 */
export declare class MatExpr {

  /**
   *   
   */
  public a: any

  /**
   *   
   */
  public alpha: double

  /**
   *   
   */
  public b: any

  /**
   *   
   */
  public beta: double

  /**
   *   
   */
  public c: any

  /**
   *   
   */
  public flags: int

  /**
   *   
   */
  public op: any

  /**
   *   
   */
  public s: any

  /**
   *   
   */
  public constructor()

  /**
   *   
   *   @param m 
   */
  public constructor(m: any)

  /**
   *   
   *   @param _op 
   *   @param _flags 
   *   @param _a 
   *   @param _b 
   *   @param _c 
   *   @param _alpha 
   *   @param _beta 
   *   @param _s 
   */
  public constructor(_op: any, _flags: int, _a: any, _b: any, _c: any, _alpha: double, _beta: double, _s: any)

  /**
   *   
   *   @param x 
   */
  public col(x: int): any

  /**
   *   
   *   @param m 
   */
  public cross(m: any): any

  /**
   *   
   *   @param d 
   */
  public diag(d: int): any

  /**
   *   
   *   @param m 
   */
  public dot(m: any): any

  /**
   *   
   *   @param method 
   */
  public inv(method: int): any

  /**
   *   
   *   @param e 
   *   @param scale 
   */
  public mul(e: any, scale: double): any

  /**
   *   
   *   @param m 
   *   @param scale 
   */
  public mul(m: any, scale: double): any

  /**
   *   
   *   @param y 
   */
  public row(y: int): any

  /**
   *   
   */
  public size(): any

  /**
   *   
   */
  public t(): any

  /**
   *   
   */
  public type(): int
}


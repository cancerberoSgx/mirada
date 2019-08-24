
import { float } from './_types'

/**
 * Each rectangle is specified by the center point (mass center), length of each side (represented by [Size2f](#dc/d84/group__core__basic_1gab34496d2466b5f69930ab74c70f117d4}) structure) and the rotation angle in degrees.
 * 
 * The sample below demonstrates how to use [RotatedRect](#db/dd6/classcv_1_1RotatedRect}): 
 * 
 * ```cpp
 *     Mat test_image(200, 200, [CV_8UC3](#d1/d1b/group__core__hal__interface_1ga88c4cd9de76f678f33928ef1e3f96047}), [Scalar](#dc/d84/group__core__basic_1ga599fe92e910c027be274233eccad7beb})(0));
 *     [RotatedRect](#db/dd6/classcv_1_1RotatedRect_1ae1be388780b8d5faf450be18cbbf30f1}) rRect = [RotatedRect](#db/dd6/classcv_1_1RotatedRect_1ae1be388780b8d5faf450be18cbbf30f1})([Point2f](#dc/d84/group__core__basic_1ga7d080aa40de011e4410bca63385ffe2a})(100,100), [Size2f](#dc/d84/group__core__basic_1gab34496d2466b5f69930ab74c70f117d4})(100,50), 30);
 * 
 *     [Point2f](#dc/d84/group__core__basic_1ga7d080aa40de011e4410bca63385ffe2a}) vertices[4];
 *     rRect.points(vertices);
 *     for (int i = 0; i < 4; i++)
 *         [line](#d6/d6e/group__imgproc__draw_1ga7078a9fae8c7e7d13d24dac2520ae4a2})(test_image, vertices[i], vertices[(i+1)%4], [Scalar](#dc/d84/group__core__basic_1ga599fe92e910c027be274233eccad7beb})(0,255,0), 2);
 * 
 *     [Rect](#dc/d84/group__core__basic_1ga11d95de507098e90bad732b9345402e8}) brect = rRect.boundingRect();
 *     [rectangle](#d6/d6e/group__imgproc__draw_1ga07d2f74cadcf8e305e810ce8eed13bc9})(test_image, brect, [Scalar](#dc/d84/group__core__basic_1ga599fe92e910c027be274233eccad7beb})(255,0,0), 2);
 * 
 *     [imshow](#d7/dfc/group__highgui_1ga453d42fe4cb60e5723281a89973ee563})("rectangles", test_image);
 *     [waitKey](#d7/dfc/group__highgui_1ga5628525ad33f52eab17feebcfba38bd7})(0);
 * ```
 * 
 * [CamShift](#dc/d6b/group__video__track_1gaef2bd39c8356f423124f1fe7c44d54a1}), [fitEllipse](#d3/dc0/group__imgproc__shape_1gaf259efaad93098103d6c27b9e4900ffa}), [minAreaRect](#d3/dc0/group__imgproc__shape_1ga3d476a3417130ae5154aea421ca7ead9}), CvBox2D
 * 
 * Source: [opencv2/core/types.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core/types.hpp#L534).
 * 
 */
export declare class RotatedRect {

  /**
   *   
   */
  public angle: float

  /**
   *   
   */
  public center: any

  /**
   *   
   */
  public size: any

  /**
   *   
   */
  public constructor()

  /**
   *   full constructor
   *   
   *   @param center The rectangle mass center.
   *   @param size Width and height of the rectangle.
   *   @param angle The rotation angle in a clockwise direction. When the angle is 0, 90, 180, 270 etc., the rectangle becomes an up-right rectangle.
   */
  public constructor(center: any, size: any, angle: float)

  /**
   *   Any 3 end points of the [RotatedRect](#db/dd6/classcv_1_1RotatedRect}). They must be given in order (either clockwise or anticlockwise).
   *   
   *   @param point1 
   *   @param point2 
   *   @param point3 
   */
  public constructor(point1: any, point2: any, point3: any)

  /**
   *   
   */
  public boundingRect(): any

  /**
   *   
   */
  public boundingRect2f(): any

  /**
   *   returns 4 vertices of the rectangle
   *   
   *   @param pts The points array for storing rectangle vertices. The order is bottomLeft, topLeft, topRight, bottomRight.
   */
  public points(pts: any): any
}


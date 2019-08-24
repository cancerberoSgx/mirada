
import { InputOutputArray, Point, int, double, Size, bool, Size2l, Rect, InputArrayOfArrays, InputArray, Point2d, Size2d, Scalar } from './_types'
/*
 * # imgproc_draw
 *
 * TODO  
 */

/**
 * The function [cv::arrowedLine](#d6/d6e/group__imgproc__draw_1ga0a165a3ca093fd488ac709fdf10c05b2}) draws an arrow between pt1 and pt2 points in the image. See also [line](#d6/d6e/group__imgproc__draw_1ga7078a9fae8c7e7d13d24dac2520ae4a2}).
 * 
 * @param img Image.
 * @param pt1 The point the arrow starts from.
 * @param pt2 The point the arrow points to.
 * @param color Line color.
 * @param thickness Line thickness.
 * @param line_type Type of the line. See LineTypes
 * @param shift Number of fractional bits in the point coordinates.
 * @param tipLength The length of the arrow tip in relation to the arrow length
 */
export declare function arrowedLine(img: InputOutputArray, pt1: Point, pt2: Point, color: any, thickness: int, line_type: int, shift: int, tipLength: double): void

/**
 * The function [cv::circle](#d6/d6e/group__imgproc__draw_1gaf10604b069374903dbd0f0488cb43670}) draws a simple or filled circle with a given center and radius.
 * 
 * @param img Image where the circle is drawn.
 * @param center Center of the circle.
 * @param radius Radius of the circle.
 * @param color Circle color.
 * @param thickness Thickness of the circle outline, if positive. Negative values, like FILLED, mean that a filled circle is to be drawn.
 * @param lineType Type of the circle boundary. See LineTypes
 * @param shift Number of fractional bits in the coordinates of the center and in the radius value.
 */
export declare function circle(img: InputOutputArray, center: Point, radius: int, color: any, thickness: int, lineType: int, shift: int): void

/**
 * The function [cv::clipLine](#d6/d6e/group__imgproc__draw_1gaf483cb46ad6b049bc35ec67052ef1c2c}) calculates a part of the line segment that is entirely within the specified rectangle. it returns false if the line segment is completely outside the rectangle. Otherwise, it returns true .
 * 
 * @param imgSize Image size. The image rectangle is Rect(0, 0, imgSize.width, imgSize.height) .
 * @param pt1 First line point.
 * @param pt2 Second line point.
 */
export declare function clipLine(imgSize: Size, pt1: any, pt2: any): bool

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param imgSize Image size. The image rectangle is Rect(0, 0, imgSize.width, imgSize.height) .
 * @param pt1 First line point.
 * @param pt2 Second line point.
 */
export declare function clipLine(imgSize: Size2l, pt1: any, pt2: any): bool

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param imgRect Image rectangle.
 * @param pt1 First line point.
 * @param pt2 Second line point.
 */
export declare function clipLine(imgRect: Rect, pt1: any, pt2: any): bool

/**
 * The function draws contour outlines in the image if `$\\texttt{thickness} \\ge 0$` or fills the area bounded by the contours if `$\\texttt{thickness}<0$` . The example below shows how to retrieve connected components from the binary image and label them: : 
 * 
 * ```cpp
 * #include "[opencv2/imgproc.hpp](#d1/d4f/imgproc_2include_2opencv2_2imgproc_8hpp})"
 * #include "[opencv2/highgui.hpp](#d4/dd5/highgui_8hpp})"
 * 
 * using namespace [cv](#d2/d75/namespacecv});
 * using namespace [std](#d8/dcc/namespacestd});
 * 
 * int main( int argc, char** argv )
 * {
 *     [Mat](#d3/d63/classcv_1_1Mat}) src;
 *     // the first command-line parameter must be a filename of the binary
 *     // (black-n-white) image
 *     if( argc != 2 || !(src=[imread](#d4/da8/group__imgcodecs_1ga288b8b3da0892bd651fce07b3bbd3a56})(argv[1], 0)).data)
 *         return -1;
 * 
 *     [Mat](#d3/d63/classcv_1_1Mat}) dst = [Mat::zeros](#d3/d63/classcv_1_1Mat_1a0b57b6a326c8876d944d188a46e0f556})(src.[rows](#d3/d63/classcv_1_1Mat_1abed816466c45234254d25bc59c31245e}), src.[cols](#d3/d63/classcv_1_1Mat_1aa3e5a47585c9ef6a0842556739155e3e}), [CV_8UC3](#d1/d1b/group__core__hal__interface_1ga88c4cd9de76f678f33928ef1e3f96047}));
 * 
 *     src = src > 1;
 *     [namedWindow](#d7/dfc/group__highgui_1ga5afdf8410934fd099df85c75b2e0888b})( "Source", 1 );
 *     [imshow](#d7/dfc/group__highgui_1ga453d42fe4cb60e5723281a89973ee563})( "Source", src );
 * 
 *     vector<vector<Point> > contours;
 *     vector<Vec4i> hierarchy;
 * 
 *     [findContours](#d3/dc0/group__imgproc__shape_1gadf1ad6a0b82947fa1fe3c3d497f260e0})( src, contours, hierarchy,
 *         [RETR_CCOMP](#d3/dc0/group__imgproc__shape_1gga819779b9857cc2f8601e6526a3a5bc71a7d1d4b509fb2a9a8dc2f960357748752}), [CHAIN_APPROX_SIMPLE](#d3/dc0/group__imgproc__shape_1gga4303f45752694956374734a03c54d5ffa5f2883048e654999209f88ba04c302f5}) );
 * 
 *     // iterate through all the top-level contours,
 *     // draw each connected component with its own random color
 *     int idx = 0;
 *     for( ; idx >= 0; idx = hierarchy[idx][0] )
 *     {
 *         [Scalar](#d1/da0/classcv_1_1Scalar__}) color( [rand](#dc/d8c/namespacecvflann_1a3518d4d5ff61789af64c0a5b12e9f44e})()&255, [rand](#dc/d8c/namespacecvflann_1a3518d4d5ff61789af64c0a5b12e9f44e})()&255, [rand](#dc/d8c/namespacecvflann_1a3518d4d5ff61789af64c0a5b12e9f44e})()&255 );
 *         [drawContours](#d6/d6e/group__imgproc__draw_1ga746c0625f1781f1ffc9056259103edbc})( dst, contours, idx, color, [FILLED](#d6/d6e/group__imgproc__draw_1ggaf076ef45de481ac96e0ab3dc2c29a777a89c5f6beef080e6df347167f85e07b9e}), 8, hierarchy );
 *     }
 * 
 *     [namedWindow](#d7/dfc/group__highgui_1ga5afdf8410934fd099df85c75b2e0888b})( "Components", 1 );
 *     [imshow](#d7/dfc/group__highgui_1ga453d42fe4cb60e5723281a89973ee563})( "Components", dst );
 *     [waitKey](#d7/dfc/group__highgui_1ga5628525ad33f52eab17feebcfba38bd7})(0);
 * }
 * ```
 * 
 * When thickness=[FILLED](#d6/d6e/group__imgproc__draw_1ggaf076ef45de481ac96e0ab3dc2c29a777a89c5f6beef080e6df347167f85e07b9e}), the function is designed to handle connected components with holes correctly even when no hierarchy date is provided. This is done by analyzing all the outlines together using even-odd rule. This may give incorrect results if you have a joint collection of separately retrieved contours. In order to solve this problem, you need to call [drawContours](#d6/d6e/group__imgproc__draw_1ga746c0625f1781f1ffc9056259103edbc}) separately for each sub-group of contours, or iterate over the collection using contourIdx parameter.
 * 
 * @param image Destination image.
 * @param contours All the input contours. Each contour is stored as a point vector.
 * @param contourIdx Parameter indicating a contour to draw. If it is negative, all the contours are drawn.
 * @param color Color of the contours.
 * @param thickness Thickness of lines the contours are drawn with. If it is negative (for example, thickness=FILLED ), the contour interiors are drawn.
 * @param lineType Line connectivity. See LineTypes
 * @param hierarchy Optional information about hierarchy. It is only needed if you want to draw only some of the contours (see maxLevel ).
 * @param maxLevel Maximal level for drawn contours. If it is 0, only the specified contour is drawn. If it is 1, the function draws the contour(s) and all the nested contours. If it is 2, the function draws the contours, all the nested contours, all the nested-to-nested contours, and so on. This parameter is only taken into account when there is hierarchy available.
 * @param offset Optional contour shift parameter. Shift all the drawn contours by the specified $\texttt{offset}=(dx,dy)$ .
 */
export declare function drawContours(image: InputOutputArray, contours: InputArrayOfArrays, contourIdx: int, color: any, thickness: int, lineType: int, hierarchy: InputArray, maxLevel: int, offset: Point): void

/**
 * The function [cv::drawMarker](#d6/d6e/group__imgproc__draw_1ga644c4a170d4799a56b29f864ce984b7e}) draws a marker on a given position in the image. For the moment several marker types are supported, see [MarkerTypes](#d6/d6e/group__imgproc__draw_1ga0ad87faebef1039ec957737ecc633b7b}) for more information.
 * 
 * @param img Image.
 * @param position The point where the crosshair is positioned.
 * @param color Line color.
 * @param markerType The specific type of marker you want to use, see MarkerTypes
 * @param markerSize The length of the marker axis [default = 20 pixels]
 * @param thickness Line thickness.
 * @param line_type Type of the line, See LineTypes
 */
export declare function drawMarker(img: InputOutputArray, position: Point, color: any, markerType: int, markerSize: int, thickness: int, line_type: int): void

/**
 * The function [cv::ellipse](#d6/d6e/group__imgproc__draw_1ga28b2267d35786f5f890ca167236cbc69}) with more parameters draws an ellipse outline, a filled ellipse, an elliptic arc, or a filled ellipse sector. The drawing code uses general parametric form. A piecewise-linear curve is used to approximate the elliptic arc boundary. If you need more control of the ellipse rendering, you can retrieve the curve using [ellipse2Poly](#d6/d6e/group__imgproc__draw_1ga727a72a3f6a625a2ae035f957c61051f}) and then render it with [polylines](#d6/d6e/group__imgproc__draw_1ga1ea127ffbbb7e0bfc4fd6fd2eb64263c}) or fill it with [fillPoly](#d6/d6e/group__imgproc__draw_1ga8c69b68fab5f25e2223b6496aa60dad5}). If you use the first variant of the function and want to draw the whole ellipse, not an arc, pass `startAngle=0` and `endAngle=360`. If `startAngle` is greater than `endAngle`, they are swapped. The figure below explains the meaning of the parameters to draw the blue arc.
 * 
 * @param img Image.
 * @param center Center of the ellipse.
 * @param axes Half of the size of the ellipse main axes.
 * @param angle Ellipse rotation angle in degrees.
 * @param startAngle Starting angle of the elliptic arc in degrees.
 * @param endAngle Ending angle of the elliptic arc in degrees.
 * @param color Ellipse color.
 * @param thickness Thickness of the ellipse arc outline, if positive. Otherwise, this indicates that a filled ellipse sector is to be drawn.
 * @param lineType Type of the ellipse boundary. See LineTypes
 * @param shift Number of fractional bits in the coordinates of the center and values of axes.
 */
export declare function ellipse(img: InputOutputArray, center: Point, axes: Size, angle: double, startAngle: double, endAngle: double, color: any, thickness: int, lineType: int, shift: int): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param img Image.
 * @param box Alternative ellipse representation via RotatedRect. This means that the function draws an ellipse inscribed in the rotated rectangle.
 * @param color Ellipse color.
 * @param thickness Thickness of the ellipse arc outline, if positive. Otherwise, this indicates that a filled ellipse sector is to be drawn.
 * @param lineType Type of the ellipse boundary. See LineTypes
 */
export declare function ellipse(img: InputOutputArray, box: any, color: any, thickness: int, lineType: int): void

/**
 * The function ellipse2Poly computes the vertices of a polyline that approximates the specified elliptic arc. It is used by [ellipse](#d6/d6e/group__imgproc__draw_1ga28b2267d35786f5f890ca167236cbc69}). If `arcStart` is greater than `arcEnd`, they are swapped.
 * 
 * @param center Center of the arc.
 * @param axes Half of the size of the ellipse main axes. See ellipse for details.
 * @param angle Rotation angle of the ellipse in degrees. See ellipse for details.
 * @param arcStart Starting angle of the elliptic arc in degrees.
 * @param arcEnd Ending angle of the elliptic arc in degrees.
 * @param delta Angle between the subsequent polyline vertices. It defines the approximation accuracy.
 * @param pts Output vector of polyline vertices.
 */
export declare function ellipse2Poly(center: Point, axes: Size, angle: int, arcStart: int, arcEnd: int, delta: int, pts: any): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param center Center of the arc.
 * @param axes Half of the size of the ellipse main axes. See ellipse for details.
 * @param angle Rotation angle of the ellipse in degrees. See ellipse for details.
 * @param arcStart Starting angle of the elliptic arc in degrees.
 * @param arcEnd Ending angle of the elliptic arc in degrees.
 * @param delta Angle between the subsequent polyline vertices. It defines the approximation accuracy.
 * @param pts Output vector of polyline vertices.
 */
export declare function ellipse2Poly(center: Point2d, axes: Size2d, angle: int, arcStart: int, arcEnd: int, delta: int, pts: any): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param img 
 * @param pts 
 * @param npts 
 * @param color 
 * @param lineType 
 * @param shift 
 */
export declare function fillConvexPoly(img: InputOutputArray, pts: any, npts: int, color: any, lineType: int, shift: int): void

/**
 * The function [cv::fillConvexPoly](#d6/d6e/group__imgproc__draw_1ga3069baf93b51565e386c8e591f8418e6}) draws a filled convex polygon. This function is much faster than the function [fillPoly](#d6/d6e/group__imgproc__draw_1ga8c69b68fab5f25e2223b6496aa60dad5}) . It can fill not only convex polygons but any monotonic polygon without self-intersections, that is, a polygon whose contour intersects every horizontal line (scan line) twice at the most (though, its top-most and/or the bottom edge could be horizontal).
 * 
 * @param img Image.
 * @param points Polygon vertices.
 * @param color Polygon color.
 * @param lineType Type of the polygon boundaries. See LineTypes
 * @param shift Number of fractional bits in the vertex coordinates.
 */
export declare function fillConvexPoly(img: InputOutputArray, points: InputArray, color: any, lineType: int, shift: int): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param img 
 * @param pts 
 * @param npts 
 * @param ncontours 
 * @param color 
 * @param lineType 
 * @param shift 
 * @param offset 
 */
export declare function fillPoly(img: InputOutputArray, pts: any, npts: any, ncontours: int, color: any, lineType: int, shift: int, offset: Point): void

/**
 * The function [cv::fillPoly](#d6/d6e/group__imgproc__draw_1ga8c69b68fab5f25e2223b6496aa60dad5}) fills an area bounded by several polygonal contours. The function can fill complex areas, for example, areas with holes, contours with self-intersections (some of their parts), and so forth.
 * 
 * @param img Image.
 * @param pts Array of polygons where each polygon is represented as an array of points.
 * @param color Polygon color.
 * @param lineType Type of the polygon boundaries. See LineTypes
 * @param shift Number of fractional bits in the vertex coordinates.
 * @param offset Optional offset of all points of the contours.
 */
export declare function fillPoly(img: InputOutputArray, pts: InputArrayOfArrays, color: any, lineType: int, shift: int, offset: Point): void

/**
 * The fontSize to use for [cv::putText](#d6/d6e/group__imgproc__draw_1ga5126f47f883d730f633d74f07456c576})
 * 
 * [cv::putText](#d6/d6e/group__imgproc__draw_1ga5126f47f883d730f633d74f07456c576})
 * 
 * @param fontFace Font to use, see cv::HersheyFonts.
 * @param pixelHeight Pixel height to compute the fontScale for
 * @param thickness Thickness of lines used to render the text.See putText for details.
 */
export declare function getFontScaleFromHeight(fontFace: any, pixelHeight: any, thickness: any): double

/**
 * The function [cv::getTextSize](#d6/d6e/group__imgproc__draw_1ga3d2abfcb995fd2db908c8288199dba82}) calculates and returns the size of a box that contains the specified text. That is, the following code renders some text, the tight box surrounding it, and the baseline: : 
 * 
 * ```cpp
 * String text = "Funny text inside the box";
 * int fontFace = FONT_HERSHEY_SCRIPT_SIMPLEX;
 * double fontScale = 2;
 * int thickness = 3;
 * 
 * Mat img(600, 800, CV_8UC3, Scalar::all(0));
 * 
 * int baseline=0;
 * Size textSize = getTextSize(text, fontFace,
 *                             fontScale, thickness, &baseline);
 * baseline += thickness;
 * 
 * // center the text
 * Point textOrg((img.cols - textSize.width)/2,
 *               (img.rows + textSize.height)/2);
 * 
 * // draw the box
 * rectangle(img, textOrg + Point(0, baseline),
 *           textOrg + Point(textSize.width, -textSize.height),
 *           Scalar(0,0,255));
 * // ... and the baseline first
 * line(img, textOrg + Point(0, thickness),
 *      textOrg + Point(textSize.width, thickness),
 *      Scalar(0, 0, 255));
 * 
 * // then put the text itself
 * putText(img, text, textOrg, fontFace, fontScale,
 *         Scalar::all(255), thickness, 8);
 * ```
 * 
 * The size of a box that contains the specified text.
 * 
 * [putText](#d6/d6e/group__imgproc__draw_1ga5126f47f883d730f633d74f07456c576})
 * 
 * @param text Input text string.
 * @param fontFace Font to use, see HersheyFonts.
 * @param fontScale Font scale factor that is multiplied by the font-specific base size.
 * @param thickness Thickness of lines used to render the text. See putText for details.
 * @param baseLine y-coordinate of the baseline relative to the bottom-most text point.
 */
export declare function getTextSize(text: any, fontFace: int, fontScale: double, thickness: int, baseLine: any): Size

/**
 * The function line draws the line segment between pt1 and pt2 points in the image. The line is clipped by the image boundaries. For non-antialiased lines with integer coordinates, the 8-connected or 4-connected Bresenham algorithm is used. Thick lines are drawn with rounding endings. Antialiased lines are drawn using Gaussian filtering.
 * 
 * @param img Image.
 * @param pt1 First point of the line segment.
 * @param pt2 Second point of the line segment.
 * @param color Line color.
 * @param thickness Line thickness.
 * @param lineType Type of the line. See LineTypes.
 * @param shift Number of fractional bits in the point coordinates.
 */
export declare function line(img: InputOutputArray, pt1: Point, pt2: Point, color: any, thickness: int, lineType: int, shift: int): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param img 
 * @param pts 
 * @param npts 
 * @param ncontours 
 * @param isClosed 
 * @param color 
 * @param thickness 
 * @param lineType 
 * @param shift 
 */
export declare function polylines(img: InputOutputArray, pts: any, npts: any, ncontours: int, isClosed: bool, color: any, thickness: int, lineType: int, shift: int): void

/**
 * The function [cv::polylines](#d6/d6e/group__imgproc__draw_1ga1ea127ffbbb7e0bfc4fd6fd2eb64263c}) draws one or more polygonal curves.
 * 
 * @param img Image.
 * @param pts Array of polygonal curves.
 * @param isClosed Flag indicating whether the drawn polylines are closed or not. If they are closed, the function draws a line from the last vertex of each curve to its first vertex.
 * @param color Polyline color.
 * @param thickness Thickness of the polyline edges.
 * @param lineType Type of the line segments. See LineTypes
 * @param shift Number of fractional bits in the vertex coordinates.
 */
export declare function polylines(img: InputOutputArray, pts: InputArrayOfArrays, isClosed: bool, color: any, thickness: int, lineType: int, shift: int): void

/**
 * The function [cv::putText](#d6/d6e/group__imgproc__draw_1ga5126f47f883d730f633d74f07456c576}) renders the specified text string in the image. Symbols that cannot be rendered using the specified font are replaced by question marks. See [getTextSize](#d6/d6e/group__imgproc__draw_1ga3d2abfcb995fd2db908c8288199dba82}) for a text rendering code example.
 * 
 * @param img Image.
 * @param text Text string to be drawn.
 * @param org Bottom-left corner of the text string in the image.
 * @param fontFace Font type, see HersheyFonts.
 * @param fontScale Font scale factor that is multiplied by the font-specific base size.
 * @param color Text color.
 * @param thickness Thickness of the lines used to draw a text.
 * @param lineType Line type. See LineTypes
 * @param bottomLeftOrigin When true, the image data origin is at the bottom-left corner. Otherwise, it is at the top-left corner.
 */
export declare function putText(img: InputOutputArray, text: any, org: Point, fontFace: int, fontScale: double, color: Scalar, thickness: int, lineType: int, bottomLeftOrigin: bool): void

/**
 * The function [cv::rectangle](#d6/d6e/group__imgproc__draw_1ga07d2f74cadcf8e305e810ce8eed13bc9}) draws a rectangle outline or a filled rectangle whose two opposite corners are pt1 and pt2.
 * 
 * @param img Image.
 * @param pt1 Vertex of the rectangle.
 * @param pt2 Vertex of the rectangle opposite to pt1 .
 * @param color Rectangle color or brightness (grayscale image).
 * @param thickness Thickness of lines that make up the rectangle. Negative values, like FILLED, mean that the function has to draw a filled rectangle.
 * @param lineType Type of the line. See LineTypes
 * @param shift Number of fractional bits in the point coordinates.
 */
export declare function rectangle(img: InputOutputArray, pt1: Point, pt2: Point, color: any, thickness: int, lineType: int, shift: int): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * use `rec` parameter as alternative specification of the drawn rectangle: `r.tl() and r.br()-Point(1,1)` are opposite corners
 * 
 * @param img 
 * @param rec 
 * @param color 
 * @param thickness 
 * @param lineType 
 * @param shift 
 */
export declare function rectangle(img: InputOutputArray, rec: Rect, color: any, thickness: int, lineType: int, shift: int): void


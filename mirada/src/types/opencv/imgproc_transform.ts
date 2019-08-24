
import { InputArray, OutputArray, int, bool, Mat, Size, Point2f, double } from './_types'
/*
 * # imgproc_transform
 *
 * TODO  
 */

/**
 * The function converts a pair of maps for remap from one representation to another. The following options ( (map1.type(), map2.type()) `$\\rightarrow$` (dstmap1.type(), dstmap2.type()) ) are supported:
 * 
 * `$\\texttt{(CV_32FC1, CV_32FC1)} \\rightarrow \\texttt{(CV_16SC2, CV_16UC1)}$`. This is the most frequently used conversion operation, in which the original floating-point maps (see remap ) are converted to a more compact and much faster fixed-point representation. The first output array contains the rounded coordinates and the second array (created only when nninterpolation=false ) contains indices in the interpolation tables.
 * `$\\texttt{(CV_32FC2)} \\rightarrow \\texttt{(CV_16SC2, CV_16UC1)}$`. The same as above but the original maps are stored in one 2-channel matrix.
 * Reverse conversion. Obviously, the reconstructed floating-point maps will not be exactly the same as the originals.
 * 
 * [remap](#da/d54/group__imgproc__transform_1gab75ef31ce5cdfb5c44b6da5f3b908ea4}), [undistort](#d9/d0c/group__calib3d_1ga69f2545a8b62a6b0fc2ee060dc30559d}), [initUndistortRectifyMap](#d9/d0c/group__calib3d_1ga7dfb72c9cf9780a347fbe3d1c47e5d5a})
 * 
 * @param map1 The first input map of type CV_16SC2, CV_32FC1, or CV_32FC2 .
 * @param map2 The second input map of type CV_16UC1, CV_32FC1, or none (empty matrix), respectively.
 * @param dstmap1 The first output map that has the type dstmap1type and the same size as src .
 * @param dstmap2 The second output map.
 * @param dstmap1type Type of the first output map that should be CV_16SC2, CV_32FC1, or CV_32FC2 .
 * @param nninterpolation Flag indicating whether the fixed-point maps are used for the nearest-neighbor or for a more complex interpolation.
 */
export declare function convertMaps(map1: InputArray, map2: InputArray, dstmap1: OutputArray, dstmap2: OutputArray, dstmap1type: int, nninterpolation: bool): void

/**
 * The function calculates the `$2 \\times 3$` matrix of an affine transform so that:
 * 
 * `\\[\\begin{bmatrix} x'_i \\\\ y'_i \\end{bmatrix} = \\texttt{map_matrix} \\cdot \\begin{bmatrix} x_i \\\\ y_i \\\\ 1 \\end{bmatrix}\\]`
 * 
 * where
 * 
 * `\\[dst(i)=(x'_i,y'_i), src(i)=(x_i, y_i), i=0,1,2\\]`
 * 
 * [warpAffine](#da/d54/group__imgproc__transform_1ga0203d9ee5fcd28d40dbc4a1ea4451983}), [transform](#d2/de8/group__core__array_1ga393164aa54bb9169ce0a8cc44e08ff22})
 * 
 * @param src Coordinates of triangle vertices in the source image.
 * @param dst Coordinates of the corresponding triangle vertices in the destination image.
 */
export declare function getAffineTransform(src: any, dst: any): Mat

/**
 * 
 * @param src 
 * @param dst 
 */
export declare function getAffineTransform(src: InputArray, dst: InputArray): Mat

/**
 * The function calculates the `$3 \\times 3$` matrix of a perspective transform so that:
 * 
 * `\\[\\begin{bmatrix} t_i x'_i \\\\ t_i y'_i \\\\ t_i \\end{bmatrix} = \\texttt{map_matrix} \\cdot \\begin{bmatrix} x_i \\\\ y_i \\\\ 1 \\end{bmatrix}\\]`
 * 
 * where
 * 
 * `\\[dst(i)=(x'_i,y'_i), src(i)=(x_i, y_i), i=0,1,2,3\\]`
 * 
 * [findHomography](#d9/d0c/group__calib3d_1ga4abc2ece9fab9398f2e560d53c8c9780}), [warpPerspective](#da/d54/group__imgproc__transform_1gaf73673a7e8e18ec6963e3774e6a94b87}), [perspectiveTransform](#d2/de8/group__core__array_1gad327659ac03e5fd6894b90025e6900a7})
 * 
 * @param src Coordinates of quadrangle vertices in the source image.
 * @param dst Coordinates of the corresponding quadrangle vertices in the destination image.
 * @param solveMethod method passed to cv::solve (DecompTypes)
 */
export declare function getPerspectiveTransform(src: InputArray, dst: InputArray, solveMethod: int): Mat

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param src 
 * @param dst 
 * @param solveMethod 
 */
export declare function getPerspectiveTransform(src: any, dst: any, solveMethod: int): Mat

/**
 * The function getRectSubPix extracts pixels from src:
 * 
 * `\\[patch(x, y) = src(x + \\texttt{center.x} - ( \\texttt{dst.cols} -1)*0.5, y + \\texttt{center.y} - ( \\texttt{dst.rows} -1)*0.5)\\]`
 * 
 * where the values of the pixels at non-integer coordinates are retrieved using bilinear interpolation. Every channel of multi-channel images is processed independently. Also the image should be a single channel or three channel image. While the center of the rectangle must be inside the image, parts of the rectangle may be outside.
 * 
 * [warpAffine](#da/d54/group__imgproc__transform_1ga0203d9ee5fcd28d40dbc4a1ea4451983}), [warpPerspective](#da/d54/group__imgproc__transform_1gaf73673a7e8e18ec6963e3774e6a94b87})
 * 
 * @param image Source image.
 * @param patchSize Size of the extracted patch.
 * @param center Floating point coordinates of the center of the extracted rectangle within the source image. The center must be inside the image.
 * @param patch Extracted patch that has the size patchSize and the same number of channels as src .
 * @param patchType Depth of the extracted pixels. By default, they have the same depth as src .
 */
export declare function getRectSubPix(image: InputArray, patchSize: Size, center: Point2f, patch: OutputArray, patchType: int): void

/**
 * The function calculates the following matrix:
 * 
 * `\\[\\begin{bmatrix} \\alpha & \\beta & (1- \\alpha ) \\cdot \\texttt{center.x} - \\beta \\cdot \\texttt{center.y} \\\\ - \\beta & \\alpha & \\beta \\cdot \\texttt{center.x} + (1- \\alpha ) \\cdot \\texttt{center.y} \\end{bmatrix}\\]`
 * 
 * where
 * 
 * `\\[\\begin{array}{l} \\alpha = \\texttt{scale} \\cdot \\cos \\texttt{angle} , \\\\ \\beta = \\texttt{scale} \\cdot \\sin \\texttt{angle} \\end{array}\\]`
 * 
 * The transformation maps the rotation center to itself. If this is not the target, adjust the shift.
 * 
 * [getAffineTransform](#da/d54/group__imgproc__transform_1ga8f6d378f9f8eebb5cb55cd3ae295a999}), [warpAffine](#da/d54/group__imgproc__transform_1ga0203d9ee5fcd28d40dbc4a1ea4451983}), [transform](#d2/de8/group__core__array_1ga393164aa54bb9169ce0a8cc44e08ff22})
 * 
 * @param center Center of the rotation in the source image.
 * @param angle Rotation angle in degrees. Positive values mean counter-clockwise rotation (the coordinate origin is assumed to be the top-left corner).
 * @param scale Isotropic scale factor.
 */
export declare function getRotationMatrix2D(center: Point2f, angle: double, scale: double): Mat

/**
 * The function computes an inverse affine transformation represented by `$2 \\times 3$` matrix M:
 * 
 * `\\[\\begin{bmatrix} a_{11} & a_{12} & b_1 \\\\ a_{21} & a_{22} & b_2 \\end{bmatrix}\\]`
 * 
 * The result is also a `$2 \\times 3$` matrix of the same type as M.
 * 
 * @param M Original affine transformation.
 * @param iM Output reverse affine transformation.
 */
export declare function invertAffineTransform(M: InputArray, iM: OutputArray): void

/**
 * 
 * @param src 
 * @param dst 
 * @param center 
 * @param maxRadius 
 * @param flags 
 */
export declare function linearPolar(src: InputArray, dst: OutputArray, center: Point2f, maxRadius: double, flags: int): void

/**
 * 
 * @param src 
 * @param dst 
 * @param center 
 * @param M 
 * @param flags 
 */
export declare function logPolar(src: InputArray, dst: OutputArray, center: Point2f, M: double, flags: int): void

/**
 * The function remap transforms the source image using the specified map:
 * 
 * `\\[\\texttt{dst} (x,y) = \\texttt{src} (map_x(x,y),map_y(x,y))\\]`
 * 
 * where values of pixels with non-integer coordinates are computed using one of available interpolation methods. `$map_x$` and `$map_y$` can be encoded as separate floating-point maps in `$map_1$` and `$map_2$` respectively, or interleaved floating-point maps of `$(x,y)$` in `$map_1$`, or fixed-point maps created by using convertMaps. The reason you might want to convert from floating to fixed-point representations of a map is that they can yield much faster (2x) remapping operations. In the converted case, `$map_1$` contains pairs (cvFloor(x), cvFloor(y)) and `$map_2$` contains indices in a table of interpolation coefficients.
 * 
 * This function cannot operate in-place.
 * 
 * Due to current implementation limitations the size of an input and output images should be less than 32767x32767.
 * 
 * @param src Source image.
 * @param dst Destination image. It has the same size as map1 and the same type as src .
 * @param map1 The first map of either (x,y) points or just x values having the type CV_16SC2 , CV_32FC1, or CV_32FC2. See convertMaps for details on converting a floating point representation to fixed-point for speed.
 * @param map2 The second map of y values having the type CV_16UC1, CV_32FC1, or none (empty map if map1 is (x,y) points), respectively.
 * @param interpolation Interpolation method (see InterpolationFlags). The method INTER_AREA is not supported by this function.
 * @param borderMode Pixel extrapolation method (see BorderTypes). When borderMode=BORDER_TRANSPARENT, it means that the pixels in the destination image that corresponds to the "outliers" in the source image are not modified by the function.
 * @param borderValue Value used in case of a constant border. By default, it is 0.
 */
export declare function remap(src: InputArray, dst: OutputArray, map1: InputArray, map2: InputArray, interpolation: int, borderMode: int, borderValue: any): void

/**
 * The function resize resizes the image src down to or up to the specified size. Note that the initial dst type or size are not taken into account. Instead, the size and type are derived from the `src`,`dsize`,`fx`, and `fy`. If you want to resize src so that it fits the pre-created dst, you may call the function as follows: 
 * 
 * ```cpp
 * // explicitly specify dsize=dst.size(); fx and fy will be computed from that.
 * resize(src, dst, dst.size(), 0, 0, interpolation);
 * ```
 * 
 *  If you want to decimate the image by factor of 2 in each direction, you can call the function this way: 
 * 
 * ```cpp
 * // specify fx and fy and let the function compute the destination image size.
 * resize(src, dst, Size(), 0.5, 0.5, interpolation);
 * ```
 * 
 *  To shrink an image, it will generally look best with [INTER_AREA](#da/d54/group__imgproc__transform_1gga5bb5a1fea74ea38e1a5445ca803ff121acf959dca2480cc694ca016b81b442ceb}) interpolation, whereas to enlarge an image, it will generally look best with c::INTER_CUBIC (slow) or [INTER_LINEAR](#da/d54/group__imgproc__transform_1gga5bb5a1fea74ea38e1a5445ca803ff121ac97d8e4880d8b5d509e96825c7522deb}) (faster but still looks OK).
 * 
 * [warpAffine](#da/d54/group__imgproc__transform_1ga0203d9ee5fcd28d40dbc4a1ea4451983}), [warpPerspective](#da/d54/group__imgproc__transform_1gaf73673a7e8e18ec6963e3774e6a94b87}), [remap](#da/d54/group__imgproc__transform_1gab75ef31ce5cdfb5c44b6da5f3b908ea4})
 * 
 * @param src input image.
 * @param dst output image; it has the size dsize (when it is non-zero) or the size computed from src.size(), fx, and fy; the type of dst is the same as of src.
 * @param dsize output image size; if it equals zero, it is computed as: \[\texttt{dsize = Size(round(fx*src.cols), round(fy*src.rows))}\] Either dsize or both fx and fy must be non-zero.
 * @param fx scale factor along the horizontal axis; when it equals 0, it is computed as \[\texttt{(double)dsize.width/src.cols}\]
 * @param fy scale factor along the vertical axis; when it equals 0, it is computed as \[\texttt{(double)dsize.height/src.rows}\]
 * @param interpolation interpolation method, see InterpolationFlags
 */
export declare function resize(src: InputArray, dst: OutputArray, dsize: Size, fx: double, fy: double, interpolation: int): void

/**
 * The function warpAffine transforms the source image using the specified matrix:
 * 
 * `\\[\\texttt{dst} (x,y) = \\texttt{src} ( \\texttt{M} _{11} x + \\texttt{M} _{12} y + \\texttt{M} _{13}, \\texttt{M} _{21} x + \\texttt{M} _{22} y + \\texttt{M} _{23})\\]`
 * 
 * when the flag [WARP_INVERSE_MAP](#da/d54/group__imgproc__transform_1gga5bb5a1fea74ea38e1a5445ca803ff121aa48be1c433186c4eae1ea86aa0ca75ba}) is set. Otherwise, the transformation is first inverted with [invertAffineTransform](#da/d54/group__imgproc__transform_1ga57d3505a878a7e1a636645727ca08f51}) and then put in the formula above instead of M. The function cannot operate in-place.
 * 
 * [warpPerspective](#da/d54/group__imgproc__transform_1gaf73673a7e8e18ec6963e3774e6a94b87}), [resize](#da/d54/group__imgproc__transform_1ga47a974309e9102f5f08231edc7e7529d}), [remap](#da/d54/group__imgproc__transform_1gab75ef31ce5cdfb5c44b6da5f3b908ea4}), [getRectSubPix](#da/d54/group__imgproc__transform_1ga77576d06075c1a4b6ba1a608850cd614}), [transform](#d2/de8/group__core__array_1ga393164aa54bb9169ce0a8cc44e08ff22})
 * 
 * @param src input image.
 * @param dst output image that has the size dsize and the same type as src .
 * @param M $2\times 3$ transformation matrix.
 * @param dsize size of the output image.
 * @param flags combination of interpolation methods (see InterpolationFlags) and the optional flag WARP_INVERSE_MAP that means that M is the inverse transformation ( $\texttt{dst}\rightarrow\texttt{src}$ ).
 * @param borderMode pixel extrapolation method (see BorderTypes); when borderMode=BORDER_TRANSPARENT, it means that the pixels in the destination image corresponding to the "outliers" in the source image are not modified by the function.
 * @param borderValue value used in case of a constant border; by default, it is 0.
 */
export declare function warpAffine(src: InputArray, dst: OutputArray, M: InputArray, dsize: Size, flags: int, borderMode: int, borderValue: any): void

/**
 * The function warpPerspective transforms the source image using the specified matrix:
 * 
 * `\\[\\texttt{dst} (x,y) = \\texttt{src} \\left ( \\frac{M_{11} x + M_{12} y + M_{13}}{M_{31} x + M_{32} y + M_{33}} , \\frac{M_{21} x + M_{22} y + M_{23}}{M_{31} x + M_{32} y + M_{33}} \\right )\\]`
 * 
 * when the flag [WARP_INVERSE_MAP](#da/d54/group__imgproc__transform_1gga5bb5a1fea74ea38e1a5445ca803ff121aa48be1c433186c4eae1ea86aa0ca75ba}) is set. Otherwise, the transformation is first inverted with invert and then put in the formula above instead of M. The function cannot operate in-place.
 * 
 * [warpAffine](#da/d54/group__imgproc__transform_1ga0203d9ee5fcd28d40dbc4a1ea4451983}), [resize](#da/d54/group__imgproc__transform_1ga47a974309e9102f5f08231edc7e7529d}), [remap](#da/d54/group__imgproc__transform_1gab75ef31ce5cdfb5c44b6da5f3b908ea4}), [getRectSubPix](#da/d54/group__imgproc__transform_1ga77576d06075c1a4b6ba1a608850cd614}), [perspectiveTransform](#d2/de8/group__core__array_1gad327659ac03e5fd6894b90025e6900a7})
 * 
 * @param src input image.
 * @param dst output image that has the size dsize and the same type as src .
 * @param M $3\times 3$ transformation matrix.
 * @param dsize size of the output image.
 * @param flags combination of interpolation methods (INTER_LINEAR or INTER_NEAREST) and the optional flag WARP_INVERSE_MAP, that sets M as the inverse transformation ( $\texttt{dst}\rightarrow\texttt{src}$ ).
 * @param borderMode pixel extrapolation method (BORDER_CONSTANT or BORDER_REPLICATE).
 * @param borderValue value used in case of a constant border; by default, it equals 0.
 */
export declare function warpPerspective(src: InputArray, dst: OutputArray, M: InputArray, dsize: Size, flags: int, borderMode: int, borderValue: any): void

/**
 * <a name="da/d54/group__imgproc__transform_1polar_remaps_reference_image"></a>
 *  Transform the source image using the following transformation: `\\[ dst(\\rho , \\phi ) = src(x,y) \\]`
 * 
 * where `\\[ \\begin{array}{l} \\vec{I} = (x - center.x, \\;y - center.y) \\\\ \\phi = Kangle \\cdot \\texttt{angle} (\\vec{I}) \\\\ \\rho = \\left\\{\\begin{matrix} Klin \\cdot \\texttt{magnitude} (\\vec{I}) & default \\\\ Klog \\cdot log_e(\\texttt{magnitude} (\\vec{I})) & if \\; semilog \\\\ \\end{matrix}\\right. \\end{array} \\]`
 * 
 * and `\\[ \\begin{array}{l} Kangle = dsize.height / 2\\Pi \\\\ Klin = dsize.width / maxRadius \\\\ Klog = dsize.width / log_e(maxRadius) \\\\ \\end{array} \\]`
 * 
 * Polar mapping can be linear or semi-log. Add one of [WarpPolarMode](#da/d54/group__imgproc__transform_1ga066c91770d0dea54cc1a018ce0344485}) to `flags` to specify the polar mapping mode.
 * 
 * Linear is the default mode.
 * 
 * The semilog mapping emulates the human "foveal" vision that permit very high acuity on the line of sight (central vision) in contrast to peripheral vision where acuity is minor.
 * 
 * if both values in `dsize <=0` (default), the destination image will have (almost) same area of source bounding circle: `\\[\\begin{array}{l} dsize.area \\leftarrow (maxRadius^2 \\cdot \\Pi) \\\\ dsize.width = \\texttt{cvRound}(maxRadius) \\\\ dsize.height = \\texttt{cvRound}(maxRadius \\cdot \\Pi) \\\\ \\end{array}\\]`
 * if only `dsize.height <= 0`, the destination image area will be proportional to the bounding circle area but scaled by `Kx * Kx`: `\\[\\begin{array}{l} dsize.height = \\texttt{cvRound}(dsize.width \\cdot \\Pi) \\\\ \\end{array} \\]`
 * if both values in `dsize > 0`, the destination image will have the given size therefore the area of the bounding circle will be scaled to `dsize`.
 * 
 * You can get reverse mapping adding [WARP_INVERSE_MAP](#da/d54/group__imgproc__transform_1gga5bb5a1fea74ea38e1a5445ca803ff121aa48be1c433186c4eae1ea86aa0ca75ba}) to `flags` 
 * 
 * ```cpp
 *         // direct transform
 *         [warpPolar](#da/d54/group__imgproc__transform_1ga49481ab24fdaa0ffa4d3e63d14c0d5e4})(src, lin_polar_img, [Size](#dc/d84/group__core__basic_1ga346f563897249351a34549137c8532a0})(),center, maxRadius, flags);                     // linear Polar
 *         [warpPolar](#da/d54/group__imgproc__transform_1ga49481ab24fdaa0ffa4d3e63d14c0d5e4})(src, log_polar_img, [Size](#dc/d84/group__core__basic_1ga346f563897249351a34549137c8532a0})(),center, maxRadius, flags + [WARP_POLAR_LOG](#da/d54/group__imgproc__transform_1gga066c91770d0dea54cc1a018ce0344485aaa857239a6f4dc607b18d29b8b43daa7}));    // semilog Polar
 *         // inverse transform
 *         [warpPolar](#da/d54/group__imgproc__transform_1ga49481ab24fdaa0ffa4d3e63d14c0d5e4})(lin_polar_img, recovered_lin_polar_img, src.size(), center, maxRadius, flags + [WARP_INVERSE_MAP](#da/d54/group__imgproc__transform_1gga5bb5a1fea74ea38e1a5445ca803ff121aa48be1c433186c4eae1ea86aa0ca75ba}));
 *         [warpPolar](#da/d54/group__imgproc__transform_1ga49481ab24fdaa0ffa4d3e63d14c0d5e4})(log_polar_img, recovered_log_polar, src.size(), center, maxRadius, flags + [WARP_POLAR_LOG](#da/d54/group__imgproc__transform_1gga066c91770d0dea54cc1a018ce0344485aaa857239a6f4dc607b18d29b8b43daa7}) + [WARP_INVERSE_MAP](#da/d54/group__imgproc__transform_1gga5bb5a1fea74ea38e1a5445ca803ff121aa48be1c433186c4eae1ea86aa0ca75ba}));
 * ```
 * 
 *  In addiction, to calculate the original coordinate from a polar mapped coordinate `$(rho, phi)->(x, y)$`: 
 * 
 * ```cpp
 *         double angleRad, [magnitude](#d2/de8/group__core__array_1ga6d3b097586bca4409873d64a90fe64c3});
 *         double Kangle = dst.rows / [CV_2PI](#db/de0/group__core__utils_1ga1ff4e987d10b07a31704ff710fda8df8});
 *         angleRad = phi / Kangle;
 *         if (flags & [WARP_POLAR_LOG](#da/d54/group__imgproc__transform_1gga066c91770d0dea54cc1a018ce0344485aaa857239a6f4dc607b18d29b8b43daa7}))
 *         {
 *             double Klog = dst.cols / [std::log](#d7/dcc/group__core__utils__softfloat_1gae5de78ee278fe88405c6dbc38502f7c1})(maxRadius);
 *             magnitude = [std::exp](#d7/dcc/group__core__utils__softfloat_1ga1eb07a682abff20e0864104599c06fbc})(rho / Klog);
 *         }
 *         else
 *         {
 *             double Klin = dst.cols / maxRadius;
 *             magnitude = rho / Klin;
 *         }
 *         int x = [cvRound](#db/de0/group__core__utils_1ga085eca238176984a0b72df2818598d85})(center.x + magnitude * [cos](#d7/dcc/group__core__utils__softfloat_1ga164d580371866184ddc96fa7aaf47085})(angleRad));
 *         int y = [cvRound](#db/de0/group__core__utils_1ga085eca238176984a0b72df2818598d85})(center.y + magnitude * [sin](#d7/dcc/group__core__utils__softfloat_1gad7c879b58f79ccd980f4ce13fe3db49a})(angleRad));
 * ```
 * 
 * The function can not operate in-place.
 * To calculate magnitude and angle in degrees [cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d}) is used internally thus angles are measured from 0 to 360 with accuracy about 0.3 degrees.
 * This function uses [remap](#da/d54/group__imgproc__transform_1gab75ef31ce5cdfb5c44b6da5f3b908ea4}). Due to current implementation limitations the size of an input and output images should be less than 32767x32767.
 * 
 * [cv::remap](#da/d54/group__imgproc__transform_1gab75ef31ce5cdfb5c44b6da5f3b908ea4})
 * 
 * @param src Source image.
 * @param dst Destination image. It will have same type as src.
 * @param dsize The destination image size (see description for valid options).
 * @param center The transformation center.
 * @param maxRadius The radius of the bounding circle to transform. It determines the inverse magnitude scale parameter too.
 * @param flags A combination of interpolation methods, InterpolationFlags + WarpPolarMode.
 * Add WARP_POLAR_LINEAR to select linear polar mapping (default)Add WARP_POLAR_LOG to select semilog polar mappingAdd WARP_INVERSE_MAP for reverse mapping.
 */
export declare function warpPolar(src: InputArray, dst: OutputArray, dsize: Size, center: Point2f, maxRadius: double, flags: int): void


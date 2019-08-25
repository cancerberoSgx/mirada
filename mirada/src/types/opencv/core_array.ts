
import { InputArray, OutputArray, int, double, bool, InputOutputArray, size_t, InputArrayOfArrays, Scalar, InputOutputArrayOfArrays, Mat, OutputArrayOfArrays } from './_types'
/*
 * # core_array
 *
 * TODO  
 */

/**
 * The function [cv::absdiff](#d2/de8/group__core__array_1ga6fef31bc8c4071cbc114a758a2b79c14})
 * calculates: Absolute difference between two arrays when they have the same size and type:
 * `\\[\\texttt{dst}(I) = \\texttt{saturate} (| \\texttt{src1}(I) - \\texttt{src2}(I)|)\\]` Absolute
 * difference between an array and a scalar when the second array is constructed from Scalar or has as
 * many elements as the number of channels in `src1`: `\\[\\texttt{dst}(I) = \\texttt{saturate} (|
 * \\texttt{src1}(I) - \\texttt{src2} |)\\]` Absolute difference between a scalar and an array when the
 * first array is constructed from Scalar or has as many elements as the number of channels in `src2`:
 * `\\[\\texttt{dst}(I) = \\texttt{saturate} (| \\texttt{src1} - \\texttt{src2}(I) |)\\]` where I is a
 * multi-dimensional index of array elements. In case of multi-channel arrays, each channel is
 * processed independently. 
 * 
 * Saturation is not applied when the arrays have the depth CV_32S. You may even get a negative value
 * in the case of overflow. 
 * 
 * cv::abs(const Mat&)
 * 
 * @param src1 first input array or a scalar.
 * @param src2 second input array or a scalar.
 * @param dst output array that has the same size and type as input arrays.
 */
export declare function absdiff(src1: InputArray, src2: InputArray, dst: OutputArray): void

/**
 * The function add calculates:
 * 
 * Sum of two arrays when both input arrays have the same size and the same number of channels:
 * `\\[\\texttt{dst}(I) = \\texttt{saturate} ( \\texttt{src1}(I) + \\texttt{src2}(I)) \\quad
 * \\texttt{if mask}(I) \\ne0\\]`
 * Sum of an array and a scalar when src2 is constructed from Scalar or has the same number of elements
 * as `src1.channels()`: `\\[\\texttt{dst}(I) = \\texttt{saturate} ( \\texttt{src1}(I) + \\texttt{src2}
 * ) \\quad \\texttt{if mask}(I) \\ne0\\]`
 * Sum of a scalar and an array when src1 is constructed from Scalar or has the same number of elements
 * as `src2.channels()`: `\\[\\texttt{dst}(I) = \\texttt{saturate} ( \\texttt{src1} + \\texttt{src2}(I)
 * ) \\quad \\texttt{if mask}(I) \\ne0\\]` where `I` is a multi-dimensional index of array elements. In
 * case of multi-channel arrays, each channel is processed independently.
 * 
 * The first function in the list above can be replaced with matrix expressions: 
 * 
 * ```cpp
 * dst = src1 + src2;
 * dst += src1; // equivalent to add(dst, src1, dst);
 * ```
 * 
 *  The input arrays and the output array can all have the same or different depths. For example, you
 * can add a 16-bit unsigned array to a 8-bit signed array and store the sum as a 32-bit floating-point
 * array. Depth of the output array is determined by the dtype parameter. In the second and third cases
 * above, as well as in the first case, when src1.depth() == src2.depth(), dtype can be set to the
 * default -1. In this case, the output array will have the same depth as the input array, be it src1,
 * src2 or both. 
 * 
 * Saturation is not applied when the output array has the depth CV_32S. You may even get result of an
 * incorrect sign in the case of overflow. 
 * 
 * [subtract](#d2/de8/group__core__array_1gaa0f00d98b4b5edeaeb7b8333b2de353b}),
 * [addWeighted](#d2/de8/group__core__array_1gafafb2513349db3bcff51f54ee5592a19}),
 * [scaleAdd](#d2/de8/group__core__array_1ga9e0845db4135f55dcf20227402f00d98}),
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b})
 * 
 * @param src1 first input array or a scalar.
 * @param src2 second input array or a scalar.
 * @param dst output array that has the same size and number of channels as the input array(s); the
 * depth is defined by dtype or src1/src2.
 * @param mask optional operation mask - 8-bit single channel array, that specifies elements of the
 * output array to be changed.
 * @param dtype optional depth of the output array (see the discussion below).
 */
export declare function add(src1: InputArray, src2: InputArray, dst: OutputArray, mask?: InputArray, dtype?: int): void

/**
 * The function addWeighted calculates the weighted sum of two arrays as follows: `\\[\\texttt{dst}
 * (I)= \\texttt{saturate} ( \\texttt{src1} (I)* \\texttt{alpha} + \\texttt{src2} (I)* \\texttt{beta} +
 * \\texttt{gamma} )\\]` where I is a multi-dimensional index of array elements. In case of
 * multi-channel arrays, each channel is processed independently. The function can be replaced with a
 * matrix expression: 
 * 
 * ```cpp
 * dst = src1*alpha + src2*beta + gamma;
 * ```
 * 
 * Saturation is not applied when the output array has the depth CV_32S. You may even get result of an
 * incorrect sign in the case of overflow. 
 * 
 * [add](#d2/de8/group__core__array_1ga10ac1bfb180e2cfda1701d06c24fdbd6}),
 * [subtract](#d2/de8/group__core__array_1gaa0f00d98b4b5edeaeb7b8333b2de353b}),
 * [scaleAdd](#d2/de8/group__core__array_1ga9e0845db4135f55dcf20227402f00d98}),
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b})
 * 
 * @param src1 first input array.
 * @param alpha weight of the first array elements.
 * @param src2 second input array of the same size and channel number as src1.
 * @param beta weight of the second array elements.
 * @param gamma scalar added to each sum.
 * @param dst output array that has the same size and number of channels as the input arrays.
 * @param dtype optional depth of the output array; when both input arrays have the same depth, dtype
 * can be set to -1, which will be equivalent to src1.depth().
 */
export declare function addWeighted(src1: InputArray, alpha: double, src2: InputArray, beta: double, gamma: double, dst: OutputArray, dtype?: int): void

/**
 * see
 * 
 * @param src1 
 * @param src2 
 * @param dist 
 * @param dtype 
 * @param nidx 
 * @param normType 
 * @param K 
 * @param mask 
 * @param update 
 * @param crosscheck 
 */
export declare function batchDistance(src1: InputArray, src2: InputArray, dist: OutputArray, dtype: int, nidx: OutputArray, normType?: int, K?: int, mask?: InputArray, update?: int, crosscheck?: bool): void

/**
 * The function [cv::bitwise_and](#d2/de8/group__core__array_1ga60b4d04b251ba5eb1392c34425497e14})
 * calculates the per-element bit-wise logical conjunction for: Two arrays when src1 and src2 have the
 * same size: `\\[\\texttt{dst} (I) = \\texttt{src1} (I) \\wedge \\texttt{src2} (I) \\quad \\texttt{if
 * mask} (I) \\ne0\\]` An array and a scalar when src2 is constructed from Scalar or has the same
 * number of elements as `src1.channels()`: `\\[\\texttt{dst} (I) = \\texttt{src1} (I) \\wedge
 * \\texttt{src2} \\quad \\texttt{if mask} (I) \\ne0\\]` A scalar and an array when src1 is constructed
 * from Scalar or has the same number of elements as `src2.channels()`: `\\[\\texttt{dst} (I) =
 * \\texttt{src1} \\wedge \\texttt{src2} (I) \\quad \\texttt{if mask} (I) \\ne0\\]` In case of
 * floating-point arrays, their machine-specific bit representations (usually IEEE754-compliant) are
 * used for the operation. In case of multi-channel arrays, each channel is processed independently. In
 * the second and third cases above, the scalar is first converted to the array type.
 * 
 * @param src1 first input array or a scalar.
 * @param src2 second input array or a scalar.
 * @param dst output array that has the same size and type as the input arrays.
 * @param mask optional operation mask, 8-bit single channel array, that specifies elements of the
 * output array to be changed.
 */
export declare function bitwise_and(src1: InputArray, src2: InputArray, dst: OutputArray, mask?: InputArray): void

/**
 * The function [cv::bitwise_not](#d2/de8/group__core__array_1ga0002cf8b418479f4cb49a75442baee2f})
 * calculates per-element bit-wise inversion of the input array: `\\[\\texttt{dst} (I) = \\neg
 * \\texttt{src} (I)\\]` In case of a floating-point input array, its machine-specific bit
 * representation (usually IEEE754-compliant) is used for the operation. In case of multi-channel
 * arrays, each channel is processed independently.
 * 
 * @param src input array.
 * @param dst output array that has the same size and type as the input array.
 * @param mask optional operation mask, 8-bit single channel array, that specifies elements of the
 * output array to be changed.
 */
export declare function bitwise_not(src: InputArray, dst: OutputArray, mask?: InputArray): void

/**
 * The function [cv::bitwise_or](#d2/de8/group__core__array_1gab85523db362a4e26ff0c703793a719b4})
 * calculates the per-element bit-wise logical disjunction for: Two arrays when src1 and src2 have the
 * same size: `\\[\\texttt{dst} (I) = \\texttt{src1} (I) \\vee \\texttt{src2} (I) \\quad \\texttt{if
 * mask} (I) \\ne0\\]` An array and a scalar when src2 is constructed from Scalar or has the same
 * number of elements as `src1.channels()`: `\\[\\texttt{dst} (I) = \\texttt{src1} (I) \\vee
 * \\texttt{src2} \\quad \\texttt{if mask} (I) \\ne0\\]` A scalar and an array when src1 is constructed
 * from Scalar or has the same number of elements as `src2.channels()`: `\\[\\texttt{dst} (I) =
 * \\texttt{src1} \\vee \\texttt{src2} (I) \\quad \\texttt{if mask} (I) \\ne0\\]` In case of
 * floating-point arrays, their machine-specific bit representations (usually IEEE754-compliant) are
 * used for the operation. In case of multi-channel arrays, each channel is processed independently. In
 * the second and third cases above, the scalar is first converted to the array type.
 * 
 * @param src1 first input array or a scalar.
 * @param src2 second input array or a scalar.
 * @param dst output array that has the same size and type as the input arrays.
 * @param mask optional operation mask, 8-bit single channel array, that specifies elements of the
 * output array to be changed.
 */
export declare function bitwise_or(src1: InputArray, src2: InputArray, dst: OutputArray, mask?: InputArray): void

/**
 * The function [cv::bitwise_xor](#d2/de8/group__core__array_1ga84b2d8188ce506593dcc3f8cd00e8e2c})
 * calculates the per-element bit-wise logical "exclusive-or" operation for: Two arrays when src1 and
 * src2 have the same size: `\\[\\texttt{dst} (I) = \\texttt{src1} (I) \\oplus \\texttt{src2} (I)
 * \\quad \\texttt{if mask} (I) \\ne0\\]` An array and a scalar when src2 is constructed from Scalar or
 * has the same number of elements as `src1.channels()`: `\\[\\texttt{dst} (I) = \\texttt{src1} (I)
 * \\oplus \\texttt{src2} \\quad \\texttt{if mask} (I) \\ne0\\]` A scalar and an array when src1 is
 * constructed from Scalar or has the same number of elements as `src2.channels()`: `\\[\\texttt{dst}
 * (I) = \\texttt{src1} \\oplus \\texttt{src2} (I) \\quad \\texttt{if mask} (I) \\ne0\\]` In case of
 * floating-point arrays, their machine-specific bit representations (usually IEEE754-compliant) are
 * used for the operation. In case of multi-channel arrays, each channel is processed independently. In
 * the 2nd and 3rd cases above, the scalar is first converted to the array type.
 * 
 * @param src1 first input array or a scalar.
 * @param src2 second input array or a scalar.
 * @param dst output array that has the same size and type as the input arrays.
 * @param mask optional operation mask, 8-bit single channel array, that specifies elements of the
 * output array to be changed.
 */
export declare function bitwise_xor(src1: InputArray, src2: InputArray, dst: OutputArray, mask?: InputArray): void

/**
 * The function computes and returns the coordinate of a donor pixel corresponding to the specified
 * extrapolated pixel when using the specified extrapolation border mode. For example, if you use
 * [cv::BORDER_WRAP](#d2/de8/group__core__array_1gga209f2f4869e304c82d07739337eae7c5a697c1b011884a7c2bdc0e5caf7955661})
 * mode in the horizontal direction,
 * [cv::BORDER_REFLECT_101](#d2/de8/group__core__array_1gga209f2f4869e304c82d07739337eae7c5ab3c5a6143d8120b95005fa7105a10bb4})
 * in the vertical direction and want to compute value of the "virtual" pixel Point(-5, 100) in a
 * floating-point image img , it looks like: 
 * 
 * ```cpp
 * float val = img.at<float>(borderInterpolate(100, img.rows, cv::BORDER_REFLECT_101),
 *                           borderInterpolate(-5, img.cols, cv::BORDER_WRAP));
 * ```
 * 
 *  Normally, the function is not called directly. It is used inside filtering functions and also in
 * copyMakeBorder. 
 * 
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 * @param p 0-based coordinate of the extrapolated pixel along one of the axes, likely <0 or >= len
 * @param len Length of the array along the corresponding axis.
 * @param borderType Border type, one of the BorderTypes, except for BORDER_TRANSPARENT and
 * BORDER_ISOLATED . When borderType==BORDER_CONSTANT , the function always returns -1, regardless of p
 * and len.
 */
export declare function borderInterpolate(p: int, len: int, borderType: int): int

/**
 * The function [cv::calcCovarMatrix](#d2/de8/group__core__array_1gae6ffa9354633f984246945d52823165d})
 * calculates the covariance matrix and, optionally, the mean vector of the set of input vectors. 
 * 
 * [PCA](#d3/d8d/classcv_1_1PCA}),
 * [mulTransposed](#d2/de8/group__core__array_1gadc4e49f8f7a155044e3be1b9e3b270ab}),
 * [Mahalanobis](#d2/de8/group__core__array_1ga4493aee129179459cbfc6064f051aa7d})
 * 
 * @param samples samples stored as separate matrices
 * @param nsamples number of samples
 * @param covar output covariance matrix of the type ctype and square size.
 * @param mean input or output (depending on the flags) array as the average value of the input
 * vectors.
 * @param flags operation flags as a combination of CovarFlags
 * @param ctype type of the matrixl; it equals 'CV_64F' by default.
 */
export declare function calcCovarMatrix(samples: any, nsamples: int, covar: any, mean: any, flags: int, ctype?: int): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. 
 * 
 * use
 * [COVAR_ROWS](#d0/de1/group__core_1gga719ebd4a73f30f4fab258ab7616d0f0fadbac775ac8245aad5bfef994731c635f})
 * or
 * [COVAR_COLS](#d0/de1/group__core_1gga719ebd4a73f30f4fab258ab7616d0f0fac8cc5a80914e18d6100184a2829aa3c0})
 * flag
 * 
 * @param samples samples stored as rows/columns of a single matrix.
 * @param covar output covariance matrix of the type ctype and square size.
 * @param mean input or output (depending on the flags) array as the average value of the input
 * vectors.
 * @param flags operation flags as a combination of CovarFlags
 * @param ctype type of the matrixl; it equals 'CV_64F' by default.
 */
export declare function calcCovarMatrix(samples: InputArray, covar: OutputArray, mean: InputOutputArray, flags: int, ctype?: int): void

/**
 * The function [cv::cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d})
 * calculates either the magnitude, angle, or both for every 2D vector (x(I),y(I)):
 * `\\[\\begin{array}{l} \\texttt{magnitude} (I)= \\sqrt{\\texttt{x}(I)^2+\\texttt{y}(I)^2} , \\\\
 * \\texttt{angle} (I)= \\texttt{atan2} ( \\texttt{y} (I), \\texttt{x} (I))[ \\cdot180 / \\pi ]
 * \\end{array}\\]`
 * 
 * The angles are calculated with accuracy about 0.3 degrees. For the point (0,0), the angle is set to
 * 0. 
 * 
 * [Sobel](#d4/d86/group__imgproc__filter_1gacea54f142e81b6758cb6f375ce782c8d}),
 * [Scharr](#d4/d86/group__imgproc__filter_1gaa13106761eedf14798f37aa2d60404c9})
 * 
 * @param x array of x-coordinates; this must be a single-precision or double-precision floating-point
 * array.
 * @param y array of y-coordinates, that must have the same size and same type as x.
 * @param magnitude output array of magnitudes of the same size and type as x.
 * @param angle output array of angles that has the same size and type as x; the angles are measured in
 * radians (from 0 to 2*Pi) or in degrees (0 to 360 degrees).
 * @param angleInDegrees a flag, indicating whether the angles are measured in radians (which is by
 * default), or in degrees.
 */
export declare function cartToPolar(x: InputArray, y: InputArray, magnitude: OutputArray, angle: OutputArray, angleInDegrees?: bool): void

/**
 * The function [cv::checkRange](#d2/de8/group__core__array_1ga2bd19d89cae59361416736f87e3c7a64})
 * checks that every array element is neither NaN nor infinite. When minVal > -DBL_MAX and maxVal <
 * DBL_MAX, the function also checks that each value is between minVal and maxVal. In case of
 * multi-channel arrays, each channel is processed independently. If some values are out of range,
 * position of the first outlier is stored in pos (when pos != NULL). Then, the function either returns
 * false (when quiet=true) or throws an exception.
 * 
 * @param a input array.
 * @param quiet a flag, indicating whether the functions quietly return false when the array elements
 * are out of range or they throw an exception.
 * @param pos optional output parameter, when not NULL, must be a pointer to array of src.dims
 * elements.
 * @param minVal inclusive lower boundary of valid values range.
 * @param maxVal exclusive upper boundary of valid values range.
 */
export declare function checkRange(a: InputArray, quiet?: bool, pos?: any, minVal?: double, maxVal?: double): bool

/**
 * The function compares: Elements of two arrays when src1 and src2 have the same size:
 * `\\[\\texttt{dst} (I) = \\texttt{src1} (I) \\,\\texttt{cmpop}\\, \\texttt{src2} (I)\\]` Elements of
 * src1 with a scalar src2 when src2 is constructed from Scalar or has a single element:
 * `\\[\\texttt{dst} (I) = \\texttt{src1}(I) \\,\\texttt{cmpop}\\, \\texttt{src2}\\]` src1 with
 * elements of src2 when src1 is constructed from Scalar or has a single element: `\\[\\texttt{dst} (I)
 * = \\texttt{src1} \\,\\texttt{cmpop}\\, \\texttt{src2} (I)\\]` When the comparison result is true,
 * the corresponding element of output array is set to 255. The comparison operations can be replaced
 * with the equivalent matrix expressions: 
 * 
 * ```cpp
 * Mat dst1 = src1 >= src2;
 * Mat dst2 = src1 < 8;
 * ...
 * ```
 * 
 * [checkRange](#d2/de8/group__core__array_1ga2bd19d89cae59361416736f87e3c7a64}),
 * [min](#d7/dcc/group__core__utils__softfloat_1gac48df53b8fd34b87e7b121fa8fd4c379}),
 * [max](#d7/dcc/group__core__utils__softfloat_1ga78f988f6cfa6223610298cbd4f86ec66}),
 * [threshold](#d7/d1b/group__imgproc__misc_1gae8a4a146d1ca78c626a53577199e9c57})
 * 
 * @param src1 first input array or a scalar; when it is an array, it must have a single channel.
 * @param src2 second input array or a scalar; when it is an array, it must have a single channel.
 * @param dst output array of type ref CV_8U that has the same size and the same number of channels as
 * the input arrays.
 * @param cmpop a flag, that specifies correspondence between the arrays (cv::CmpTypes)
 */
export declare function compare(src1: InputArray, src2: InputArray, dst: OutputArray, cmpop: int): void

/**
 * The function [cv::completeSymm](#d2/de8/group__core__array_1ga6847337c0c55769e115a70e0f011b5ca})
 * copies the lower or the upper half of a square matrix to its another half. The matrix diagonal
 * remains unchanged:
 * 
 * `$\\texttt{m}_{ij}=\\texttt{m}_{ji}$` for `$i > j$` if lowerToUpper=false
 * `$\\texttt{m}_{ij}=\\texttt{m}_{ji}$` for `$i < j$` if lowerToUpper=true
 * 
 * [flip](#d2/de8/group__core__array_1gaca7be533e3dac7feb70fc60635adf441}),
 * [transpose](#d2/de8/group__core__array_1ga46630ed6c0ea6254a35f447289bd7404})
 * 
 * @param m input-output floating-point square matrix.
 * @param lowerToUpper operation flag; if true, the lower half is copied to the upper half. Otherwise,
 * the upper half is copied to the lower half.
 */
export declare function completeSymm(m: InputOutputArray, lowerToUpper?: bool): void

/**
 * This function converts FP32 (single precision floating point) from/to FP16 (half precision floating
 * point). CV_16S format is used to represent FP16 data. There are two use modes (src -> dst): CV_32F
 * -> CV_16S and CV_16S -> CV_32F. The input array has to have type of CV_32F or CV_16S to represent
 * the bit depth. If the input array is neither of them, the function will raise an error. The format
 * of half precision floating point is defined in IEEE 754-2008.
 * 
 * @param src input array.
 * @param dst output array.
 */
export declare function convertFp16(src: InputArray, dst: OutputArray): void

/**
 * On each element of the input array, the function convertScaleAbs performs three operations
 * sequentially: scaling, taking an absolute value, conversion to an unsigned 8-bit type:
 * `\\[\\texttt{dst} (I)= \\texttt{saturate\\_cast<uchar>} (| \\texttt{src} (I)* \\texttt{alpha} +
 * \\texttt{beta} |)\\]` In case of multi-channel arrays, the function processes each channel
 * independently. When the output is not 8-bit, the operation can be emulated by calling the
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b}) method (or by using
 * matrix expressions) and then by calculating an absolute value of the result. For example: 
 * 
 * ```cpp
 * Mat_<float> A(30,30);
 * randu(A, Scalar(-100), Scalar(100));
 * Mat_<float> B = A*5 + 3;
 * B = abs(B);
 * // Mat_<float> B = abs(A*5+3) will also do the job,
 * // but it will allocate a temporary matrix
 * ```
 * 
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b}), cv::abs(const Mat&)
 * 
 * @param src input array.
 * @param dst output array.
 * @param alpha optional scale factor.
 * @param beta optional delta added to the scaled values.
 */
export declare function convertScaleAbs(src: InputArray, dst: OutputArray, alpha?: double, beta?: double): void

/**
 * The function copies the source image into the middle of the destination image. The areas to the
 * left, to the right, above and below the copied source image will be filled with extrapolated pixels.
 * This is not what filtering functions based on it do (they extrapolate pixels on-fly), but what other
 * more complex functions, including your own, may do to simplify image boundary handling.
 * 
 * The function supports the mode when src is already in the middle of dst . In this case, the function
 * does not copy src itself but simply constructs the border, for example:
 * 
 * ```cpp
 * // let border be the same in all directions
 * int border=2;
 * // constructs a larger image to fit both the image and the border
 * Mat gray_buf(rgb.rows + border*2, rgb.cols + border*2, rgb.depth());
 * // select the middle part of it w/o copying data
 * Mat gray(gray_canvas, Rect(border, border, rgb.cols, rgb.rows));
 * // convert image from RGB to grayscale
 * cvtColor(rgb, gray, COLOR_RGB2GRAY);
 * // form a border in-place
 * copyMakeBorder(gray, gray_buf, border, border,
 *                border, border, BORDER_REPLICATE);
 * // now do some custom filtering ...
 * ...
 * ```
 * 
 * When the source image is a part (ROI) of a bigger image, the function will try to use the pixels
 * outside of the ROI to form a border. To disable this feature and always do extrapolation, as if src
 * was not a ROI, use borderType |
 * [BORDER_ISOLATED](#d2/de8/group__core__array_1gga209f2f4869e304c82d07739337eae7c5a4fcb77ae62e1e1336c1c2b24a441995c}).
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58})
 * 
 * @param src Source image.
 * @param dst Destination image of the same type as src and the size Size(src.cols+left+right,
 * src.rows+top+bottom) .
 * @param top the top pixels
 * @param bottom the bottom pixels
 * @param left the left pixels
 * @param right Parameter specifying how many pixels in each direction from the source image rectangle
 * to extrapolate. For example, top=1, bottom=1, left=1, right=1 mean that 1 pixel-wide border needs to
 * be built.
 * @param borderType Border type. See borderInterpolate for details.
 * @param value Border value if borderType==BORDER_CONSTANT .
 */
export declare function copyMakeBorder(src: InputArray, dst: OutputArray, top: int, bottom: int, left: int, right: int, borderType: int, value?: any): void

/**
 * 
 * @param src source matrix.
 * @param dst Destination matrix. If it does not have a proper size or type before the operation, it is
 * reallocated.
 * @param mask Operation mask of the same size as *this. Its non-zero elements indicate which matrix
 * elements need to be copied. The mask has to be of type CV_8U and can have 1 or multiple channels.
 */
export declare function copyTo(src: InputArray, dst: OutputArray, mask: InputArray): void

/**
 * The function returns the number of non-zero elements in src : `\\[\\sum _{I: \\; \\texttt{src} (I)
 * \\ne0 } 1\\]` 
 * 
 * [mean](#d2/de8/group__core__array_1ga191389f8a0e58180bb13a727782cd461}),
 * [meanStdDev](#d2/de8/group__core__array_1ga846c858f4004d59493d7c6a4354b301d}),
 * [norm](#dc/d84/group__core__basic_1ga4e556cb8ad35a643a1ea66e035711bb9}),
 * [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707}),
 * [calcCovarMatrix](#d2/de8/group__core__array_1gae6ffa9354633f984246945d52823165d})
 * 
 * @param src single-channel array.
 */
export declare function countNonZero(src: InputArray): int

/**
 * The function [cv::dct](#d2/de8/group__core__array_1ga85aad4d668c01fbd64825f589e3696d4}) performs a
 * forward or inverse discrete Cosine transform (DCT) of a 1D or 2D floating-point array:
 * 
 * Forward Cosine transform of a 1D vector of N elements: `\\[Y = C^{(N)} \\cdot X\\]` where
 * `\\[C^{(N)}_{jk}= \\sqrt{\\alpha_j/N} \\cos \\left ( \\frac{\\pi(2k+1)j}{2N} \\right )\\]` and
 * `$\\alpha_0=1$`, `$\\alpha_j=2$` for *j > 0*.
 * Inverse Cosine transform of a 1D vector of N elements: `\\[X = \\left (C^{(N)} \\right )^{-1} \\cdot
 * Y = \\left (C^{(N)} \\right )^T \\cdot Y\\]` (since `$C^{(N)}$` is an orthogonal matrix, `$C^{(N)}
 * \\cdot \\left(C^{(N)}\\right)^T = I$` )
 * Forward 2D Cosine transform of M x N matrix: `\\[Y = C^{(N)} \\cdot X \\cdot \\left (C^{(N)} \\right
 * )^T\\]`
 * Inverse 2D Cosine transform of M x N matrix: `\\[X = \\left (C^{(N)} \\right )^T \\cdot X \\cdot
 * C^{(N)}\\]`
 * 
 * The function chooses the mode of operation by looking at the flags and size of the input array:
 * 
 * If (flags &
 * [DCT_INVERSE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca7d18108cbce9d52e6496633c713587da}))
 * == 0 , the function does a forward 1D or 2D transform. Otherwise, it is an inverse 1D or 2D
 * transform.
 * If (flags &
 * [DCT_ROWS](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca49bc8de8aedbe7fabb8960445133e494}))
 * != 0 , the function performs a 1D transform of each row.
 * If the array is a single column or a single row, the function performs a 1D transform.
 * If none of the above is true, the function performs a 2D transform.
 * 
 * Currently dct supports even-size arrays (2, 4, 6 ...). For data analysis and approximation, you can
 * pad the array when necessary. Also, the function performance depends very much, and not
 * monotonically, on the array size (see getOptimalDFTSize ). In the current implementation DCT of a
 * vector of size N is calculated via DFT of a vector of size N/2 . Thus, the optimal DCT size N1 >= N
 * can be calculated as: 
 * 
 * ```cpp
 * size_t getOptimalDCTSize(size_t N) { return 2*getOptimalDFTSize((N+1)/2); }
 * N1 = getOptimalDCTSize(N);
 * ```
 * 
 * [dft](#d2/de8/group__core__array_1gadd6cf9baf2b8b704a11b5f04aaf4f39d}) ,
 * [getOptimalDFTSize](#d2/de8/group__core__array_1ga6577a2e59968936ae02eb2edde5de299}) ,
 * [idct](#d2/de8/group__core__array_1ga77b168d84e564c50228b69730a227ef2})
 * 
 * @param src input floating-point array.
 * @param dst output array of the same size and type as src .
 * @param flags transformation flags as a combination of cv::DftFlags (DCT_*)
 */
export declare function dct(src: InputArray, dst: OutputArray, flags?: int): void

/**
 * The function [cv::determinant](#dc/d84/group__core__basic_1ga06b8ec936c3cbc9502d76c7818053b41})
 * calculates and returns the determinant of the specified matrix. For small matrices (
 * mtx.cols=mtx.rows<=3 ), the direct method is used. For larger matrices, the function uses LU
 * factorization with partial pivoting.
 * 
 * For symmetric positively-determined matrices, it is also possible to use eigen decomposition to
 * calculate the determinant. 
 * 
 * [trace](#dc/d84/group__core__basic_1ga36ad18631177b097a38198c4e83c6e2b}),
 * [invert](#d2/de8/group__core__array_1gad278044679d4ecf20f7622cc151aaaa2}),
 * [solve](#d2/de8/group__core__array_1ga12b43690dbd31fed96f213eefead2373}),
 * [eigen](#d2/de8/group__core__array_1ga9fa0d58657f60eaa6c71f6fbb40456e3}),
 * [MatrixExpressions](#d1/d10/classcv_1_1MatExpr_1MatrixExpressions})
 * 
 * @param mtx input matrix that must have CV_32FC1 or CV_64FC1 type and square size.
 */
export declare function determinant(mtx: InputArray): double

/**
 * The function [cv::dft](#d2/de8/group__core__array_1gadd6cf9baf2b8b704a11b5f04aaf4f39d}) performs one
 * of the following:
 * 
 * Forward the Fourier transform of a 1D vector of N elements: `\\[Y = F^{(N)} \\cdot X,\\]` where
 * `$F^{(N)}_{jk}=\\exp(-2\\pi i j k/N)$` and `$i=\\sqrt{-1}$`
 * Inverse the Fourier transform of a 1D vector of N elements: `\\[\\begin{array}{l} X'= \\left
 * (F^{(N)} \\right )^{-1} \\cdot Y = \\left (F^{(N)} \\right )^* \\cdot y \\\\ X = (1/N) \\cdot X,
 * \\end{array}\\]` where `$F^*=\\left(\\textrm{Re}(F^{(N)})-\\textrm{Im}(F^{(N)})\\right)^T$`
 * Forward the 2D Fourier transform of a M x N matrix: `\\[Y = F^{(M)} \\cdot X \\cdot F^{(N)}\\]`
 * Inverse the 2D Fourier transform of a M x N matrix: `\\[\\begin{array}{l} X'= \\left (F^{(M)}
 * \\right )^* \\cdot Y \\cdot \\left (F^{(N)} \\right )^* \\\\ X = \\frac{1}{M \\cdot N} \\cdot X'
 * \\end{array}\\]`
 * 
 * In case of real (single-channel) data, the output spectrum of the forward Fourier transform or input
 * spectrum of the inverse Fourier transform can be represented in a packed format called *CCS*
 * (complex-conjugate-symmetrical). It was borrowed from IPL (Intel* Image Processing Library). Here is
 * how 2D *CCS* spectrum looks: `\\[\\begin{bmatrix} Re Y_{0,0} & Re Y_{0,1} & Im Y_{0,1} & Re Y_{0,2}
 * & Im Y_{0,2} & \\cdots & Re Y_{0,N/2-1} & Im Y_{0,N/2-1} & Re Y_{0,N/2} \\\\ Re Y_{1,0} & Re Y_{1,1}
 * & Im Y_{1,1} & Re Y_{1,2} & Im Y_{1,2} & \\cdots & Re Y_{1,N/2-1} & Im Y_{1,N/2-1} & Re Y_{1,N/2}
 * \\\\ Im Y_{1,0} & Re Y_{2,1} & Im Y_{2,1} & Re Y_{2,2} & Im Y_{2,2} & \\cdots & Re Y_{2,N/2-1} & Im
 * Y_{2,N/2-1} & Im Y_{1,N/2} \\\\ \\hdotsfor{9} \\\\ Re Y_{M/2-1,0} & Re Y_{M-3,1} & Im Y_{M-3,1} &
 * \\hdotsfor{3} & Re Y_{M-3,N/2-1} & Im Y_{M-3,N/2-1}& Re Y_{M/2-1,N/2} \\\\ Im Y_{M/2-1,0} & Re
 * Y_{M-2,1} & Im Y_{M-2,1} & \\hdotsfor{3} & Re Y_{M-2,N/2-1} & Im Y_{M-2,N/2-1}& Im Y_{M/2-1,N/2}
 * \\\\ Re Y_{M/2,0} & Re Y_{M-1,1} & Im Y_{M-1,1} & \\hdotsfor{3} & Re Y_{M-1,N/2-1} & Im
 * Y_{M-1,N/2-1}& Re Y_{M/2,N/2} \\end{bmatrix}\\]`
 * 
 * In case of 1D transform of a real vector, the output looks like the first row of the matrix above.
 * 
 * So, the function chooses an operation mode depending on the flags and size of the input array:
 * 
 * If
 * [DFT_ROWS](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca1744dc1cf1249944bc841e78c1565b7f})
 * is set or the input array has a single row or single column, the function performs a 1D forward or
 * inverse transform of each row of a matrix when
 * [DFT_ROWS](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca1744dc1cf1249944bc841e78c1565b7f})
 * is set. Otherwise, it performs a 2D transform.
 * If the input array is real and
 * [DFT_INVERSE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca4e01d7e91cae1dbb68a26767d7b636be})
 * is not set, the function performs a forward 1D or 2D transform:
 * 
 * When
 * [DFT_COMPLEX_OUTPUT](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca07b45079b38d60e7837dfb666a55299b})
 * is set, the output is a complex matrix of the same size as input.
 * When
 * [DFT_COMPLEX_OUTPUT](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca07b45079b38d60e7837dfb666a55299b})
 * is not set, the output is a real matrix of the same size as input. In case of 2D transform, it uses
 * the packed format as shown above. In case of a single 1D transform, it looks like the first row of
 * the matrix above. In case of multiple 1D transforms (when using the
 * [DFT_ROWS](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca1744dc1cf1249944bc841e78c1565b7f})
 * flag), each row of the output matrix looks like the first row of the matrix above.
 * 
 * If the input array is complex and either
 * [DFT_INVERSE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca4e01d7e91cae1dbb68a26767d7b636be})
 * or
 * [DFT_REAL_OUTPUT](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca28347c7846e5eaed83e019cd003e8e03})
 * are not set, the output is a complex array of the same size as input. The function performs a
 * forward or inverse 1D or 2D transform of the whole input array or each row of the input array
 * independently, depending on the flags DFT_INVERSE and DFT_ROWS.
 * When
 * [DFT_INVERSE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca4e01d7e91cae1dbb68a26767d7b636be})
 * is set and the input array is real, or it is complex but
 * [DFT_REAL_OUTPUT](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca28347c7846e5eaed83e019cd003e8e03})
 * is set, the output is a real array of the same size as input. The function performs a 1D or 2D
 * inverse transformation of the whole input array or each individual row, depending on the flags
 * [DFT_INVERSE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca4e01d7e91cae1dbb68a26767d7b636be})
 * and
 * [DFT_ROWS](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca1744dc1cf1249944bc841e78c1565b7f}).
 * 
 * If
 * [DFT_SCALE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca74746fb171aa4bfc08ace28d73f52375})
 * is set, the scaling is done after the transformation.
 * 
 * Unlike dct , the function supports arrays of arbitrary size. But only those arrays are processed
 * efficiently, whose sizes can be factorized in a product of small prime numbers (2, 3, and 5 in the
 * current implementation). Such an efficient DFT size can be calculated using the getOptimalDFTSize
 * method.
 * 
 * The sample below illustrates how to calculate a DFT-based convolution of two 2D real arrays: 
 * 
 * ```cpp
 * void convolveDFT(InputArray A, InputArray B, OutputArray C)
 * {
 *     // reallocate the output array if needed
 *     C.create(abs(A.rows - B.rows)+1, abs(A.cols - B.cols)+1, A.type());
 *     Size dftSize;
 *     // calculate the size of DFT transform
 *     dftSize.width = getOptimalDFTSize(A.cols + B.cols - 1);
 *     dftSize.height = getOptimalDFTSize(A.rows + B.rows - 1);
 * 
 *     // allocate temporary buffers and initialize them with 0's
 *     Mat tempA(dftSize, A.type(), Scalar::all(0));
 *     Mat tempB(dftSize, B.type(), Scalar::all(0));
 * 
 *     // copy A and B to the top-left corners of tempA and tempB, respectively
 *     Mat roiA(tempA, Rect(0,0,A.cols,A.rows));
 *     A.copyTo(roiA);
 *     Mat roiB(tempB, Rect(0,0,B.cols,B.rows));
 *     B.copyTo(roiB);
 * 
 *     // now transform the padded A & B in-place;
 *     // use "nonzeroRows" hint for faster processing
 *     dft(tempA, tempA, 0, A.rows);
 *     dft(tempB, tempB, 0, B.rows);
 * 
 *     // multiply the spectrums;
 *     // the function handles packed spectrum representations well
 *     mulSpectrums(tempA, tempB, tempA);
 * 
 *     // transform the product back from the frequency domain.
 *     // Even though all the result rows will be non-zero,
 *     // you need only the first C.rows of them, and thus you
 *     // pass nonzeroRows == C.rows
 *     dft(tempA, tempA, DFT_INVERSE + DFT_SCALE, C.rows);
 * 
 *     // now copy the result back to C.
 *     tempA(Rect(0, 0, C.cols, C.rows)).copyTo(C);
 * 
 *     // all the temporary buffers will be deallocated automatically
 * }
 * ```
 * 
 *  To optimize this sample, consider the following approaches:
 * 
 * Since nonzeroRows != 0 is passed to the forward transform calls and since A and B are copied to the
 * top-left corners of tempA and tempB, respectively, it is not necessary to clear the whole tempA and
 * tempB. It is only necessary to clear the tempA.cols - A.cols ( tempB.cols - B.cols) rightmost
 * columns of the matrices.
 * This DFT-based convolution does not have to be applied to the whole big arrays, especially if B is
 * significantly smaller than A or vice versa. Instead, you can calculate convolution by parts. To do
 * this, you need to split the output array C into multiple tiles. For each tile, estimate which parts
 * of A and B are required to calculate convolution in this tile. If the tiles in C are too small, the
 * speed will decrease a lot because of repeated work. In the ultimate case, when each tile in C is a
 * single pixel, the algorithm becomes equivalent to the naive convolution algorithm. If the tiles are
 * too big, the temporary arrays tempA and tempB become too big and there is also a slowdown because of
 * bad cache locality. So, there is an optimal tile size somewhere in the middle.
 * If different tiles in C can be calculated in parallel and, thus, the convolution is done by parts,
 * the loop can be threaded.
 * 
 * All of the above improvements have been implemented in
 * [matchTemplate](#df/dfb/group__imgproc__object_1ga586ebfb0a7fb604b35a23d85391329be}) and
 * [filter2D](#d4/d86/group__imgproc__filter_1ga27c049795ce870216ddfb366086b5a04}) . Therefore, by
 * using them, you can get the performance even better than with the above theoretically optimal
 * implementation. Though, those two functions actually calculate cross-correlation, not convolution,
 * so you need to "flip" the second convolution operand B vertically and horizontally using flip . 
 * 
 * An example using the discrete fourier transform can be found at
 * opencv_source_code/samples/cpp/dft.cpp
 * (Python) An example using the dft functionality to perform Wiener deconvolution can be found at
 * opencv_source/samples/python/deconvolution.py
 * (Python) An example rearranging the quadrants of a Fourier image can be found at
 * opencv_source/samples/python/dft.py 
 * 
 * [dct](#d2/de8/group__core__array_1ga85aad4d668c01fbd64825f589e3696d4}) ,
 * [getOptimalDFTSize](#d2/de8/group__core__array_1ga6577a2e59968936ae02eb2edde5de299}) ,
 * [mulSpectrums](#d2/de8/group__core__array_1ga3ab38646463c59bf0ce962a9d51db64f}),
 * [filter2D](#d4/d86/group__imgproc__filter_1ga27c049795ce870216ddfb366086b5a04}) ,
 * [matchTemplate](#df/dfb/group__imgproc__object_1ga586ebfb0a7fb604b35a23d85391329be}) ,
 * [flip](#d2/de8/group__core__array_1gaca7be533e3dac7feb70fc60635adf441}) ,
 * [cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d}) ,
 * [magnitude](#d2/de8/group__core__array_1ga6d3b097586bca4409873d64a90fe64c3}) ,
 * [phase](#d2/de8/group__core__array_1ga9db9ca9b4d81c3bde5677b8f64dc0137})
 * 
 * @param src input array that could be real or complex.
 * @param dst output array whose size and type depends on the flags .
 * @param flags transformation flags, representing a combination of the DftFlags
 * @param nonzeroRows when the parameter is not zero, the function assumes that only the first
 * nonzeroRows rows of the input array (DFT_INVERSE is not set) or only the first nonzeroRows of the
 * output array (DFT_INVERSE is set) contain non-zeros, thus, the function can handle the rest of the
 * rows more efficiently and save some time; this technique is very useful for calculating array
 * cross-correlation or convolution using DFT.
 */
export declare function dft(src: InputArray, dst: OutputArray, flags?: int, nonzeroRows?: int): void

/**
 * The function [cv::divide](#d2/de8/group__core__array_1ga6db555d30115642fedae0cda05604874}) divides
 * one array by another: `\\[\\texttt{dst(I) = saturate(src1(I)*scale/src2(I))}\\]` or a scalar by an
 * array when there is no src1 : `\\[\\texttt{dst(I) = saturate(scale/src2(I))}\\]`
 * 
 * Different channels of multi-channel arrays are processed independently.
 * 
 * For integer types when src2(I) is zero, dst(I) will also be zero.
 * 
 * In case of floating point data there is no special defined behavior for zero src2(I) values. Regular
 * floating-point division is used. Expect correct IEEE-754 behaviour for floating-point data (with
 * NaN, Inf result values).
 * 
 * Saturation is not applied when the output array has the depth CV_32S. You may even get result of an
 * incorrect sign in the case of overflow. 
 * 
 * [multiply](#d2/de8/group__core__array_1ga979d898a58d7f61c53003e162e7ad89f}),
 * [add](#d2/de8/group__core__array_1ga10ac1bfb180e2cfda1701d06c24fdbd6}),
 * [subtract](#d2/de8/group__core__array_1gaa0f00d98b4b5edeaeb7b8333b2de353b})
 * 
 * @param src1 first input array.
 * @param src2 second input array of the same size and type as src1.
 * @param dst output array of the same size and type as src2.
 * @param scale scalar factor.
 * @param dtype optional depth of the output array; if -1, dst will have depth src2.depth(), but in
 * case of an array-by-array division, you can only pass -1 when src1.depth()==src2.depth().
 */
export declare function divide(src1: InputArray, src2: InputArray, dst: OutputArray, scale?: double, dtype?: int): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param scale 
 * @param src2 
 * @param dst 
 * @param dtype 
 */
export declare function divide(scale: double, src2: InputArray, dst: OutputArray, dtype?: int): void

/**
 * The function [cv::eigen](#d2/de8/group__core__array_1ga9fa0d58657f60eaa6c71f6fbb40456e3}) calculates
 * just eigenvalues, or eigenvalues and eigenvectors of the symmetric matrix src: 
 * 
 * ```cpp
 * src*eigenvectors.row(i).t() = eigenvalues.at<srcType>(i)*eigenvectors.row(i).t()
 * ```
 * 
 * Use [cv::eigenNonSymmetric](#d2/de8/group__core__array_1gaf51987e03cac8d171fbd2b327cf966f6}) for
 * calculation of real eigenvalues and eigenvectors of non-symmetric matrix.
 * 
 * [eigenNonSymmetric](#d2/de8/group__core__array_1gaf51987e03cac8d171fbd2b327cf966f6}),
 * [completeSymm](#d2/de8/group__core__array_1ga6847337c0c55769e115a70e0f011b5ca}) ,
 * [PCA](#d3/d8d/classcv_1_1PCA})
 * 
 * @param src input matrix that must have CV_32FC1 or CV_64FC1 type, square size and be symmetrical
 * (src ^T^ == src).
 * @param eigenvalues output vector of eigenvalues of the same type as src; the eigenvalues are stored
 * in the descending order.
 * @param eigenvectors output matrix of eigenvectors; it has the same size and type as src; the
 * eigenvectors are stored as subsequent matrix rows, in the same order as the corresponding
 * eigenvalues.
 */
export declare function eigen(src: InputArray, eigenvalues: OutputArray, eigenvectors?: OutputArray): bool

/**
 * Assumes real eigenvalues.
 * The function calculates eigenvalues and eigenvectors (optional) of the square matrix src: 
 * 
 * ```cpp
 * src*eigenvectors.row(i).t() = eigenvalues.at<srcType>(i)*eigenvectors.row(i).t()
 * ```
 * 
 * [eigen](#d2/de8/group__core__array_1ga9fa0d58657f60eaa6c71f6fbb40456e3})
 * 
 * @param src input matrix (CV_32FC1 or CV_64FC1 type).
 * @param eigenvalues output vector of eigenvalues (type is the same type as src).
 * @param eigenvectors output matrix of eigenvectors (type is the same type as src). The eigenvectors
 * are stored as subsequent matrix rows, in the same order as the corresponding eigenvalues.
 */
export declare function eigenNonSymmetric(src: InputArray, eigenvalues: OutputArray, eigenvectors: OutputArray): void

/**
 * The function [cv::exp](#d7/dcc/group__core__utils__softfloat_1ga1eb07a682abff20e0864104599c06fbc})
 * calculates the exponent of every element of the input array: `\\[\\texttt{dst} [I] = e^{ src(I)
 * }\\]`
 * 
 * The maximum relative error is about 7e-6 for single-precision input and less than 1e-10 for
 * double-precision input. Currently, the function converts denormalized values to zeros on output.
 * Special values (NaN, Inf) are not handled. 
 * 
 * [log](#d7/dcc/group__core__utils__softfloat_1gae5de78ee278fe88405c6dbc38502f7c1}) ,
 * [cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d}) ,
 * [polarToCart](#d2/de8/group__core__array_1ga581ff9d44201de2dd1b40a50db93d665}) ,
 * [phase](#d2/de8/group__core__array_1ga9db9ca9b4d81c3bde5677b8f64dc0137}) ,
 * [pow](#d7/dcc/group__core__utils__softfloat_1ga8bc36646a43b82baa15f151a973fb0c5}) ,
 * [sqrt](#d7/dcc/group__core__utils__softfloat_1ga682082a1892db64a2856403ec17ba297}) ,
 * [magnitude](#d2/de8/group__core__array_1ga6d3b097586bca4409873d64a90fe64c3})
 * 
 * @param src input array.
 * @param dst output array of the same size and type as src.
 */
export declare function exp(src: InputArray, dst: OutputArray): void

/**
 * [mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}),
 * [split](#d2/de8/group__core__array_1ga0547c7fed86152d7e9d0096029c8518a})
 * 
 * @param src input array
 * @param dst output array
 * @param coi index of channel to extract
 */
export declare function extractChannel(src: InputArray, dst: OutputArray, coi: int): void

/**
 * Given a binary matrix (likely returned from an operation such as
 * [threshold()](#d7/d1b/group__imgproc__misc_1gae8a4a146d1ca78c626a53577199e9c57}),
 * [compare()](#d2/de8/group__core__array_1ga303cfb72acf8cbb36d884650c09a3a97}), >, ==, etc, return all
 * of the non-zero indices as a [cv::Mat](#d3/d63/classcv_1_1Mat}) or std::vector<cv::Point> (x,y) For
 * example: 
 * 
 * ```cpp
 * cv::Mat binaryImage; // input, binary image
 * cv::Mat locations;   // output, locations of non-zero pixels
 * cv::findNonZero(binaryImage, locations);
 * 
 * // access pixel coordinates
 * Point pnt = locations.at<Point>(i);
 * ```
 * 
 *  or 
 * 
 * ```cpp
 * cv::Mat binaryImage; // input, binary image
 * vector<Point> locations;   // output, locations of non-zero pixels
 * cv::findNonZero(binaryImage, locations);
 * 
 * // access pixel coordinates
 * Point pnt = locations[i];
 * ```
 * 
 * @param src single-channel array
 * @param idx the output array, type of cv::Mat or std::vector<Point>, corresponding to non-zero
 * indices in the input
 */
export declare function findNonZero(src: InputArray, idx: OutputArray): void

/**
 * The function [cv::flip](#d2/de8/group__core__array_1gaca7be533e3dac7feb70fc60635adf441}) flips the
 * array in one of three different ways (row and column indices are 0-based): `\\[\\texttt{dst} _{ij} =
 * \\left\\{ \\begin{array}{l l} \\texttt{src} _{\\texttt{src.rows}-i-1,j} & if\\; \\texttt{flipCode} =
 * 0 \\\\ \\texttt{src} _{i, \\texttt{src.cols} -j-1} & if\\; \\texttt{flipCode} > 0 \\\\ \\texttt{src}
 * _{ \\texttt{src.rows} -i-1, \\texttt{src.cols} -j-1} & if\\; \\texttt{flipCode} < 0 \\\\
 * \\end{array} \\right.\\]` The example scenarios of using the function are the following: Vertical
 * flipping of the image (flipCode == 0) to switch between top-left and bottom-left image origin. This
 * is a typical operation in video processing on Microsoft Windows* OS. Horizontal flipping of the
 * image with the subsequent horizontal shift and absolute difference calculation to check for a
 * vertical-axis symmetry (flipCode > 0). Simultaneous horizontal and vertical flipping of the image
 * with the subsequent shift and absolute difference calculation to check for a central symmetry
 * (flipCode < 0). Reversing the order of point arrays (flipCode > 0 or flipCode == 0). 
 * 
 * [transpose](#d2/de8/group__core__array_1ga46630ed6c0ea6254a35f447289bd7404}) ,
 * [repeat](#d2/de8/group__core__array_1ga496c3860f3ac44c40b48811333cfda2d}) ,
 * [completeSymm](#d2/de8/group__core__array_1ga6847337c0c55769e115a70e0f011b5ca})
 * 
 * @param src input array.
 * @param dst output array of the same size and type as src.
 * @param flipCode a flag to specify how to flip the array; 0 means flipping around the x-axis and
 * positive value (for example, 1) means flipping around y-axis. Negative value (for example, -1) means
 * flipping around both axes.
 */
export declare function flip(src: InputArray, dst: OutputArray, flipCode: int): void

/**
 * The function [cv::gemm](#d2/de8/group__core__array_1gacb6e64071dffe36434e1e7ee79e7cb35}) performs
 * generalized matrix multiplication similar to the gemm functions in BLAS level 3. For example,
 * `gemm(src1, src2, alpha, src3, beta, dst, GEMM_1_T + GEMM_3_T)` corresponds to `\\[\\texttt{dst} =
 * \\texttt{alpha} \\cdot \\texttt{src1} ^T \\cdot \\texttt{src2} + \\texttt{beta} \\cdot
 * \\texttt{src3} ^T\\]`
 * 
 * In case of complex (two-channel) data, performed a complex matrix multiplication.
 * 
 * The function can be replaced with a matrix expression. For example, the above call can be replaced
 * with: 
 * 
 * ```cpp
 * dst = alpha*src1.t()*src2 + beta*src3.t();
 * ```
 * 
 * [mulTransposed](#d2/de8/group__core__array_1gadc4e49f8f7a155044e3be1b9e3b270ab}) ,
 * [transform](#d2/de8/group__core__array_1ga393164aa54bb9169ce0a8cc44e08ff22})
 * 
 * @param src1 first multiplied input matrix that could be real(CV_32FC1, CV_64FC1) or
 * complex(CV_32FC2, CV_64FC2).
 * @param src2 second multiplied input matrix of the same type as src1.
 * @param alpha weight of the matrix product.
 * @param src3 third optional delta matrix added to the matrix product; it should have the same type as
 * src1 and src2.
 * @param beta weight of src3.
 * @param dst output matrix; it has the proper size and the same type as input matrices.
 * @param flags operation flags (cv::GemmFlags)
 */
export declare function gemm(src1: InputArray, src2: InputArray, alpha: double, src3: InputArray, beta: double, dst: OutputArray, flags?: int): void

/**
 * DFT performance is not a monotonic function of a vector size. Therefore, when you calculate
 * convolution of two arrays or perform the spectral analysis of an array, it usually makes sense to
 * pad the input data with zeros to get a bit larger array that can be transformed much faster than the
 * original one. Arrays whose size is a power-of-two (2, 4, 8, 16, 32, ...) are the fastest to process.
 * Though, the arrays whose size is a product of 2's, 3's, and 5's (for example, 300 = 5*5*3*2*2) are
 * also processed quite efficiently.
 * 
 * The function
 * [cv::getOptimalDFTSize](#d2/de8/group__core__array_1ga6577a2e59968936ae02eb2edde5de299}) returns the
 * minimum number N that is greater than or equal to vecsize so that the DFT of a vector of size N can
 * be processed efficiently. In the current implementation N = 2 ^p^ * 3 ^q^ * 5 ^r^ for some integer
 * p, q, r.
 * 
 * The function returns a negative number if vecsize is too large (very close to INT_MAX ).
 * 
 * While the function cannot be used directly to estimate the optimal vector size for DCT transform
 * (since the current DCT implementation supports only even-size vectors), it can be easily processed
 * as getOptimalDFTSize((vecsize+1)/2)*2. 
 * 
 * [dft](#d2/de8/group__core__array_1gadd6cf9baf2b8b704a11b5f04aaf4f39d}) ,
 * [dct](#d2/de8/group__core__array_1ga85aad4d668c01fbd64825f589e3696d4}) ,
 * [idft](#d2/de8/group__core__array_1gaa708aa2d2e57a508f968eb0f69aa5ff1}) ,
 * [idct](#d2/de8/group__core__array_1ga77b168d84e564c50228b69730a227ef2}) ,
 * [mulSpectrums](#d2/de8/group__core__array_1ga3ab38646463c59bf0ce962a9d51db64f})
 * 
 * @param vecsize vector size.
 */
export declare function getOptimalDFTSize(vecsize: int): int

/**
 * The function horizontally concatenates two or more [cv::Mat](#d3/d63/classcv_1_1Mat}) matrices (with
 * the same number of rows). 
 * 
 * ```cpp
 * cv::Mat matArray[] = { cv::Mat(4, 1, CV_8UC1, cv::Scalar(1)),
 *                        cv::Mat(4, 1, CV_8UC1, cv::Scalar(2)),
 *                        cv::Mat(4, 1, CV_8UC1, cv::Scalar(3)),};
 * 
 * cv::Mat out;
 * cv::hconcat( matArray, 3, out );
 * //out:
 * //[1, 2, 3;
 * // 1, 2, 3;
 * // 1, 2, 3;
 * // 1, 2, 3]
 * ```
 * 
 * [cv::vconcat(const Mat*, size_t,
 * OutputArray)](#d2/de8/group__core__array_1ga744f53b69f6e4f12156cdde4e76aed27}), 
 * 
 * [cv::vconcat(InputArrayOfArrays,
 * OutputArray)](#d2/de8/group__core__array_1ga558e169e15adcc46b8cdcc6cd215070f}) and 
 * 
 * [cv::vconcat(InputArray, InputArray,
 * OutputArray)](#d2/de8/group__core__array_1gaad07cede730cdde64b90e987aad179b8})
 * 
 * @param src input array or vector of matrices. all of the matrices must have the same number of rows
 * and the same depth.
 * @param nsrc number of matrices in src.
 * @param dst output array. It has the same number of rows and depth as the src, and the sum of cols of
 * the src.
 */
export declare function hconcat(src: any, nsrc: size_t, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. 
 * 
 * ```cpp
 * cv::Mat_<float> A = (cv::Mat_<float>(3, 2) << 1, 4,
 *                                               2, 5,
 *                                               3, 6);
 * cv::Mat_<float> B = (cv::Mat_<float>(3, 2) << 7, 10,
 *                                               8, 11,
 *                                               9, 12);
 * 
 * cv::Mat C;
 * cv::hconcat(A, B, C);
 * //C:
 * //[1, 4, 7, 10;
 * // 2, 5, 8, 11;
 * // 3, 6, 9, 12]
 * ```
 * 
 * @param src1 first input array to be considered for horizontal concatenation.
 * @param src2 second input array to be considered for horizontal concatenation.
 * @param dst output array. It has the same number of rows and depth as the src1 and src2, and the sum
 * of cols of the src1 and src2.
 */
export declare function hconcat(src1: InputArray, src2: InputArray, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. 
 * 
 * ```cpp
 * std::vector<cv::Mat> matrices = { cv::Mat(4, 1, CV_8UC1, cv::Scalar(1)),
 *                                   cv::Mat(4, 1, CV_8UC1, cv::Scalar(2)),
 *                                   cv::Mat(4, 1, CV_8UC1, cv::Scalar(3)),};
 * 
 * cv::Mat out;
 * cv::hconcat( matrices, out );
 * //out:
 * //[1, 2, 3;
 * // 1, 2, 3;
 * // 1, 2, 3;
 * // 1, 2, 3]
 * ```
 * 
 * @param src input array or vector of matrices. all of the matrices must have the same number of rows
 * and the same depth.
 * @param dst output array. It has the same number of rows and depth as the src, and the sum of cols of
 * the src. same depth.
 */
export declare function hconcat(src: InputArrayOfArrays, dst: OutputArray): void

/**
 * idct(src, dst, flags) is equivalent to dct(src, dst, flags | DCT_INVERSE). 
 * 
 * [dct](#d2/de8/group__core__array_1ga85aad4d668c01fbd64825f589e3696d4}),
 * [dft](#d2/de8/group__core__array_1gadd6cf9baf2b8b704a11b5f04aaf4f39d}),
 * [idft](#d2/de8/group__core__array_1gaa708aa2d2e57a508f968eb0f69aa5ff1}),
 * [getOptimalDFTSize](#d2/de8/group__core__array_1ga6577a2e59968936ae02eb2edde5de299})
 * 
 * @param src input floating-point single-channel array.
 * @param dst output array of the same size and type as src.
 * @param flags operation flags.
 */
export declare function idct(src: InputArray, dst: OutputArray, flags?: int): void

/**
 * idft(src, dst, flags) is equivalent to dft(src, dst, flags |
 * [DFT_INVERSE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca4e01d7e91cae1dbb68a26767d7b636be}))
 * . 
 * 
 * None of dft and idft scales the result by default. So, you should pass
 * [DFT_SCALE](#d2/de8/group__core__array_1ggaf4dde112b483b38175621befedda1f1ca74746fb171aa4bfc08ace28d73f52375})
 * to one of dft or idft explicitly to make these transforms mutually inverse. 
 * 
 * [dft](#d2/de8/group__core__array_1gadd6cf9baf2b8b704a11b5f04aaf4f39d}),
 * [dct](#d2/de8/group__core__array_1ga85aad4d668c01fbd64825f589e3696d4}),
 * [idct](#d2/de8/group__core__array_1ga77b168d84e564c50228b69730a227ef2}),
 * [mulSpectrums](#d2/de8/group__core__array_1ga3ab38646463c59bf0ce962a9d51db64f}),
 * [getOptimalDFTSize](#d2/de8/group__core__array_1ga6577a2e59968936ae02eb2edde5de299})
 * 
 * @param src input floating-point real or complex array.
 * @param dst output array whose size and type depend on the flags.
 * @param flags operation flags (see dft and DftFlags).
 * @param nonzeroRows number of dst rows to process; the rest of the rows have undefined content (see
 * the convolution sample in dft description.
 */
export declare function idft(src: InputArray, dst: OutputArray, flags?: int, nonzeroRows?: int): void

/**
 * The function checks the range as follows:
 * 
 * For every element of a single-channel input array: `\\[\\texttt{dst} (I)= \\texttt{lowerb} (I)_0
 * \\leq \\texttt{src} (I)_0 \\leq \\texttt{upperb} (I)_0\\]`
 * For two-channel arrays: `\\[\\texttt{dst} (I)= \\texttt{lowerb} (I)_0 \\leq \\texttt{src} (I)_0
 * \\leq \\texttt{upperb} (I)_0 \\land \\texttt{lowerb} (I)_1 \\leq \\texttt{src} (I)_1 \\leq
 * \\texttt{upperb} (I)_1\\]`
 * and so forth.
 * 
 * That is, dst (I) is set to 255 (all 1 -bits) if src (I) is within the specified 1D, 2D, 3D, ... box
 * and 0 otherwise.
 * 
 * When the lower and/or upper boundary parameters are scalars, the indexes (I) at lowerb and upperb in
 * the above formulas should be omitted.
 * 
 * @param src first input array.
 * @param lowerb inclusive lower boundary array or a scalar.
 * @param upperb inclusive upper boundary array or a scalar.
 * @param dst output array of the same size as src and CV_8U type.
 */
export declare function inRange(src: InputArray, lowerb: InputArray, upperb: InputArray, dst: OutputArray): void

/**
 * [mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}),
 * [merge](#d2/de8/group__core__array_1ga7d7b4d6c6ee504b30a20b1680029c7b4})
 * 
 * @param src input array
 * @param dst output array
 * @param coi index of channel for insertion
 */
export declare function insertChannel(src: InputArray, dst: InputOutputArray, coi: int): void

/**
 * The function [cv::invert](#d2/de8/group__core__array_1gad278044679d4ecf20f7622cc151aaaa2}) inverts
 * the matrix src and stores the result in dst . When the matrix src is singular or non-square, the
 * function calculates the pseudo-inverse matrix (the dst matrix) so that norm(src*dst - I) is minimal,
 * where I is an identity matrix.
 * 
 * In case of the
 * [DECOMP_LU](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca247a3455cd64973152e17e26999dc024})
 * method, the function returns non-zero value if the inverse has been successfully calculated and 0 if
 * src is singular.
 * 
 * In case of the
 * [DECOMP_SVD](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca523b676c90c7a1d2841b1267ba9ba614})
 * method, the function returns the inverse condition number of src (the ratio of the smallest singular
 * value to the largest singular value) and 0 if src is singular. The [SVD](#df/df7/classcv_1_1SVD})
 * method calculates a pseudo-inverse matrix if src is singular.
 * 
 * Similarly to
 * [DECOMP_LU](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca247a3455cd64973152e17e26999dc024}),
 * the method
 * [DECOMP_CHOLESKY](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca33cf860f98004310374a81d2c01715da})
 * works only with non-singular square matrices that should also be symmetrical and positively defined.
 * In this case, the function stores the inverted matrix in dst and returns non-zero. Otherwise, it
 * returns 0.
 * 
 * [solve](#d2/de8/group__core__array_1ga12b43690dbd31fed96f213eefead2373}),
 * [SVD](#df/df7/classcv_1_1SVD})
 * 
 * @param src input floating-point M x N matrix.
 * @param dst output matrix of N x M size and the same type as src.
 * @param flags inversion method (cv::DecompTypes)
 */
export declare function invert(src: InputArray, dst: OutputArray, flags?: int): double

/**
 * The function [cv::log](#d7/dcc/group__core__utils__softfloat_1gae5de78ee278fe88405c6dbc38502f7c1})
 * calculates the natural logarithm of every element of the input array: `\\[\\texttt{dst} (I) = \\log
 * (\\texttt{src}(I)) \\]`
 * 
 * Output on zero, negative and special (NaN, Inf) values is undefined.
 * 
 * [exp](#d7/dcc/group__core__utils__softfloat_1ga1eb07a682abff20e0864104599c06fbc}),
 * [cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d}),
 * [polarToCart](#d2/de8/group__core__array_1ga581ff9d44201de2dd1b40a50db93d665}),
 * [phase](#d2/de8/group__core__array_1ga9db9ca9b4d81c3bde5677b8f64dc0137}),
 * [pow](#d7/dcc/group__core__utils__softfloat_1ga8bc36646a43b82baa15f151a973fb0c5}),
 * [sqrt](#d7/dcc/group__core__utils__softfloat_1ga682082a1892db64a2856403ec17ba297}),
 * [magnitude](#d2/de8/group__core__array_1ga6d3b097586bca4409873d64a90fe64c3})
 * 
 * @param src input array.
 * @param dst output array of the same size and type as src .
 */
export declare function log(src: InputArray, dst: OutputArray): void

/**
 * The function LUT fills the output array with values from the look-up table. Indices of the entries
 * are taken from the input array. That is, the function processes each element of src as follows:
 * `\\[\\texttt{dst} (I) \\leftarrow \\texttt{lut(src(I) + d)}\\]` where `\\[d = \\fork{0}{if
 * \\(\\texttt{src}\\) has depth \\(\\texttt{CV_8U}\\)}{128}{if \\(\\texttt{src}\\) has depth
 * \\(\\texttt{CV_8S}\\)}\\]` 
 * 
 * [convertScaleAbs](#d2/de8/group__core__array_1ga3460e9c9f37b563ab9dd550c4d8c4e7d}),
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b})
 * 
 * @param src input array of 8-bit elements.
 * @param lut look-up table of 256 elements; in case of multi-channel input array, the table should
 * either have a single channel (in this case the same table is used for all channels) or the same
 * number of channels as in the input array.
 * @param dst output array of the same size and number of channels as src, and the same depth as lut.
 */
export declare function LUT(src: InputArray, lut: InputArray, dst: OutputArray): void

/**
 * The function [cv::magnitude](#d2/de8/group__core__array_1ga6d3b097586bca4409873d64a90fe64c3})
 * calculates the magnitude of 2D vectors formed from the corresponding elements of x and y arrays:
 * `\\[\\texttt{dst} (I) = \\sqrt{\\texttt{x}(I)^2 + \\texttt{y}(I)^2}\\]` 
 * 
 * [cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d}),
 * [polarToCart](#d2/de8/group__core__array_1ga581ff9d44201de2dd1b40a50db93d665}),
 * [phase](#d2/de8/group__core__array_1ga9db9ca9b4d81c3bde5677b8f64dc0137}),
 * [sqrt](#d7/dcc/group__core__utils__softfloat_1ga682082a1892db64a2856403ec17ba297})
 * 
 * @param x floating-point array of x-coordinates of the vectors.
 * @param y floating-point array of y-coordinates of the vectors; it must have the same size as x.
 * @param magnitude output array of the same size and type as x.
 */
export declare function magnitude(x: InputArray, y: InputArray, magnitude: OutputArray): void

/**
 * The function [cv::Mahalanobis](#d2/de8/group__core__array_1ga4493aee129179459cbfc6064f051aa7d})
 * calculates and returns the weighted distance between two vectors: `\\[d( \\texttt{vec1} ,
 * \\texttt{vec2} )=
 * \\sqrt{\\sum_{i,j}{\\texttt{icovar(i,j)}\\cdot(\\texttt{vec1}(I)-\\texttt{vec2}(I))\\cdot(\\texttt{vec1(j)}-\\texttt{vec2(j)})}
 * }\\]` The covariance matrix may be calculated using the
 * [calcCovarMatrix](#d2/de8/group__core__array_1gae6ffa9354633f984246945d52823165d}) function and then
 * inverted using the invert function (preferably using the
 * [DECOMP_SVD](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca523b676c90c7a1d2841b1267ba9ba614})
 * method, as the most accurate).
 * 
 * @param v1 first 1D input vector.
 * @param v2 second 1D input vector.
 * @param icovar inverse covariance matrix.
 */
export declare function Mahalanobis(v1: InputArray, v2: InputArray, icovar: InputArray): double

/**
 * The function [cv::max](#d7/dcc/group__core__utils__softfloat_1ga78f988f6cfa6223610298cbd4f86ec66})
 * calculates the per-element maximum of two arrays: `\\[\\texttt{dst} (I)= \\max ( \\texttt{src1} (I),
 * \\texttt{src2} (I))\\]` or array and a scalar: `\\[\\texttt{dst} (I)= \\max ( \\texttt{src1} (I),
 * \\texttt{value} )\\]` 
 * 
 * [min](#d7/dcc/group__core__utils__softfloat_1gac48df53b8fd34b87e7b121fa8fd4c379}),
 * [compare](#d2/de8/group__core__array_1ga303cfb72acf8cbb36d884650c09a3a97}),
 * [inRange](#d2/de8/group__core__array_1ga48af0ab51e36436c5d04340e036ce981}),
 * [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707}),
 * [MatrixExpressions](#d1/d10/classcv_1_1MatExpr_1MatrixExpressions})
 * 
 * @param src1 first input array.
 * @param src2 second input array of the same size and type as src1 .
 * @param dst output array of the same size and type as src1.
 */
export declare function max(src1: InputArray, src2: InputArray, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. needed to avoid conflicts with const _Tp& std::min(const _Tp&,
 * const _Tp&, _Compare)
 * 
 * @param src1 
 * @param src2 
 * @param dst 
 */
export declare function max(src1: any, src2: any, dst: any): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. needed to avoid conflicts with const _Tp& std::min(const _Tp&,
 * const _Tp&, _Compare)
 * 
 * @param src1 
 * @param src2 
 * @param dst 
 */
export declare function max(src1: any, src2: any, dst: any): void

/**
 * The function [cv::mean](#d2/de8/group__core__array_1ga191389f8a0e58180bb13a727782cd461}) calculates
 * the mean value M of array elements, independently for each channel, and return it:
 * `\\[\\begin{array}{l} N = \\sum _{I: \\; \\texttt{mask} (I) \\ne 0} 1 \\\\ M_c = \\left ( \\sum _{I:
 * \\; \\texttt{mask} (I) \\ne 0}{ \\texttt{mtx} (I)_c} \\right )/N \\end{array}\\]` When all the mask
 * elements are 0's, the function returns Scalar::all(0) 
 * 
 * [countNonZero](#d2/de8/group__core__array_1gaa4b89393263bb4d604e0fe5986723914}),
 * [meanStdDev](#d2/de8/group__core__array_1ga846c858f4004d59493d7c6a4354b301d}),
 * [norm](#dc/d84/group__core__basic_1ga4e556cb8ad35a643a1ea66e035711bb9}),
 * [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707})
 * 
 * @param src input array that should have from 1 to 4 channels so that the result can be stored in
 * Scalar_ .
 * @param mask optional operation mask.
 */
export declare function mean(src: InputArray, mask?: InputArray): Scalar

/**
 * Calculates a mean and standard deviation of array elements.
 * 
 * The function [cv::meanStdDev](#d2/de8/group__core__array_1ga846c858f4004d59493d7c6a4354b301d})
 * calculates the mean and the standard deviation M of array elements independently for each channel
 * and returns it via the output parameters: `\\[\\begin{array}{l} N = \\sum _{I, \\texttt{mask} (I)
 * \\ne 0} 1 \\\\ \\texttt{mean} _c = \\frac{\\sum_{ I: \\; \\texttt{mask}(I) \\ne 0} \\texttt{src}
 * (I)_c}{N} \\\\ \\texttt{stddev} _c = \\sqrt{\\frac{\\sum_{ I: \\; \\texttt{mask}(I) \\ne 0} \\left (
 * \\texttt{src} (I)_c - \\texttt{mean} _c \\right )^2}{N}} \\end{array}\\]` When all the mask elements
 * are 0's, the function returns mean=stddev=Scalar::all(0). 
 * 
 * The calculated standard deviation is only the diagonal of the complete normalized covariance matrix.
 * If the full matrix is needed, you can reshape the multi-channel array M x N to the single-channel
 * array M*N x mtx.channels() (only possible when the matrix is continuous) and then pass the matrix to
 * calcCovarMatrix . 
 * 
 * [countNonZero](#d2/de8/group__core__array_1gaa4b89393263bb4d604e0fe5986723914}),
 * [mean](#d2/de8/group__core__array_1ga191389f8a0e58180bb13a727782cd461}),
 * [norm](#dc/d84/group__core__basic_1ga4e556cb8ad35a643a1ea66e035711bb9}),
 * [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707}),
 * [calcCovarMatrix](#d2/de8/group__core__array_1gae6ffa9354633f984246945d52823165d})
 * 
 * @param src input array that should have from 1 to 4 channels so that the results can be stored in
 * Scalar_ 's.
 * @param mean output parameter: calculated mean value.
 * @param stddev output parameter: calculated standard deviation.
 * @param mask optional operation mask.
 */
export declare function meanStdDev(src: InputArray, mean: OutputArray, stddev: OutputArray, mask?: InputArray): void

/**
 * The function [cv::merge](#d2/de8/group__core__array_1ga7d7b4d6c6ee504b30a20b1680029c7b4}) merges
 * several arrays to make a single multi-channel array. That is, each element of the output array will
 * be a concatenation of the elements of the input arrays, where elements of i-th input array are
 * treated as mv[i].channels()-element vectors.
 * 
 * The function [cv::split](#d2/de8/group__core__array_1ga0547c7fed86152d7e9d0096029c8518a}) does the
 * reverse operation. If you need to shuffle channels in some other advanced way, use
 * [cv::mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}).
 * 
 * The following example shows how to merge 3 single channel matrices into a single 3-channel matrix. 
 * 
 * ```cpp
 *     Mat m1 = (Mat_<uchar>(2,2) << 1,4,7,10);
 *     Mat m2 = (Mat_<uchar>(2,2) << 2,5,8,11);
 *     Mat m3 = (Mat_<uchar>(2,2) << 3,6,9,12);
 * 
 *     Mat channels[3] = {m1, m2, m3};
 *     Mat m;
 *     merge(channels, 3, m);
 *     /*
 *     m =
 *     [  1,   2,   3,   4,   5,   6;
 *        7,   8,   9,  10,  11,  12]
 *     m.channels() = 3
 * \/
 * ```
 * 
 * [mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}),
 * [split](#d2/de8/group__core__array_1ga0547c7fed86152d7e9d0096029c8518a}),
 * [Mat::reshape](#d3/d63/classcv_1_1Mat_1a4eb96e3251417fa88b78e2abd6cfd7d8})
 * 
 * @param mv input array of matrices to be merged; all the matrices in mv must have the same size and
 * the same depth.
 * @param count number of input matrices when mv is a plain C array; it must be greater than zero.
 * @param dst output array of the same size and the same depth as mv[0]; The number of channels will be
 * equal to the parameter count.
 */
export declare function merge(mv: any, count: size_t, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param mv input vector of matrices to be merged; all the matrices in mv must have the same size and
 * the same depth.
 * @param dst output array of the same size and the same depth as mv[0]; The number of channels will be
 * the total number of channels in the matrix array.
 */
export declare function merge(mv: InputArrayOfArrays, dst: OutputArray): void

/**
 * The function [cv::min](#d7/dcc/group__core__utils__softfloat_1gac48df53b8fd34b87e7b121fa8fd4c379})
 * calculates the per-element minimum of two arrays: `\\[\\texttt{dst} (I)= \\min ( \\texttt{src1} (I),
 * \\texttt{src2} (I))\\]` or array and a scalar: `\\[\\texttt{dst} (I)= \\min ( \\texttt{src1} (I),
 * \\texttt{value} )\\]` 
 * 
 * [max](#d7/dcc/group__core__utils__softfloat_1ga78f988f6cfa6223610298cbd4f86ec66}),
 * [compare](#d2/de8/group__core__array_1ga303cfb72acf8cbb36d884650c09a3a97}),
 * [inRange](#d2/de8/group__core__array_1ga48af0ab51e36436c5d04340e036ce981}),
 * [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707})
 * 
 * @param src1 first input array.
 * @param src2 second input array of the same size and type as src1.
 * @param dst output array of the same size and type as src1.
 */
export declare function min(src1: InputArray, src2: InputArray, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. needed to avoid conflicts with const _Tp& std::min(const _Tp&,
 * const _Tp&, _Compare)
 * 
 * @param src1 
 * @param src2 
 * @param dst 
 */
export declare function min(src1: any, src2: any, dst: any): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. needed to avoid conflicts with const _Tp& std::min(const _Tp&,
 * const _Tp&, _Compare)
 * 
 * @param src1 
 * @param src2 
 * @param dst 
 */
export declare function min(src1: any, src2: any, dst: any): void

/**
 * The function [cv::minMaxIdx](#d2/de8/group__core__array_1ga7622c466c628a75d9ed008b42250a73f}) finds
 * the minimum and maximum element values and their positions. The extremums are searched across the
 * whole array or, if mask is not an empty array, in the specified array region. The function does not
 * work with multi-channel arrays. If you need to find minimum or maximum elements across all the
 * channels, use [Mat::reshape](#d3/d63/classcv_1_1Mat_1a4eb96e3251417fa88b78e2abd6cfd7d8}) first to
 * reinterpret the array as single-channel. Or you may extract the particular channel using either
 * extractImageCOI , or mixChannels , or split . In case of a sparse matrix, the minimum is found among
 * non-zero elements only. 
 * 
 * When minIdx is not NULL, it must have at least 2 elements (as well as maxIdx), even if src is a
 * single-row or single-column matrix. In OpenCV (following MATLAB) each array has at least 2
 * dimensions, i.e. single-column matrix is Mx1 matrix (and therefore minIdx/maxIdx will be
 * (i1,0)/(i2,0)) and single-row matrix is 1xN matrix (and therefore minIdx/maxIdx will be
 * (0,j1)/(0,j2)).
 * 
 * @param src input single-channel array.
 * @param minVal pointer to the returned minimum value; NULL is used if not required.
 * @param maxVal pointer to the returned maximum value; NULL is used if not required.
 * @param minIdx pointer to the returned minimum location (in nD case); NULL is used if not required;
 * Otherwise, it must point to an array of src.dims elements, the coordinates of the minimum element in
 * each dimension are stored there sequentially.
 * @param maxIdx pointer to the returned maximum location (in nD case). NULL is used if not required.
 * @param mask specified array region
 */
export declare function minMaxIdx(src: InputArray, minVal: any, maxVal?: any, minIdx?: any, maxIdx?: any, mask?: InputArray): void

/**
 * The function [cv::minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707}) finds
 * the minimum and maximum element values and their positions. The extremums are searched across the
 * whole array or, if mask is not an empty array, in the specified array region.
 * 
 * The function do not work with multi-channel arrays. If you need to find minimum or maximum elements
 * across all the channels, use
 * [Mat::reshape](#d3/d63/classcv_1_1Mat_1a4eb96e3251417fa88b78e2abd6cfd7d8}) first to reinterpret the
 * array as single-channel. Or you may extract the particular channel using either extractImageCOI , or
 * mixChannels , or split . 
 * 
 * [max](#d7/dcc/group__core__utils__softfloat_1ga78f988f6cfa6223610298cbd4f86ec66}),
 * [min](#d7/dcc/group__core__utils__softfloat_1gac48df53b8fd34b87e7b121fa8fd4c379}),
 * [compare](#d2/de8/group__core__array_1ga303cfb72acf8cbb36d884650c09a3a97}),
 * [inRange](#d2/de8/group__core__array_1ga48af0ab51e36436c5d04340e036ce981}), extractImageCOI,
 * [mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}),
 * [split](#d2/de8/group__core__array_1ga0547c7fed86152d7e9d0096029c8518a}),
 * [Mat::reshape](#d3/d63/classcv_1_1Mat_1a4eb96e3251417fa88b78e2abd6cfd7d8})
 * 
 * @param src input single-channel array.
 * @param minVal pointer to the returned minimum value; NULL is used if not required.
 * @param maxVal pointer to the returned maximum value; NULL is used if not required.
 * @param minLoc pointer to the returned minimum location (in 2D case); NULL is used if not required.
 * @param maxLoc pointer to the returned maximum location (in 2D case); NULL is used if not required.
 * @param mask optional mask used to select a sub-array.
 */
export declare function minMaxLoc(src: InputArray, minVal: any, maxVal?: any, minLoc?: any, maxLoc?: any, mask?: InputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param a input single-channel array.
 * @param minVal pointer to the returned minimum value; NULL is used if not required.
 * @param maxVal pointer to the returned maximum value; NULL is used if not required.
 * @param minIdx pointer to the returned minimum location (in nD case); NULL is used if not required;
 * Otherwise, it must point to an array of src.dims elements, the coordinates of the minimum element in
 * each dimension are stored there sequentially.
 * @param maxIdx pointer to the returned maximum location (in nD case). NULL is used if not required.
 */
export declare function minMaxLoc(a: any, minVal: any, maxVal: any, minIdx?: any, maxIdx?: any): void

/**
 * The function [cv::mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be})
 * provides an advanced mechanism for shuffling image channels.
 * 
 * [cv::split](#d2/de8/group__core__array_1ga0547c7fed86152d7e9d0096029c8518a}),[cv::merge](#d2/de8/group__core__array_1ga7d7b4d6c6ee504b30a20b1680029c7b4}),[cv::extractChannel](#d2/de8/group__core__array_1gacc6158574aa1f0281878c955bcf35642}),[cv::insertChannel](#d2/de8/group__core__array_1ga1d4bd886d35b00ec0b764cb4ce6eb515})
 * and some forms of
 * [cv::cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab}) are
 * partial cases of [cv::mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}).
 * 
 * In the example below, the code splits a 4-channel BGRA image into a 3-channel BGR (with B and R
 * channels swapped) and a separate alpha-channel image: 
 * 
 * ```cpp
 * Mat bgra( 100, 100, CV_8UC4, Scalar(255,0,0,255) );
 * Mat bgr( bgra.rows, bgra.cols, CV_8UC3 );
 * Mat alpha( bgra.rows, bgra.cols, CV_8UC1 );
 * 
 * // forming an array of matrices is a quite efficient operation,
 * // because the matrix data is not copied, only the headers
 * Mat out[] = { bgr, alpha };
 * // bgra[0] -> bgr[2], bgra[1] -> bgr[1],
 * // bgra[2] -> bgr[0], bgra[3] -> alpha[0]
 * int from_to[] = { 0,2, 1,1, 2,0, 3,3 };
 * mixChannels( &bgra, 1, out, 2, from_to, 4 );
 * ```
 * 
 * Unlike many other new-style C++ functions in OpenCV (see the introduction section and
 * [Mat::create](#d3/d63/classcv_1_1Mat_1a55ced2c8d844d683ea9a725c60037ad0}) ),
 * [cv::mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}) requires the
 * output arrays to be pre-allocated before calling the function. 
 * 
 * [split](#d2/de8/group__core__array_1ga0547c7fed86152d7e9d0096029c8518a}),
 * [merge](#d2/de8/group__core__array_1ga7d7b4d6c6ee504b30a20b1680029c7b4}),
 * [extractChannel](#d2/de8/group__core__array_1gacc6158574aa1f0281878c955bcf35642}),
 * [insertChannel](#d2/de8/group__core__array_1ga1d4bd886d35b00ec0b764cb4ce6eb515}),
 * [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab})
 * 
 * @param src input array or vector of matrices; all of the matrices must have the same size and the
 * same depth.
 * @param nsrcs number of matrices in src.
 * @param dst output array or vector of matrices; all the matrices must be allocated; their size and
 * depth must be the same as in src[0].
 * @param ndsts number of matrices in dst.
 * @param fromTo array of index pairs specifying which channels are copied and where; fromTo[k*2] is a
 * 0-based index of the input channel in src, fromTo[k*2+1] is an index of the output channel in dst;
 * the continuous channel numbering is used: the first input image channels are indexed from 0 to
 * src[0].channels()-1, the second input image channels are indexed from src[0].channels() to
 * src[0].channels() + src[1].channels()-1, and so on, the same scheme is used for the output image
 * channels; as a special case, when fromTo[k*2] is negative, the corresponding output channel is
 * filled with zero .
 * @param npairs number of index pairs in fromTo.
 */
export declare function mixChannels(src: any, nsrcs: size_t, dst: any, ndsts: size_t, fromTo: any, npairs: size_t): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param src input array or vector of matrices; all of the matrices must have the same size and the
 * same depth.
 * @param dst output array or vector of matrices; all the matrices must be allocated; their size and
 * depth must be the same as in src[0].
 * @param fromTo array of index pairs specifying which channels are copied and where; fromTo[k*2] is a
 * 0-based index of the input channel in src, fromTo[k*2+1] is an index of the output channel in dst;
 * the continuous channel numbering is used: the first input image channels are indexed from 0 to
 * src[0].channels()-1, the second input image channels are indexed from src[0].channels() to
 * src[0].channels() + src[1].channels()-1, and so on, the same scheme is used for the output image
 * channels; as a special case, when fromTo[k*2] is negative, the corresponding output channel is
 * filled with zero .
 * @param npairs number of index pairs in fromTo.
 */
export declare function mixChannels(src: InputArrayOfArrays, dst: InputOutputArrayOfArrays, fromTo: any, npairs: size_t): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param src input array or vector of matrices; all of the matrices must have the same size and the
 * same depth.
 * @param dst output array or vector of matrices; all the matrices must be allocated; their size and
 * depth must be the same as in src[0].
 * @param fromTo array of index pairs specifying which channels are copied and where; fromTo[k*2] is a
 * 0-based index of the input channel in src, fromTo[k*2+1] is an index of the output channel in dst;
 * the continuous channel numbering is used: the first input image channels are indexed from 0 to
 * src[0].channels()-1, the second input image channels are indexed from src[0].channels() to
 * src[0].channels() + src[1].channels()-1, and so on, the same scheme is used for the output image
 * channels; as a special case, when fromTo[k*2] is negative, the corresponding output channel is
 * filled with zero .
 */
export declare function mixChannels(src: InputArrayOfArrays, dst: InputOutputArrayOfArrays, fromTo: any): void

/**
 * The function [cv::mulSpectrums](#d2/de8/group__core__array_1ga3ab38646463c59bf0ce962a9d51db64f})
 * performs the per-element multiplication of the two CCS-packed or complex matrices that are results
 * of a real or complex Fourier transform.
 * 
 * The function, together with dft and idft , may be used to calculate convolution (pass conjB=false )
 * or correlation (pass conjB=true ) of two arrays rapidly. When the arrays are complex, they are
 * simply multiplied (per element) with an optional conjugation of the second-array elements. When the
 * arrays are real, they are assumed to be CCS-packed (see dft for details).
 * 
 * @param a first input array.
 * @param b second input array of the same size and type as src1 .
 * @param c output array of the same size and type as src1 .
 * @param flags operation flags; currently, the only supported flag is cv::DFT_ROWS, which indicates
 * that each row of src1 and src2 is an independent 1D Fourier spectrum. If you do not want to use this
 * flag, then simply add a 0 as value.
 * @param conjB optional flag that conjugates the second input array before the multiplication (true)
 * or not (false).
 */
export declare function mulSpectrums(a: InputArray, b: InputArray, c: OutputArray, flags: int, conjB?: bool): void

/**
 * The function multiply calculates the per-element product of two arrays:
 * 
 * `\\[\\texttt{dst} (I)= \\texttt{saturate} ( \\texttt{scale} \\cdot \\texttt{src1} (I) \\cdot
 * \\texttt{src2} (I))\\]`
 * 
 * There is also a [MatrixExpressions](#d1/d10/classcv_1_1MatExpr_1MatrixExpressions}) -friendly
 * variant of the first function. See
 * [Mat::mul](#d3/d63/classcv_1_1Mat_1a385c09827713dc3e6d713bfad8460706}) .
 * 
 * For a not-per-element matrix product, see gemm .
 * 
 * Saturation is not applied when the output array has the depth CV_32S. You may even get result of an
 * incorrect sign in the case of overflow. 
 * 
 * [add](#d2/de8/group__core__array_1ga10ac1bfb180e2cfda1701d06c24fdbd6}),
 * [subtract](#d2/de8/group__core__array_1gaa0f00d98b4b5edeaeb7b8333b2de353b}),
 * [divide](#d2/de8/group__core__array_1ga6db555d30115642fedae0cda05604874}),
 * [scaleAdd](#d2/de8/group__core__array_1ga9e0845db4135f55dcf20227402f00d98}),
 * [addWeighted](#d2/de8/group__core__array_1gafafb2513349db3bcff51f54ee5592a19}),
 * [accumulate](#d7/df3/group__imgproc__motion_1ga1a567a79901513811ff3b9976923b199}),
 * [accumulateProduct](#d7/df3/group__imgproc__motion_1ga82518a940ecfda49460f66117ac82520}),
 * [accumulateSquare](#d7/df3/group__imgproc__motion_1gacb75e7ffb573227088cef9ceaf80be8c}),
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b})
 * 
 * @param src1 first input array.
 * @param src2 second input array of the same size and the same type as src1.
 * @param dst output array of the same size and type as src1.
 * @param scale optional scale factor.
 * @param dtype optional depth of the output array
 */
export declare function multiply(src1: InputArray, src2: InputArray, dst: OutputArray, scale?: double, dtype?: int): void

/**
 * The function [cv::mulTransposed](#d2/de8/group__core__array_1gadc4e49f8f7a155044e3be1b9e3b270ab})
 * calculates the product of src and its transposition: `\\[\\texttt{dst} = \\texttt{scale} (
 * \\texttt{src} - \\texttt{delta} )^T ( \\texttt{src} - \\texttt{delta} )\\]` if aTa=true , and
 * `\\[\\texttt{dst} = \\texttt{scale} ( \\texttt{src} - \\texttt{delta} ) ( \\texttt{src} -
 * \\texttt{delta} )^T\\]` otherwise. The function is used to calculate the covariance matrix. With
 * zero delta, it can be used as a faster substitute for general matrix product A*B when B=A' 
 * 
 * [calcCovarMatrix](#d2/de8/group__core__array_1gae6ffa9354633f984246945d52823165d}),
 * [gemm](#d2/de8/group__core__array_1gacb6e64071dffe36434e1e7ee79e7cb35}),
 * [repeat](#d2/de8/group__core__array_1ga496c3860f3ac44c40b48811333cfda2d}),
 * [reduce](#d2/de8/group__core__array_1ga4b78072a303f29d9031d56e5638da78e})
 * 
 * @param src input single-channel matrix. Note that unlike gemm, the function can multiply not only
 * floating-point matrices.
 * @param dst output square matrix.
 * @param aTa Flag specifying the multiplication ordering. See the description below.
 * @param delta Optional delta matrix subtracted from src before the multiplication. When the matrix is
 * empty ( delta=noArray() ), it is assumed to be zero, that is, nothing is subtracted. If it has the
 * same size as src , it is simply subtracted. Otherwise, it is "repeated" (see repeat ) to cover the
 * full src and then subtracted. Type of the delta matrix, when it is not empty, must be the same as
 * the type of created output matrix. See the dtype parameter description below.
 * @param scale Optional scale factor for the matrix product.
 * @param dtype Optional type of the output matrix. When it is negative, the output matrix will have
 * the same type as src . Otherwise, it will be type=CV_MAT_DEPTH(dtype) that should be either CV_32F
 * or CV_64F .
 */
export declare function mulTransposed(src: InputArray, dst: OutputArray, aTa: bool, delta?: InputArray, scale?: double, dtype?: int): void

/**
 * This version of [norm](#dc/d84/group__core__basic_1ga4e556cb8ad35a643a1ea66e035711bb9}) calculates
 * the absolute norm of src1. The type of norm to calculate is specified using
 * [NormTypes](#d2/de8/group__core__array_1gad12cefbcb5291cf958a85b4b67b6149f}).
 * 
 * As example for one array consider the function `$r(x)= \\begin{pmatrix} x \\\\ 1-x \\end{pmatrix}, x
 * \\in [-1;1]$`. The `$ L_{1}, L_{2} $` and `$ L_{\\infty} $` norm for the sample value `$r(-1) =
 * \\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix}$` is calculated as follows `\\begin{align*} \\| r(-1)
 * \\|_{L_1} &= |-1| + |2| = 3 \\\\ \\| r(-1) \\|_{L_2} &= \\sqrt{(-1)^{2} + (2)^{2}} = \\sqrt{5} \\\\
 * \\| r(-1) \\|_{L_\\infty} &= \\max(|-1|,|2|) = 2 \\end{align*}` and for `$r(0.5) = \\begin{pmatrix}
 * 0.5 \\\\ 0.5 \\end{pmatrix}$` the calculation is `\\begin{align*} \\| r(0.5) \\|_{L_1} &= |0.5| +
 * |0.5| = 1 \\\\ \\| r(0.5) \\|_{L_2} &= \\sqrt{(0.5)^{2} + (0.5)^{2}} = \\sqrt{0.5} \\\\ \\| r(0.5)
 * \\|_{L_\\infty} &= \\max(|0.5|,|0.5|) = 0.5. \\end{align*}` The following graphic shows all values
 * for the three norm functions `$\\| r(x) \\|_{L_1}, \\| r(x) \\|_{L_2}$` and `$\\| r(x)
 * \\|_{L_\\infty}$`. It is notable that the `$ L_{1} $` norm forms the upper and the `$ L_{\\infty} $`
 * norm forms the lower border for the example function `$ r(x) $`. 
 *  When the mask parameter is specified and it is not empty, the norm is
 * 
 * If normType is not specified,
 * [NORM_L2](#d2/de8/group__core__array_1ggad12cefbcb5291cf958a85b4b67b6149fa7bacbe84d400336a8f26297d8e80e3a2})
 * is used. calculated only over the region specified by the mask.
 * 
 * Multi-channel input arrays are treated as single-channel arrays, that is, the results for all
 * channels are combined.
 * 
 * [Hamming](#d3/d59/structcv_1_1Hamming}) norms can only be calculated with CV_8U depth arrays.
 * 
 * @param src1 first input array.
 * @param normType type of the norm (see NormTypes).
 * @param mask optional operation mask; it must have the same size as src1 and CV_8UC1 type.
 */
export declare function norm(src1: InputArray, normType?: int, mask?: InputArray): double

/**
 * This version of [cv::norm](#dc/d84/group__core__basic_1ga4e556cb8ad35a643a1ea66e035711bb9})
 * calculates the absolute difference norm or the relative difference norm of arrays src1 and src2. The
 * type of norm to calculate is specified using
 * [NormTypes](#d2/de8/group__core__array_1gad12cefbcb5291cf958a85b4b67b6149f}).
 * 
 * @param src1 first input array.
 * @param src2 second input array of the same size and the same type as src1.
 * @param normType type of the norm (see NormTypes).
 * @param mask optional operation mask; it must have the same size as src1 and CV_8UC1 type.
 */
export declare function norm(src1: InputArray, src2: InputArray, normType?: int, mask?: InputArray): double

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param src first input array.
 * @param normType type of the norm (see NormTypes).
 */
export declare function norm(src: any, normType: int): double

/**
 * The function [cv::normalize](#dc/d84/group__core__basic_1ga1b6a396a456c8b6c6e4afd8591560d80})
 * normalizes scale and shift the input array elements so that `\\[\\| \\texttt{dst} \\| _{L_p}=
 * \\texttt{alpha}\\]` (where p=Inf, 1 or 2) when normType=NORM_INF, NORM_L1, or NORM_L2, respectively;
 * or so that `\\[\\min _I \\texttt{dst} (I)= \\texttt{alpha} , \\, \\, \\max _I \\texttt{dst} (I)=
 * \\texttt{beta}\\]`
 * 
 * when normType=NORM_MINMAX (for dense arrays only). The optional mask specifies a sub-array to be
 * normalized. This means that the norm or min-n-max are calculated over the sub-array, and then this
 * sub-array is modified to be normalized. If you want to only use the mask to calculate the norm or
 * min-max but modify the whole array, you can use norm and
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b}).
 * 
 * In case of sparse matrices, only the non-zero values are analyzed and transformed. Because of this,
 * the range transformation for sparse matrices is not allowed since it can shift the zero level.
 * 
 * Possible usage with some positive example data: 
 * 
 * ```cpp
 * vector<double> positiveData = { 2.0, 8.0, 10.0 };
 * vector<double> normalizedData_l1, normalizedData_l2, normalizedData_inf, normalizedData_minmax;
 * 
 * // Norm to probability (total count)
 * // sum(numbers) = 20.0
 * // 2.0      0.1     (2.0/20.0)
 * // 8.0      0.4     (8.0/20.0)
 * // 10.0     0.5     (10.0/20.0)
 * normalize(positiveData, normalizedData_l1, 1.0, 0.0, NORM_L1);
 * 
 * // Norm to unit vector: ||positiveData|| = 1.0
 * // 2.0      0.15
 * // 8.0      0.62
 * // 10.0     0.77
 * normalize(positiveData, normalizedData_l2, 1.0, 0.0, NORM_L2);
 * 
 * // Norm to max element
 * // 2.0      0.2     (2.0/10.0)
 * // 8.0      0.8     (8.0/10.0)
 * // 10.0     1.0     (10.0/10.0)
 * normalize(positiveData, normalizedData_inf, 1.0, 0.0, NORM_INF);
 * 
 * // Norm to range [0.0;1.0]
 * // 2.0      0.0     (shift to left border)
 * // 8.0      0.75    (6.0/8.0)
 * // 10.0     1.0     (shift to right border)
 * normalize(positiveData, normalizedData_minmax, 1.0, 0.0, NORM_MINMAX);
 * ```
 * 
 * [norm](#dc/d84/group__core__basic_1ga4e556cb8ad35a643a1ea66e035711bb9}),
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b}),
 * [SparseMat::convertTo](#dd/da9/classcv_1_1SparseMat_1a577ea9bbc02ffcf195df6d96f9c9650c})
 * 
 * @param src input array.
 * @param dst output array of the same size as src .
 * @param alpha norm value to normalize to or the lower range boundary in case of the range
 * normalization.
 * @param beta upper range boundary in case of the range normalization; it is not used for the norm
 * normalization.
 * @param norm_type normalization type (see cv::NormTypes).
 * @param dtype when negative, the output array has the same type as src; otherwise, it has the same
 * number of channels as src and the depth =CV_MAT_DEPTH(dtype).
 * @param mask optional operation mask.
 */
export declare function normalize(src: InputArray, dst: InputOutputArray, alpha?: double, beta?: double, norm_type?: int, dtype?: int, mask?: InputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param src input array.
 * @param dst output array of the same size as src .
 * @param alpha norm value to normalize to or the lower range boundary in case of the range
 * normalization.
 * @param normType normalization type (see cv::NormTypes).
 */
export declare function normalize(src: any, dst: any, alpha: double, normType: int): void

/**
 * 
 * @param a 
 * @param val 
 */
export declare function patchNaNs(a: InputOutputArray, val?: double): void

/**
 * wrap [PCA::backProject](#d3/d8d/classcv_1_1PCA_1a5f84cfbdb25b9833cc1bfb5bd484ea79})
 * 
 * @param data 
 * @param mean 
 * @param eigenvectors 
 * @param result 
 */
export declare function PCABackProject(data: InputArray, mean: InputArray, eigenvectors: InputArray, result: OutputArray): void

/**
 * wrap PCA::operator()
 * 
 * @param data 
 * @param mean 
 * @param eigenvectors 
 * @param maxComponents 
 */
export declare function PCACompute(data: InputArray, mean: InputOutputArray, eigenvectors: OutputArray, maxComponents?: int): void

/**
 * wrap PCA::operator() and add eigenvalues output parameter
 * 
 * @param data 
 * @param mean 
 * @param eigenvectors 
 * @param eigenvalues 
 * @param maxComponents 
 */
export declare function PCACompute(data: InputArray, mean: InputOutputArray, eigenvectors: OutputArray, eigenvalues: OutputArray, maxComponents?: int): void

/**
 * wrap PCA::operator()
 * 
 * @param data 
 * @param mean 
 * @param eigenvectors 
 * @param retainedVariance 
 */
export declare function PCACompute(data: InputArray, mean: InputOutputArray, eigenvectors: OutputArray, retainedVariance: double): void

/**
 * wrap PCA::operator() and add eigenvalues output parameter
 * 
 * @param data 
 * @param mean 
 * @param eigenvectors 
 * @param eigenvalues 
 * @param retainedVariance 
 */
export declare function PCACompute(data: InputArray, mean: InputOutputArray, eigenvectors: OutputArray, eigenvalues: OutputArray, retainedVariance: double): void

/**
 * wrap [PCA::project](#d3/d8d/classcv_1_1PCA_1a67c9a3f8fe804f40be58c88a3ae73f41})
 * 
 * @param data 
 * @param mean 
 * @param eigenvectors 
 * @param result 
 */
export declare function PCAProject(data: InputArray, mean: InputArray, eigenvectors: InputArray, result: OutputArray): void

/**
 * The function
 * [cv::perspectiveTransform](#d2/de8/group__core__array_1gad327659ac03e5fd6894b90025e6900a7})
 * transforms every element of src by treating it as a 2D or 3D vector, in the following way: `\\[(x,
 * y, z) \\rightarrow (x'/w, y'/w, z'/w)\\]` where `\\[(x', y', z', w') = \\texttt{mat} \\cdot
 * \\begin{bmatrix} x & y & z & 1 \\end{bmatrix}\\]` and `\\[w = \\fork{w'}{if \\(w' \\ne
 * 0\\)}{\\infty}{otherwise}\\]`
 * 
 * Here a 3D vector transformation is shown. In case of a 2D vector transformation, the z component is
 * omitted.
 * 
 * The function transforms a sparse set of 2D or 3D vectors. If you want to transform an image using
 * perspective transformation, use warpPerspective . If you have an inverse problem, that is, you want
 * to compute the most probable perspective transformation out of several pairs of corresponding
 * points, you can use getPerspectiveTransform or findHomography . 
 * 
 * [transform](#d2/de8/group__core__array_1ga393164aa54bb9169ce0a8cc44e08ff22}),
 * [warpPerspective](#da/d54/group__imgproc__transform_1gaf73673a7e8e18ec6963e3774e6a94b87}),
 * [getPerspectiveTransform](#da/d54/group__imgproc__transform_1ga20f62aa3235d869c9956436c870893ae}),
 * [findHomography](#d9/d0c/group__calib3d_1ga4abc2ece9fab9398f2e560d53c8c9780})
 * 
 * @param src input two-channel or three-channel floating-point array; each element is a 2D/3D vector
 * to be transformed.
 * @param dst output array of the same size and type as src.
 * @param m 3x3 or 4x4 floating-point transformation matrix.
 */
export declare function perspectiveTransform(src: InputArray, dst: OutputArray, m: InputArray): void

/**
 * The function [cv::phase](#d2/de8/group__core__array_1ga9db9ca9b4d81c3bde5677b8f64dc0137}) calculates
 * the rotation angle of each 2D vector that is formed from the corresponding elements of x and y :
 * `\\[\\texttt{angle} (I) = \\texttt{atan2} ( \\texttt{y} (I), \\texttt{x} (I))\\]`
 * 
 * The angle estimation accuracy is about 0.3 degrees. When x(I)=y(I)=0 , the corresponding angle(I) is
 * set to 0.
 * 
 * @param x input floating-point array of x-coordinates of 2D vectors.
 * @param y input array of y-coordinates of 2D vectors; it must have the same size and the same type as
 * x.
 * @param angle output array of vector angles; it has the same size and same type as x .
 * @param angleInDegrees when true, the function calculates the angle in degrees, otherwise, they are
 * measured in radians.
 */
export declare function phase(x: InputArray, y: InputArray, angle: OutputArray, angleInDegrees?: bool): void

/**
 * The function [cv::polarToCart](#d2/de8/group__core__array_1ga581ff9d44201de2dd1b40a50db93d665})
 * calculates the Cartesian coordinates of each 2D vector represented by the corresponding elements of
 * magnitude and angle: `\\[\\begin{array}{l} \\texttt{x} (I) = \\texttt{magnitude} (I) \\cos (
 * \\texttt{angle} (I)) \\\\ \\texttt{y} (I) = \\texttt{magnitude} (I) \\sin ( \\texttt{angle} (I))
 * \\\\ \\end{array}\\]`
 * 
 * The relative accuracy of the estimated coordinates is about 1e-6. 
 * 
 * [cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d}),
 * [magnitude](#d2/de8/group__core__array_1ga6d3b097586bca4409873d64a90fe64c3}),
 * [phase](#d2/de8/group__core__array_1ga9db9ca9b4d81c3bde5677b8f64dc0137}),
 * [exp](#d7/dcc/group__core__utils__softfloat_1ga1eb07a682abff20e0864104599c06fbc}),
 * [log](#d7/dcc/group__core__utils__softfloat_1gae5de78ee278fe88405c6dbc38502f7c1}),
 * [pow](#d7/dcc/group__core__utils__softfloat_1ga8bc36646a43b82baa15f151a973fb0c5}),
 * [sqrt](#d7/dcc/group__core__utils__softfloat_1ga682082a1892db64a2856403ec17ba297})
 * 
 * @param magnitude input floating-point array of magnitudes of 2D vectors; it can be an empty matrix
 * (=Mat()), in this case, the function assumes that all the magnitudes are =1; if it is not empty, it
 * must have the same size and type as angle.
 * @param angle input floating-point array of angles of 2D vectors.
 * @param x output array of x-coordinates of 2D vectors; it has the same size and type as angle.
 * @param y output array of y-coordinates of 2D vectors; it has the same size and type as angle.
 * @param angleInDegrees when true, the input angles are measured in degrees, otherwise, they are
 * measured in radians.
 */
export declare function polarToCart(magnitude: InputArray, angle: InputArray, x: OutputArray, y: OutputArray, angleInDegrees?: bool): void

/**
 * The function [cv::pow](#d7/dcc/group__core__utils__softfloat_1ga8bc36646a43b82baa15f151a973fb0c5})
 * raises every element of the input array to power : `\\[\\texttt{dst} (I) =
 * \\fork{\\texttt{src}(I)^{power}}{if \\(\\texttt{power}\\) is
 * integer}{|\\texttt{src}(I)|^{power}}{otherwise}\\]`
 * 
 * So, for a non-integer power exponent, the absolute values of input array elements are used. However,
 * it is possible to get true values for negative values using some extra operations. In the example
 * below, computing the 5th root of array src shows: 
 * 
 * ```cpp
 * Mat mask = src < 0;
 * pow(src, 1./5, dst);
 * subtract(Scalar::all(0), dst, dst, mask);
 * ```
 * 
 *  For some values of power, such as integer values, 0.5 and -0.5, specialized faster algorithms are
 * used.
 * 
 * Special values (NaN, Inf) are not handled. 
 * 
 * [sqrt](#d7/dcc/group__core__utils__softfloat_1ga682082a1892db64a2856403ec17ba297}),
 * [exp](#d7/dcc/group__core__utils__softfloat_1ga1eb07a682abff20e0864104599c06fbc}),
 * [log](#d7/dcc/group__core__utils__softfloat_1gae5de78ee278fe88405c6dbc38502f7c1}),
 * [cartToPolar](#d2/de8/group__core__array_1gac5f92f48ec32cacf5275969c33ee837d}),
 * [polarToCart](#d2/de8/group__core__array_1ga581ff9d44201de2dd1b40a50db93d665})
 * 
 * @param src input array.
 * @param power exponent of power.
 * @param dst output array of the same size and type as src.
 */
export declare function pow(src: InputArray, power: double, dst: OutputArray): void

/**
 * This function calculates the Peak Signal-to-Noise Ratio (PSNR) image quality metric in decibels
 * (dB), between two input arrays src1 and src2. The arrays must have the same type.
 * 
 * The PSNR is calculated as follows:
 * 
 * `\\[ \\texttt{PSNR} = 10 \\cdot \\log_{10}{\\left( \\frac{R^2}{MSE} \\right) } \\]`
 * 
 * where R is the maximum integer value of depth (e.g. 255 in the case of CV_8U data) and MSE is the
 * mean squared error between the two arrays.
 * 
 * @param src1 first input array.
 * @param src2 second input array of the same size as src1.
 * @param R the maximum pixel value (255 by default)
 */
export declare function PSNR(src1: InputArray, src2: InputArray, R?: double): double

/**
 * The function [cv::randn](#d2/de8/group__core__array_1gaeff1f61e972d133a04ce3a5f81cf6808}) fills the
 * matrix dst with normally distributed random numbers with the specified mean vector and the standard
 * deviation matrix. The generated random numbers are clipped to fit the value range of the output
 * array data type. 
 * 
 * [RNG](#d1/dd6/classcv_1_1RNG}),
 * [randu](#d2/de8/group__core__array_1ga1ba1026dca0807b27057ba6a49d258c0})
 * 
 * @param dst output array of random numbers; the array must be pre-allocated and have 1 to 4 channels.
 * @param mean mean value (expectation) of the generated random numbers.
 * @param stddev standard deviation of the generated random numbers; it can be either a vector (in
 * which case a diagonal standard deviation matrix is assumed) or a square matrix.
 */
export declare function randn(dst: InputOutputArray, mean: InputArray, stddev: InputArray): void

/**
 * The function [cv::randShuffle](#d2/de8/group__core__array_1ga6a789c8a5cb56c6dd62506179808f763})
 * shuffles the specified 1D array by randomly choosing pairs of elements and swapping them. The number
 * of such swap operations will be dst.rows*dst.cols*iterFactor . 
 * 
 * [RNG](#d1/dd6/classcv_1_1RNG}),
 * [sort](#d2/de8/group__core__array_1ga45dd56da289494ce874be2324856898f})
 * 
 * @param dst input/output numerical 1D array.
 * @param iterFactor scale factor that determines the number of random swap operations (see the details
 * below).
 * @param rng optional random number generator used for shuffling; if it is zero, theRNG () is used
 * instead.
 */
export declare function randShuffle(dst: InputOutputArray, iterFactor?: double, rng?: any): void

/**
 * Non-template variant of the function fills the matrix dst with uniformly-distributed random numbers
 * from the specified range: `\\[\\texttt{low} _c \\leq \\texttt{dst} (I)_c < \\texttt{high} _c\\]` 
 * 
 * [RNG](#d1/dd6/classcv_1_1RNG}),
 * [randn](#d2/de8/group__core__array_1gaeff1f61e972d133a04ce3a5f81cf6808}),
 * [theRNG](#d2/de8/group__core__array_1ga75843061d150ad6564b5447e38e57722})
 * 
 * @param dst output array of random numbers; the array must be pre-allocated.
 * @param low inclusive lower boundary of the generated random numbers.
 * @param high exclusive upper boundary of the generated random numbers.
 */
export declare function randu(dst: InputOutputArray, low: InputArray, high: InputArray): void

/**
 * The function [reduce](#d2/de8/group__core__array_1ga4b78072a303f29d9031d56e5638da78e}) reduces the
 * matrix to a vector by treating the matrix rows/columns as a set of 1D vectors and performing the
 * specified operation on the vectors until a single row/column is obtained. For example, the function
 * can be used to compute horizontal and vertical projections of a raster image. In case of
 * [REDUCE_MAX](#d0/de1/group__core_1gga14cdedf2933367eb9395ec16798af994a928b4c3eb0a038ea41b61d122c0495ee})
 * and
 * [REDUCE_MIN](#d0/de1/group__core_1gga14cdedf2933367eb9395ec16798af994a1f40a2ed66c8a8b8198186da47ec7b76})
 * , the output image should have the same type as the source one. In case of
 * [REDUCE_SUM](#d0/de1/group__core_1gga14cdedf2933367eb9395ec16798af994a101441e283ed69f20cfc5468114f9867})
 * and
 * [REDUCE_AVG](#d0/de1/group__core_1gga14cdedf2933367eb9395ec16798af994a85f039992a454ca367bc190529766c7e})
 * , the output may have a larger element bit-depth to preserve accuracy. And multi-channel arrays are
 * also supported in these two reduction modes.
 * 
 * The following code demonstrates its usage for a single channel matrix. 
 * 
 * ```cpp
 *         Mat m = (Mat_<uchar>(3,2) << 1,2,3,4,5,6);
 *         Mat col_sum, row_sum;
 * 
 *         reduce(m, col_sum, 0, REDUCE_SUM, CV_32F);
 *         reduce(m, row_sum, 1, REDUCE_SUM, CV_32F);
 *         /*
 *         m =
 *         [  1,   2;
 *            3,   4;
 *            5,   6]
 *         col_sum =
 *         [9, 12]
 *         row_sum =
 *         [3;
 *          7;
 *          11]
 * \/
 * ```
 * 
 *  And the following code demonstrates its usage for a two-channel matrix. 
 * 
 * ```cpp
 *         // two channels
 *         char d[] = {1,2,3,4,5,6};
 *         Mat m(3, 1, CV_8UC2, d);
 *         Mat col_sum_per_channel;
 *         reduce(m, col_sum_per_channel, 0, REDUCE_SUM, CV_32F);
 *         /*
 *         col_sum_per_channel =
 *         [9, 12]
 * \/
 * ```
 * 
 * [repeat](#d2/de8/group__core__array_1ga496c3860f3ac44c40b48811333cfda2d})
 * 
 * @param src input 2D matrix.
 * @param dst output vector. Its size and type is defined by dim and dtype parameters.
 * @param dim dimension index along which the matrix is reduced. 0 means that the matrix is reduced to
 * a single row. 1 means that the matrix is reduced to a single column.
 * @param rtype reduction operation that could be one of ReduceTypes
 * @param dtype when negative, the output vector will have the same type as the input matrix,
 * otherwise, its type will be CV_MAKE_TYPE(CV_MAT_DEPTH(dtype), src.channels()).
 */
export declare function reduce(src: InputArray, dst: OutputArray, dim: int, rtype: int, dtype?: int): void

/**
 * The function [cv::repeat](#d2/de8/group__core__array_1ga496c3860f3ac44c40b48811333cfda2d})
 * duplicates the input array one or more times along each of the two axes: `\\[\\texttt{dst} _{ij}=
 * \\texttt{src} _{i\\mod src.rows, \\; j\\mod src.cols }\\]` The second variant of the function is
 * more convenient to use with [MatrixExpressions](#d1/d10/classcv_1_1MatExpr_1MatrixExpressions}). 
 * 
 * [cv::reduce](#d2/de8/group__core__array_1ga4b78072a303f29d9031d56e5638da78e})
 * 
 * @param src input array to replicate.
 * @param ny Flag to specify how many times the src is repeated along the vertical axis.
 * @param nx Flag to specify how many times the src is repeated along the horizontal axis.
 * @param dst output array of the same type as src.
 */
export declare function repeat(src: InputArray, ny: int, nx: int, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param src input array to replicate.
 * @param ny Flag to specify how many times the src is repeated along the vertical axis.
 * @param nx Flag to specify how many times the src is repeated along the horizontal axis.
 */
export declare function repeat(src: any, ny: int, nx: int): Mat

/**
 * [transpose](#d2/de8/group__core__array_1ga46630ed6c0ea6254a35f447289bd7404}) ,
 * [repeat](#d2/de8/group__core__array_1ga496c3860f3ac44c40b48811333cfda2d}) ,
 * [completeSymm](#d2/de8/group__core__array_1ga6847337c0c55769e115a70e0f011b5ca}),
 * [flip](#d2/de8/group__core__array_1gaca7be533e3dac7feb70fc60635adf441}),
 * [RotateFlags](#d2/de8/group__core__array_1ga6f45d55c0b1cc9d97f5353a7c8a7aac2})
 * 
 * @param src input array.
 * @param dst output array of the same type as src. The size is the same with ROTATE_180, and the rows
 * and cols are switched for ROTATE_90_CLOCKWISE and ROTATE_90_COUNTERCLOCKWISE.
 * @param rotateCode an enum to specify how to rotate the array; see the enum RotateFlags
 */
export declare function rotate(src: InputArray, dst: OutputArray, rotateCode: int): void

/**
 * The function scaleAdd is one of the classical primitive linear algebra operations, known as DAXPY or
 * SAXPY in . It calculates the sum of a scaled array and another array: `\\[\\texttt{dst} (I)=
 * \\texttt{scale} \\cdot \\texttt{src1} (I) + \\texttt{src2} (I)\\]` The function can also be emulated
 * with a matrix expression, for example: 
 * 
 * ```cpp
 * Mat A(3, 3, CV_64F);
 * ...
 * A.row(0) = A.row(1)*2 + A.row(2);
 * ```
 * 
 * [add](#d2/de8/group__core__array_1ga10ac1bfb180e2cfda1701d06c24fdbd6}),
 * [addWeighted](#d2/de8/group__core__array_1gafafb2513349db3bcff51f54ee5592a19}),
 * [subtract](#d2/de8/group__core__array_1gaa0f00d98b4b5edeaeb7b8333b2de353b}),
 * [Mat::dot](#d3/d63/classcv_1_1Mat_1a0f683eab191eeece33dfc64ae299a9cb}),
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b})
 * 
 * @param src1 first input array.
 * @param alpha scale factor for the first array.
 * @param src2 second input array of the same size and type as src1.
 * @param dst output array of the same size and type as src1.
 */
export declare function scaleAdd(src1: InputArray, alpha: double, src2: InputArray, dst: OutputArray): void

/**
 * The function [cv::setIdentity](#d2/de8/group__core__array_1ga388d7575224a4a277ceb98ccaa327c99})
 * initializes a scaled identity matrix: `\\[\\texttt{mtx} (i,j)= \\fork{\\texttt{value}}{ if
 * \\(i=j\\)}{0}{otherwise}\\]`
 * 
 * The function can also be emulated using the matrix initializers and the matrix expressions: 
 * 
 * ```cpp
 * Mat A = Mat::eye(4, 3, CV_32F)*5;
 * // A will be set to [[5, 0, 0], [0, 5, 0], [0, 0, 5], [0, 0, 0]]
 * ```
 * 
 * [Mat::zeros](#d3/d63/classcv_1_1Mat_1a0b57b6a326c8876d944d188a46e0f556}),
 * [Mat::ones](#d3/d63/classcv_1_1Mat_1a69ae0402d116fc9c71908d8508dc2f09}),
 * [Mat::setTo](#d3/d63/classcv_1_1Mat_1a0440e2a164c0b0d8462fb1e487be9876}),
 * [Mat::operator=](#d3/d63/classcv_1_1Mat_1aed1f81fe7efaacc2bd95149cdfa34302})
 * 
 * @param mtx matrix to initialize (not necessarily square).
 * @param s value to assign to diagonal elements.
 */
export declare function setIdentity(mtx: InputOutputArray, s?: any): void

/**
 * The function [cv::setRNGSeed](#d2/de8/group__core__array_1ga757e657c037410d9e19e819569e7de0f}) sets
 * state of default random number generator to custom value. 
 * 
 * [RNG](#d1/dd6/classcv_1_1RNG}),
 * [randu](#d2/de8/group__core__array_1ga1ba1026dca0807b27057ba6a49d258c0}),
 * [randn](#d2/de8/group__core__array_1gaeff1f61e972d133a04ce3a5f81cf6808})
 * 
 * @param seed new state for default random number generator
 */
export declare function setRNGSeed(seed: int): void

/**
 * The function [cv::solve](#d2/de8/group__core__array_1ga12b43690dbd31fed96f213eefead2373}) solves a
 * linear system or least-squares problem (the latter is possible with [SVD](#df/df7/classcv_1_1SVD})
 * or QR methods, or by specifying the flag
 * [DECOMP_NORMAL](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca13eaae0241295166140291223db12166})
 * ): `\\[\\texttt{dst} = \\arg \\min _X \\| \\texttt{src1} \\cdot \\texttt{X} - \\texttt{src2} \\|\\]`
 * 
 * If
 * [DECOMP_LU](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca247a3455cd64973152e17e26999dc024})
 * or
 * [DECOMP_CHOLESKY](#d2/de8/group__core__array_1ggaaf9ea5dcc392d5ae04eacb9920b9674ca33cf860f98004310374a81d2c01715da})
 * method is used, the function returns 1 if src1 (or `$\\texttt{src1}^T\\texttt{src1}$` ) is
 * non-singular. Otherwise, it returns 0. In the latter case, dst is not valid. Other methods find a
 * pseudo-solution in case of a singular left-hand side part.
 * 
 * If you want to find a unity-norm solution of an under-defined singular system
 * `$\\texttt{src1}\\cdot\\texttt{dst}=0$` , the function solve will not do the work. Use
 * [SVD::solveZ](#df/df7/classcv_1_1SVD_1ab255cd24a882ab993fb2f7377ef2774a}) instead.
 * 
 * [invert](#d2/de8/group__core__array_1gad278044679d4ecf20f7622cc151aaaa2}),
 * [SVD](#df/df7/classcv_1_1SVD}),
 * [eigen](#d2/de8/group__core__array_1ga9fa0d58657f60eaa6c71f6fbb40456e3})
 * 
 * @param src1 input matrix on the left-hand side of the system.
 * @param src2 input matrix on the right-hand side of the system.
 * @param dst output solution.
 * @param flags solution (matrix inversion) method (DecompTypes)
 */
export declare function solve(src1: InputArray, src2: InputArray, dst: OutputArray, flags?: int): bool

/**
 * The function solveCubic finds the real roots of a cubic equation:
 * 
 * if coeffs is a 4-element vector: `\\[\\texttt{coeffs} [0] x^3 + \\texttt{coeffs} [1] x^2 +
 * \\texttt{coeffs} [2] x + \\texttt{coeffs} [3] = 0\\]`
 * if coeffs is a 3-element vector: `\\[x^3 + \\texttt{coeffs} [0] x^2 + \\texttt{coeffs} [1] x +
 * \\texttt{coeffs} [2] = 0\\]`
 * 
 * The roots are stored in the roots array. 
 * 
 * number of real roots. It can be 0, 1 or 2.
 * 
 * @param coeffs equation coefficients, an array of 3 or 4 elements.
 * @param roots output array of real roots that has 1 or 3 elements.
 */
export declare function solveCubic(coeffs: InputArray, roots: OutputArray): int

/**
 * The function [cv::solvePoly](#d2/de8/group__core__array_1gac2f5e953016fabcdf793d762f4ec5dce}) finds
 * real and complex roots of a polynomial equation: `\\[\\texttt{coeffs} [n] x^{n} + \\texttt{coeffs}
 * [n-1] x^{n-1} + ... + \\texttt{coeffs} [1] x + \\texttt{coeffs} [0] = 0\\]`
 * 
 * @param coeffs array of polynomial coefficients.
 * @param roots output (complex) array of roots.
 * @param maxIters maximum number of iterations the algorithm does.
 */
export declare function solvePoly(coeffs: InputArray, roots: OutputArray, maxIters?: int): double

/**
 * The function [cv::sort](#d2/de8/group__core__array_1ga45dd56da289494ce874be2324856898f}) sorts each
 * matrix row or each matrix column in ascending or descending order. So you should pass two operation
 * flags to get desired behaviour. If you want to sort matrix rows or columns lexicographically, you
 * can use STL std::sort generic function with the proper comparison predicate.
 * 
 * [sortIdx](#d2/de8/group__core__array_1gadf35157cbf97f3cb85a545380e383506}),
 * [randShuffle](#d2/de8/group__core__array_1ga6a789c8a5cb56c6dd62506179808f763})
 * 
 * @param src input single-channel array.
 * @param dst output array of the same size and type as src.
 * @param flags operation flags, a combination of SortFlags
 */
export declare function sort(src: InputArray, dst: OutputArray, flags: int): void

/**
 * The function [cv::sortIdx](#d2/de8/group__core__array_1gadf35157cbf97f3cb85a545380e383506}) sorts
 * each matrix row or each matrix column in the ascending or descending order. So you should pass two
 * operation flags to get desired behaviour. Instead of reordering the elements themselves, it stores
 * the indices of sorted elements in the output array. For example: 
 * 
 * ```cpp
 * Mat A = Mat::eye(3,3,CV_32F), B;
 * sortIdx(A, B, SORT_EVERY_ROW + SORT_ASCENDING);
 * // B will probably contain
 * // (because of equal elements in A some permutations are possible):
 * // [[1, 2, 0], [0, 2, 1], [0, 1, 2]]
 * ```
 * 
 * [sort](#d2/de8/group__core__array_1ga45dd56da289494ce874be2324856898f}),
 * [randShuffle](#d2/de8/group__core__array_1ga6a789c8a5cb56c6dd62506179808f763})
 * 
 * @param src input single-channel array.
 * @param dst output integer array of the same size as src.
 * @param flags operation flags that could be a combination of cv::SortFlags
 */
export declare function sortIdx(src: InputArray, dst: OutputArray, flags: int): void

/**
 * The function [cv::split](#d2/de8/group__core__array_1ga0547c7fed86152d7e9d0096029c8518a}) splits a
 * multi-channel array into separate single-channel arrays: `\\[\\texttt{mv} [c](I) = \\texttt{src}
 * (I)_c\\]` If you need to extract a single channel or do some other sophisticated channel
 * permutation, use mixChannels .
 * 
 * The following example demonstrates how to split a 3-channel matrix into 3 single channel matrices. 
 * 
 * ```cpp
 *     char d[] = {1,2,3,4,5,6,7,8,9,10,11,12};
 *     Mat m(2, 2, CV_8UC3, d);
 *     Mat channels[3];
 *     split(m, channels);
 * 
 *     /*
 *     channels[0] =
 *     [  1,   4;
 *        7,  10]
 *     channels[1] =
 *     [  2,   5;
 *        8,  11]
 *     channels[2] =
 *     [  3,   6;
 *        9,  12]
 * \/
 * ```
 * 
 * [merge](#d2/de8/group__core__array_1ga7d7b4d6c6ee504b30a20b1680029c7b4}),
 * [mixChannels](#d2/de8/group__core__array_1ga51d768c270a1cdd3497255017c4504be}),
 * [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab})
 * 
 * @param src input multi-channel array.
 * @param mvbegin output array; the number of arrays must match src.channels(); the arrays themselves
 * are reallocated, if needed.
 */
export declare function split(src: any, mvbegin: any): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts.
 * 
 * @param m input multi-channel array.
 * @param mv output vector of arrays; the arrays themselves are reallocated, if needed.
 */
export declare function split(m: InputArray, mv: OutputArrayOfArrays): void

/**
 * The function [cv::sqrt](#d7/dcc/group__core__utils__softfloat_1ga682082a1892db64a2856403ec17ba297})
 * calculates a square root of each input array element. In case of multi-channel arrays, each channel
 * is processed independently. The accuracy is approximately the same as of the built-in std::sqrt .
 * 
 * @param src input floating-point array.
 * @param dst output array of the same size and type as src.
 */
export declare function sqrt(src: InputArray, dst: OutputArray): void

/**
 * The function subtract calculates:
 * 
 * Difference between two arrays, when both input arrays have the same size and the same number of
 * channels: `\\[\\texttt{dst}(I) = \\texttt{saturate} ( \\texttt{src1}(I) - \\texttt{src2}(I)) \\quad
 * \\texttt{if mask}(I) \\ne0\\]`
 * Difference between an array and a scalar, when src2 is constructed from Scalar or has the same
 * number of elements as `src1.channels()`: `\\[\\texttt{dst}(I) = \\texttt{saturate} (
 * \\texttt{src1}(I) - \\texttt{src2} ) \\quad \\texttt{if mask}(I) \\ne0\\]`
 * Difference between a scalar and an array, when src1 is constructed from Scalar or has the same
 * number of elements as `src2.channels()`: `\\[\\texttt{dst}(I) = \\texttt{saturate} ( \\texttt{src1}
 * - \\texttt{src2}(I) ) \\quad \\texttt{if mask}(I) \\ne0\\]`
 * The reverse difference between a scalar and an array in the case of `SubRS`: `\\[\\texttt{dst}(I) =
 * \\texttt{saturate} ( \\texttt{src2} - \\texttt{src1}(I) ) \\quad \\texttt{if mask}(I) \\ne0\\]`
 * where I is a multi-dimensional index of array elements. In case of multi-channel arrays, each
 * channel is processed independently.
 * 
 * The first function in the list above can be replaced with matrix expressions: 
 * 
 * ```cpp
 * dst = src1 - src2;
 * dst -= src1; // equivalent to subtract(dst, src1, dst);
 * ```
 * 
 *  The input arrays and the output array can all have the same or different depths. For example, you
 * can subtract to 8-bit unsigned arrays and store the difference in a 16-bit signed array. Depth of
 * the output array is determined by dtype parameter. In the second and third cases above, as well as
 * in the first case, when src1.depth() == src2.depth(), dtype can be set to the default -1. In this
 * case the output array will have the same depth as the input array, be it src1, src2 or both. 
 * 
 * Saturation is not applied when the output array has the depth CV_32S. You may even get result of an
 * incorrect sign in the case of overflow. 
 * 
 * [add](#d2/de8/group__core__array_1ga10ac1bfb180e2cfda1701d06c24fdbd6}),
 * [addWeighted](#d2/de8/group__core__array_1gafafb2513349db3bcff51f54ee5592a19}),
 * [scaleAdd](#d2/de8/group__core__array_1ga9e0845db4135f55dcf20227402f00d98}),
 * [Mat::convertTo](#d3/d63/classcv_1_1Mat_1adf88c60c5b4980e05bb556080916978b})
 * 
 * @param src1 first input array or a scalar.
 * @param src2 second input array or a scalar.
 * @param dst output array of the same size and the same number of channels as the input array.
 * @param mask optional operation mask; this is an 8-bit single channel array that specifies elements
 * of the output array to be changed.
 * @param dtype optional depth of the output array
 */
export declare function subtract(src1: InputArray, src2: InputArray, dst: OutputArray, mask?: InputArray, dtype?: int): void

/**
 * The function [cv::sum](#d2/de8/group__core__array_1ga716e10a2dd9e228e4d3c95818f106722}) calculates
 * and returns the sum of array elements, independently for each channel. 
 * 
 * [countNonZero](#d2/de8/group__core__array_1gaa4b89393263bb4d604e0fe5986723914}),
 * [mean](#d2/de8/group__core__array_1ga191389f8a0e58180bb13a727782cd461}),
 * [meanStdDev](#d2/de8/group__core__array_1ga846c858f4004d59493d7c6a4354b301d}),
 * [norm](#dc/d84/group__core__basic_1ga4e556cb8ad35a643a1ea66e035711bb9}),
 * [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707}),
 * [reduce](#d2/de8/group__core__array_1ga4b78072a303f29d9031d56e5638da78e})
 * 
 * @param src input array that must have from 1 to 4 channels.
 */
export declare function sum(src: InputArray): Scalar

/**
 * wrap [SVD::backSubst](#df/df7/classcv_1_1SVD_1a7c28935c9999977dbe34285d13d43190})
 * 
 * @param w 
 * @param u 
 * @param vt 
 * @param rhs 
 * @param dst 
 */
export declare function SVBackSubst(w: InputArray, u: InputArray, vt: InputArray, rhs: InputArray, dst: OutputArray): void

/**
 * wrap [SVD::compute](#df/df7/classcv_1_1SVD_1a76f0b2044df458160292045a3d3714c6})
 * 
 * @param src 
 * @param w 
 * @param u 
 * @param vt 
 * @param flags 
 */
export declare function SVDecomp(src: InputArray, w: OutputArray, u: OutputArray, vt: OutputArray, flags?: int): void

/**
 * The function [cv::theRNG](#d2/de8/group__core__array_1ga75843061d150ad6564b5447e38e57722}) returns
 * the default random number generator. For each thread, there is a separate random number generator,
 * so you can use the function safely in multi-thread environments. If you just need to get a single
 * random number using this generator or initialize an array, you can use randu or randn instead. But
 * if you are going to generate many random numbers inside a loop, it is much faster to use this
 * function to retrieve the generator and then use RNG::operator _Tp() . 
 * 
 * [RNG](#d1/dd6/classcv_1_1RNG}),
 * [randu](#d2/de8/group__core__array_1ga1ba1026dca0807b27057ba6a49d258c0}),
 * [randn](#d2/de8/group__core__array_1gaeff1f61e972d133a04ce3a5f81cf6808})
 * 
 */
export declare function theRNG(): any

/**
 * The function [cv::trace](#dc/d84/group__core__basic_1ga36ad18631177b097a38198c4e83c6e2b}) returns
 * the sum of the diagonal elements of the matrix mtx . `\\[\\mathrm{tr} ( \\texttt{mtx} ) = \\sum _i
 * \\texttt{mtx} (i,i)\\]`
 * 
 * @param mtx input matrix.
 */
export declare function trace(mtx: InputArray): Scalar

/**
 * The function [cv::transform](#d2/de8/group__core__array_1ga393164aa54bb9169ce0a8cc44e08ff22})
 * performs the matrix transformation of every element of the array src and stores the results in dst :
 * `\\[\\texttt{dst} (I) = \\texttt{m} \\cdot \\texttt{src} (I)\\]` (when m.cols=src.channels() ), or
 * `\\[\\texttt{dst} (I) = \\texttt{m} \\cdot [ \\texttt{src} (I); 1]\\]` (when m.cols=src.channels()+1
 * )
 * 
 * Every element of the N -channel array src is interpreted as N -element vector that is transformed
 * using the M x N or M x (N+1) matrix m to M-element vector - the corresponding element of the output
 * array dst .
 * 
 * The function may be used for geometrical transformation of N -dimensional points, arbitrary linear
 * color space transformation (such as various kinds of RGB to YUV transforms), shuffling the image
 * channels, and so forth. 
 * 
 * [perspectiveTransform](#d2/de8/group__core__array_1gad327659ac03e5fd6894b90025e6900a7}),
 * [getAffineTransform](#da/d54/group__imgproc__transform_1ga8f6d378f9f8eebb5cb55cd3ae295a999}),
 * [estimateAffine2D](#d9/d0c/group__calib3d_1ga27865b1d26bac9ce91efaee83e94d4dd}),
 * [warpAffine](#da/d54/group__imgproc__transform_1ga0203d9ee5fcd28d40dbc4a1ea4451983}),
 * [warpPerspective](#da/d54/group__imgproc__transform_1gaf73673a7e8e18ec6963e3774e6a94b87})
 * 
 * @param src input array that must have as many channels (1 to 4) as m.cols or m.cols-1.
 * @param dst output array of the same size and depth as src; it has as many channels as m.rows.
 * @param m transformation 2x2 or 2x3 floating-point matrix.
 */
export declare function transform(src: InputArray, dst: OutputArray, m: InputArray): void

/**
 * The function [cv::transpose](#d2/de8/group__core__array_1ga46630ed6c0ea6254a35f447289bd7404})
 * transposes the matrix src : `\\[\\texttt{dst} (i,j) = \\texttt{src} (j,i)\\]` 
 * 
 * No complex conjugation is done in case of a complex matrix. It should be done separately if needed.
 * 
 * @param src input array.
 * @param dst output array of the same type as src.
 */
export declare function transpose(src: InputArray, dst: OutputArray): void

/**
 * The function vertically concatenates two or more [cv::Mat](#d3/d63/classcv_1_1Mat}) matrices (with
 * the same number of cols). 
 * 
 * ```cpp
 * cv::Mat matArray[] = { cv::Mat(1, 4, CV_8UC1, cv::Scalar(1)),
 *                        cv::Mat(1, 4, CV_8UC1, cv::Scalar(2)),
 *                        cv::Mat(1, 4, CV_8UC1, cv::Scalar(3)),};
 * 
 * cv::Mat out;
 * cv::vconcat( matArray, 3, out );
 * //out:
 * //[1,   1,   1,   1;
 * // 2,   2,   2,   2;
 * // 3,   3,   3,   3]
 * ```
 * 
 * [cv::hconcat(const Mat*, size_t,
 * OutputArray)](#d2/de8/group__core__array_1gaf9771c991763233866bf76b5b5d1776f}), 
 * 
 * [cv::hconcat(InputArrayOfArrays,
 * OutputArray)](#d2/de8/group__core__array_1ga4676b1376cdc4e528dab6bd9edc51c1a}) and 
 * 
 * [cv::hconcat(InputArray, InputArray,
 * OutputArray)](#d2/de8/group__core__array_1gaab5ceee39e0580f879df645a872c6bf7})
 * 
 * @param src input array or vector of matrices. all of the matrices must have the same number of cols
 * and the same depth.
 * @param nsrc number of matrices in src.
 * @param dst output array. It has the same number of cols and depth as the src, and the sum of rows of
 * the src.
 */
export declare function vconcat(src: any, nsrc: size_t, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. 
 * 
 * ```cpp
 * cv::Mat_<float> A = (cv::Mat_<float>(3, 2) << 1, 7,
 *                                               2, 8,
 *                                               3, 9);
 * cv::Mat_<float> B = (cv::Mat_<float>(3, 2) << 4, 10,
 *                                               5, 11,
 *                                               6, 12);
 * 
 * cv::Mat C;
 * cv::vconcat(A, B, C);
 * //C:
 * //[1, 7;
 * // 2, 8;
 * // 3, 9;
 * // 4, 10;
 * // 5, 11;
 * // 6, 12]
 * ```
 * 
 * @param src1 first input array to be considered for vertical concatenation.
 * @param src2 second input array to be considered for vertical concatenation.
 * @param dst output array. It has the same number of cols and depth as the src1 and src2, and the sum
 * of rows of the src1 and src2.
 */
export declare function vconcat(src1: InputArray, src2: InputArray, dst: OutputArray): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function
 * only in what argument(s) it accepts. 
 * 
 * ```cpp
 * std::vector<cv::Mat> matrices = { cv::Mat(1, 4, CV_8UC1, cv::Scalar(1)),
 *                                   cv::Mat(1, 4, CV_8UC1, cv::Scalar(2)),
 *                                   cv::Mat(1, 4, CV_8UC1, cv::Scalar(3)),};
 * 
 * cv::Mat out;
 * cv::vconcat( matrices, out );
 * //out:
 * //[1,   1,   1,   1;
 * // 2,   2,   2,   2;
 * // 3,   3,   3,   3]
 * ```
 * 
 * @param src input array or vector of matrices. all of the matrices must have the same number of cols
 * and the same depth
 * @param dst output array. It has the same number of cols and depth as the src, and the sum of rows of
 * the src. same depth.
 */
export declare function vconcat(src: InputArrayOfArrays, dst: OutputArray): void

/**
 * 
 */
export declare const BORDER_CONSTANT: BorderTypes // initializer: = 0

/**
 * 
 */
export declare const BORDER_REPLICATE: BorderTypes // initializer: = 1

/**
 * 
 */
export declare const BORDER_REFLECT: BorderTypes // initializer: = 2

/**
 * 
 */
export declare const BORDER_WRAP: BorderTypes // initializer: = 3

/**
 * 
 */
export declare const BORDER_REFLECT_101: BorderTypes // initializer: = 4

/**
 * 
 */
export declare const BORDER_TRANSPARENT: BorderTypes // initializer: = 5

/**
 * 
 */
export declare const BORDER_REFLECT101: BorderTypes // initializer: = BORDER_REFLECT_101

/**
 * 
 */
export declare const BORDER_DEFAULT: BorderTypes // initializer: = BORDER_REFLECT_101

/**
 * 
 */
export declare const BORDER_ISOLATED: BorderTypes // initializer: = 16

/**
 * 
 */
export declare const CMP_EQ: CmpTypes // initializer: = 0

/**
 * 
 */
export declare const CMP_GT: CmpTypes // initializer: = 1

/**
 * 
 */
export declare const CMP_GE: CmpTypes // initializer: = 2

/**
 * 
 */
export declare const CMP_LT: CmpTypes // initializer: = 3

/**
 * 
 */
export declare const CMP_LE: CmpTypes // initializer: = 4

/**
 * 
 */
export declare const CMP_NE: CmpTypes // initializer: = 5

/**
 * Gaussian elimination with the optimal pivot element chosen.
 * 
 */
export declare const DECOMP_LU: DecompTypes // initializer: = 0

/**
 * singular value decomposition ([SVD](#df/df7/classcv_1_1SVD})) method; the system can be over-defined
 * and/or the matrix src1 can be singular
 * 
 */
export declare const DECOMP_SVD: DecompTypes // initializer: = 1

/**
 * eigenvalue decomposition; the matrix src1 must be symmetrical
 * 
 */
export declare const DECOMP_EIG: DecompTypes // initializer: = 2

/**
 * Cholesky `$LL^T$` factorization; the matrix src1 must be symmetrical and positively defined
 * 
 */
export declare const DECOMP_CHOLESKY: DecompTypes // initializer: = 3

/**
 * QR factorization; the system can be over-defined and/or the matrix src1 can be singular
 * 
 */
export declare const DECOMP_QR: DecompTypes // initializer: = 4

/**
 * while all the previous flags are mutually exclusive, this flag can be used together with any of the
 * previous; it means that the normal equations
 * `$\\texttt{src1}^T\\cdot\\texttt{src1}\\cdot\\texttt{dst}=\\texttt{src1}^T\\texttt{src2}$` are
 * solved instead of the original system `$\\texttt{src1}\\cdot\\texttt{dst}=\\texttt{src2}$`
 * 
 */
export declare const DECOMP_NORMAL: DecompTypes // initializer: = 16

/**
 * performs an inverse 1D or 2D transform instead of the default forward transform.
 * 
 */
export declare const DFT_INVERSE: DftFlags // initializer: = 1

/**
 * scales the result: divide it by the number of array elements. Normally, it is combined with
 * DFT_INVERSE.
 * 
 */
export declare const DFT_SCALE: DftFlags // initializer: = 2

/**
 * performs a forward or inverse transform of every individual row of the input matrix; this flag
 * enables you to transform multiple vectors simultaneously and can be used to decrease the overhead
 * (which is sometimes several times larger than the processing itself) to perform 3D and
 * higher-dimensional transformations and so forth.
 * 
 */
export declare const DFT_ROWS: DftFlags // initializer: = 4

/**
 * performs a forward transformation of 1D or 2D real array; the result, though being a complex array,
 * has complex-conjugate symmetry (*CCS*, see the function description below for details), and such an
 * array can be packed into a real array of the same size as input, which is the fastest option and
 * which is what the function does by default; however, you may wish to get a full complex array (for
 * simpler spectrum analysis, and so on) - pass the flag to enable the function to produce a full-size
 * complex output array.
 * 
 */
export declare const DFT_COMPLEX_OUTPUT: DftFlags // initializer: = 16

/**
 * performs an inverse transformation of a 1D or 2D complex array; the result is normally a complex
 * array of the same size, however, if the input array has conjugate-complex symmetry (for example, it
 * is a result of forward transformation with DFT_COMPLEX_OUTPUT flag), the output is a real array;
 * while the function itself does not check whether the input is symmetrical or not, you can pass the
 * flag and then the function will assume the symmetry and produce the real output array (note that
 * when the input is packed into a real array and inverse transformation is executed, the function
 * treats the input as a packed complex-conjugate symmetrical array, and the output will also be a real
 * array).
 * 
 */
export declare const DFT_REAL_OUTPUT: DftFlags // initializer: = 32

/**
 * specifies that input is complex input. If this flag is set, the input must have 2 channels. On the
 * other hand, for backwards compatibility reason, if input has 2 channels, input is already considered
 * complex.
 * 
 */
export declare const DFT_COMPLEX_INPUT: DftFlags // initializer: = 64

/**
 * performs an inverse 1D or 2D transform instead of the default forward transform.
 * 
 */
export declare const DCT_INVERSE: DftFlags // initializer: = DFT_INVERSE

/**
 * performs a forward or inverse transform of every individual row of the input matrix. This flag
 * enables you to transform multiple vectors simultaneously and can be used to decrease the overhead
 * (which is sometimes several times larger than the processing itself) to perform 3D and
 * higher-dimensional transforms and so forth.
 * 
 */
export declare const DCT_ROWS: DftFlags // initializer: = DFT_ROWS

/**
 * 
 */
export declare const GEMM_1_T: GemmFlags // initializer: = 1

/**
 * 
 */
export declare const GEMM_2_T: GemmFlags // initializer: = 2

/**
 * 
 */
export declare const GEMM_3_T: GemmFlags // initializer: = 4

/**
 * `\\[ norm = \\forkthree {\\|\\texttt{src1}\\|_{L_{\\infty}} = \\max _I | \\texttt{src1} (I)|}{if
 * \\(\\texttt{normType} = \\texttt{NORM_INF}\\) } {\\|\\texttt{src1}-\\texttt{src2}\\|_{L_{\\infty}} =
 * \\max _I | \\texttt{src1} (I) - \\texttt{src2} (I)|}{if \\(\\texttt{normType} =
 * \\texttt{NORM_INF}\\) } {\\frac{\\|\\texttt{src1}-\\texttt{src2}\\|_{L_{\\infty}}
 * }{\\|\\texttt{src2}\\|_{L_{\\infty}} }}{if \\(\\texttt{normType} = \\texttt{NORM_RELATIVE |
 * NORM_INF}\\) } \\]`
 * 
 */
export declare const NORM_INF: NormTypes // initializer: = 1

/**
 * `\\[ norm = \\forkthree {\\| \\texttt{src1} \\| _{L_1} = \\sum _I | \\texttt{src1} (I)|}{if
 * \\(\\texttt{normType} = \\texttt{NORM_L1}\\)} { \\| \\texttt{src1} - \\texttt{src2} \\| _{L_1} =
 * \\sum _I | \\texttt{src1} (I) - \\texttt{src2} (I)|}{if \\(\\texttt{normType} = \\texttt{NORM_L1}\\)
 * } { \\frac{\\|\\texttt{src1}-\\texttt{src2}\\|_{L_1} }{\\|\\texttt{src2}\\|_{L_1}} }{if
 * \\(\\texttt{normType} = \\texttt{NORM_RELATIVE | NORM_L1}\\) } \\]`
 * 
 */
export declare const NORM_L1: NormTypes // initializer: = 2

/**
 * `\\[ norm = \\forkthree { \\| \\texttt{src1} \\| _{L_2} = \\sqrt{\\sum_I \\texttt{src1}(I)^2} }{if
 * \\(\\texttt{normType} = \\texttt{NORM_L2}\\) } { \\| \\texttt{src1} - \\texttt{src2} \\| _{L_2} =
 * \\sqrt{\\sum_I (\\texttt{src1}(I) - \\texttt{src2}(I))^2} }{if \\(\\texttt{normType} =
 * \\texttt{NORM_L2}\\) } { \\frac{\\|\\texttt{src1}-\\texttt{src2}\\|_{L_2}
 * }{\\|\\texttt{src2}\\|_{L_2}} }{if \\(\\texttt{normType} = \\texttt{NORM_RELATIVE | NORM_L2}\\) }
 * \\]`
 * 
 */
export declare const NORM_L2: NormTypes // initializer: = 4

/**
 * `\\[ norm = \\forkthree { \\| \\texttt{src1} \\| _{L_2} ^{2} = \\sum_I \\texttt{src1}(I)^2} {if
 * \\(\\texttt{normType} = \\texttt{NORM_L2SQR}\\)} { \\| \\texttt{src1} - \\texttt{src2} \\| _{L_2}
 * ^{2} = \\sum_I (\\texttt{src1}(I) - \\texttt{src2}(I))^2 }{if \\(\\texttt{normType} =
 * \\texttt{NORM_L2SQR}\\) } { \\left(\\frac{\\|\\texttt{src1}-\\texttt{src2}\\|_{L_2}
 * }{\\|\\texttt{src2}\\|_{L_2}}\\right)^2 }{if \\(\\texttt{normType} = \\texttt{NORM_RELATIVE |
 * NORM_L2SQR}\\) } \\]`
 * 
 */
export declare const NORM_L2SQR: NormTypes // initializer: = 5

/**
 * In the case of one input array, calculates the [Hamming](#d3/d59/structcv_1_1Hamming}) distance of
 * the array from zero, In the case of two input arrays, calculates the
 * [Hamming](#d3/d59/structcv_1_1Hamming}) distance between the arrays.
 * 
 */
export declare const NORM_HAMMING: NormTypes // initializer: = 6

/**
 * Similar to NORM_HAMMING, but in the calculation, each two bits of the input sequence will be added
 * and treated as a single bit to be used in the same calculation as NORM_HAMMING.
 * 
 */
export declare const NORM_HAMMING2: NormTypes // initializer: = 7

/**
 * 
 */
export declare const NORM_TYPE_MASK: NormTypes // initializer: = 7

/**
 * 
 */
export declare const NORM_RELATIVE: NormTypes // initializer: = 8

/**
 * 
 */
export declare const NORM_MINMAX: NormTypes // initializer: = 32

/**
 * 
 */
export declare const ROTATE_90_CLOCKWISE: RotateFlags // initializer: = 0

/**
 * 
 */
export declare const ROTATE_180: RotateFlags // initializer: = 1

/**
 * 
 */
export declare const ROTATE_90_COUNTERCLOCKWISE: RotateFlags // initializer: = 2

/**
 * Various border types, image boundaries are denoted with `|` 
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58}),
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 */
export type BorderTypes = any

/**
 * Various border types, image boundaries are denoted with `|` 
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58}),
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 */
export type CmpTypes = any

/**
 * Various border types, image boundaries are denoted with `|` 
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58}),
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 */
export type DecompTypes = any

/**
 * Various border types, image boundaries are denoted with `|` 
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58}),
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 */
export type DftFlags = any

/**
 * Various border types, image boundaries are denoted with `|` 
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58}),
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 */
export type GemmFlags = any

/**
 * Various border types, image boundaries are denoted with `|` 
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58}),
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 */
export type NormTypes = any

/**
 * Various border types, image boundaries are denoted with `|` 
 * 
 * [borderInterpolate](#d2/de8/group__core__array_1ga247f571aa6244827d3d798f13892da58}),
 * [copyMakeBorder](#d2/de8/group__core__array_1ga2ac1049c2c3dd25c2b41bffe17658a36})
 * 
 */
export type RotateFlags = any


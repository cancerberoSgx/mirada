
import { InputArray, OutputArray, int } from './_types'
/*
 * # imgproc_color_conversions
 *
 * TODO  
 */

/**
 * The function converts an input image from one color space to another. In case of a transformation to-from RGB color space, the order of the channels should be specified explicitly (RGB or BGR). Note that the default color format in OpenCV is often referred to as RGB but it is actually BGR (the bytes are reversed). So the first byte in a standard (24-bit) color image will be an 8-bit Blue component, the second byte will be Green, and the third byte will be Red. The fourth, fifth, and sixth bytes would then be the second pixel (Blue, then Green, then Red), and so on.
 * 
 * The conventional ranges for R, G, and B channel values are:
 * 
 * 0 to 255 for CV_8U images
 * 0 to 65535 for CV_16U images
 * 0 to 1 for CV_32F images
 * 
 * In case of linear transformations, the range does not matter. But in case of a non-linear transformation, an input RGB image should be normalized to the proper value range to get the correct results, for example, for RGB `$\\rightarrow$` L*u*v* transformation. For example, if you have a 32-bit floating-point image directly converted from an 8-bit image without any scaling, then it will have the 0..255 value range instead of 0..1 assumed by the function. So, before calling [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab}) , you need first to scale the image down: 
 * 
 * ```cpp
 * img *= 1./255;
 * cvtColor(img, img, COLOR_BGR2Luv);
 * ```
 * 
 *  If you use [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab}) with 8-bit images, the conversion will have some information lost. For many applications, this will not be noticeable but it is recommended to use 32-bit images in applications that need the full range of colors or that convert an image before an operation and then convert back.
 * 
 * If conversion adds the alpha channel, its value will set to the maximum of corresponding channel range: 255 for CV_8U, 65535 for CV_16U, 1 for CV_32F.
 * 
 * [Color conversions](#de/d25/imgproc_color_conversions})
 * 
 * @param src input image: 8-bit unsigned, 16-bit unsigned ( CV_16UC... ), or single-precision floating-point.
 * @param dst output image of the same size and depth as src.
 * @param code color space conversion code (see ColorConversionCodes).
 * @param dstCn number of channels in the destination image; if the parameter is 0, the number of the channels is derived automatically from src and code.
 */
export declare function cvtColor(src: InputArray, dst: OutputArray, code: int, dstCn: int): void

/**
 * This function only supports YUV420 to RGB conversion as of now.
 * 
 * @param src1 8-bit image (CV_8U) of the Y plane.
 * @param src2 image containing interleaved U/V plane.
 * @param dst output image.
 * @param code Specifies the type of conversion. It can take any of the following values:
 * COLOR_YUV2BGR_NV12COLOR_YUV2RGB_NV12COLOR_YUV2BGRA_NV12COLOR_YUV2RGBA_NV12COLOR_YUV2BGR_NV21COLOR_YUV2RGB_NV21COLOR_YUV2BGRA_NV21COLOR_YUV2RGBA_NV21
 */
export declare function cvtColorTwoPlane(src1: InputArray, src2: InputArray, dst: OutputArray, code: int): void

/**
 * The function can do the following transformations:
 * 
 * Demosaicing using bilinear interpolation[COLOR_BayerBG2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a8945844ab075687f4d4196abe1ce0db4}) , [COLOR_BayerGB2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0acef801137d9696dcb622122a7ef266c6}) , [COLOR_BayerRG2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a275d4d0ff99fdf45b2b6b421a14ec831}) , [COLOR_BayerGR2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0afe3d71ad80f5f067d3d76b376cf8d951})[COLOR_BayerBG2GRAY](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a08febd33b0214417dd33a7fb014bf99a}) , [COLOR_BayerGB2GRAY](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a63667769d13ad6dff2b5a296f4c966d2}) , [COLOR_BayerRG2GRAY](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0ad4fbbce0080be39beb5397716bac3ccc}) , [COLOR_BayerGR2GRAY](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0aaab526ce2ad4ce74603c711b3c22a38a})
 * Demosaicing using Variable Number of Gradients.[COLOR_BayerBG2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a03fa881afa10795e9f4344a50b80db7f}) , [COLOR_BayerGB2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0ae47bd67001d93fbee5638f61ce256b68}) , [COLOR_BayerRG2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0ad298bb184eda5bf3a58fbc4e509c0e43}) , [COLOR_BayerGR2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0ad787e2911c5b21eaf4d7ffe6f85ad5a8})
 * Edge-Aware Demosaicing.[COLOR_BayerBG2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0af945cf163b1b5d01b69feabfe10d62bc}) , [COLOR_BayerGB2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a3ac0015fd225d6e02485c822fb26b4b6}) , [COLOR_BayerRG2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a9a7ff84cd856119c6c5b8ecb81ba9284}) , [COLOR_BayerGR2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0af51a3d5aceb2256a59c3a4c8e499d7e3})
 * Demosaicing with alpha channel[COLOR_BayerBG2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a64d2dcd6fd8f41e865801fda7a2b75e4}) , [COLOR_BayerGB2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0ace94e0ec556c55476cd451fbcd411bb8}) , [COLOR_BayerRG2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0af3d528d5f0f7c24ac08dd5e5a8f19ddc}) , [COLOR_BayerGR2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a850bc919c36bb360f1270ffb9f839532})
 * 
 * [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab})
 * 
 * @param src input image: 8-bit unsigned or 16-bit unsigned.
 * @param dst output image of the same size and depth as src.
 * @param code Color space conversion code (see the description below).
 * @param dstCn number of channels in the destination image; if the parameter is 0, the number of the channels is derived automatically from src and code.
 */
export declare function demosaicing(src: InputArray, dst: OutputArray, code: int, dstCn: int): void


**[mirada](../README.md)**

[Globals](../README.md) › ["util/browserImageUtil"](_util_browserimageutil_.md)

# External module: "util/browserImageUtil"

## Index

### Functions

* [getImageData](_util_browserimageutil_.md#getimagedata)
* [htmlImageData](_util_browserimageutil_.md#htmlimagedata)
* [renderArrayBufferInCanvas](_util_browserimageutil_.md#renderarraybufferincanvas)
* [renderInCanvas](_util_browserimageutil_.md#renderincanvas)

## Functions

###  getImageData

▸ **getImageData**(`url`: string): *Promise‹ImageData›*

*Defined in [util/browserImageUtil.ts:5](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/browserImageUtil.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹ImageData›*

___

###  htmlImageData

▸ **htmlImageData**(`img`: Mat): *ImageData*

*Defined in [util/browserImageUtil.ts:66](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/browserImageUtil.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | Mat |

**Returns:** *ImageData*

___

###  renderArrayBufferInCanvas

▸ **renderArrayBufferInCanvas**(`a`: ArrayBuffer, `canvas?`: HTMLCanvasElement, `appendToBody`: boolean): *Promise‹object›*

*Defined in [util/browserImageUtil.ts:30](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/browserImageUtil.ts#L30)*

A subptimal method to load a image array buffer (encoded in jpg, png) wihtout knowing its format or size.
1) creates a blob and a url object
* loads the url in a HTML Image (to know its dimentions )
* draw the image in a canvas ().

This method is useful as a decoder for the browser without libraries

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`a` | ArrayBuffer | - |
`canvas?` | HTMLCanvasElement | - |
`appendToBody` | boolean | false |

**Returns:** *Promise‹object›*

___

###  renderInCanvas

▸ **renderInCanvas**(`mat`: Mat, `canvas?`: HTMLCanvasElement, `appendToBody`: boolean): *HTMLCanvasElement*

*Defined in [util/browserImageUtil.ts:50](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/browserImageUtil.ts#L50)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mat` | Mat | - |
`canvas?` | HTMLCanvasElement | - |
`appendToBody` | boolean | false |

**Returns:** *HTMLCanvasElement*
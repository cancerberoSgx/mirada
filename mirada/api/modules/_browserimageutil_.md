**[mirada](../README.md)**

[Globals](../README.md) › ["browserImageUtil"](_browserimageutil_.md)

# External module: "browserImageUtil"

## Index

### Functions

* [getImageData](_browserimageutil_.md#getimagedata)
* [htmlImageData](_browserimageutil_.md#htmlimagedata)
* [renderArrayBufferInCanvas](_browserimageutil_.md#renderarraybufferincanvas)
* [renderInCanvas](_browserimageutil_.md#renderincanvas)

## Functions

###  getImageData

▸ **getImageData**(`url`: string): *Promise‹ImageData›*

*Defined in [browserImageUtil.ts:4](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/browserImageUtil.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹ImageData›*

___

###  htmlImageData

▸ **htmlImageData**(`img`: [Mat](../classes/_types_opencv_.mat.md)): *ImageData*

*Defined in [browserImageUtil.ts:69](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/browserImageUtil.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | [Mat](../classes/_types_opencv_.mat.md) |

**Returns:** *ImageData*

___

###  renderArrayBufferInCanvas

▸ **renderArrayBufferInCanvas**(`a`: ArrayBuffer, `canvas?`: HTMLCanvasElement, `appendToBody`: boolean): *Promise‹object›*

*Defined in [browserImageUtil.ts:31](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/browserImageUtil.ts#L31)*

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
`appendToBody` | boolean | true |

**Returns:** *Promise‹object›*

___

###  renderInCanvas

▸ **renderInCanvas**(`mat`: [Mat](../classes/_types_opencv_.mat.md), `canvas?`: HTMLCanvasElement, `appendToBody`: boolean): *HTMLCanvasElement*

*Defined in [browserImageUtil.ts:53](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/browserImageUtil.ts#L53)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mat` | [Mat](../classes/_types_opencv_.mat.md) | - |
`canvas?` | HTMLCanvasElement | - |
`appendToBody` | boolean | true |

**Returns:** *HTMLCanvasElement*
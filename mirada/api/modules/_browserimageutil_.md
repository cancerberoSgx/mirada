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

*Defined in [browserImageUtil.ts:5](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/browserImageUtil.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹ImageData›*

___

###  htmlImageData

▸ **htmlImageData**(`img`: Mat): *ImageData*

*Defined in [browserImageUtil.ts:68](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/browserImageUtil.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | Mat |

**Returns:** *ImageData*

___

###  renderArrayBufferInCanvas

▸ **renderArrayBufferInCanvas**(`a`: ArrayBuffer, `canvas?`: HTMLCanvasElement, `appendToBody`: boolean): *Promise‹object›*

*Defined in [browserImageUtil.ts:30](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/browserImageUtil.ts#L30)*

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

▸ **renderInCanvas**(`mat`: Mat, `canvas?`: HTMLCanvasElement, `appendToBody`: boolean): *HTMLCanvasElement*

*Defined in [browserImageUtil.ts:52](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/browserImageUtil.ts#L52)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mat` | Mat | - |
`canvas?` | HTMLCanvasElement | - |
`appendToBody` | boolean | true |

**Returns:** *HTMLCanvasElement*